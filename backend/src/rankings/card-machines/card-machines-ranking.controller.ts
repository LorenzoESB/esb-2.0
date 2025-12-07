import {
  Controller,
  Get,
  Query,
  HttpCode,
  HttpStatus,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { CardMachinesRankingService } from './card-machines-ranking.service';
import {
  CardMachineRankingResponseDto,
  RankingCriterionDto,
} from './dto/ranking-response.dto';
import { CardMachineRankingQueryDto } from './dto/ranking-request.dto';

@ApiTags('Rankings - Card Machines')
@Controller('rankings/card-machines')
export class CardMachinesRankingController {
  private readonly logger = new Logger(CardMachinesRankingController.name);

  constructor(
    private readonly rankingService: CardMachinesRankingService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get card machine ranking',
    description: `
      Returns ranked list of card machines based on weighted criteria.

      ## How Ranking Works

      Machines are ranked based on 8 weighted criteria:
      - **Competitive Rates** (weight 3.0): Most important factor
      - **Transparency** (weight 2.0): Clarity in communication
      - **Features** (weight 1.5): Functionality and technology
      - **Receivables Anticipation** (weight 1.0): Binary criterion
      - **Reputation** (weight 1.5): Market presence
      - **Support Quality** (weight 1.0): Customer service
      - **Installment Options** (weight 1.0): Payment flexibility
      - **Meal Vouchers** (weight 0.5): Specific feature

      ## Difference from Comparator

      - **Ranking**: Shows pre-calculated ranking based on overall quality
      - **Comparator** (\`/simuladores/comparador-maquininha\`): Compares selected machines side-by-side

      ## Filtering

      You can filter the ranking by:
      - Features (NFC, printer, smartphone requirement, etc.)
      - Company names
      - Zero monthly fee

      After filtering, machines are re-ranked among the filtered set.

      ## Response

      - Items sorted by rank (best first)
      - Best option highlighted
      - Scores HIDDEN (only rank position shown)
      - Criteria with weights included

      ## Example Use Cases

      - Show top 5 card machines overall
      - Filter machines with NFC and no monthly fee
      - Compare only specific brands
    `,
  })
  @ApiQuery({
    name: 'nfc',
    required: false,
    type: Boolean,
    description: 'Filter by NFC support',
  })
  @ApiQuery({
    name: 'imprime_recibo',
    required: false,
    type: Boolean,
    description: 'Filter by receipt printer',
  })
  @ApiQuery({
    name: 'precisa_smartphone',
    required: false,
    type: Boolean,
    description: 'Filter by smartphone requirement',
  })
  @ApiQuery({
    name: 'permite_antecipacao',
    required: false,
    type: Boolean,
    description: 'Filter by receivables anticipation',
  })
  @ApiQuery({
    name: 'vale_refeicao',
    required: false,
    type: Boolean,
    description: 'Filter by meal voucher acceptance',
  })
  @ApiQuery({
    name: 'ecommerce',
    required: false,
    type: Boolean,
    description: 'Filter by e-commerce option',
  })
  @ApiQuery({
    name: 'companies',
    required: false,
    type: String,
    description: 'Filter by company names (comma-separated, e.g., "InfinitePay,PagSeguro")',
  })
  @ApiQuery({
    name: 'sem_mensalidade',
    required: false,
    type: Boolean,
    description: 'Filter by zero monthly fee',
  })
  @ApiResponse({
    status: 200,
    description: 'Ranking retrieved successfully',
    type: CardMachineRankingResponseDto,
  })
  async getRanking(
    @Query(new ValidationPipe({ transform: true }))
    query: CardMachineRankingQueryDto,
  ): Promise<CardMachineRankingResponseDto> {
    try {
      this.logger.log('Received request for card machine ranking');
      this.logger.debug(`Query parameters: ${JSON.stringify(query)}`);

      const result = await this.rankingService.getRanking(query);

      this.logger.log(
        `Ranking returned successfully with ${result.total} machines`,
      );

      return result;
    } catch (error) {
      this.logger.error('Error getting card machine ranking', error.stack);
      throw error;
    }
  }

  @Get('criteria')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get ranking criteria details',
    description: `
      Returns details about the criteria used for ranking calculation.

      ## Information Returned

      For each criterion:
      - **Key**: Unique identifier
      - **Name**: Display name (in Portuguese)
      - **Weight**: Importance in calculation (higher = more important)
      - **Type**: Data type (boolean, numeric, scale)
      - **Description**: What this criterion measures

      ## Use Case

      Use this endpoint to:
      - Explain to users how ranking is calculated
      - Show transparency in methodology
      - Display criteria weights in UI

      ## Note

      Criteria weights are static and defined in code.
      They may be updated when ranking methodology changes.
    `,
  })
  @ApiResponse({
    status: 200,
    description: 'Criteria retrieved successfully',
    type: [RankingCriterionDto],
  })
  async getCriteria(): Promise<RankingCriterionDto[]> {
    try {
      this.logger.log('Received request for ranking criteria');

      const result = await this.rankingService.getCriteria();

      this.logger.log(`Returned ${result.length} criteria`);

      return result;
    } catch (error) {
      this.logger.error('Error getting ranking criteria', error.stack);
      throw error;
    }
  }
}
