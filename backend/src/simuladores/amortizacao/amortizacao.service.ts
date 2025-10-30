import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { AmortizacaoInputDto } from './dto/amortizacao-input.dto';
import {
  AmortizacaoOutputDto,
  ParcelaDto,
  ResumoAmortizacaoDto,
} from './dto/amortizacao-output.dto';
import {
  SistemaAmortizacao,
  TipoAmortizacaoExtraordinaria,
} from './enums/sistema-amortizacao.enum';
import {
  CalculoParcela,
  TabelaAmortizacao,
} from './interfaces/amortizacao.interface';
import { PrismaService } from '../../prisma/prisma.service';
import { SimulatorType } from '../../../generated/prisma';

@Injectable()
export class AmortizacaoService {
  private readonly logger = new Logger(AmortizacaoService.name);

  constructor(private readonly prisma: PrismaService) {}

  async calcularAmortizacao(
    input: AmortizacaoInputDto,
  ): Promise<AmortizacaoOutputDto> {
    this.logger.debug('Calculating amortization', { input });

    const taxaJurosMensal = this.calcularTaxaJurosMensal(input.taxaJurosAnual);

    let tabela: TabelaAmortizacao;

    switch (input.sistemaAmortizacao) {
      case SistemaAmortizacao.SAC:
        tabela = this.calcularSAC(input, taxaJurosMensal);
        break;
      case SistemaAmortizacao.PRICE:
        tabela = this.calcularPrice(input, taxaJurosMensal);
        break;
      case SistemaAmortizacao.PAGAMENTO_UNICO:
        tabela = this.calcularPagamentoUnico(input, taxaJurosMensal);
        break;
      default:
        throw new BadRequestException(
          `Sistema de amortização não suportado: ${input.sistemaAmortizacao}`,
        );
    }

    // Apply extraordinary amortizations if present
    if (
      input.amortizacoesExtraordinarias &&
      input.amortizacoesExtraordinarias.length > 0
    ) {
      tabela = this.aplicarAmortizacoesExtraordinarias(
        tabela,
        input.amortizacoesExtraordinarias,
        taxaJurosMensal,
      );
    }

    const output = this.formatarSaida(tabela, input);

    // Save to database
    try {
      await this.salvarSimulacao(input, output);
    } catch (error) {
      this.logger.error('Error saving simulation to database', error.stack);
      // Don't throw - we still want to return the calculation result
    }

    return output;
  }

  private async salvarSimulacao(
    input: AmortizacaoInputDto,
    output: AmortizacaoOutputDto,
  ): Promise<void> {
    const simulationData = {
      simulatorType: SimulatorType.AMORTIZACAO,
      email: input.email || null,
      inputData: JSON.parse(JSON.stringify(input)),
      outputData: JSON.parse(JSON.stringify(output)),
    };

    this.logger.debug('Saving simulation to database', {
      hasInputData: !!simulationData.inputData,
      hasOutputData: !!simulationData.outputData,
      outputDataKeys: Object.keys(simulationData.outputData),
      outputDataSize: JSON.stringify(simulationData.outputData).length,
    });

    const saved = await this.prisma.simulation.create({
      data: simulationData,
    });

    this.logger.log('Simulation saved to database', {
      id: saved.id,
      hasOutputData: !!saved.outputData,
      parcelasCount: (saved.outputData as any)?.parcelas?.length,
    });
  }

  private calcularTaxaJurosMensal(taxaAnual: number): number {
    // Convert annual rate to monthly rate using compound interest formula
    return Math.pow(1 + taxaAnual / 100, 1 / 12) - 1;
  }

