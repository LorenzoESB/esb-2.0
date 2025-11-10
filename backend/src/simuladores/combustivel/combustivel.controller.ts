import { Body, Controller, HttpCode, HttpStatus, Logger, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CombustivelService } from './combustivel.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CombustivelInputDto } from './dto/combustivel-input.dto';
import { CombustivelOutputDto } from './dto/combustivel-output.dto';

@ApiTags('Combustível')
@Controller('simuladores/combustivel/comparar')
export class CombustivelController {
  private readonly logger = new Logger(CombustivelController.name);

  constructor(private readonly combustivelService: CombustivelService) { }

  @Post()
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiOperation({
    summary: 'Compare fuel economy between gasoline and ethanol',
    description: 'Returns a summary of the comparison and a message indicating the recommended fuel type',
  })
  @ApiBody({ type: CombustivelInputDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Fuel economy comparison completed successfully',
    type: CombustivelOutputDto,
  })
  async comparaEconomia(@Body() input: CombustivelInputDto): Promise<CombustivelOutputDto> {
    try {
      this.logger.log('Received fuel economy comparison request');
      return await this.combustivelService.comparaCombustivelEtanol(input);

    } catch (error) {
      this.logger.error(
        'Error calculating fuel economy comparison',
        error.stack,
      );
      throw error;
    }
  }

}
