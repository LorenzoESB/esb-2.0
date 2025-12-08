import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsEmail,
  IsOptional,
  Min,
  Max,
  IsBoolean,
  IsInt,
} from 'class-validator';

/**
 * DTO para simulação de taxa de maquininha
 * Migrated from Django models.Simulacao
 */
export class SimularTaxaMaquininhaDto {
  // ========== VALORES DE VENDA ==========

  @ApiProperty({
    description: 'Valor vendido no débito por mês',
    example: 5000,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  venda_debito: number;

  @ApiProperty({
    description: 'Valor vendido no crédito à vista por mês',
    example: 3000,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  venda_credito_vista: number;

  @ApiProperty({
    description: 'Valor vendido no crédito parcelado por mês',
    example: 2000,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  venda_credito_parcelado: number;

  @ApiProperty({
    description: 'Número de parcelas do crédito parcelado (2-12)',
    example: 6,
    minimum: 2,
    maximum: 12,
  })
  @IsInt()
  @Min(2)
  @Max(12)
  @Type(() => Number)
  numero_parcelas: number;

  // ========== FILTROS ==========

  @ApiProperty({
    description: 'Filtrar apenas maquininhas sem mensalidade',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  sem_mensalidade?: boolean;

  @ApiProperty({
    description:
      'Filtrar apenas maquininhas que aceitam cartão de tarja magnética',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  aceita_cartao_tarja?: boolean;

  @ApiProperty({
    description: 'Filtrar apenas maquininhas sem fio (wireless)',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  sem_fio?: boolean;

  @ApiProperty({
    description: 'Filtrar apenas maquininhas que atendem Pessoa Física',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  pf?: boolean;

  @ApiProperty({
    description: 'Filtrar apenas maquininhas que atendem Pessoa Jurídica',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  pj?: boolean;

  @ApiProperty({
    description: 'Filtrar apenas maquininhas que imprimem recibo',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  imprime_recibo?: boolean;

  @ApiProperty({
    description: 'Filtrar apenas maquininhas com conexão Wi-Fi',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  wifi?: boolean;

  @ApiProperty({
    description:
      'Filtrar apenas maquininhas que permitem antecipação de recebíveis',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  quer_antecipar?: boolean;

  @ApiProperty({
    description: 'Filtrar apenas maquininhas que não exigem smartphone',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  n_exige_smartphone?: boolean;

  @ApiProperty({
    description: 'Filtrar apenas maquininhas que aceitam vale refeição',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  aceita_vale_refeicao?: boolean;

  @ApiProperty({
    description: 'Filtrar apenas maquininhas com opção de e-commerce',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  ecommerce?: boolean;

  // ========== SEGMENTO ==========

  @ApiProperty({
    description: 'ID do segmento/setor de atuação',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  segmento?: number;

  // ========== DADOS DO USUÁRIO ==========

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
