import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
  IsArray,
  IsInt,
  ArrayMinSize,
} from 'class-validator';

/**
 * DTO para comparação lado a lado de maquininhas
 * Versão simplificada focada em comparação direta
 */
export class CompararMaquininhaDto {
  @ApiProperty({
    description: 'IDs das maquininhas a comparar (mínimo 2)',
    example: [1, 2, 3],
    type: [Number],
    minItems: 2,
  })
  @IsArray()
  @ArrayMinSize(2, {
    message: 'É necessário selecionar pelo menos 2 maquininhas para comparar',
  })
  @IsInt({ each: true })
  @Type(() => Number)
  maquininhas_ids: number[];

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
