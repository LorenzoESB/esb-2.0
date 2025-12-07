import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsEmail,
  IsBoolean,
  IsEnum,
  Min,
  ValidateIf,
} from 'class-validator';
import { TipoPessoa } from '../data/contas-digitais.data';

/**
 * DTO base para simulação de contas digitais
 * Contém campos comuns para PF e PJ
 */
export class SimularContasDigitaisBaseDto {
  @ApiProperty({
    description: 'Tipo de pessoa',
    example: 'fisica',
    enum: TipoPessoa,
  })
  @IsEnum(TipoPessoa)
  tipoPessoa: TipoPessoa;

  @ApiProperty({
    description: 'Já possui conta digital?',
    example: true,
  })
  @IsBoolean()
  temConta: boolean;

  @ApiProperty({
    description: 'Tarifa mensal atual (se já possui conta)',
    example: 29.9,
    required: false,
    minimum: 0,
  })
  @ValidateIf((o) => o.temConta === true)
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  tarifa: number;

  @ApiProperty({
    description: 'Número de saques por mês',
    example: 4,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  saques: number;

  @ApiProperty({
    description: 'Número de DOCs por mês',
    example: 0,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  nDocs: number;

  @ApiProperty({
    description: 'Número de TEDs/PIX por mês',
    example: 10,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  nTeds: number;

  @ApiProperty({
    description: 'Deseja cartão de débito?',
    example: true,
  })
  @IsBoolean()
  debito: boolean;

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
}

/**
 * DTO para simulação de contas digitais - Pessoa Física
 */
export class SimularContasDigitaisFisicaDto extends SimularContasDigitaisBaseDto {
  @ApiProperty({
    description: 'Tipo de pessoa',
    example: 'fisica',
    enum: [TipoPessoa.FISICA],
  })
  @IsEnum([TipoPessoa.FISICA])
  declare tipoPessoa: TipoPessoa.FISICA;

  @ApiProperty({
    description: 'Número de depósitos por mês',
    example: 2,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  nDepositos: number;

  @ApiProperty({
    description: 'Deseja cartão de crédito?',
    example: true,
  })
  @IsBoolean()
  credito: boolean;

  @ApiProperty({
    description: 'Pretende fazer investimentos?',
    example: true,
  })
  @IsBoolean()
  investimentos: boolean;

  @ApiProperty({
    description: 'Recebe transferências (TED/DOC)?',
    example: true,
  })
  @IsBoolean()
  transferencias: boolean;

  @ApiProperty({
    description: 'Deposita cheques por imagem?',
    example: false,
  })
  @IsBoolean()
  depCheque: boolean;
}

/**
 * DTO para simulação de contas digitais - Pessoa Jurídica
 */
export class SimularContasDigitaisJuridicaDto extends SimularContasDigitaisBaseDto {
  @ApiProperty({
    description: 'Tipo de pessoa',
    example: 'juridica',
    enum: [TipoPessoa.JURIDICA],
  })
  @IsEnum([TipoPessoa.JURIDICA])
  declare tipoPessoa: TipoPessoa.JURIDICA;

  @ApiProperty({
    description: 'Número de boletos emitidos por mês',
    example: 50,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  boletos: number;

  @ApiProperty({
    description: 'Precisa de maquininha de cartão?',
    example: true,
  })
  @IsBoolean()
  maquininha: boolean;

  @ApiProperty({
    description: 'Faz folha de pagamento?',
    example: false,
  })
  @IsBoolean()
  folhaPagamento: boolean;

  @ApiProperty({
    description: 'Deseja cartão virtual?',
    example: true,
  })
  @IsBoolean()
  cartaoVirtual: boolean;
}

/**
 * Tipo união para aceitar ambos os tipos de simulação
 */
export type SimularContasDigitaisDto =
  | SimularContasDigitaisFisicaDto
  | SimularContasDigitaisJuridicaDto;
