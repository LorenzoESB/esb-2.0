import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsBoolean, IsEnum, IsNumber, IsOptional } from 'class-validator';

export class DigitalAccountsRankingQueryDto {
  @ApiPropertyOptional({
    type: String,
    description: 'Filtrar por nomes de banco/fintech (separados por vírgula)',
    example: 'Banco Inter,Nubank',
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
    description: 'Filtrar por tipo de conta',
    enum: ['pf', 'pj', 'ambos'],
    example: 'pf',
  })
  @IsEnum(['pf', 'pj', 'ambos'])
  @IsOptional()
  tipo_conta?: 'pf' | 'pj' | 'ambos';

  @ApiPropertyOptional({
    description: 'Limite máximo de mensalidade (R$)',
    example: 10,
  })
  @Transform(({ value }) => (value !== undefined ? Number(value) : undefined))
  @IsNumber()
  @IsOptional()
  max_mensalidade?: number;

  @ApiPropertyOptional({
    description: 'Exibir apenas contas com cartão de crédito disponível',
    example: true,
  })
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  @IsOptional()
  exige_cartao_credito?: boolean;

  @ApiPropertyOptional({
    description: 'Exibir apenas contas com investimentos integrados',
    example: true,
  })
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  @IsOptional()
  exige_investimentos?: boolean;
}
