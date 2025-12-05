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
import { ComparadorMaquininhaService } from './comparador-maquininha.service';
import { CompararMaquininhaDto } from './dto/comparar-maquininha.dto';
import { ResultadoComparacaoDto } from './dto/resultado-comparacao.dto';

@ApiTags('Comparador Maquininha')
@Controller('simuladores/comparador-maquininha')
export class ComparadorMaquininhaController {
  private readonly logger = new Logger(ComparadorMaquininhaController.name);

  constructor(
    private readonly comparadorMaquininhaService: ComparadorMaquininhaService,
  ) {}

  @Post('comparar')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiOperation({
    summary: 'Comparar maquininhas de cartão lado a lado',
    description: `
      Compara características e especificações de múltiplas maquininhas de cartão.

      **Diferença do Simulador de Taxas:**
      - **Taxa Maquininha**: Calcula custo mensal baseado em vendas informadas
      - **Comparador**: Compara features e especificações técnicas lado a lado

      ## O que é comparado

      ### Características Físicas
      - Aceita chip, tarja magnética, NFC
      - Com ou sem fio
      - Imprime recibo
      - Precisa de smartphone

      ### Funcionalidades
      - Permite antecipação de recebíveis
      - Atende PF/PJ
      - Aceita vale refeição
      - Possui opção e-commerce

      ### Custos Básicos
      - Preço da maquininha
      - Preço promocional (se houver)
      - Mensalidade

      ### Especificações Técnicas
      - Máximo de parcelas
      - Garantia
      - Tipos de conexão (Wi-Fi, 4G, Bluetooth)
      - Bandeiras aceitas
      - Formas de recebimento

      ### Planos Disponíveis
      Para cada plano:
      - Nome do plano
      - Taxa de débito
      - Taxa de crédito à vista
      - Taxa mínima de crédito parcelado
      - Dias de repasse
      - Avaliação do plano

      ## Uso Recomendado

      Use este endpoint quando:
      - Cliente quer comparar especificações técnicas
      - Não tem perfil de vendas definido ainda
      - Quer entender diferenças entre maquininhas
      - Está na fase inicial de pesquisa

      Para calcular custos mensais baseados em vendas, use:
      \`POST /simuladores/taxa-maquininha/simular\`

      ## Limite de Comparação

      Mínimo: 2 maquininhas
      Recomendado: 2-5 maquininhas (para melhor visualização)
    `,
  })
  @ApiResponse({
    status: 200,
    description: 'Comparação realizada com sucesso',
    type: ResultadoComparacaoDto,
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
          example: [
            'É necessário selecionar pelo menos 2 maquininhas para comparar',
          ],
        },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  async comparar(
    @Body() dto: CompararMaquininhaDto,
  ): Promise<ResultadoComparacaoDto> {
    try {
      this.logger.log(
        `Received comparison request for ${dto.maquininhas_ids.length} card machines from ${dto.email}`,
      );
      this.logger.debug(`Input: ${JSON.stringify(dto)}`);

      const result = await this.comparadorMaquininhaService.comparar(dto);

      this.logger.log(
        `Comparison completed successfully. Total machines compared: ${result.total}`,
      );

      return result;
    } catch (error) {
      this.logger.error(
        'Error in card machine comparison',
        error.stack,
      );
      throw error;
    }
  }
}
