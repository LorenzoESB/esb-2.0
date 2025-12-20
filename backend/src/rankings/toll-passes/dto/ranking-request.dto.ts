import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class TollPassRankingQueryDto {
  @ApiPropertyOptional({
    type: String,
    description: 'Filtrar por empresas (separadas por vírgula)',
    example: 'C6 Bank,Sem Parar',
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
    description: 'Limite máximo de mensalidade (R$)',
    example: 15,
  })
  @Transform(({ value }) => (value !== undefined ? Number(value) : undefined))
  @IsNumber()
  @IsOptional()
  max_mensalidade?: number;

  @ApiPropertyOptional({
    description: 'Filtrar apenas opções com estacionamento incluído',
    example: true,
  })
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  @IsOptional()
  exige_estacionamento?: boolean;
}
