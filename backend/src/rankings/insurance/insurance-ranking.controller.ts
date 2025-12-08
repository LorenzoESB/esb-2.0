import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InsuranceRankingService } from './insurance-ranking.service';
import {
  InsuranceRankingResponseDto,
  InsuranceRankingCriterionDto,
} from './dto/ranking-response.dto';
import { InsuranceRankingQueryDto } from './dto/ranking-request.dto';

@ApiTags('Rankings - Insurance')
@Controller('rankings/insurance')
export class InsuranceRankingController {
  private readonly logger = new Logger(InsuranceRankingController.name);

  constructor(private readonly rankingService: InsuranceRankingService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get insurance ranking',
    description: `
      Returns ranked list of insurance options based on weighted criteria.

      Ranking is calculated with 11 weighted criteria:
      - Preço Competitivo (peso 2.5)
      - Cobertura Completa (peso 2.5)
      - Processo de Sinistro (peso 2.0)
      - Atendimento ao Cliente (peso 1.5)
      - Solidez Financeira (peso 1.5)
      - Rede de Oficinas (peso 1.0)
      - Serviços Digitais (peso 1.0)
      - Benefícios Adicionais (peso 1.0)
      - Transparência (peso 1.5)
      - Taxa de Aprovação de Sinistros (peso 2.0)
      - Reputação (peso 1.5)

      The response includes a score breakdown per critério.
    `,
  })
  @ApiQuery({
    name: 'companies',
    required: false,
    type: String,
    description: 'Filter by company names (comma-separated)',
  })
  @ApiQuery({
    name: 'cobertura_total',
    required: false,
    type: Boolean,
    description: 'Filter by full coverage availability',
  })
  @ApiQuery({
    name: 'assistencia_24h',
    required: false,
    type: Boolean,
    description: 'Filter by 24h assistance',
  })
  @ApiQuery({
    name: 'carro_reserva',
    required: false,
    type: Boolean,
    description: 'Filter by rental car availability',
  })
  @ApiQuery({
    name: 'max_preco_mensal',
    required: false,
    type: Number,
    description: 'Filter by maximum estimated monthly price',
  })
  @ApiResponse({
    status: 200,
    description: 'Ranking retrieved successfully',
    type: InsuranceRankingResponseDto,
  })
  async getRanking(
    @Query(new ValidationPipe({ transform: true }))
    query: InsuranceRankingQueryDto,
  ): Promise<InsuranceRankingResponseDto> {
    try {
      this.logger.log('Received request for insurance ranking');
      this.logger.debug(`Query parameters: ${JSON.stringify(query)}`);

      const result = await this.rankingService.getRanking(query);

      this.logger.log(
        `Insurance ranking returned successfully with ${result.total} items`,
      );

      return result;
    } catch (error) {
      this.logger.error('Error getting insurance ranking', error.stack);
      throw error;
    }
  }

  @Get('criteria')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get insurance ranking criteria',
    description:
      'Returns criteria details used for insurance ranking calculation.',
  })
  @ApiResponse({
    status: 200,
    description: 'Criteria retrieved successfully',
    type: [InsuranceRankingCriterionDto],
  })
  async getCriteria(): Promise<InsuranceRankingCriterionDto[]> {
    try {
      this.logger.log('Received request for insurance ranking criteria');

      const result = await this.rankingService.getCriteria();

      this.logger.log(`Returned ${result.length} criteria`);

      return result;
    } catch (error) {
      this.logger.error(
        'Error getting insurance ranking criteria',
        error.stack,
      );
      throw error;
    }
  }
}
