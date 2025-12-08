import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Logger,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { RendaFixaService } from './renda-fixa.service';
import { SimularRendaFixaDto } from './dto/simular-renda-fixa.dto';
import { ResultadoRendaFixaDto } from './dto/resultado-renda-fixa.dto';

@ApiTags('Renda Fixa')
@Controller('simuladores/renda-fixa')
export class RendaFixaController {
  private readonly logger = new Logger(RendaFixaController.name);

  constructor(private readonly rendaFixaService: RendaFixaService) {}

  @Post('simular')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiOperation({
    summary: 'Simular investimentos em renda fixa',
    description: `
      Compara diferentes modalidades de investimento em renda fixa:

      **Modalidades Comparadas:**
      - **Poupança**: TR + 0,5% ao mês (isenta de IR)
      - **Tesouro Direto (Selic)**: Taxa Selic (com IR regressivo)
      - **LCI**: 90% do CDI (isenta de IR)
      - **CDB**: 110% do CDI (com IR regressivo)

      **Taxas Utilizadas:**
      - Selic: Taxa atual obtida da API do Banco Central
      - CDI: Taxa atual obtida da API do Banco Central
      - TR: Taxa atual obtida da API do Banco Central

      **Imposto de Renda (IR) - Tabela Regressiva:**
      - Até 180 dias: 22,5%
      - 181 a 360 dias: 20%
      - 361 a 720 dias: 17,5%
      - Acima de 720 dias: 15%

      **Cálculo:**
      - Considera investimento inicial
      - Permite aportes mensais opcionais
      - Calcula com juros compostos
      - Aplica IR apenas em investimentos tributáveis
      - Identifica o melhor investimento automaticamente

      **Premissas:**
      - Aportes mensais constantes
      - Taxas de juros constantes durante o período
      - Não considera taxas de administração ou custódia
    `,
  })
  @ApiResponse({
    status: 200,
    description: 'Simulação calculada com sucesso',
    type: ResultadoRendaFixaDto,
  })
  @ApiBadRequestResponse({
    description: 'Dados inválidos fornecidos',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: {
          oneOf: [
            { type: 'string' },
            { type: 'array', items: { type: 'string' } },
          ],
          example: 'Investimento inicial é obrigatório',
        },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  async simular(
    @Body() dto: SimularRendaFixaDto,
  ): Promise<ResultadoRendaFixaDto> {
    try {
      this.logger.log('Received fixed income simulation request');
      this.logger.debug(`Input: ${JSON.stringify(dto)}`);

      const result = await this.rendaFixaService.simular(dto);

      this.logger.log('Fixed income simulation completed successfully');
      this.logger.debug(`Best investment: ${result.melhorInvestimento}`);

      return result;
    } catch (error) {
      this.logger.error(
        'Error calculating fixed income simulation',
        error.stack,
      );
      throw error;
    }
  }
}
