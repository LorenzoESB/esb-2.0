import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Decimal from 'decimal.js';
import {
  SimularAposentadoriaDto,
  ModoCalculoAposentadoria,
} from './dto/simular-aposentadoria.dto';
import {
  ResultadoAposentadoriaDto,
  ParametrosCalculoDto,
  AcumulacaoDto,
  UsufrutoDto,
  SustentabilidadeDto,
  CenarioSaqueDto,
  ResumoDto,
} from './dto/resultado-aposentadoria.dto';
import {
  calcularValorFuturoCapitalInicial,
  calcularValorFuturoPagamentos,
  calcularValorPresente,
  calcularPagamentoMensal,
  calcularRendaMensal,
  calcularTaxaAnual,
  calcularDuracaoPatrimonio,
  calcularSaldoAposSaques,
} from './calc/aposentadoria.calc';
import { PrismaService } from '../../prisma/prisma.service';
import { SimulatorType } from '@prisma/client';

@Injectable()
export class AposentadoriaService {
  private readonly logger = new Logger(AposentadoriaService.name);
  private readonly taxaMensal: Decimal;
  private readonly expectativaVida: number;

  constructor(
    private configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    // Parâmetros vindos de variáveis de ambiente com fallback para valores padrão
    this.taxaMensal = new Decimal(
      this.configService.get<number>('RETIREMENT_MONTHLY_RATE', 0.005),
    );
    this.expectativaVida = this.configService.get<number>(
      'RETIREMENT_LIFE_EXPECTANCY',
      86,
    );
  }

  /**
   * Simula planejamento de aposentadoria privada.
   *
   * Implementa dois modos de cálculo:
   * 1. RECEBER: usuário informa quanto quer receber → calcula contribuição necessária
   * 2. CONTRIBUIR: usuário informa quanto vai contribuir → calcula renda futura
   *
   * @param dto - Dados da simulação
   * @returns Resultado completo com acumulação, usufruto e sustentabilidade
   */
  async simular(
    dto: SimularAposentadoriaDto,
  ): Promise<ResultadoAposentadoriaDto> {
    // Validações de negócio
    this.validarDados(dto);

    // Cálculo dos prazos
    const mesesContribuicao = (dto.idadeAposentadoria - dto.idadeAtual) * 12;
    const mesesUsufruto = (this.expectativaVida - dto.idadeAposentadoria) * 12;

    // Calcular valor futuro da reserva atual (se houver)
    const valorFuturoReserva =
      dto.valorJaAcumulado > 0
        ? calcularValorFuturoCapitalInicial(
            dto.valorJaAcumulado,
            this.taxaMensal,
            mesesContribuicao,
          )
        : new Decimal(0);

    let acumulacao: AcumulacaoDto;
    let usufruto: UsufrutoDto;

    if (dto.modoCalculo === ModoCalculoAposentadoria.RECEBER) {
      // Modo 1: Calcular contribuição necessária para obter renda desejada
      const resultado = this.calcularPorRendaDesejada(
        dto.rendaMensalDesejada!,
        mesesContribuicao,
        mesesUsufruto,
        valorFuturoReserva,
      );
      acumulacao = resultado.acumulacao;
      usufruto = resultado.usufruto;
    } else {
      // Modo 2: Calcular renda possível com contribuição informada
      const resultado = this.calcularPorContribuicao(
        dto.contribuicaoMensal!,
        mesesContribuicao,
        mesesUsufruto,
        valorFuturoReserva,
      );
      acumulacao = resultado.acumulacao;
      usufruto = resultado.usufruto;
    }

    // Calcular sustentabilidade
    const sustentabilidade = dto.incluirCenariosSaque
      ? this.calcularSustentabilidade(
          acumulacao.valorTotalAcumulado,
          usufruto.rendaMensal,
        )
      : this.calcularSustentabilidadeSimples();

    // Calcular resumo
    const resumo = this.calcularResumo(
      dto.valorJaAcumulado,
      acumulacao,
      usufruto,
    );

    // Parâmetros
    const parametros: ParametrosCalculoDto = {
      idadeAtual: dto.idadeAtual,
      idadeAposentadoria: dto.idadeAposentadoria,
      valorJaAcumulado: dto.valorJaAcumulado,
      taxaJurosMensal: this.taxaMensal.toNumber(),
      taxaJurosAnual: calcularTaxaAnual(this.taxaMensal).toNumber(),
      expectativaVida: this.expectativaVida,
    };

    const result = {
      parametros,
      acumulacao,
      usufruto,
      sustentabilidade,
      resumo,
    };

    // Save simulation to database
    await this.salvarSimulacao(dto, result);

    return result;
  }

