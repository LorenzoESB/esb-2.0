import { ApiProperty } from '@nestjs/swagger';

/**
 * Breakdown de custos detalhado por categoria
 *
 * Todos os campos são obrigatórios. Quando não aplicável ao cenário, o valor deve ser 0.
 * Por exemplo, assinatura tem custoOportunidade = 0, pois não há capital imobilizado.
 */
export class BreakdownCustos {
  @ApiProperty({
    description: 'Custo de aquisição do veículo (compra ou financiamento). 0 para assinatura.',
    example: 80000,
  })
  custoAquisicao: number;

  @ApiProperty({
    description: 'Custo total com manutenção no período. 0 para assinatura (incluído na mensalidade).',
    example: 2400,
  })
  manutencao: number;

  @ApiProperty({
    description: 'Custo total com seguro no período. 0 para assinatura (incluído na mensalidade).',
    example: 9600,
  })
  seguro: number;

  @ApiProperty({
    description: 'Custo total com IPVA no período. 0 para assinatura (incluído na mensalidade).',
    example: 9600,
  })
  ipva: number;

  @ApiProperty({
    description: 'Custos com emplacamento e licenciamento no período. 0 para assinatura (incluído na mensalidade).',
    example: 990,
  })
  taxasLicenciamento: number;

  @ApiProperty({
    description: 'Depreciação acumulada do veículo no período. 0 para assinatura (não é proprietário).',
    example: 24000,
  })
  depreciacao: number;

  @ApiProperty({
    description: 'Custo de oportunidade (rendimento perdido do capital investido). 0 para assinatura (sem capital imobilizado).',
    example: 5200,
  })
  custoOportunidade: number;

  @ApiProperty({
    description: 'Custo total com assinatura no período. 0 para compra à vista e financiamento.',
    example: 90000,
    required: false,
  })
  custoAssinatura?: number;

  @ApiProperty({
    description: 'Juros pagos no financiamento. Não presente em compra à vista e assinatura.',
    example: 15600,
    required: false,
  })
  jurosFinanciamento?: number;

  @ApiProperty({
    description: 'IOF pago no financiamento. Não presente em compra à vista e assinatura.',
    example: 156,
    required: false,
  })
  iofFinanciamento?: number;
}

/**
 * Resultado de um cenário individual (Compra, Financiamento ou Assinatura)
 *
 * valorRevenda é sempre um número. Para assinatura, será 0 pois não há propriedade do veículo.
 */
export class CenarioComparador {
  @ApiProperty({
    description: 'Nome do cenário',
    example: 'Compra à Vista',
  })
  nome: string;

  @ApiProperty({
    description: 'Custo total no período',
    example: 106790,
  })
  custoTotal: number;

  @ApiProperty({
    description: 'Valor de revenda do veículo ao final do período. 0 para assinatura (não é proprietário).',
    example: 56000,
  })
  valorRevenda: number;

  @ApiProperty({
    description: 'Custo líquido (custo total - valor revenda)',
    example: 50790,
  })
  custoLiquido: number;

  @ApiProperty({
    description: 'Breakdown detalhado dos custos',
    type: BreakdownCustos,
  })
  breakdown: BreakdownCustos;
}

/**
 * DTO para resultado da comparação entre compra, financiamento e assinatura
 */
export class ResultadoComparadorDto {
  @ApiProperty({
    description: 'Cenário de compra à vista',
    type: CenarioComparador,
  })
  compraVista: CenarioComparador;

  @ApiProperty({
    description: 'Cenário de financiamento',
    type: CenarioComparador,
  })
  financiamento: CenarioComparador;

  @ApiProperty({
    description: 'Cenário de assinatura',
    type: CenarioComparador,
  })
  assinatura: CenarioComparador;

  @ApiProperty({
    description: 'Melhor opção baseada no menor custo líquido',
    example: 'compraVista',
    enum: ['compraVista', 'financiamento', 'assinatura'],
  })
  melhorOpcao: 'compraVista' | 'financiamento' | 'assinatura';

  @ApiProperty({
    description: 'Economia da melhor opção em relação à pior',
    example: 15230,
  })
  economiaMaxima: number;

  @ApiProperty({
    description: 'Período de comparação em anos',
    example: 3,
  })
  periodoAnos: number;

  @ApiProperty({
    description: 'URLs de redirecionamento para mais informações',
    example: {
      assinatura: 'https://educandoseubolso.blog.br/externo/localiza-meoo-comparador/',
      financiamento: 'https://educandoseubolso.blog.br/externo/simulador-de-financiamento-compadador-assinatura/',
    },
  })
  urls: {
    assinatura: string;
    financiamento: string;
  };
}
