import {
  IsNumber,
  IsNotEmpty,
  Min,
  Max,
  IsOptional,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class AmortizacaoExtraordinariaDto {
  @ApiProperty({
    description: 'Extraordinary amortization amount',
    example: 22000,
  })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  valor: number;

  @ApiProperty({
    description: 'Month when the extraordinary amortization occurs',
    example: 28,
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  mesOcorrencia: number;
}

export class AmortizacaoInputDto {
  @ApiProperty({
    description: 'Original loan amount',
    example: 128000,
    minimum: 1000,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(1000)
  @Type(() => Number)
  valorFinanciamento: number;

  @ApiProperty({
    description: 'Annual interest rate (percentage)',
    example: 9,
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

  @ApiPropertyOptional({
    description: 'Monthly insurance amount',
    example: 40,
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
    description: 'Current installment number',
    example: 28,
    minimum: 0,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  parcelaAtual?: number;

  @ApiPropertyOptional({
    description: 'Current outstanding balance',
    example: 128000,
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
}