  /**
   * Modo 1: Calcula contribuição necessária para renda desejada.
   */
  private calcularPorRendaDesejada(
    rendaDesejada: number,
    mesesContribuicao: number,
    mesesUsufruto: number,
    valorFuturoReserva: Decimal,
  ): { acumulacao: AcumulacaoDto; usufruto: UsufrutoDto } {
    // 1. Calcular valor presente necessário para gerar a renda desejada
    const valorPresenteNecessario = calcularValorPresente(
      rendaDesejada,
      this.taxaMensal,
      mesesUsufruto,
    );

    // 2. Subtrair o valor futuro da reserva atual
    const valorPresenteAContribuir =
      valorPresenteNecessario.minus(valorFuturoReserva);

    // 3. Calcular contribuição mensal necessária
    const contribuicaoMensal = calcularPagamentoMensal(
      valorPresenteAContribuir,
      this.taxaMensal,
      mesesContribuicao,
    );

    // 4. Calcular valor futuro das contribuições
    const valorFuturoContribuicoes = calcularValorFuturoPagamentos(
      contribuicaoMensal,
      this.taxaMensal,
      mesesContribuicao,
    );

    const acumulacao: AcumulacaoDto = {
      mesesContribuicao,
      anosContribuicao: Math.round((mesesContribuicao / 12) * 10) / 10,
      contribuicaoMensal: this.arredondar(contribuicaoMensal),
      valorFuturoReserva: this.arredondar(valorFuturoReserva),
      valorFuturoContribuicoes: this.arredondar(valorFuturoContribuicoes),
      valorTotalAcumulado: this.arredondar(valorPresenteNecessario),
    };

    const usufruto: UsufrutoDto = {
      idadeInicio:
        Math.floor(mesesContribuicao / 12) + acumulacao.anosContribuicao,
      idadeFim: this.expectativaVida,
      mesesBeneficio: mesesUsufruto,
      rendaMensal: this.arredondar(rendaDesejada),
      valorTotalRecebido: this.arredondar(
        new Decimal(rendaDesejada).mul(mesesUsufruto),
      ),
    };

    return { acumulacao, usufruto };
  }

  /**
   * Modo 2: Calcula renda possível com contribuição informada.
   */
  private calcularPorContribuicao(
    contribuicao: number,
    mesesContribuicao: number,
    mesesUsufruto: number,
    valorFuturoReserva: Decimal,
  ): { acumulacao: AcumulacaoDto; usufruto: UsufrutoDto } {
    // 1. Calcular valor futuro das contribuições
    const valorFuturoContribuicoes = calcularValorFuturoPagamentos(
      contribuicao,
      this.taxaMensal,
      mesesContribuicao,
    );

    // 2. Somar com valor futuro da reserva
    const valorTotalAcumulado =
      valorFuturoContribuicoes.plus(valorFuturoReserva);

    // 3. Calcular renda mensal possível
    const rendaMensal = calcularRendaMensal(
      valorTotalAcumulado,
      this.taxaMensal,
      mesesUsufruto,
    );

    const acumulacao: AcumulacaoDto = {
      mesesContribuicao,
      anosContribuicao: Math.round((mesesContribuicao / 12) * 10) / 10,
      contribuicaoMensal: this.arredondar(contribuicao),
      valorFuturoReserva: this.arredondar(valorFuturoReserva),
      valorFuturoContribuicoes: this.arredondar(valorFuturoContribuicoes),
      valorTotalAcumulado: this.arredondar(valorTotalAcumulado),
    };

    const usufruto: UsufrutoDto = {
      idadeInicio:
        Math.floor(mesesContribuicao / 12) + acumulacao.anosContribuicao,
      idadeFim: this.expectativaVida,
      mesesBeneficio: mesesUsufruto,
      rendaMensal: this.arredondar(rendaMensal),
      valorTotalRecebido: this.arredondar(rendaMensal.mul(mesesUsufruto)),
    };

    return { acumulacao, usufruto };
  }

  /**
   * Calcula cenários de sustentabilidade do patrimônio.
   */
  private calcularSustentabilidade(
    patrimonio: number,
    rendaReferencia: number,
  ): SustentabilidadeDto {
    const capital = new Decimal(patrimonio);

    // Definir cenários de saque baseados na renda de referência
    const percentuais = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
    const cenarios: CenarioSaqueDto[] = percentuais.map((percentual) => {
      const valorSaque = new Decimal(rendaReferencia).mul(percentual);
      return this.criarCenarioSaque(capital, valorSaque);
    });

    return {
      cenarios,
    };
  }

