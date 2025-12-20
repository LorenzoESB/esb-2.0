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
import { DigitalAccountsRankingService } from './digital-accounts-ranking.service';
import {
  DigitalAccountCriterionDto,
  DigitalAccountsRankingResponseDto,
} from './dto/ranking-response.dto';
import { DigitalAccountsRankingQueryDto } from './dto/ranking-request.dto';

@ApiTags('Rankings - Digital Accounts')
@Controller('rankings/contas-digitais')
export class DigitalAccountsRankingController {
  private readonly logger = new Logger(DigitalAccountsRankingController.name);

  constructor(
    private readonly rankingService: DigitalAccountsRankingService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Ranking de contas digitais (PF/PJ)',
    description: `
      Retorna o ranking consolidado de contas digitais com base em notas do legado.

      Critérios ponderados (0-5):
      - Tarifas e mensalidade (peso 2.5)
      - Experiência digital (peso 1.5)
      - Serviços essenciais (peso 1.25)
      - Cartão de crédito (peso 1.0)
      - Investimentos e rendimento (peso 0.75)
      - Suporte e reputação (peso 1.0)

      As notas foram importadas do antigo módulo "RankingConta" e revisadas em 12/2024.
      Não há dependência de base externa: todos os dados estão embutidos no código.
    `,
  })
  @ApiQuery({
    name: 'companies',
    required: false,
    type: String,
    description:
      'Filtrar por instituições (separadas por vírgula, ex.: "Banco Inter,Nubank")',
  })
  @ApiQuery({
    name: 'tipo_conta',
    required: false,
    enum: ['pf', 'pj', 'ambos'],
    description: 'Filtrar por tipo de conta atendida',
  })
  @ApiQuery({
    name: 'max_mensalidade',
    required: false,
    type: Number,
    description: 'Limitar por valor máximo de mensalidade',
  })
  @ApiQuery({
    name: 'exige_cartao_credito',
    required: false,
    type: Boolean,
    description: 'Filtrar apenas contas com cartão de crédito disponível',
  })
  @ApiQuery({
    name: 'exige_investimentos',
    required: false,
    type: Boolean,
    description: 'Filtrar apenas contas com módulo de investimentos',
  })
  @ApiResponse({
    status: 200,
    description: 'Ranking retornado com sucesso',
    type: DigitalAccountsRankingResponseDto,
  })
  async getRanking(
    @Query(new ValidationPipe({ transform: true }))
    query: DigitalAccountsRankingQueryDto,
  ): Promise<DigitalAccountsRankingResponseDto> {
    try {
      this.logger.log('Received request for digital accounts ranking');
      this.logger.debug(`Query parameters: ${JSON.stringify(query)}`);

      return await this.rankingService.getRanking(query);
    } catch (error) {
      this.logger.error('Error getting digital accounts ranking', error.stack);
      throw error;
    }
  }

  @Get('criteria')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Critérios do ranking de contas digitais',
    description:
      'Lista os critérios e pesos utilizados para calcular as notas.',
  })
  @ApiResponse({
    status: 200,
    description: 'Critérios retornados com sucesso',
    type: [DigitalAccountCriterionDto],
  })
  async getCriteria(): Promise<DigitalAccountCriterionDto[]> {
    try {
      this.logger.log('Received request for digital account ranking criteria');
      return await this.rankingService.getCriteria();
    } catch (error) {
      this.logger.error(
        'Error getting digital account ranking criteria',
        error.stack,
      );
      throw error;
    }
  }
}
