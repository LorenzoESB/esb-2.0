import { ApiProperty } from '@nestjs/swagger';
import { RankingCriterion } from '../../shared/interfaces/base-ranking.interface';

export class DigitalAccountCriterionDto implements RankingCriterion {
  @ApiProperty({ description: 'Chave única do critério', example: 'tarifas' })
  key: string;

  @ApiProperty({ description: 'Nome do critério', example: 'Tarifas e mensalidade' })
  name: string;

  @ApiProperty({ description: 'Peso aplicado no cálculo', example: 2.5 })
  weight: number;

  @ApiProperty({
    description: 'Tipo do critério',
    enum: ['boolean', 'numeric', 'scale'],
    example: 'numeric',
  })
  type: 'boolean' | 'numeric' | 'scale';

  @ApiProperty({
    description: 'Descrição do critério',
    required: false,
    example: 'Avalia custo fixo mensal e isenções',
  })
  description?: string;
}

export class DigitalAccountScoreBreakdownDto {
  @ApiProperty({ description: 'Chave do critério', example: 'tarifas' })
  key: string;

  @ApiProperty({ description: 'Nome do critério', example: 'Tarifas e mensalidade' })
  name: string;

  @ApiProperty({ description: 'Nota bruta (0-5)', example: 4.8 })
  raw_score: number;

  @ApiProperty({ description: 'Peso aplicado', example: 2.5 })
  weight: number;

  @ApiProperty({ description: 'Contribuição ponderada', example: 12.0 })
  contribution: number;

  @ApiProperty({ description: 'Participação percentual no score final', example: 32.5 })
  percentage: number;
}

export class DigitalAccountFeaturesDto {
  @ApiProperty({ description: 'Oferece cartão de crédito', example: true })
  credit_card: boolean;

  @ApiProperty({ description: 'Oferece cartão de débito', example: true })
  debit_card: boolean;

  @ApiProperty({ description: 'Possui investimentos integrados', example: true })
  investments: boolean;

  @ApiProperty({ description: 'Gera boletos sem custo', example: true })
  boletos: boolean;

  @ApiProperty({ description: 'Saques ilimitados ou sem tarifa', example: true })
  saques_ilimitados: boolean;

  @ApiProperty({ description: 'Atendimento humano disponível', example: true })
  atendimento_humanizado: boolean;
}

export class DigitalAccountRankingItemDto {
  @ApiProperty({ description: 'Identificador da conta', example: 1 })
  id: number;

  @ApiProperty({ description: 'Nome comercial', example: 'Banco Inter' })
  name: string;

  @ApiProperty({ description: 'Instituição financeira', example: 'Banco Inter S.A.' })
  bank: string;

  @ApiProperty({ description: 'Posição no ranking (1 = melhor)', example: 1 })
  rank: number;

  @ApiProperty({ description: 'Indica a melhor opção', example: true })
  isBestOption: boolean;

  @ApiProperty({ description: 'Logo', example: 'https://.../inter.png' })
  logo: string;

  @ApiProperty({ description: 'Mensalidade ou tarifa de manutenção', example: 0 })
  monthly_fee: number;

  @ApiProperty({
    description: 'Tipo de conta atendida',
    example: 'ambos',
  })
  account_type: 'pf' | 'pj' | 'ambos';

  @ApiProperty({ description: 'Score consolidado (0-5)', example: 4.8 })
  score: number;

  @ApiProperty({ description: 'URL de contratação ou avaliação', example: 'https://...' })
  url_ranking: string;

  @ApiProperty({ description: 'Texto do botão', example: 'Abrir conta' })
  call_to_action: string;

  @ApiProperty({
    description: 'Principais destaques',
    type: [String],
  })
  highlights: string[];

  @ApiProperty({
    description: 'Recursos e serviços',
    type: DigitalAccountFeaturesDto,
  })
  features: DigitalAccountFeaturesDto;

  @ApiProperty({
    description: 'Detalhamento do score por critério',
    type: [DigitalAccountScoreBreakdownDto],
  })
  scoreBreakdown: DigitalAccountScoreBreakdownDto[];

  @ApiProperty({
    description: 'Data de atualização exibida no front',
    example: '05/12/2024',
  })
  data_atualizacao: string;
}

export class DigitalAccountsRankingResponseDto {
  @ApiProperty({ type: [DigitalAccountRankingItemDto] })
  items: DigitalAccountRankingItemDto[];

  @ApiProperty({ description: 'Total de contas ranqueadas', example: 5 })
  total: number;

  @ApiProperty({ type: DigitalAccountRankingItemDto })
  bestOption: DigitalAccountRankingItemDto;

  @ApiProperty({ type: [DigitalAccountCriterionDto] })
  criteria: DigitalAccountCriterionDto[];

  @ApiProperty({
    description: 'Data mais recente de atualização dos dados',
    example: new Date(),
    type: String,
  })
  lastUpdated: Date;
}