  /**
   * Calcula sustentabilidade simples (sem cenários detalhados).
   */
  private calcularSustentabilidadeSimples(): SustentabilidadeDto {
    return {
      cenarios: [],
    };
  }

  /**
   * Cria um cenário de saque específico.
   */
  private criarCenarioSaque(
    capital: Decimal,
    valorSaque: Decimal,
  ): CenarioSaqueDto {
    const rendimentoMensal = capital.mul(this.taxaMensal);
    const duracaoMeses = calcularDuracaoPatrimonio(
      capital,
      valorSaque,
      this.taxaMensal,
    );

    const consumePrincipal = valorSaque.gt(rendimentoMensal);
    const saldoFinal =
      duracaoMeses === Infinity
        ? capital
        : calcularSaldoAposSaques(
            capital,
            valorSaque,
            this.taxaMensal,
            duracaoMeses,
          );

    let observacao: string;
    if (duracaoMeses === Infinity) {
      observacao = 'Saque sustentável indefinidamente apenas com rendimentos';
    } else {
      const anos = Math.floor(duracaoMeses / 12);
      observacao = `Patrimônio se esgota em ${anos} anos (${duracaoMeses} meses)`;
    }

    return {
      valorSaqueMensal: this.arredondar(valorSaque),
      duracaoMeses: duracaoMeses === Infinity ? -1 : duracaoMeses,
      duracaoAnos:
        duracaoMeses === Infinity ? -1 : Math.floor(duracaoMeses / 12),
      consumePrincipal,
      saldoFinal: this.arredondar(saldoFinal),
      observacao,
    };
  }

  /**
   * Calcula resumo executivo.
   */
  private calcularResumo(
    reservaInicial: number,
    acumulacao: AcumulacaoDto,
    usufruto: UsufrutoDto,
  ): ResumoDto {
    const totalContribuicoes =
      acumulacao.contribuicaoMensal * acumulacao.mesesContribuicao;
    const totalInvestido = reservaInicial + totalContribuicoes;

    return {
      totalInvestido: this.arredondar(totalInvestido),
      totalRecebido: usufruto.valorTotalRecebido,
      saldoPatrimonial: this.arredondar(
        usufruto.valorTotalRecebido - totalInvestido,
      ),
    };
  }

  /**
   * Validações de negócio.
   */
  private validarDados(dto: SimularAposentadoriaDto): void {
    if (dto.idadeAposentadoria <= dto.idadeAtual) {
      throw new BadRequestException(
        'Idade de aposentadoria deve ser maior que idade atual',
      );
    }

    if (dto.idadeAposentadoria > this.expectativaVida) {
      throw new BadRequestException(
        `Idade de aposentadoria não pode ser maior que expectativa de vida (${this.expectativaVida} anos)`,
      );
    }

    if (dto.modoCalculo === ModoCalculoAposentadoria.RECEBER) {
      if (!dto.rendaMensalDesejada || dto.rendaMensalDesejada <= 0) {
        throw new BadRequestException(
          'Renda mensal desejada é obrigatória para modo RECEBER',
        );
      }
    }

    if (dto.modoCalculo === ModoCalculoAposentadoria.CONTRIBUIR) {
      if (!dto.contribuicaoMensal || dto.contribuicaoMensal <= 0) {
        throw new BadRequestException(
          'Contribuição mensal é obrigatória para modo CONTRIBUIR',
        );
      }
    }
  }

  /**
   * Arredonda valores para 2 casas decimais (padrão monetário BRL).
   */
  private arredondar(valor: number | Decimal): number {
    return new Decimal(valor).toDecimalPlaces(2).toNumber();
  }

  /**
   * Salva a simulação no banco de dados.
   */
  private async salvarSimulacao(
    input: SimularAposentadoriaDto,
    output: ResultadoAposentadoriaDto,
  ): Promise<void> {
    try {
      await this.prisma.simulation.create({
        data: {
          simulatorType: SimulatorType.APOSENTADORIA,
          inputData: JSON.parse(JSON.stringify(input)),
          outputData: JSON.parse(JSON.stringify(output)),
          nome: input.nome,
          email: input.email,
        },
      });

      this.logger.log('Retirement simulation saved to database');
    } catch (error) {
      this.logger.warn(
        'Failed to save retirement simulation, continuing',
        error?.stack,
      );
      // Don't throw - simulation should still work even if logging fails
    }
  }
}