  private calcularSAC(
    input: AmortizacaoInputDto,
    taxaJurosMensal: number,
  ): TabelaAmortizacao {
    const parcelas: CalculoParcela[] = [];
    const saldoInicial = input.saldoDevedorAtual || input.valorFinanciamento;
    const prazo = input.prazoMeses;
    const amortizacaoConstante = saldoInicial / prazo;
    const seguro = input.seguroMensal || 0;
    const taxaAdm = input.taxaAdministracao || 0;
    const parcelaInicial = input.parcelaAtual || 0;

    let saldo = saldoInicial;
    let amortizacaoAcumulada = 0;
    let jurosAcumulados = 0;

    for (let i = 1; i <= prazo; i++) {
      const juros = saldo * taxaJurosMensal;
      const prestacao = amortizacaoConstante + juros;
      const pagamentoTotal = prestacao + seguro + taxaAdm;
      const saldoFinal = saldo - amortizacaoConstante;

      amortizacaoAcumulada += amortizacaoConstante;
      jurosAcumulados += juros;

      parcelas.push({
        numero: parcelaInicial + i,
        dataVencimento: this.calcularDataVencimento(
          input.dataPrimeiraParcela,
          i,
        ),
        saldoInicial: saldo,
        amortizacao: amortizacaoConstante,
        juros,
        prestacao,
        seguro,
        taxaAdministracao: taxaAdm,
        pagamentoTotal,
        saldoFinal: Math.max(0, saldoFinal),
        amortizacaoAcumulada,
        jurosAcumulados,
      });

      saldo = saldoFinal;
    }

    return this.criarResumo(parcelas, input);
  }

  private calcularPrice(
    input: AmortizacaoInputDto,
    taxaJurosMensal: number,
  ): TabelaAmortizacao {
    const parcelas: CalculoParcela[] = [];
    const saldoInicial = input.saldoDevedorAtual || input.valorFinanciamento;
    const prazo = input.prazoMeses;
    const seguro = input.seguroMensal || 0;
    const taxaAdm = input.taxaAdministracao || 0;
    const parcelaInicial = input.parcelaAtual || 0;

    // Calculate fixed payment using Price formula
    const prestacaoFixa = this.calcularPrestacaoPrice(
      saldoInicial,
      taxaJurosMensal,
      prazo,
    );

    let saldo = saldoInicial;
    let amortizacaoAcumulada = 0;
    let jurosAcumulados = 0;

    for (let i = 1; i <= prazo; i++) {
      const juros = saldo * taxaJurosMensal;
      const amortizacao = prestacaoFixa - juros;
      const pagamentoTotal = prestacaoFixa + seguro + taxaAdm;
      const saldoFinal = saldo - amortizacao;

      amortizacaoAcumulada += amortizacao;
      jurosAcumulados += juros;

      parcelas.push({
        numero: parcelaInicial + i,
        dataVencimento: this.calcularDataVencimento(
          input.dataPrimeiraParcela,
          i,
        ),
        saldoInicial: saldo,
        amortizacao,
        juros,
        prestacao: prestacaoFixa,
        seguro,
        taxaAdministracao: taxaAdm,
        pagamentoTotal,
        saldoFinal: Math.max(0, saldoFinal),
        amortizacaoAcumulada,
        jurosAcumulados,
      });

      saldo = saldoFinal;
    }

    return this.criarResumo(parcelas, input);
  }

  private calcularPrestacaoPrice(
    principal: number,
    taxaMensal: number,
    prazo: number,
  ): number {
    if (taxaMensal === 0) {
      return principal / prazo;
    }
    const fator = Math.pow(1 + taxaMensal, prazo);
    return (principal * (taxaMensal * fator)) / (fator - 1);
  }

  private calcularAmericano(
    input: AmortizacaoInputDto,
    taxaJurosMensal: number,
  ): TabelaAmortizacao {
    const parcelas: CalculoParcela[] = [];
    const saldoInicial = input.saldoDevedorAtual || input.valorFinanciamento;
    const prazo = input.prazoMeses;
    const seguro = input.seguroMensal || 0;
    const taxaAdm = input.taxaAdministracao || 0;
    const parcelaInicial = input.parcelaAtual || 0;

    let saldo = saldoInicial;
    let amortizacaoAcumulada = 0;
    let jurosAcumulados = 0;

    for (let i = 1; i <= prazo; i++) {
      const juros = saldo * taxaJurosMensal;
      const amortizacao = i === prazo ? saldo : 0; // Pay principal only on last payment
      const prestacao = juros + amortizacao;
      const pagamentoTotal = prestacao + seguro + taxaAdm;
      const saldoFinal = saldo - amortizacao;

      amortizacaoAcumulada += amortizacao;
      jurosAcumulados += juros;

      parcelas.push({
        numero: parcelaInicial + i,
        dataVencimento: this.calcularDataVencimento(
          input.dataPrimeiraParcela,
          i,
        ),
        saldoInicial: saldo,
        amortizacao,
        juros,
        prestacao,
        seguro,
        taxaAdministracao: taxaAdm,
        pagamentoTotal,
        saldoFinal: Math.max(0, saldoFinal),
        amortizacaoAcumulada,
        jurosAcumulados,
      });

      saldo = saldoFinal;
    }

    return this.criarResumo(parcelas, input);
  }

