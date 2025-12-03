import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para uma oferta de empréstimo individual
 *
 * Representa uma oferta de uma instituição financeira específica
 */
export class OfertaEmprestimoDto {
  @ApiProperty({
    description: 'Nome da instituição/banco que oferece o empréstimo',
    example: 'Banco do Brasil',
  })
  nomeBanco: string;

  @ApiProperty({
    description: 'Tipo/modalidade do empréstimo',
    example: 'Crédito pessoal consignado INSS - Pré-fixado',
  })
  modalidade: string;

  @ApiProperty({
    description: 'Valor do empréstimo',
    example: 10000,
  })
  valorEmprestimo: number;

  @ApiProperty({
    description: 'Prazo do empréstimo em meses',
    example: 24,
  })
  prazoMeses: number;

  @ApiProperty({
    description: 'Valor da parcela mensal',
    example: 520.5,
  })
  parcelaMensal: number;

  @ApiProperty({
    description: 'Taxa de juros mensal em percentual',
    example: 2.5,
  })
  taxaMensal: number;

  @ApiProperty({
    description: 'Taxa de juros anual em percentual',
    example: 34.49,
  })
  taxaAnual: number;

  @ApiProperty({
    description: 'Valor total a ser pago ao longo do empréstimo',
    example: 12492,
  })
  totalPago: number;

  @ApiProperty({
    description: 'Total de juros pagos',
    example: 2492,
  })
  totalJuros: number;

  @ApiProperty({
    description: 'Taxa efetiva anual (considerando capitalização composta)',
    example: 35.2,
  })
  taxaEfetivaAnual: number;

  @ApiProperty({
    description: 'URL do logo da instituição financeira',
    example: 'https://example.com/media/banco-logo.png',
    required: false,
  })
  logo?: string;

  @ApiProperty({
    description: 'Percentual de comprometimento da renda (se renda foi informada)',
    example: 10.41,
    required: false,
  })
  comprometimentoRenda?: number;
}

/**
 * DTO para o resultado completo da simulação de empréstimo
 *
 * Contém todas as ofertas disponíveis ordenadas da mais vantajosa para a menos vantajosa
 */
export class ResultadoEmprestimoDto {
  @ApiProperty({
    description: 'Lista de ofertas de empréstimo disponíveis, ordenadas por taxa mensal (menor para maior)',
    type: [OfertaEmprestimoDto],
  })
  ofertas: OfertaEmprestimoDto[];

  @ApiProperty({
    description: 'Número total de ofertas encontradas',
    example: 15,
  })
  totalOfertas: number;

  @ApiProperty({
    description: 'Melhor oferta (menor taxa de juros)',
    type: OfertaEmprestimoDto,
  })
  melhorOferta: OfertaEmprestimoDto;

  @ApiProperty({
    description: 'Tipo de pessoa da simulação',
    example: 'PF',
  })
  tipoPessoa: string;

  @ApiProperty({
    description: 'Tipo de emprego (apenas para PF)',
    example: 'clt',
    required: false,
  })
  tipoEmprego?: string;

  @ApiProperty({
    description: 'Dados de entrada da simulação',
    example: {
      valorDesejado: 10000,
      prazoMeses: 24,
      renda: 5000,
    },
  })
  inputData: {
    valorDesejado: number;
    prazoMeses: number;
    renda?: number;
  };
}
