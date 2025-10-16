import {
  IsNumber,
  IsEnum,
  IsNotEmpty,
  Min,
  Max,
  IsOptional,
  IsDateString,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  SistemaAmortizacao,
  TipoAmortizacaoExtraordinaria,
} from '../enums/sistema-amortizacao.enum';

export class AmortizacaoExtraordinariaDto {
  @ApiProperty({
    description: 'Extraordinary amortization amount',
    example: 10000,
  })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  valor: number;

  @ApiProperty({
    description: 'Month when the extraordinary amortization occurs',
    example: 12,
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  mesOcorrencia: number;

  @ApiProperty({
    description: 'Type of extraordinary amortization effect',
    enum: TipoAmortizacaoExtraordinaria,
    example: TipoAmortizacaoExtraordinaria.DIMINUIR_PRAZO,
  })
  @IsEnum(TipoAmortizacaoExtraordinaria)
  tipo: TipoAmortizacaoExtraordinaria;
}

export class AmortizacaoInputDto {
  @ApiProperty({
    description: 'Loan principal amount',
    example: 170000,
    minimum: 1000,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(1000)
  @Type(() => Number)
  valorFinanciamento: number;

  @ApiProperty({
    description: 'Annual interest rate (percentage)',
    example: 8.5,
    minimum: 0,
    maximum: 100,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(100)
  @Type(() => Number)
  taxaJurosAnual: number;

  @ApiProperty({
    description: 'Loan term in months',
    example: 360,
    minimum: 1,
    maximum: 600,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(600)
  @Type(() => Number)
  prazoMeses: number;

  @ApiProperty({
    description: 'Amortization system',
    enum: SistemaAmortizacao,
    example: SistemaAmortizacao.SAC,
  })
  @IsEnum(SistemaAmortizacao)
  @IsNotEmpty()
  sistemaAmortizacao: SistemaAmortizacao;

  @ApiPropertyOptional({
    description: 'Monthly insurance amount',
    example: 50,
    default: 0,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  seguroMensal?: number = 0;

  @ApiPropertyOptional({
    description: 'Monthly administrative fee',
    example: 25,
    default: 0,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  taxaAdministracao?: number = 0;

  @ApiPropertyOptional({
    description: 'First payment date',
    example: '2024-01-01',
  })
  @IsDateString()
  @IsOptional()
  dataPrimeiraParcela?: string;

  @ApiPropertyOptional({
    description: 'Current installment number (for recalculation)',
    example: 12,
    minimum: 0,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  parcelaAtual?: number;

  @ApiPropertyOptional({
    description: 'Current outstanding balance (for recalculation)',
    example: 150000,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  saldoDevedorAtual?: number;

  @ApiPropertyOptional({
    description: 'List of extraordinary amortizations',
    type: [AmortizacaoExtraordinariaDto],
  })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AmortizacaoExtraordinariaDto)
  amortizacoesExtraordinarias?: AmortizacaoExtraordinariaDto[];

  @ApiPropertyOptional({
    description: 'User email (optional)',
    example: 'user@example.com',
  })
  @IsOptional()
  email?: string;
}