  private calcularPagamentoUnico(
    input: AmortizacaoInputDto,
    taxaJurosMensal: number,
  ): TabelaAmortizacao {
    const parcelas: CalculoParcela[] = [];
    const saldoInicial = input.saldoDevedorAtual || input.valorFinanciamento;
    const prazo = input.prazoMeses;
    const seguro = input.seguroMensal || 0;
    const taxaAdm = input.taxaAdministracao || 0;
    const parcelaInicial = input.parcelaAtual || 0;

    let saldo = saldoInicial;
    let jurosAcumulados = 0;

    // Calculate compound interest over the entire period
    for (let i = 1; i <= prazo; i++) {
      const juros = saldo * taxaJurosMensal;
      saldo += juros; // Capitalize interest
      jurosAcumulados += juros;

      const amortizacao = i === prazo ? saldoInicial : 0;
      const jurosPagamento = i === prazo ? jurosAcumulados : 0;
      const prestacao = amortizacao + jurosPagamento;
      const pagamentoTotal =
        prestacao +
        (i === prazo ? seguro * prazo : seguro) +
        (i === prazo ? taxaAdm * prazo : taxaAdm);
      const saldoFinal = i === prazo ? 0 : saldo;

      parcelas.push({
        numero: parcelaInicial + i,
        dataVencimento: this.calcularDataVencimento(
          input.dataPrimeiraParcela,
          i,
        ),
        saldoInicial: i === 1 ? saldoInicial : parcelas[i - 2].saldoFinal,
        amortizacao,
        juros: jurosPagamento,
        prestacao,
        seguro: i === prazo ? seguro * prazo : seguro,
        taxaAdministracao: i === prazo ? taxaAdm * prazo : taxaAdm,
        pagamentoTotal,
        saldoFinal,
        amortizacaoAcumulada: amortizacao,
        jurosAcumulados: i === prazo ? jurosAcumulados : 0,
      });
    }

    return this.criarResumo(parcelas, input);
  }

  private aplicarAmortizacoesExtraordinarias(
    tabela: TabelaAmortizacao,
    amortizacoesExtra: any[],
    taxaJurosMensal: number,
  ): TabelaAmortizacao {
    let parcelas = [...tabela.parcelas];

    for (const amortExtra of amortizacoesExtra) {
      const mesOcorrencia = amortExtra.mesOcorrencia;

      if (mesOcorrencia <= parcelas.length) {
        const parcelaIndex = mesOcorrencia - 1;
        const parcela = parcelas[parcelaIndex];

        // Apply extraordinary amortization
        parcela.amortizacaoExtraordinaria = amortExtra.valor;
        parcela.amortizacao += amortExtra.valor;
        parcela.saldoFinal -= amortExtra.valor;
        parcela.pagamentoTotal += amortExtra.valor;

        // Recalculate subsequent installments based on the type
        if (amortExtra.tipo === TipoAmortizacaoExtraordinaria.DIMINUIR_PRAZO) {
          // Reduce term, keep payment amount
          parcelas = this.recalcularPrazoDiminuido(
            parcelas,
            parcelaIndex,
            taxaJurosMensal,
          );
        } else {
          // Reduce payment amount, keep term
          parcelas = this.recalcularParcelaDiminuida(
            parcelas,
            parcelaIndex,
            taxaJurosMensal,
          );
        }
      }
    }

    return this.criarResumo(parcelas, tabela.resumo);
  }

