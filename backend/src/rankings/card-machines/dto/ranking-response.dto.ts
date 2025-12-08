import { ApiProperty } from '@nestjs/swagger';

/**
 * Criterion used in ranking calculation
 */
export class RankingCriterionDto {
  @ApiProperty({
    description: 'Unique key for the criterion',
    example: 'competitive_rates',
  })
  key: string;

  @ApiProperty({
    description: 'Display name of the criterion',
    example: 'Taxas Competitivas',
  })
  name: string;

  @ApiProperty({
    description: 'Weight of this criterion in score calculation',
    example: 3.0,
  })
  weight: number;

  @ApiProperty({
    description: 'Type of criterion value',
    enum: ['boolean', 'numeric', 'scale'],
    example: 'numeric',
  })
  type: string;

  @ApiProperty({
    description: 'Optional description of the criterion',
    example: 'Avalia o quão competitivas são as taxas',
    required: false,
  })
  description?: string;
}

/**
 * Plan details for a card machine
 */
export class MachinePlanDto {
  @ApiProperty({
    description: 'Plan ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Plan name',
    example: 'Plano Padrão',
  })
  nome: string;

  @ApiProperty({
    description: 'Debit rate (formatted percentage)',
    example: '1,69%',
  })
  taxa_debito: string;

  @ApiProperty({
    description: 'Credit rate (formatted percentage)',
    example: '2,49%',
  })
  taxa_credito_vista: string;

  @ApiProperty({
    description: 'Minimum installment credit rate (formatted percentage)',
    example: '3,49%',
  })
  taxa_credito_parcelado_min: string;

  @ApiProperty({
    description: 'Days until debit payment',
    example: 1,
  })
  dias_repasse_debito: number;

  @ApiProperty({
    description: 'Days until credit payment',
    example: 1,
  })
  dias_repasse_credito: number;

  @ApiProperty({
    description: 'Plan rating (0-10)',
    example: 9.0,
  })
  avaliacao: number;
}

/**
 * Features of a card machine
 */
export class MachineFeaturesDto {
  @ApiProperty({ description: 'Accepts chip cards', example: true })
  chip: boolean;

  @ApiProperty({ description: 'Accepts magnetic stripe', example: true })
  tarja: boolean;

  @ApiProperty({ description: 'Accepts NFC/contactless', example: true })
  nfc: boolean;

  @ApiProperty({ description: 'Wired connection', example: false })
  com_fio: boolean;

  @ApiProperty({ description: 'Prints receipt', example: true })
  imprime_recibo: boolean;

  @ApiProperty({ description: 'Requires smartphone', example: false })
  precisa_smartphone: boolean;

  @ApiProperty({
    description: 'Allows receivables anticipation',
    example: true,
  })
  permite_antecipacao: boolean;

  @ApiProperty({ description: 'Serves individuals (PF)', example: true })
  atende_pf: boolean;

  @ApiProperty({ description: 'Serves businesses (PJ)', example: true })
  atende_pj: boolean;

  @ApiProperty({ description: 'Accepts meal vouchers', example: false })
  vale_refeicao: boolean;

  @ApiProperty({ description: 'Has e-commerce option', example: false })
  ecommerce: boolean;

  @ApiProperty({ description: 'Maximum installments', example: 12 })
  max_parcelas: number;

  @ApiProperty({
    description: 'Warranty in months',
    example: 12,
    nullable: true,
  })
  garantia: number | null;

  @ApiProperty({
    description: 'Connection types',
    example: ['Wi-Fi', '4G', 'Bluetooth'],
    type: [String],
  })
  tipos_conexao: string[];

  @ApiProperty({
    description: 'Accepted card brands',
    example: ['Visa', 'Mastercard', 'Elo'],
    type: [String],
  })
  bandeiras: string[];

  @ApiProperty({
    description: 'Payment methods',
    example: ['Conta InfinitePay', 'PIX'],
    type: [String],
  })
  formas_recebimento: string[];
}

/**
 * Pricing information for a card machine
 */
export class MachinePricingDto {
  @ApiProperty({
    description: 'Machine price',
    example: 0,
  })
  preco: number;

  @ApiProperty({
    description: 'Promotional price',
    example: null,
    nullable: true,
  })
  preco_promocional: number | null;

  @ApiProperty({
    description: 'Monthly fee',
    example: 0,
  })
  mensalidade: number;
}

/**
 * Card machine ranking item
 *
 * Note: Score is HIDDEN from this DTO (not exposed in API)
 */
export class CardMachineRankingItemDto {
  @ApiProperty({
    description: 'Machine ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Machine name',
    example: 'InfinitePay',
  })
  name: string;

  @ApiProperty({
    description: 'Rank position (1 = best)',
    example: 1,
  })
  rank: number;

  @ApiProperty({
    description: 'Whether this is the best option',
    example: true,
  })
  isBestOption: boolean;

  @ApiProperty({
    description: 'Company name',
    example: 'InfinitePay',
  })
  empresa: string;

  @ApiProperty({
    description: 'Company logo URL',
    example: 'https://example.com/logos/infinitepay.png',
  })
  logo: string;

  @ApiProperty({
    description: 'Machine image URL',
    example: 'https://example.com/maquininhas/infinitepay.png',
  })
  imagem: string;

  @ApiProperty({
    description: 'Machine features',
    type: MachineFeaturesDto,
  })
  features: MachineFeaturesDto;

  @ApiProperty({
    description: 'Pricing information',
    type: MachinePricingDto,
  })
  pricing: MachinePricingDto;

  @ApiProperty({
    description: 'Available plans',
    type: [MachinePlanDto],
  })
  planos: MachinePlanDto[];

  @ApiProperty({
    description: 'Additional observations',
    example: 'Maquininha gratuita via celular com taxas muito competitivas',
    nullable: true,
  })
  observacoes: string | null;

  @ApiProperty({
    description: 'Contracting URL',
    example: 'https://infinitepay.io',
  })
  url_contratacao: string;

  @ApiProperty({
    description: 'Coupon code',
    example: null,
    nullable: true,
  })
  cupom: string | null;

  @ApiProperty({
    description: 'Transparency score (0-10)',
    example: 10,
    nullable: true,
  })
  transparencia: number | null;

  @ApiProperty({
    description: 'Review URL',
    example: 'https://blog.educandoseubolso.com.br/infinitepay',
    nullable: true,
  })
  url_avaliacao: string | null;

  @ApiProperty({
    description: 'Last update date (DD/MM/YYYY)',
    example: '01/12/2024',
  })
  data_atualizacao: string;
}

/**
 * Card machine ranking response
 */
export class CardMachineRankingResponseDto {
  @ApiProperty({
    description: 'Ranked card machines (sorted by rank)',
    type: [CardMachineRankingItemDto],
  })
  items: CardMachineRankingItemDto[];

  @ApiProperty({
    description: 'Total number of machines in ranking',
    example: 10,
  })
  total: number;

  @ApiProperty({
    description: 'Best option (rank 1)',
    type: CardMachineRankingItemDto,
  })
  bestOption: CardMachineRankingItemDto;

  @ApiProperty({
    description: 'Criteria used for ranking',
    type: [RankingCriterionDto],
  })
  criteria: RankingCriterionDto[];

  @ApiProperty({
    description: 'When the ranking was last updated',
    example: '2024-12-01T00:00:00.000Z',
  })
  lastUpdated: Date;
}
