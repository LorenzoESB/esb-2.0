import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsEmail,
  IsEnum,
  Min,
  Max,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';

/**
 * Tipo de veículo para financiamento
 */
export enum TipoVeiculo {
  NOVO = 'novo',
  USADO = 'usado',
}

/**
 * DTO para simulação de financiamento de veículos
 *
 * Entrada de dados para calcular ofertas de financiamento usando sistema PRICE
 * (Sistema de Amortização Francês - parcelas fixas)
 */
export class SimularFinanciamentoVeiculosDto {
  @ApiProperty({
    description: 'Valor total do veículo',
    example: 80000,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  valorVeiculo: number;

  @ApiProperty({
    description: 'Valor da entrada',
    example: 20000,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  valorEntrada: number;

  @ApiProperty({
    description: 'Prazo do financiamento em meses',
    example: 48,
    minimum: 6,
    maximum: 60,
  })
  @IsNumber()
  @Min(6)
  @Max(60) // Máximo 5 anos (60 meses)
  @Type(() => Number)
  prazoMeses: number;

  @ApiProperty({
    description: 'Renda mensal do solicitante',
    example: 8000,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  rendaMensal: number;

  @ApiProperty({
    description: 'Tipo de veículo (novo ou usado)',
    example: 'novo',
    enum: TipoVeiculo,
  })
  @IsEnum(TipoVeiculo)
  tipoVeiculo: TipoVeiculo;

  @ApiProperty({
    description: 'Nome do solicitante',
    example: 'João Silva',
  })
  @IsString()
  nome: string;

  @ApiProperty({
    description: 'Email do solicitante',
    example: 'joao@example.com',
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

  @ApiProperty({
    description: 'Opt-in to receive marketing content',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  email_opt_in_content?: boolean;
}