  private recalcularPrazoDiminuido(
    parcelas: CalculoParcela[],
    indexAmortizacao: number,
    taxaJurosMensal: number,
  ): CalculoParcela[] {
    // Implementation for recalculating with reduced term
    // This would maintain the payment amount but reduce the number of installments
    return parcelas; // Simplified for brevity
  }

  private recalcularParcelaDiminuida(
    parcelas: CalculoParcela[],
    indexAmortizacao: number,
    taxaJurosMensal: number,
  ): CalculoParcela[] {
    // Implementation for recalculating with reduced payment
    // This would reduce the payment amount but maintain the term
    return parcelas; // Simplified for brevity
  }

  private calcularDataVencimento(
    dataPrimeira: string | undefined,
    mesOffset: number,
  ): Date | undefined {
    if (!dataPrimeira) return undefined;

    const data = new Date(dataPrimeira);
    data.setMonth(data.getMonth() + mesOffset - 1);
    return data;
  }

  private criarResumo(
    parcelas: CalculoParcela[],
    input: any,
  ): TabelaAmortizacao {
    const totalPago = parcelas.reduce((sum, p) => sum + p.pagamentoTotal, 0);
    const totalJuros = parcelas.reduce((sum, p) => sum + p.juros, 0);
    const totalAmortizacao = parcelas.reduce(
      (sum, p) => sum + p.amortizacao,
      0,
    );
    const totalSeguro = parcelas.reduce((sum, p) => sum + p.seguro, 0);
    const totalTaxaAdm = parcelas.reduce(
      (sum, p) => sum + p.taxaAdministracao,
      0,
    );
    const totalAmortExtra = parcelas.reduce(
      (sum, p) => sum + (p.amortizacaoExtraordinaria || 0),
      0,
    );

    const resumo = {
      valorFinanciamento: input.valorFinanciamento,
      taxaJurosAnual: input.taxaJurosAnual,
      taxaJurosMensal: this.calcularTaxaJurosMensal(input.taxaJurosAnual) * 100,
      prazoOriginal: input.prazoMeses,
      prazoEfetivo: parcelas.length,
      totalPago,
      totalJuros,
      totalAmortizacao,
      totalSeguro,
      totalTaxaAdministracao: totalTaxaAdm,
      totalAmortizacoesExtraordinarias: totalAmortExtra,
      prestacaoMedia: totalPago / parcelas.length,
      primeiraPrestacao: parcelas[0]?.pagamentoTotal || 0,
      ultimaPrestacao: parcelas[parcelas.length - 1]?.pagamentoTotal || 0,
      sistemaAmortizacao: input.sistemaAmortizacao,
      custoEfetivoTotal: (totalPago / input.valorFinanciamento - 1) * 100,
    };

    return { parcelas, resumo };
  }

  private formatarSaida(
    tabela: TabelaAmortizacao,
    input: AmortizacaoInputDto,
  ): AmortizacaoOutputDto {
    const parcelas: ParcelaDto[] = tabela.parcelas.map((p) => ({
      numero: p.numero,
      dataVencimento: p.dataVencimento?.toISOString().split('T')[0],
      saldoInicial: this.arredondar(p.saldoInicial),
      amortizacao: this.arredondar(p.amortizacao),
      juros: this.arredondar(p.juros),
      prestacao: this.arredondar(p.prestacao),
      seguro: this.arredondar(p.seguro),
      taxaAdministracao: this.arredondar(p.taxaAdministracao),
      pagamentoTotal: this.arredondar(p.pagamentoTotal),
      saldoFinal: this.arredondar(p.saldoFinal),
      amortizacaoExtraordinaria: p.amortizacaoExtraordinaria
        ? this.arredondar(p.amortizacaoExtraordinaria)
        : undefined,
      amortizacaoAcumulada: this.arredondar(p.amortizacaoAcumulada),
      jurosAcumulados: this.arredondar(p.jurosAcumulados),
    }));

    const resumo: ResumoAmortizacaoDto = {
      valorFinanciamento: this.arredondar(tabela.resumo.valorFinanciamento),
      taxaJurosAnual: this.arredondar(tabela.resumo.taxaJurosAnual, 2),
      taxaJurosMensal: this.arredondar(tabela.resumo.taxaJurosMensal, 4),
      prazoOriginal: tabela.resumo.prazoOriginal,
      prazoEfetivo: tabela.resumo.prazoEfetivo,
      totalPago: this.arredondar(tabela.resumo.totalPago),
      totalJuros: this.arredondar(tabela.resumo.totalJuros),
      totalAmortizacao: this.arredondar(tabela.resumo.totalAmortizacao),
      totalSeguro: this.arredondar(tabela.resumo.totalSeguro),
      totalTaxaAdministracao: this.arredondar(
        tabela.resumo.totalTaxaAdministracao,
      ),
      totalAmortizacoesExtraordinarias: this.arredondar(
        tabela.resumo.totalAmortizacoesExtraordinarias,
      ),
      prestacaoMedia: this.arredondar(tabela.resumo.prestacaoMedia),
      primeiraPrestacao: this.arredondar(tabela.resumo.primeiraPrestacao),
      ultimaPrestacao: this.arredondar(tabela.resumo.ultimaPrestacao),
      sistemaAmortizacao: tabela.resumo.sistemaAmortizacao,
      custoEfetivoTotal: this.arredondar(tabela.resumo.custoEfetivoTotal, 2),
    };

    // Generate chart data
    const graficoDados = this.gerarDadosGrafico(parcelas);

    return { resumo, parcelas, graficoDados };
  }

