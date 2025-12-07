import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsBoolean, IsArray, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';

/**
 * Query parameters for filtering card machine ranking
 *
 * All filters are optional - if none provided, returns full ranking
 */
export class CardMachineRankingQueryDto {
  @ApiPropertyOptional({
    description: 'Filter by NFC support',
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
  nfc?: boolean;

  @ApiPropertyOptional({
    description: 'Filter by receipt printer',
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
  imprime_recibo?: boolean;

  @ApiPropertyOptional({
    description: 'Filter by smartphone requirement',
    example: false,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  precisa_smartphone?: boolean;

  @ApiPropertyOptional({
    description: 'Filter by receivables anticipation',
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
  permite_antecipacao?: boolean;

  @ApiPropertyOptional({
    description: 'Filter by meal voucher acceptance',
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
  vale_refeicao?: boolean;

  @ApiPropertyOptional({
    description: 'Filter by e-commerce option',
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
  ecommerce?: boolean;

  @ApiPropertyOptional({
    description: 'Filter by company names (comma-separated)',
    example: 'InfinitePay,PagSeguro',
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
    description: 'Filter by zero monthly fee',
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
  sem_mensalidade?: boolean;
}
