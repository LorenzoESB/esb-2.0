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
import { TollPassesRankingService } from './toll-passes-ranking.service';
import {
  TollPassCriterionDto,
  TollPassRankingResponseDto,
} from './dto/ranking-response.dto';
import { TollPassRankingQueryDto } from './dto/ranking-request.dto';

@ApiTags('Rankings - Pedágio expresso')
@Controller('rankings/pedagios')
export class TollPassesRankingController {
  private readonly logger = new Logger(TollPassesRankingController.name);

  constructor(private readonly rankingService: TollPassesRankingService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Ranking de tags de pedágio expresso',
    description: `
      Retorna o ranking das principais tags/adesivos de pedágio expresso.

      Critérios (0-5) e pesos:
      - Custo mensal (2.0)
      - Cobertura (1.5)
      - Benefícios (1.0)
      - Facilidade de uso (1.0)
      - Transparência (0.5)

      Os dados são auto contidos e foram importados do ranking legado
      (top_pedagio) com revisão em 12/2024.
    `,
  })
  @ApiQuery({
    name: 'companies',
    required: false,
    type: String,
    description: 'Filtrar por empresas (separadas por vírgula)',
  })
  @ApiQuery({
    name: 'max_mensalidade',
    required: false,
    type: Number,
    description: 'Filtrar por mensalidade máxima',
  })
  @ApiQuery({
    name: 'exige_estacionamento',
    required: false,
    type: Boolean,
    description: 'Retornar apenas opções aceitas em estacionamentos parceiros',
  })
  @ApiResponse({
    status: 200,
    description: 'Ranking retornado com sucesso',
    type: TollPassRankingResponseDto,
  })
  async getRanking(
    @Query(new ValidationPipe({ transform: true }))
    query: TollPassRankingQueryDto,
  ): Promise<TollPassRankingResponseDto> {
    try {
      this.logger.log('Received request for toll pass ranking');
      this.logger.debug(`Query parameters: ${JSON.stringify(query)}`);

      return await this.rankingService.getRanking(query);
    } catch (error) {
      this.logger.error('Error getting toll pass ranking', error.stack);
      throw error;
    }
  }

  @Get('criteria')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Critérios do ranking de pedágio expresso',
    description: 'Lista os critérios e pesos utilizados para cálculo.',
  })
  @ApiResponse({
    status: 200,
    description: 'Critérios retornados',
    type: [TollPassCriterionDto],
  })
  async getCriteria(): Promise<TollPassCriterionDto[]> {
    try {
      this.logger.log('Received request for toll pass ranking criteria');
      return await this.rankingService.getCriteria();
    } catch (error) {
      this.logger.error('Error getting toll pass criteria', error.stack);
      throw error;
    }
  }
}
