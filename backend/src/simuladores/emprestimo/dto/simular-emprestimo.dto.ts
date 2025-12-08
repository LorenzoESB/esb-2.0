import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsEmail,
  IsEnum,
  IsOptional,
  Min,
  IsBoolean,
} from 'class-validator';

/**
 * Enum para tipo de pessoa
 */
export enum TipoPessoa {
  PF = 'PF', // Pessoa Física
  PJ = 'PJ', // Pessoa Jurídica
}

/**
 * Enum para tipo de emprego (apenas para PF)
 */
export enum TipoEmprego {
  APOSENTADO = 'aposentado',
  CLT = 'clt',
  SERVIDOR_PUBLICO = 'servidor_publico',
}

/**
 * DTO para simulação de empréstimo pessoal
 *
 * Suporta tanto Pessoa Física (PF) quanto Pessoa Jurídica (PJ)
 * Para PF, campos adicionais de tipo de emprego são necessários
 */
export class SimularEmprestimoDto {
  @ApiProperty({
    description: 'Tipo de pessoa: PF (Pessoa Física) ou PJ (Pessoa Jurídica)',
    example: 'PF',
    enum: TipoPessoa,
  })
  @IsEnum(TipoPessoa)
  tipoPessoa: TipoPessoa;

  @ApiProperty({
    description:
      'Tipo de emprego (obrigatório apenas para PF): aposentado, clt, servidor_publico',
    example: 'clt',
    enum: TipoEmprego,
    required: false,
  })
  @IsOptional()
  @IsEnum(TipoEmprego)
  tipoEmprego?: TipoEmprego;

  @ApiProperty({
    description: 'Valor desejado do empréstimo',
    example: 10000,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  valorDesejado: number;

  @ApiProperty({
    description: 'Prazo desejado em meses',
    example: 24,
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  prazoMeses: number;

  @ApiProperty({
    description: 'Renda mensal do solicitante (opcional)',
    example: 5000,
    minimum: 0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  renda?: number;

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
    description: 'Indica se o usuário permite compartilhar seus dados',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  compartilharDados?: boolean;

  @ApiProperty({
    description: 'Origem da simulação (para rastreamento)',
    example: 'web',
    required: false,
  })
  @IsOptional()
  @IsString()
  origem?: string;
}
