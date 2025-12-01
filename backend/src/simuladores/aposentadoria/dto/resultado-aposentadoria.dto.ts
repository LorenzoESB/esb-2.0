import { ApiProperty } from '@nestjs/swagger';

export class ParametrosCalculoDto {
  @ApiProperty({
    description: 'Idade atual informada (anos)',
    example: 28,
  })
  idadeAtual: number;

  @ApiProperty({
    description: 'Idade de aposentadoria informada (anos)',
    example: 50,
  })
  idadeAposentadoria: number;

  @ApiProperty({
    description: 'Valor já acumulado em previdência (R$)',
    example: 50000,
  })
  valorJaAcumulado: number;

  @ApiProperty({
    description: 'Taxa de juros real mensal utilizada (decimal)',
    example: 0.005,
  })
  taxaJurosMensal: number;

  @ApiProperty({
    description: 'Taxa de juros real anual equivalente (decimal)',
    example: 0.0617,
  })
  taxaJurosAnual: number;

  @ApiProperty({
    description: 'Expectativa de vida utilizada no cálculo (anos)',
    example: 86,
  })
  expectativaVida: number;
}

export class AcumulacaoDto {
  @ApiProperty({
    description: 'Período de contribuição em meses',
    example: 264,
  })
  mesesContribuicao: number;

  @ApiProperty({
    description: 'Período de contribuição em anos',
    example: 22,
  })
  anosContribuicao: number;

  @ApiProperty({
    description: 'Contribuição mensal necessária ou informada (R$)',
    example: 2836.26,
  })
  contribuicaoMensal: number;

  @ApiProperty({
    description: 'Valor futuro da reserva atual corrigida (R$)',
    example: 143439.97,
  })
  valorFuturoReserva: number;

  @ApiProperty({
    description: 'Valor futuro das contribuições mensais (R$)',
    example: 1978286.07,
  })
  valorFuturoContribuicoes: number;

  @ApiProperty({
    description: 'Valor total acumulado na aposentadoria (R$)',
    example: 2121726.04,
  })
  valorTotalAcumulado: number;
}

export class UsufrutoDto {
  @ApiProperty({
    description: 'Idade de início do benefício (anos)',
    example: 50,
  })
  idadeInicio: number;

  @ApiProperty({
    description: 'Idade final considerada - expectativa de vida (anos)',
    example: 86,
  })
  idadeFim: number;

  @ApiProperty({
    description: 'Período de recebimento do benefício em meses',
    example: 432,
  })
  mesesBeneficio: number;

  @ApiProperty({
    description: 'Renda mensal na aposentadoria (R$)',
    example: 12000,
  })
  rendaMensal: number;

  @ApiProperty({
    description: 'Valor total que receberá durante toda aposentadoria (R$)',
    example: 5184000,
  })
  valorTotalRecebido: number;
}

export class CenarioSaqueDto {
  @ApiProperty({
    description: 'Valor do saque mensal neste cenário (R$)',
    example: 10000,
  })
  valorSaqueMensal: number;

  @ApiProperty({
    description: 'Duração do patrimônio com este saque em meses',
    example: 360,
  })
  duracaoMeses: number;

  @ApiProperty({
    description: 'Duração do patrimônio com este saque em anos',
    example: 30,
  })
  duracaoAnos: number;

  @ApiProperty({
    description: 'Indica se este saque consome o capital principal',
    example: false,
  })
  consumePrincipal: boolean;

  @ApiProperty({
    description:
      'Saldo remanescente ao final do período ou na expectativa de vida (R$)',
    example: 0,
  })
  saldoFinal: number;

  @ApiProperty({
    description: 'Observação sobre este cenário',
    example: 'Saque sustentável indefinidamente apenas com rendimentos',
  })
  observacao: string;
}

export class SustentabilidadeDto {
  @ApiProperty({
    description: 'Cenários de saque analisados',
    type: [CenarioSaqueDto],
  })
  cenarios: CenarioSaqueDto[];
}

export class ResumoDto {
  @ApiProperty({
    description:
      'Total investido (contribuições totais + reserva inicial) (R$)',
    example: 812683.24,
  })
  totalInvestido: number;

  @ApiProperty({
    description: 'Total que receberá na aposentadoria (R$)',
    example: 5184000,
  })
  totalRecebido: number;

  @ApiProperty({
    description:
      'Saldo patrimonial (total recebido - total investido) (R$). Pode ser positivo ou negativo.',
    example: 4371316.76,
  })
  saldoPatrimonial: number;
}

export class ResultadoAposentadoriaDto {
  @ApiProperty({
    description: 'Parâmetros utilizados no cálculo',
    type: ParametrosCalculoDto,
  })
  parametros: ParametrosCalculoDto;

  @ApiProperty({
    description: 'Informações da fase de acumulação',
    type: AcumulacaoDto,
  })
  acumulacao: AcumulacaoDto;

  @ApiProperty({
    description: 'Informações da fase de usufruto (benefício)',
    type: UsufrutoDto,
  })
  usufruto: UsufrutoDto;

  @ApiProperty({
    description: 'Análise de sustentabilidade do patrimônio',
    type: SustentabilidadeDto,
  })
  sustentabilidade: SustentabilidadeDto;

  @ApiProperty({
    description: 'Resumo executivo do planejamento',
    type: ResumoDto,
  })
  resumo: ResumoDto;
}
