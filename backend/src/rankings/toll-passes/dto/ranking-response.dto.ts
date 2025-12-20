import { ApiProperty } from '@nestjs/swagger';
import { RankingCriterion } from '../../shared/interfaces/base-ranking.interface';

export class TollPassCriterionDto implements RankingCriterion {
  @ApiProperty({ description: 'Chave do critério', example: 'custo_mensal' })
  key: string;

  @ApiProperty({ description: 'Nome do critério', example: 'Custo mensal' })
  name: string;

  @ApiProperty({ description: 'Peso aplicado', example: 2 })
  weight: number;

  @ApiProperty({
    description: 'Tipo do critério',
    enum: ['boolean', 'numeric', 'scale'],
  })
  type: 'boolean' | 'numeric' | 'scale';

  @ApiProperty({
    description: 'Descrição do critério',
    required: false,
  })
  description?: string;
}

export class TollPassScoreBreakdownDto {
  @ApiProperty({ description: 'Chave do critério', example: 'custo_mensal' })
  key: string;

  @ApiProperty({ description: 'Nota bruta (0-5)', example: 4.5 })
  raw_score: number;

  @ApiProperty({ description: 'Peso aplicado', example: 2 })
  weight: number;

  @ApiProperty({ description: 'Contribuição ponderada', example: 9 })
  contribution: number;

  @ApiProperty({
    description: 'Participação percentual no score final',
    example: 34.5,
  })
  percentage: number;

  @ApiProperty({ description: 'Nome do critério', example: 'Custo mensal' })
  name: string;
}

export class TollPassPricingDto {
  @ApiProperty({ description: 'Mensalidade', example: 0 })
  mensalidade: number;

  @ApiProperty({ description: 'Custo de adesão', example: 20 })
  adesao: number;

  @ApiProperty({
    description: 'Taxa de instalação (quando houver)',
    required: false,
    example: 0,
  })
  taxa_instalacao?: number;
}

export class TollPassBenefitsDto {
  @ApiProperty({ description: 'Válido em estacionamentos', example: true })
  estacionamento: boolean;

  @ApiProperty({ description: 'Oferece cashback ou pontos', example: false })
  cashback: boolean;

  @ApiProperty({
    description: 'Parceiros com benefícios',
    type: [String],
  })
  parceiros: string[];
}

export class TollPassRankingItemDto {
  @ApiProperty({ description: 'ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'Nome comercial', example: 'C6 Tag' })
  name: string;

  @ApiProperty({ description: 'Empresa responsável', example: 'C6 Bank' })
  empresa: string;

  @ApiProperty({ description: 'Posição no ranking', example: 1 })
  rank: number;

  @ApiProperty({ description: 'Melhor opção', example: true })
  isBestOption: boolean;

  @ApiProperty({ description: 'Logo', example: 'https://...' })
  logo: string;

  @ApiProperty({ description: 'Score consolidado (0-5)', example: 4.7 })
  score: number;

  @ApiProperty({ type: TollPassPricingDto })
  pricing: TollPassPricingDto;

  @ApiProperty({
    description: 'Cobertura estimada de rodovias/estacionamentos',
    example: 400,
  })
  cobertura_rodovias: number;

  @ApiProperty({
    description: 'Benefícios adicionais',
    type: TollPassBenefitsDto,
  })
  beneficios: TollPassBenefitsDto;

  @ApiProperty({
    description: 'Lista de vantagens específicas',
    type: [String],
    required: false,
  })
  tags_adicionais?: string[];

  @ApiProperty({ description: 'URL de contratação', example: 'https://...' })
  url_contratacao: string;

  @ApiProperty({
    description: 'Detalhamento do score',
    type: [TollPassScoreBreakdownDto],
  })
  scoreBreakdown: TollPassScoreBreakdownDto[];

  @ApiProperty({
    description: 'Data de atualização exibida no front',
    example: '03/12/2024',
  })
  data_atualizacao: string;
}

export class TollPassRankingResponseDto {
  @ApiProperty({ type: [TollPassRankingItemDto] })
  items: TollPassRankingItemDto[];

  @ApiProperty({ description: 'Total de empresas', example: 5 })
  total: number;

  @ApiProperty({ type: TollPassRankingItemDto })
  bestOption: TollPassRankingItemDto;

  @ApiProperty({ type: [TollPassCriterionDto] })
  criteria: TollPassCriterionDto[];

  @ApiProperty({
    description: 'Data mais recente de atualização',
    type: String,
    example: new Date(),
  })
  lastUpdated: Date;
}
