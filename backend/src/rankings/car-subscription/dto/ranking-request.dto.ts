import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class CarSubscriptionRankingQueryDto {
  @ApiPropertyOptional({
    type: String,
    description: 'Filtrar por empresas (separadas por vírgula)',
    example: 'Movida,Unidas',
  })
  @Transform(({ value }) =>
    typeof value === 'string'
      ? value.split(',').map((v: string) => v.trim()).filter(Boolean)
      : value,
  )
  @IsArray()
  @IsOptional()
  companies?: string[];

  @ApiPropertyOptional({
    description: 'Valor máximo mensal (R$)',
    example: 2500,
  })
  @Transform(({ value }) => (value !== undefined ? Number(value) : undefined))
  @IsNumber()
  @IsOptional()
  max_preco_mensal?: number;

  @ApiPropertyOptional({
    description: 'Filtrar apenas opções com seguro incluso',
    example: true,
  })
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  @IsOptional()
  exige_seguro_incluso?: boolean;
}
