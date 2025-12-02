import { Injectable, Logger } from '@nestjs/common';
import {
  JurosCompostosInputDto,
  TempoAplicacaoUnidade,
} from './dto/juros-compostos-input.dto';
import { JurosCompostosDetalhadoOutputDto } from './dto/juros-compostos-output.dto';
import {
  CalculoCompleto,
  DetalhesMensal,
  AliquotasIR,
} from './interfaces/juros-compostos.interface';
import { PrismaService } from '../../prisma/prisma.service';
import { SimulatorType } from 'generated/prisma';

@Injectable()
export class JurosCompostosService {
  private readonly logger = new Logger(JurosCompostosService.name);

  constructor(private readonly prisma: PrismaService) {}

  private readonly aliquotasIR: AliquotasIR = {
    ate180: 0.225, // 22.5%
    ate360: 0.2, // 20%
    ate720: 0.175, // 17.5%
    acima720: 0.15, // 15%
  };

  async calculaJurosCompostos(
    input: JurosCompostosInputDto,
  ): Promise<JurosCompostosDetalhadoOutputDto> {
    this.logger.debug('Calculating compound interest', { input });

    const periodoMeses = this.calcularPeriodoMeses(
      input.tempoAplicacao,
      input.tempoAplicacaoUnidade,
    );

    const tempoEmDias = this.converterParaDias(
      input.tempoAplicacao,
      input.tempoAplicacaoUnidade,
    );

    const calculo = this.calcularJurosCompostosMesAMes(
      input.valorInicial,
      input.aporteMensal,
      periodoMeses,
      input.taxaJuros,
    );

    const aliquotaIR = this.getAliquotaIR(tempoEmDias);
    const rendimentoBruto = calculo.rendimentoTotalBruto;
    const impostoRenda = rendimentoBruto * aliquotaIR;
    const rendimentoLiquido = rendimentoBruto - impostoRenda;

    const detalhesMensaisFormatados = calculo.detalhesMensais.map(
      (detalhe) => ({
        mes: detalhe.mes,
        valorInvestido: this.formatarValor(detalhe.totalAportado),
        valorComJuros: this.formatarValor(detalhe.novoSaldo),
        jurosDoMes: this.formatarValor(detalhe.rendimentoMes),
        jurosAcumulados: this.formatarValor(detalhe.rendimentoAcumulado),
      }),
    );

    const result: JurosCompostosDetalhadoOutputDto = {
      resumo: {
        valorTotalFinalBruto: this.formatarValor(calculo.saldoFinal),
        totalInvestido: this.formatarValor(calculo.totalAportado),
        totalEmJurosBruto: this.formatarValor(rendimentoBruto),
      },
      detalhesMensais: detalhesMensaisFormatados,
    };

    this.logger.debug('Compound interest calculated successfully', {
      totalFinal: result.resumo.valorTotalFinalBruto,
    });

    try {
      await this.salvarSimulacao(input, result);
    } catch (error) {
      this.logger.error('Error saving simulation to database', error.stack);
    }

    return result;
  }

  private async salvarSimulacao(
    input: JurosCompostosInputDto,
    output: JurosCompostosDetalhadoOutputDto,
  ): Promise<void> {
    const simulationData = {
      simulatorType: SimulatorType.JUROS_COMPOSTOS,
      email: input.email,
      nome: input.nome,
      inputData: JSON.parse(JSON.stringify(input)),
      outputData: JSON.parse(JSON.stringify(output)),
    };

    this.logger.debug('Saving simulation to database', {
      hasInputData: !!simulationData.inputData,
      hasOutputData: !!simulationData.outputData,
      outputDataKeys: Object.keys(simulationData.outputData),
    });

    const saved = await this.prisma.simulation.create({
      data: simulationData,
    });

    this.logger.log('Simulation saved to database', {
      id: saved.id,
      hasOutputData: !!saved.outputData,
    });
  }

  private getAliquotaIR(dias: number): number {
    if (dias <= 180) return this.aliquotasIR.ate180;
    if (dias <= 360) return this.aliquotasIR.ate360;
    if (dias <= 720) return this.aliquotasIR.ate720;
    return this.aliquotasIR.acima720;
  }

  private converterParaDias(
    tempo: number,
    unidade: TempoAplicacaoUnidade,
  ): number {
    return unidade === TempoAplicacaoUnidade.ANOS ? tempo * 365 : tempo * 30;
  }

  private calcularPeriodoMeses(
    tempo: number,
    unidade: TempoAplicacaoUnidade,
  ): number {
    return unidade === TempoAplicacaoUnidade.ANOS ? tempo * 12 : tempo;
  }

  private calcularJurosCompostosMesAMes(
    valorInicial: number,
    aporteMensal: number,
    periodoMeses: number,
    taxaJurosAnual: number,
  ): CalculoCompleto {
    const taxaMensal = Math.pow(1 + taxaJurosAnual / 100, 1 / 12) - 1;

    let saldo = valorInicial;
    let totalAportado = valorInicial;
    let rendimentoAcumulado = 0;
    const detalhesMensais: DetalhesMensal[] = [];

    for (let mes = 1; mes <= periodoMeses; mes++) {
      const saldoAnterior = saldo;
      const rendimentoMes = saldo * taxaMensal;
      const aporteDoMes = aporteMensal;
      const novoSaldo = saldo + rendimentoMes + aporteDoMes;

      rendimentoAcumulado += rendimentoMes;
      totalAportado += aporteMensal;

      detalhesMensais.push({
        mes,
        saldoAnterior,
        rendimentoMes,
        aporte: aporteDoMes,
        novoSaldo,
        rendimentoAcumulado,
        totalAportado,
      });

      saldo = novoSaldo;
    }

    return {
      saldoFinal: saldo,
      rendimentoTotalBruto: rendimentoAcumulado,
      totalAportado,
      detalhesMensais,
    };
  }

  private formatarValor(valor: number): number {
    return parseFloat(valor.toFixed(2));
  }
}
