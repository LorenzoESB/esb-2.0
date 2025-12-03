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
import { EmprestimoService } from './emprestimo.service';
import { SimularEmprestimoDto } from './dto/simular-emprestimo.dto';
import { ResultadoEmprestimoDto } from './dto/resultado-emprestimo.dto';

@ApiTags('Empréstimo Pessoal')
@Controller('simuladores/emprestimo')
export class EmprestimoController {
  private readonly logger = new Logger(EmprestimoController.name);

  constructor(private readonly emprestimoService: EmprestimoService) {}

  @Post('simular')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiOperation({
    summary: 'Simular empréstimo pessoal',
    description: `
      Simula ofertas de empréstimo pessoal comparando taxas de diferentes instituições financeiras.

      **Tipos de Pessoa:**
      - **PF (Pessoa Física)**: Empréstimos para pessoas físicas
        - Requer especificação do tipo de emprego
      - **PJ (Pessoa Jurídica)**: Empréstimos empresariais
        - Capital de giro, antecipação de recebíveis

      **Tipos de Emprego (apenas para PF):**
      - **aposentado**: Acesso a crédito consignado INSS e crédito pessoal não consignado
      - **clt**: Acesso a crédito consignado privado e crédito pessoal não consignado
      - **servidor_publico**: Acesso a crédito consignado público e crédito pessoal não consignado

      **Modalidades de Crédito PF:**
      - **Crédito Consignado INSS**: Taxas de 1,8% a 2,0% a.m. (aposentados e pensionistas)
      - **Crédito Consignado Privado**: Taxas de 2,1% a 2,3% a.m. (CLT em empresas privadas)
      - **Crédito Consignado Público**: Taxas de 2,0% a 2,2% a.m. (servidores públicos)
      - **Crédito Pessoal Não Consignado**: Taxas de 3,9% a 4,6% a.m. (todos os perfis)

      **Modalidades de Crédito PJ:**
      - **Capital de Giro**: Taxas de 2,7% a 3,2% a.m.
      - **Antecipação de Recebíveis**: Taxas de 2,6% a 2,9% a.m.

      **Sistema de Amortização:**
      - Utiliza sistema PRICE (parcelas fixas)
      - Considera juros compostos mensalmente

      **Cálculos Realizados:**
      - Parcela mensal fixa (sistema PRICE)
      - Total pago ao final do empréstimo
      - Total de juros pagos
      - Taxa de juros anual equivalente
      - Taxa efetiva anual (considerando capitalização)
      - Comprometimento de renda (se informada)

      **Ordenação:**
      - Ofertas ordenadas por taxa mensal (menor para maior)
      - Melhor oferta (menor taxa) destacada no resultado

      **Premissas:**
      - Taxas baseadas em médias de mercado
      - Não considera tarifas administrativas
      - Cálculos usando precisão de 15 dígitos decimais
    `,
  })
  @ApiResponse({
    status: 200,
    description: 'Simulação calculada com sucesso',
    type: ResultadoEmprestimoDto,
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
            'tipoPessoa must be one of the following values: PF, PJ',
            'valorDesejado must not be less than 0',
            'prazoMeses must not be less than 1',
          ],
        },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  async simular(
    @Body() dto: SimularEmprestimoDto,
  ): Promise<ResultadoEmprestimoDto> {
    try {
      this.logger.log(
        `Received personal loan simulation request for ${dto.tipoPessoa}`,
      );
      this.logger.debug(`Input: ${JSON.stringify(dto)}`);

      const result = await this.emprestimoService.simular(dto);

      this.logger.log(
        `Personal loan simulation completed successfully. Total offers: ${result.totalOfertas}, Best rate: ${result.melhorOferta.taxaMensal}%`,
      );

      return result;
    } catch (error) {
      this.logger.error(
        'Error calculating personal loan simulation',
        error.stack,
      );
      throw error;
    }
  }
}
