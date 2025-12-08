import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class CustoDetalhadoDto {
  @ApiProperty({
    example: 0.57,
    description: 'Custo por quilômetro rodado com o combustível, em reais',
  })
  @IsNumber()
  custoPorKm: number;

  @ApiProperty({
    example: 'R$ 0,57',
    description: 'Custo formatado em reais para exibição',
  })
  @IsString()
  custoFormatado: string;
}

class CustosDto {
  @ApiProperty({
    description: 'Custos relacionados ao uso da gasolina',
    type: () => CustoDetalhadoDto,
  })
  @ValidateNested()
  @Type(() => CustoDetalhadoDto)
  gasolina: CustoDetalhadoDto;

  @ApiProperty({
    description: 'Custos relacionados ao uso do etanol',
    type: () => CustoDetalhadoDto,
  })
  @ValidateNested()
  @Type(() => CustoDetalhadoDto)
  etanol: CustoDetalhadoDto;
}

class EconomiaDto {
  @ApiProperty({
    example: 0.03,
    description:
      'Economia por quilômetro entre o combustível mais caro e o mais barato',
  })
  @IsNumber()
  valor: number;

  @ApiProperty({
    example: 'R$ 0,03',
    description: 'Economia formatada em reais',
  })
  @IsString()
  valorFormatado: string;

  @ApiProperty({
    example: 5.26,
    description: 'Percentual de economia em relação ao combustível mais caro',
  })
  @IsNumber()
  percentual: number;
}

export class CombustivelOutputDto {
  @ApiProperty({
    example: 'Etanol',
    description: 'Combustível mais vantajoso com base nos preços e consumo',
  })
  @IsString()
  recomendacao: string;

  @ApiProperty({
    description: 'Custos por km de cada combustível',
    type: () => CustosDto,
  })
  @ValidateNested()
  @Type(() => CustosDto)
  custos: CustosDto;

  @ApiProperty({
    description: 'Economia estimada ao escolher o combustível mais vantajoso',
    type: () => EconomiaDto,
  })
  @ValidateNested()
  @Type(() => EconomiaDto)
  economia: EconomiaDto;

  @ApiProperty({
    example:
      'Levando em conta a gasolina a R$ 5,74, o etanol a R$ 4,84 e o consumo do seu veículo. O combustível que mais vale a pena é: Etanol',
    description: 'Mensagem explicativa sobre o resultado do cálculo',
  })
  @IsString()
  mensagem: string;
}
