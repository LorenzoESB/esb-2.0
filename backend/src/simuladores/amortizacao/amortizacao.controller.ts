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
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AmortizacaoService } from './amortizacao.service';
import { AmortizacaoInputDto } from './dto/amortizacao-input.dto';
import { AmortizacaoSimplesOutputDto, SimulacaoComparativaDto } from './dto/amortizacao-output.dto';

@ApiTags('Amortization')
@Controller('simuladores/amortizacao')
export class AmortizacaoController {
  private readonly logger = new Logger(AmortizacaoController.name);

  constructor(private readonly amortizacaoService: AmortizacaoService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiOperation({
    summary: 'Calculate simplified amortization',
    description:
      'Returns a compact amortization result (novaPrestacao, prazoRestante, saldoDevedor)',
  })
  @ApiBody({ type: AmortizacaoInputDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Simplified amortization calculated successfully',
    type: AmortizacaoSimplesOutputDto,
  })
  async calcularAmortizacao(
    @Body() input: AmortizacaoInputDto,
  ): Promise<AmortizacaoSimplesOutputDto> {
    try {
      this.logger.log('Received simplified amortization request');
      return await this.amortizacaoService.calcularAmortizacaoSimples(input);
    } catch (error) {
      this.logger.error(
        'Error calculating simplified amortization',
        error.stack,
      );
      throw error;
    }
  }

  @Post('comparar')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiOperation({
    summary: 'Compare simplified amortization scenarios',
    description:
      'Returns two simplified amortization scenarios (por prazo e por prestação) and a small comparative analysis',
  })
  @ApiBody({ type: AmortizacaoInputDto })
  @ApiResponse({ status: HttpStatus.OK, description: 'Comparison result', type: SimulacaoComparativaDto })
  async compararSistemas(@Body() input: AmortizacaoInputDto): Promise<SimulacaoComparativaDto> {
    try {
      this.logger.log('Received simplified amortization comparison request');
      return await this.amortizacaoService.compararSistemas(input);
    } catch (error) {
      this.logger.error('Error comparing simplified amortization', error.stack);
      throw error;
    }
  }
}
