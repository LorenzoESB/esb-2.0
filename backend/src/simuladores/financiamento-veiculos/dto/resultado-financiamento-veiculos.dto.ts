import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para uma oferta de financiamento de veículos individual
 *
 * Representa uma oferta de uma instituição financeira específica
 * usando o sistema PRICE (parcelas fixas)
 */
export class ResultadoFinanciamentoVeiculosDto {
  @ApiProperty({
    description: 'Nome da instituição/banco que oferece o financiamento',
    example: 'Banco Santander',
  })
  nomeBanco: string;

  @ApiProperty({
    description: 'Modalidade do financiamento',
    example: 'Aquisição de veículos automotores - Veículos novos',
  })
  modalidade: string;

  @ApiProperty({
    description: 'Valor da parcela mensal (fixa no sistema PRICE)',
    example: 1456.78,
  })
  parcelaMensal: number;

  @ApiProperty({
    description: 'Valor total a ser pago ao longo do financiamento',
    example: 69925.44,
  })
  valorTotal: number;

  @ApiProperty({
    description: 'Valor do IOF (Imposto sobre Operações Financeiras)',
    example: 125.44,
  })
  valorIOF: number;

  @ApiProperty({
    description: 'Taxa de juros anual em percentual',
    example: 24.5,
  })
  taxaJurosAnual: number;

  @ApiProperty({
    description: 'Taxa de juros mensal em percentual',
    example: 1.84,
  })
  taxaJurosMensal: number;

  @ApiProperty({
    description: 'Percentual de comprometimento da renda mensal com a parcela',
    example: 18.21,
  })
  comprometimentoRenda: number;

  @ApiProperty({
    description: 'URL do logo da instituição financeira',
    example: 'https://example.com/media/banco-logo.png',
    required: false,
  })
  logo?: string;
}
