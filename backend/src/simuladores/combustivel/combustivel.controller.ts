import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { CombustivelService } from './combustivel.service';
import { CombustivelInputDto } from './dto/combustivel-input.dto';
import { CombustivelOutputDto } from './dto/combustivel-output.dto';


@ApiTags('Simuladores')
@Controller('simuladores/combustivel')
export class CombustivelController {
  constructor(private readonly combustivelService: CombustivelService) { }


  @Post()
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiOperation({
    summary: 'Calcula qual combustível vale mais a pena',
    description:
      'Compara o custo por quilômetro de gasolina e etanol, ' +
      'considerando os preços atuais e o consumo real do veículo. ' +
      'Retorna qual combustível é mais vantajoso, os custos detalhados ' +
      'e a economia estimada.',
  })
  @ApiBody({
    type: CombustivelInputDto,
    description: 'Dados de entrada: preços e consumos',
    examples: {
      exemplo1: {
        summary: 'Exemplo 1: Etanol mais vantajoso',
        description:
          'Caso onde o etanol é mais econômico devido ao menor custo por km',
        value: {
          precoGasolina: 5.74,
          precoEtanol: 4.84,
          consumoGasolina: 10,
          consumoEtanol: 9,
        },
      },
      exemplo2: {
        summary: 'Exemplo 2: Gasolina mais vantajosa',
        description:
          'Caso onde a gasolina é mais econômica apesar do preço maior',
        value: {
          precoGasolina: 6.0,
          precoEtanol: 5.5,
          consumoGasolina: 12,
          consumoEtanol: 8,
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Cálculo realizado com sucesso',
    type: CombustivelOutputDto,
    content: {
      'application/json': {
        example: {
          recomendacao: 'Etanol',
          custos: {
            gasolina: {
              custoPorKm: 0.57,
              custoFormatado: 'R$ 0,57',
            },
            etanol: {
              custoPorKm: 0.54,
              custoFormatado: 'R$ 0,54',
            },
          },
          economia: {
            valor: 0.03,
            valorFormatado: 'R$ 0,03',
            percentual: 5.26,
          },
          mensagem:
            'Levando em conta a gasolina a R$ 5,74, o etanol a R$ 4,84 e o consumo do seu veículo. O combustível que mais vale a pena para abastecer o seu carro é: Etanol',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Dados de entrada inválidos',
    content: {
      'application/json': {
        example: {
          statusCode: 400,
          message: [
            'Preço da gasolina deve ser positivo',
            'Consumo de etanol é obrigatório',
          ],
          error: 'Bad Request',
        },
      },
    },
  })
  calcular(@Body() input: CombustivelInputDto): CombustivelOutputDto {
    return this.combustivelService.calcular(input);
  }
}