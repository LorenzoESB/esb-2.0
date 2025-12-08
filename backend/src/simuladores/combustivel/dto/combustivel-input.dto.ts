import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  Min,
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

export class CombustivelInputDto {
  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'João da Silva',
  })
  @IsString({ message: 'Nome deve ser uma string' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  nome: string;

  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'joao@exemplo.com',
  })
  @IsEmail({}, { message: 'E-mail inválido' })
  @IsNotEmpty({ message: 'E-mail é obrigatório' })
  email: string;

  @ApiProperty({
    description: 'Price of gasoline per liter',
    example: 5.49,
  })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  precoGasolina: number;
  @ApiProperty({
    description: 'Price of ethanol per liter',
    example: 3.99,
  })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  precoEtanol: number;
  @ApiProperty({
    description: 'Vehicle consumption with gasoline (km/l)',
    example: 12,
  })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  consumoGasolina: number;
  @ApiProperty({
    description: 'Vehicle consumption with ethanol (km/l)',
    example: 8,
  })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  consumoEtanol: number;
}
