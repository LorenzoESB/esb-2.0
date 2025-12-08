import { ApiProperty } from '@nestjs/swagger';

/**
 * Criterion used in insurance ranking calculation
 *
 * Named specifically for insurance to avoid Swagger schema conflicts
 */
export class InsuranceRankingCriterionDto {
  @ApiProperty({
    description: 'Unique key for the criterion',
    example: 'price_competitiveness',
  })
  key: string;

  @ApiProperty({
    description: 'Display name of the criterion',
    example: 'Preço Competitivo',
  })
  name: string;

  @ApiProperty({
    description: 'Weight of this criterion in score calculation',
    example: 2.5,
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
    example: 'Competitividade dos preços de franquia e mensalidade',
    required: false,
  })
  description?: string;
}

/**
 * Score breakdown per criterion
 */
export class InsuranceScoreBreakdownDto {
  @ApiProperty({
    description: 'Criterion key',
    example: 'price_competitiveness',
  })
  key: string;

  @ApiProperty({
    description: 'Criterion display name',
    example: 'Preço Competitivo',
  })
  name: string;

  @ApiProperty({
    description: 'Raw score (0-10)',
    example: 9.5,
  })
  raw_score: number;

  @ApiProperty({
    description: 'Weight applied to the criterion',
    example: 2.5,
  })
  weight: number;

  @ApiProperty({
    description: 'Weighted contribution to final score',
    example: 1.32,
  })
  contribution: number;

  @ApiProperty({
    description: 'Percentage contribution to final score',
    example: 18.4,
  })
  percentage: number;
}

/**
 * Coverage details for an insurance company
 */
export class InsuranceCoverageDto {
  @ApiProperty({ description: 'Basic coverage', example: true })
  cobertura_basica: boolean;

  @ApiProperty({ description: 'Full coverage', example: true })
  cobertura_total: boolean;

  @ApiProperty({ description: 'Third-party coverage', example: true })
  cobertura_terceiros: boolean;

  @ApiProperty({ description: 'Glass coverage', example: true })
  vidros: boolean;

  @ApiProperty({ description: 'Theft coverage', example: true })
  roubo_furto: boolean;

  @ApiProperty({ description: 'Collision coverage', example: true })
  colisao: boolean;

  @ApiProperty({ description: 'Fire coverage', example: true })
  incendio: boolean;

  @ApiProperty({ description: 'Natural events coverage', example: true })
  fenomenos_naturais: boolean;

  @ApiProperty({ description: '24/7 assistance', example: true })
  assistencia_24h: boolean;

  @ApiProperty({ description: 'Rental car availability', example: true })
  carro_reserva: boolean;
}

/**
 * Services offered by an insurance company
 */
export class InsuranceServicesDto {
  @ApiProperty({ description: 'Online support available', example: true })
  atendimento_online: boolean;

  @ApiProperty({ description: 'Mobile app available', example: true })
  app_mobile: boolean;

  @ApiProperty({
    description: 'Towing kilometers (null = unlimited)',
    example: null,
    nullable: true,
  })
  guincho_km: number | null;

  @ApiProperty({
    description: 'Number of partner workshops',
    example: 5000,
    nullable: true,
  })
  oficinas_referenciadas: number | null;

  @ApiProperty({ description: 'Safe driver discount', example: true })
  desconto_bom_motorista: boolean;

  @ApiProperty({ description: 'Garage discount', example: true })
  desconto_garagem: boolean;
}

/**
 * Pricing information for insurance
 */
export class InsurancePricingDto {
  @ApiProperty({ description: 'Minimum deductible amount', example: 1500 })
  franquia_minima: number;

  @ApiProperty({ description: 'Maximum deductible amount', example: 3000 })
  franquia_maxima: number;

  @ApiProperty({
    description: 'Minimum estimated monthly price',
    example: 150,
  })
  preco_mensal_estimado_min: number;

  @ApiProperty({
    description: 'Maximum estimated monthly price',
    example: 400,
  })
  preco_mensal_estimado_max: number;
}

/**
 * Insurance ranking item DTO
 */
export class InsuranceRankingItemDto {
  @ApiProperty({ description: 'Insurance ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'Display name', example: 'Azul Seguros' })
  name: string;

  @ApiProperty({ description: 'Rank position (1 = best)', example: 1 })
  rank: number;

  @ApiProperty({
    description: 'Whether this is the best option',
    example: true,
  })
  isBestOption: boolean;

  @ApiProperty({
    description: 'Insurance company legal name',
    example: 'Azul Companhia de Seguros Gerais',
  })
  company: string;

  @ApiProperty({
    description: 'Logo URL',
    example: 'https://example.com/logos/azul-seguros.png',
  })
  logo: string;

  @ApiProperty({
    description: 'Final calculated score (0-10)',
    example: 9.05,
  })
  score: number;

  @ApiProperty({ description: 'Coverage details' })
  coverage: InsuranceCoverageDto;

  @ApiProperty({ description: 'Services offered' })
  services: InsuranceServicesDto;

  @ApiProperty({ description: 'Pricing information' })
  pricing: InsurancePricingDto;

  @ApiProperty({ description: 'Customer rating (0-5)', example: 4.8 })
  avaliacao_clientes: number;

  @ApiProperty({
    description: 'Years in the market',
    example: 15,
  })
  tempo_mercado_anos: number;

  @ApiProperty({
    description: 'Claim approval rate in percentage',
    example: 92,
  })
  sinistros_aprovados_percentual: number;

  @ApiProperty({
    description: 'Observations or notes',
    example: 'Cobertura completa e excelente atendimento',
    nullable: true,
  })
  observacoes: string | null;

  @ApiProperty({
    description: 'URL for contracting the insurance',
    example: 'https://azulseguros.com.br',
  })
  url_contratacao: string;

  @ApiProperty({
    description: 'URL for detailed review',
    example: 'https://blog.educandoseubolso.com.br/azul-seguros',
    nullable: true,
  })
  url_avaliacao: string | null;

  @ApiProperty({
    description: 'Last update date (locale string)',
    example: '01/12/2024',
  })
  data_atualizacao: string;

  @ApiProperty({
    description: 'Score breakdown per criterion',
    type: [InsuranceScoreBreakdownDto],
  })
  scoreBreakdown: InsuranceScoreBreakdownDto[];
}

/**
 * Insurance ranking response DTO
 */
export class InsuranceRankingResponseDto {
  @ApiProperty({ type: [InsuranceRankingItemDto] })
  items: InsuranceRankingItemDto[];

  @ApiProperty({ description: 'Total items', example: 10 })
  total: number;

  @ApiProperty({ description: 'Best option in the ranking' })
  bestOption: InsuranceRankingItemDto;

  @ApiProperty({
    description: 'Criteria used for the ranking',
    type: [InsuranceRankingCriterionDto],
  })
  criteria: InsuranceRankingCriterionDto[];

  @ApiProperty({
    description: 'Date of the last update',
    example: new Date('2024-12-01'),
  })
  lastUpdated: Date;
}
