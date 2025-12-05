import { ApiProperty } from '@nestjs/swagger';
import { TipoPessoa } from '../data/contas-digitais.data';

/**
 * DTO de funcionalidades da conta digital
 */
export class FeaturesContaDigitalDto {
  @ApiProperty({
    description: 'Envia DOC',
    example: false,
  })
  enviaDoc: boolean;

  @ApiProperty({
    description: 'Recebe DOC',
    example: true,
  })
  recebeDoc: boolean;

  @ApiProperty({
    description: 'Envia TED',
    example: true,
  })
  enviaTed: boolean;

  @ApiProperty({
    description: 'Recebe TED',
    example: true,
  })
  recebeTed: boolean;

  @ApiProperty({
    description: 'Oferece cartão de débito',
    example: true,
  })
  cartaoDebito: boolean;

  @ApiProperty({
    description: 'Oferece cartão de crédito',
    example: true,
  })
  cartaoCredito: boolean;

  @ApiProperty({
    description: 'Realiza saques',
    example: true,
  })
  realizaSaque: boolean;

  @ApiProperty({
    description: 'Aceita depósitos',
    example: true,
  })
  aceitaDeposito: boolean;

  @ApiProperty({
    description: 'Aceita depósito de cheque por imagem',
    example: false,
  })
  aceitaDepositoImagem: boolean;

  @ApiProperty({
    description: 'Permite fazer investimentos',
    example: true,
  })
  realizaInvestimento: boolean;

  @ApiProperty({
    description: 'Emite boletos (PJ)',
    example: false,
  })
  emiteBoleto: boolean;

  @ApiProperty({
    description: 'Maquininha de cartão inclusa (PJ)',
    example: false,
  })
  maquininhaInclusa: boolean;

  @ApiProperty({
    description: 'Oferece cartão virtual (PJ)',
    example: true,
  })
  cartaoVirtual: boolean;

  @ApiProperty({
    description: 'Oferece folha de pagamentos (PJ)',
    example: false,
  })
  folhaPagamento: boolean;
}

/**
 * DTO de resultado da comparação de conta digital
 */
export class ResultadoContasDigitaisDto {
  @ApiProperty({
    description: 'ID da conta',
    example: 1,
  })
  contaId: number;

  @ApiProperty({
    description: 'Nome da conta',
    example: 'Nubank Conta PF',
  })
  nome: string;

  @ApiProperty({
    description: 'Nome do banco',
    example: 'Nubank',
  })
  nomeBanco: string;

  @ApiProperty({
    description: 'Logo do banco (slug)',
    example: 'nubank',
    required: false,
  })
  logoBanco?: string;

  @ApiProperty({
    description: 'Mensalidade da conta (tarifa fixa)',
    example: 0,
  })
  mensalidadeConta: number;

  @ApiProperty({
    description: 'Tipo de pessoa',
    example: 'fisica',
    enum: TipoPessoa,
  })
  tipoPessoa: TipoPessoa;

  @ApiProperty({
    description: 'Tarifa total mensal (mensalidade + transações)',
    example: 13.0,
  })
  tarifaTotal: number;

  @ApiProperty({
    description: 'Economia em relação à conta atual',
    example: 16.9,
  })
  economia: number;

  @ApiProperty({
    description: 'Funcionalidades da conta',
    type: FeaturesContaDigitalDto,
  })
  features: FeaturesContaDigitalDto;

  @ApiProperty({
    description: 'Observações sobre a conta',
    example: 'Conta 100% digital com anuidade zero no cartão de crédito',
    required: false,
  })
  observacao?: string;

  @ApiProperty({
    description: 'Conta está ativa',
    example: true,
  })
  ativa: boolean;

  @ApiProperty({
    description: 'URL do site da conta',
    example: 'https://nubank.com.br',
    required: false,
  })
  urlSite?: string;
}
