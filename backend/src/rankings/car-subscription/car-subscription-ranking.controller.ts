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
import { CarSubscriptionRankingService } from './car-subscription-ranking.service';
import {
  CarSubscriptionCriterionDto,
  CarSubscriptionRankingResponseDto,
} from './dto/ranking-response.dto';
import { CarSubscriptionRankingQueryDto } from './dto/ranking-request.dto';

@ApiTags('Rankings - Carro por assinatura')
@Controller('rankings/assinatura-carro')
export class CarSubscriptionRankingController {
  private readonly logger = new Logger(CarSubscriptionRankingController.name);

  constructor(private readonly rankingService: CarSubscriptionRankingService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Ranking de carros por assinatura',
    description: `
      Ranking consolidado de serviços de carro por assinatura, usando notas do legado.

      Critérios (0-5) e pesos:
      - Custo total (2.25)
      - Franquia de km (1.5)
      - Serviços inclusos (1.25)
      - Flexibilidade (1.0)
      - Reputação e rede (1.0)
      - Cobertura do seguro (1.0)
    `,
  })
  @ApiQuery({
    name: 'companies',
    required: false,
    type: String,
    description: 'Filtrar por empresas (separadas por vírgula)',
  })
  @ApiQuery({
    name: 'max_preco_mensal',
    required: false,
    type: Number,
    description: 'Limitar por preço mensal máximo',
  })
  @ApiQuery({
    name: 'exige_seguro_incluso',
    required: false,
    type: Boolean,
    description: 'Trazer apenas opções com seguro incluso',
  })
  @ApiResponse({
    status: 200,
    description: 'Ranking retornado com sucesso',
    type: CarSubscriptionRankingResponseDto,
  })
  async getRanking(
    @Query(new ValidationPipe({ transform: true }))
    query: CarSubscriptionRankingQueryDto,
  ): Promise<CarSubscriptionRankingResponseDto> {
    try {
      this.logger.log('Received request for car subscription ranking');
      this.logger.debug(`Query parameters: ${JSON.stringify(query)}`);

      const result = await this.rankingService.getRanking(query);
      result.items = result.items.map((i) => ({
        ...i,
        logo: i.logo ?? '',
      }));
      result.bestOption = {
        ...result.bestOption,
        logo: result.bestOption?.logo ?? '',
      };
      return result;
    } catch (error) {
      this.logger.error('Error getting car subscription ranking', error.stack);
      throw error;
    }
  }

  @Get('criteria')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Critérios do ranking de carro por assinatura',
    description: 'Lista os critérios e pesos aplicados ao ranking.',
  })
  @ApiResponse({
    status: 200,
    description: 'Critérios retornados',
    type: [CarSubscriptionCriterionDto],
  })
  async getCriteria(): Promise<CarSubscriptionCriterionDto[]> {
    try {
      this.logger.log('Received request for car subscription ranking criteria');
      return await this.rankingService.getCriteria();
    } catch (error) {
      this.logger.error(
        'Error getting car subscription ranking criteria',
        error.stack,
      );
      throw error;
    }
  }
}
