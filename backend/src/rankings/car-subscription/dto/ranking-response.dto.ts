import { ApiProperty } from '@nestjs/swagger';
import { RankingCriterion } from '../../shared/interfaces/base-ranking.interface';

export class CarSubscriptionCriterionDto implements RankingCriterion {
  @ApiProperty({ description: 'Chave do critério', example: 'custo_total' })
  key: string;

  @ApiProperty({ description: 'Nome', example: 'Custo total' })
  name: string;

  @ApiProperty({ description: 'Peso', example: 2.25 })
  weight: number;

  @ApiProperty({
    description: 'Tipo de dado',
    enum: ['boolean', 'numeric', 'scale'],
  })
  type: 'boolean' | 'numeric' | 'scale';

  @ApiProperty({
    description: 'Descrição',
    required: false,
  })
  description?: string;
}

export class CarSubscriptionScoreBreakdownDto {
  @ApiProperty({ description: 'Chave do critério', example: 'custo_total' })
  key: string;

  @ApiProperty({ description: 'Nome do critério', example: 'Custo total' })
  name: string;

  @ApiProperty({ description: 'Nota bruta (0-5)', example: 4.5 })
  raw_score: number;

  @ApiProperty({ description: 'Peso', example: 2.25 })
  weight: number;

  @ApiProperty({ description: 'Contribuição ponderada', example: 10.12 })
  contribution: number;

  @ApiProperty({ description: 'Participação percentual', example: 32.5 })
  percentage: number;
}

export class CarSubscriptionPricingDto {
  @ApiProperty({ description: 'Preço mensal mínimo', example: 1890 })
  preco_mensal_min: number;

  @ApiProperty({ description: 'Preço mensal máximo', example: 2690 })
  preco_mensal_max: number;

  @ApiProperty({ description: 'Franquia de km/mês', example: 1000 })
  franquia_km: number;
}

export class CarSubscriptionBenefitsDto {
  @ApiProperty({ description: 'Manutenção inclusa', example: true })
  manutencao_inclusa: boolean;

  @ApiProperty({ description: 'Seguro incluso', example: true })
  seguro_incluso: boolean;

  @ApiProperty({ description: 'IPVA incluso', example: true })
  ipva_incluso: boolean;

  @ApiProperty({ description: 'Revisão inclusa', example: true })
  revisao_inclusa: boolean;

  @ApiProperty({
    description: 'Observações adicionais',
    required: false,
    type: [String],
  })
  observacoes?: string[];
}

export class CarSubscriptionRankingItemDto {
  @ApiProperty({ description: 'ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'Nome do plano', example: 'Movida Mensal Flex' })
  name: string;

  @ApiProperty({ description: 'Empresa', example: 'Movida' })
  empresa: string;

  @ApiProperty({ description: 'Posição', example: 1 })
  rank: number;

  @ApiProperty({ description: 'Melhor opção', example: true })
  isBestOption: boolean;

  @ApiProperty({ description: 'Logo', example: 'https://...' })
  logo: string;

  @ApiProperty({ description: 'Score (0-5)', example: 4.6 })
  score: number;

  @ApiProperty({ type: CarSubscriptionPricingDto })
  pricing: CarSubscriptionPricingDto;

  @ApiProperty({ type: CarSubscriptionBenefitsDto })
  beneficios: CarSubscriptionBenefitsDto;

  @ApiProperty({ description: 'Desconto ou benefício promocional', example: 'Primeiro mês grátis' })
  desconto?: string;

  @ApiProperty({ description: 'URL de contratação', example: 'https://...' })
  url_contratacao: string;

  @ApiProperty({
    description: 'Detalhamento do score por critério',
    type: [CarSubscriptionScoreBreakdownDto],
  })
  scoreBreakdown: CarSubscriptionScoreBreakdownDto[];

  @ApiProperty({
    description: 'Data de atualização exibida no front',
    example: '04/12/2024',
  })
  data_atualizacao: string;
}

export class CarSubscriptionRankingResponseDto {
  @ApiProperty({ type: [CarSubscriptionRankingItemDto] })
  items: CarSubscriptionRankingItemDto[];

  @ApiProperty({ description: 'Total de empresas', example: 5 })
  total: number;

  @ApiProperty({ type: CarSubscriptionRankingItemDto })
  bestOption: CarSubscriptionRankingItemDto;

  @ApiProperty({ type: [CarSubscriptionCriterionDto] })
  criteria: CarSubscriptionCriterionDto[];

  @ApiProperty({
    description: 'Data mais recente de atualização',
    type: String,
  })
  lastUpdated: Date;
}
