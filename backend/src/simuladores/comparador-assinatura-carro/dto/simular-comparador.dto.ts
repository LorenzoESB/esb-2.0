import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsEmail,
  Min,
  Max,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';

/**
 * DTO para simulação de comparação entre compra, financiamento e assinatura de veículos
 *
 * Compara três cenários ao longo de um período definido:
 * 1. Compra à vista
 * 2. Financiamento
 * 3. Assinatura de veículo
 */
export class SimularComparadorDto {
  @ApiProperty({
    description: 'Valor do veículo',
    example: 80000,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  valorVeiculo: number;

  @ApiProperty({
    description: 'Valor da entrada para financiamento',
    example: 20000,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  entradaFinanciamento: number;

  @ApiProperty({
    description: 'Prazo do financiamento em meses',
    example: 48,
    minimum: 6,
    maximum: 60,
  })
  @IsNumber()
  @Min(6)
  @Max(60)
  @Type(() => Number)
  prazoFinanciamentoMeses: number;

  @ApiProperty({
    description: 'Valor da assinatura mensal',
    example: 2500,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  valorAssinaturaMensal: number;

  @ApiProperty({
    description: 'Prazo da assinatura em meses',
    example: 36,
    minimum: 12,
    maximum: 60,
  })
  @IsNumber()
  @Min(12)
  @Max(60)
  @Type(() => Number)
  prazoAssinaturaMeses: number;

  @ApiProperty({
    description: 'Tempo de uso do carro em meses (período de comparação)',
    example: 36,
    minimum: 12,
    maximum: 60,
  })
  @IsNumber()
  @Min(12)
  @Max(60)
  @Type(() => Number)
  tempoUsoCarroMeses: number;

  @ApiProperty({
    description: 'Nome do solicitante',
    example: 'Carlos Silva',
  })
  @IsString()
  nome: string;

  @ApiProperty({
    description: 'Email do solicitante',
    example: 'carlos@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Opt-in to receive simulation results via email',
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  email_opt_in_simulation: boolean;
}
