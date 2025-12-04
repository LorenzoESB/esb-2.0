import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para uma oferta de financiamento imobiliário individual
 *
 * Representa uma oferta de uma instituição financeira específica
 * usando o sistema SAC (Sistema de Amortização Constante)
 */
export class ResultadoFinanciamentoImovelDto {
  @ApiProperty({
    description: 'Nome da instituição/banco que oferece o financiamento',
    example: 'Banco do Brasil',
  })
  nomeBanco: string;

  @ApiProperty({
    description: 'Modalidade do financiamento',
    example: 'Financiamento imobiliário com taxas de mercado - Pós-fixado referenciado em TR',
  })
  modalidade: string;

  @ApiProperty({
    description: 'Valor da primeira parcela (maior parcela no SAC)',
    example: 3245.67,
  })
  parcelaInicial: number;

  @ApiProperty({
    description: 'Valor da última parcela (menor parcela no SAC)',
    example: 1123.45,
  })
  parcelaFinal: number;

  @ApiProperty({
    description: 'Valor total a ser pago ao longo do financiamento',
    example: 750000,
  })
  valorTotal: number;

  @ApiProperty({
    description: 'Taxa de juros anual em percentual',
    example: 10.5,
  })
  taxaJurosAnual: number;

  @ApiProperty({
    description: 'Taxa de juros mensal em percentual',
    example: 0.84,
  })
  taxaJurosMensal: number;

  @ApiProperty({
    description: 'Percentual de comprometimento da renda mensal com a primeira parcela',
    example: 32.46,
  })
  comprometimentoRenda: number;

  @ApiProperty({
    description: 'URL do logo da instituição financeira',
    example: 'https://example.com/media/banco-logo.png',
    required: false,
  })
  logo?: string;
}
