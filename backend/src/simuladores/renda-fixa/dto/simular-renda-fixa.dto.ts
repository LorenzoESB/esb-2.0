import {
  IsNumber,
  IsNotEmpty,
  Min,
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class SimularRendaFixaDto {
  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'João da Silva',
  })
  @IsString({ message: 'Nome deve ser uma string' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  nome: string;

  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'joao@exemplo.com',
  })
  @IsEmail({}, { message: 'E-mail inválido' })
  @IsNotEmpty({ message: 'E-mail é obrigatório' })
  email: string;

  @ApiProperty({
    description: 'Opt-in to receive simulation results via email',
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  email_opt_in_simulation: boolean;

  @ApiProperty({
    description: 'Valor inicial do investimento em reais',
    example: 10000,
    minimum: 0,
  })
  @IsNumber({}, { message: 'Investimento inicial deve ser um número' })
  @IsNotEmpty({ message: 'Investimento inicial é obrigatório' })
  @Min(0, { message: 'Investimento inicial deve ser maior ou igual a zero' })
  @Type(() => Number)
  investimentoInicial: number;

  @ApiProperty({
    description: 'Prazo do investimento em meses',
    example: 24,
    minimum: 1,
  })
  @IsNumber({}, { message: 'Prazo deve ser um número' })
  @IsNotEmpty({ message: 'Prazo é obrigatório' })
  @Min(1, { message: 'Prazo deve ser pelo menos 1 mês' })
  @Type(() => Number)
  prazoMeses: number;
}
