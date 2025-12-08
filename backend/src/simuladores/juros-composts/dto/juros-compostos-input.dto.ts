import {
  IsNumber,
  IsEnum,
  IsNotEmpty,
  Min,
  IsOptional,
  IsString,
  IsEmail,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export enum TempoAplicacaoUnidade {
  MESES = 'meses',
  ANOS = 'anos',
}

export class JurosCompostosInputDto {
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
    description: 'Initial investment amount',
    example: 10000,
    minimum: 0,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Type(() => Number)
  valorInicial: number;

  @ApiProperty({
    description: 'Monthly contribution amount',
    example: 500,
    minimum: 0,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Type(() => Number)
  aporteMensal: number;

  @ApiProperty({
    description: 'Investment period',
    example: 3,
    minimum: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Type(() => Number)
  tempoAplicacao: number;

  @ApiProperty({
    description: 'Time unit for investment period',
    enum: TempoAplicacaoUnidade,
    example: TempoAplicacaoUnidade.ANOS,
  })
  @IsEnum(TempoAplicacaoUnidade)
  @IsNotEmpty()
  tempoAplicacaoUnidade: TempoAplicacaoUnidade;

  @ApiProperty({
    description: 'Annual interest rate (percentage)',
    example: 11,
    minimum: 0,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Type(() => Number)
  taxaJuros: number;
}
