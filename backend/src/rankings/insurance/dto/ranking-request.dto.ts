import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsBoolean,
  IsArray,
  IsString,
  IsNumber,
} from 'class-validator';
import { Transform } from 'class-transformer';

/**
 * Query parameters for filtering insurance ranking
 *
 * All filters are optional - if none provided, returns full ranking
 */
export class InsuranceRankingQueryDto {
  @ApiPropertyOptional({
    description: 'Filter by companies (comma-separated)',
    example: 'Azul Seguros,Porto Seguro',
    type: String,
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split(',').map((s) => s.trim());
    }
    return value;
  })
  @IsArray()
  @IsString({ each: true })
  companies?: string[];

  @ApiPropertyOptional({
    description: 'Filter by full coverage availability',
    example: true,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  cobertura_total?: boolean;

  @ApiPropertyOptional({
    description: 'Filter by 24h assistance availability',
    example: true,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  assistencia_24h?: boolean;

  @ApiPropertyOptional({
    description: 'Filter by availability of rental car coverage',
    example: true,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  carro_reserva?: boolean;

  @ApiPropertyOptional({
    description: 'Maximum estimated monthly price',
    example: 450,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => {
    const parsed = parseFloat(value);
    return Number.isNaN(parsed) ? value : parsed;
  })
  max_preco_mensal?: number;
}
