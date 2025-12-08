import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNumber, IsEmail, Min, Max } from 'class-validator';

/**
 * DTO para simulação de financiamento imobiliário
 *
 * Entrada de dados para calcular ofertas de financiamento usando sistema SAC
 * com taxas indexadas à TR (Taxa Referencial)
 */
export class SimularFinanciamentoImovelDto {
  @ApiProperty({
    description: 'Valor total do imóvel',
    example: 500000,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  valorImovel: number;

  @ApiProperty({
    description: 'Valor da entrada',
    example: 100000,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  valorEntrada: number;

  @ApiProperty({
    description: 'Prazo do financiamento em meses',
    example: 360,
    minimum: 1,
    maximum: 420,
  })
  @IsNumber()
  @Min(1)
  @Max(420) // Máximo 35 anos (420 meses)
  @Type(() => Number)
  prazoMeses: number;

  @ApiProperty({
    description: 'Renda mensal do solicitante',
    example: 10000,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  rendaMensal: number;

  @ApiProperty({
    description: 'Nome do solicitante',
    example: 'Maria Silva',
  })
  @IsString()
  nome: string;

  @ApiProperty({
    description: 'Email do solicitante',
    example: 'maria@example.com',
  })
  @IsEmail()
  email: string;
}
