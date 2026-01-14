import { Injectable, Logger } from '@nestjs/common';
import { CombustivelInputDto } from './dto/combustivel-input.dto';
import { CombustivelOutputDto } from './dto/combustivel-output.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SimulatorType } from '@prisma/client';
import { EmailService } from '../../email/email.service';

@Injectable()
export class CombustivelService {
  private readonly logger = new Logger(CombustivelService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  private arredondar(valor: number, casas = 3) {
    return Number(valor.toFixed(casas));
  }

  private calcularCustoPorKm(preco: number, consumo: number): number {
    return this.arredondar(preco / consumo);
  }

  private calcularEconomia(custoA: number, custoB: number) {
    const maior = Math.max(custoA, custoB);
    const menor = Math.min(custoA, custoB);
    const valor = this.arredondar(maior - menor);
    const percentual =
      maior === 0 ? 0 : this.arredondar(((maior - menor) / maior) * 100, 2);
    return { valor, percentual };
  }

  private formatarMoeda(valor: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(valor);
  }

  private gerarMensagem(
    input: CombustivelInputDto,
    recomendacao: 'Gasolina' | 'Etanol',
  ) {
    return `Levando em conta a gasolina a ${this.formatarMoeda(input.precoGasolina)}, o etanol a ${this.formatarMoeda(input.precoEtanol)} e o consumo do seu veículo. O combustível que mais vale a pena para abastecer o seu carro é: ${recomendacao}`;
  }

  private calcularCombustivelVantajoso(input: CombustivelInputDto) {
    const custos = {
      gasolina: this.calcularCustoPorKm(
        input.precoGasolina,
        input.consumoGasolina,
      ),
      etanol: this.calcularCustoPorKm(input.precoEtanol, input.consumoEtanol),
    };

    const recomendacao: 'Gasolina' | 'Etanol' =
      custos.etanol < custos.gasolina ? 'Etanol' : 'Gasolina';
    const economia = this.calcularEconomia(custos.gasolina, custos.etanol);

    return { recomendacao, custos, economia };
  }

  async comparaCombustivelEtanol(
    input: CombustivelInputDto,
  ): Promise<CombustivelOutputDto> {
    const resultado = this.calcularCombustivelVantajoso(input);

    const output: CombustivelOutputDto = {
      recomendacao: resultado.recomendacao,
      custos: {
        gasolina: {
          custoPorKm: resultado.custos.gasolina,
          custoFormatado: this.formatarMoeda(resultado.custos.gasolina),
        },
        etanol: {
          custoPorKm: resultado.custos.etanol,
          custoFormatado: this.formatarMoeda(resultado.custos.etanol),
        },
      },
      economia: {
        valor: resultado.economia.valor,
        valorFormatado: this.formatarMoeda(resultado.economia.valor),
        percentual: resultado.economia.percentual,
      },
      mensagem: this.gerarMensagem(input, resultado.recomendacao),
    };

    await this.salvaSimulacao(input, output);

    return output;
  }

  async salvaSimulacao(
    input: CombustivelInputDto,
    output: CombustivelOutputDto,
  ) {
    try {
      const simulationData = {
        simulatorType: SimulatorType.COMBUSTIVEL,
        inputData: JSON.parse(JSON.stringify(input)),
        outputData: JSON.parse(JSON.stringify(output)),
        email: input.email,
        nome: input.nome,
        email_opt_in_simulation: input.email_opt_in_simulation,
        email_opt_in_content: input.email_opt_in_content || false,
        email_opt_in_at: input.email_opt_in_simulation ? new Date() : null,
      };

      await this.prisma.simulation.create({
        data: simulationData,
      });

      if (input.email_opt_in_simulation) {
        await this.emailService.sendSimulationResult({
          simulationType: SimulatorType.COMBUSTIVEL,
          userEmail: input.email,
          userName: input.nome,
          input: simulationData.inputData,
          output: simulationData.outputData,
          summary: output.mensagem || 'Simulação de Combustível',
          createdAt: new Date(),
        });
      }

      this.logger.log(`Simulação salva para o email: ${input.email}`);
    } catch (error) {
      this.logger.warn(
        'Falha ao salvar simulação de combustível, continuando',
        (error as any)?.stack,
      );
    }
  }
}
