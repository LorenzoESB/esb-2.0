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
import { JurosCompostosService } from './juros-compostos.service';
import { JurosCompostosInputDto } from './dto/juros-compostos-input.dto';
import { JurosCompostosDetalhadoOutputDto } from './dto/juros-compostos-output.dto';

@ApiTags('Compound Interest')
@Controller('simuladores/juros-compostos')
export class JurosCompostosController {
  private readonly logger = new Logger(JurosCompostosController.name);

  constructor(private readonly jurosCompostosService: JurosCompostosService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiOperation({
    summary: 'Calculate compound interest',
    description:
      'Calculates compound interest based on initial value, monthly contributions, time period, and interest rate',
  })
  @ApiBody({ type: JurosCompostosInputDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Compound interest calculated successfully',
    type: JurosCompostosDetalhadoOutputDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  async calculaJurosCompostos(
    @Body() input: JurosCompostosInputDto,
  ): Promise<{ message: string; data: JurosCompostosDetalhadoOutputDto }> {
    try {
      this.logger.log('Received compound interest calculation request');

      const data =
        await this.jurosCompostosService.calculaJurosCompostos(input);

      return {
        message: 'Compound interest calculation received',
        data,
      };
    } catch (error) {
      this.logger.error('Error calculating compound interest', error.stack);
      throw error;
    }
  }
}
