import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Logger,
  UsePipes,
  ValidationPipe,
  Get,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { AmortizacaoService } from './amortizacao.service';
import { AmortizacaoInputDto } from './dto/amortizacao-input.dto';
import {
  AmortizacaoOutputDto,
  SimulacaoComparativaDto,
} from './dto/amortizacao-output.dto';

@ApiTags('Amortization')
@Controller('simulators/amortizacao')
export class AmortizacaoController {
  private readonly logger = new Logger(AmortizacaoController.name);

  constructor(private readonly amortizacaoService: AmortizacaoService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiOperation({
    summary: 'Calculate loan amortization',
    description:
      'Calculates loan amortization schedule based on selected system (SAC, PRICE, American, Single Payment)',
  })
  @ApiBody({ type: AmortizacaoInputDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Amortization schedule calculated successfully',
    type: AmortizacaoOutputDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  async calcularAmortizacao(
    @Body() input: AmortizacaoInputDto,
  ): Promise<AmortizacaoOutputDto> {
    try {
      this.logger.log('Received amortization calculation request');
      return await this.amortizacaoService.calcularAmortizacao(input);
    } catch (error) {
      this.logger.error('Error calculating amortization', error.stack);
      throw error;
    }
  }

  @Post('comparar')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiOperation({
    summary: 'Compare amortization systems',
    description:
      'Compares different amortization systems (SAC, PRICE, American) for the same loan parameters',
  })
  @ApiBody({ type: AmortizacaoInputDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Comparison completed successfully',
    type: SimulacaoComparativaDto,
  })
  async compararSistemas(
    @Body() input: AmortizacaoInputDto,
  ): Promise<SimulacaoComparativaDto> {
    try {
      this.logger.log('Received amortization systems comparison request');
      return await this.amortizacaoService.compararSistemas(input);
    } catch (error) {
      this.logger.error('Error comparing amortization systems', error.stack);
      throw error;
    }
  }
}
