import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { AposentadoriaService } from './aposentadoria.service';
import { SimularAposentadoriaDto } from './dto/simular-aposentadoria.dto';
import { ResultadoAposentadoriaDto } from './dto/resultado-aposentadoria.dto';

@ApiTags('Aposentadoria')
@Controller('simuladores/aposentadoria')
export class AposentadoriaController {
  constructor(private readonly aposentadoriaService: AposentadoriaService) {}

  @Post('simular')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Simular planejamento de aposentadoria privada',
    description: `
      Calcula um planejamento completo de aposentadoria privada com dois modos:
      
      **Modo RECEBER**: Você informa quanto deseja receber mensalmente na aposentadoria,
      e o simulador calcula quanto você precisa contribuir mensalmente.
      
      **Modo CONTRIBUIR**: Você informa quanto pretende contribuir mensalmente,
      e o simulador calcula quanto você receberá na aposentadoria.
      
      O cálculo considera:
      - Taxa de juros real de 0,5% ao mês (padrão)
      - Expectativa de vida de 86 anos (padrão)
      - Valor já acumulado em previdência (se houver)
      - Análise de sustentabilidade do patrimônio
      
      **Premissas:**
      - Contribuições mensais constantes
      - Taxa de juros constante
      - Saques mensais constantes na aposentadoria
    `,
  })
  @ApiResponse({
    status: 200,
    description: 'Simulação calculada com sucesso',
    type: ResultadoAposentadoriaDto,
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
          example: 'Idade de aposentadoria deve ser maior que idade atual',
        },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  simular(
    @Body() dto: SimularAposentadoriaDto,
  ): ResultadoAposentadoriaDto {
    return this.aposentadoriaService.simular(dto);
  }
}