  private gerarDadosGrafico(parcelas: ParcelaDto[]) {
    // Sample every N parcels for large datasets
    const maxPoints = 50;
    const step = Math.ceil(parcelas.length / maxPoints);
    const sampledParcelas = parcelas.filter((_, index) => index % step === 0);

    return {
      labels: sampledParcelas.map((p) => `Parcela ${p.numero}`),
      saldoDevedor: sampledParcelas.map((p) => p.saldoFinal),
      amortizacao: sampledParcelas.map((p) => p.amortizacao),
      juros: sampledParcelas.map((p) => p.juros),
      prestacao: sampledParcelas.map((p) => p.prestacao),
    };
  }

  private arredondar(valor: number, decimais: number = 2): number {
    return parseFloat(valor.toFixed(decimais));
  }

  async compararSistemas(input: AmortizacaoInputDto): Promise<any> {
    const sistemas = [
      SistemaAmortizacao.SAC,
      SistemaAmortizacao.PRICE,
    ];

    const simulacoes = await Promise.all(
      sistemas.map((sistema) =>
        this.calcularAmortizacao({ ...input, sistemaAmortizacao: sistema }),
      ),
    );

    const analiseComparativa = {
      sistemaComMenorJurosTotal: this.encontrarMelhorSistema(
        simulacoes,
        'totalJuros',
        'min',
      ),
      sistemaComMenorPrestacaoInicial: this.encontrarMelhorSistema(
        simulacoes,
        'primeiraPrestacao',
        'min',
      ),
      sistemaComMaiorAmortizacaoInicial: this.encontrarMelhorSistema(
        simulacoes,
        'amortizacaoInicial',
        'max',
      ),
      economiaMaximaJuros: this.calcularEconomiaMaxima(simulacoes),
    };

    return { simulacoes, analiseComparativa };
  }

  private encontrarMelhorSistema(
    simulacoes: AmortizacaoOutputDto[],
    criterio: string,
    tipo: 'min' | 'max',
  ): string {
    let melhorSimulacao = simulacoes[0];
    let melhorValor = (melhorSimulacao.resumo as any)[criterio];

    for (const simulacao of simulacoes) {
      const valor = (simulacao.resumo as any)[criterio];
      if (
        (tipo === 'min' && valor < melhorValor) ||
        (tipo === 'max' && valor > melhorValor)
      ) {
        melhorValor = valor;
        melhorSimulacao = simulacao;
      }
    }

    return melhorSimulacao.resumo.sistemaAmortizacao;
  }

  private calcularEconomiaMaxima(simulacoes: AmortizacaoOutputDto[]): number {
    const jurosTotal = simulacoes.map((s) => s.resumo.totalJuros);
    return Math.max(...jurosTotal) - Math.min(...jurosTotal);
  }
}
