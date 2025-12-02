import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para oferta individual de investimento (CDB/LCI)
 */
export class InvestimentoOfertaDto {
  @ApiProperty({
    description: 'Nome da corretora',
    example: 'XP Investimentos',
  })
  corretora: string;

  @ApiProperty({
    description: 'Nome do emissor/banco',
    example: 'Banco Daycoval',
  })
  emissor: string;

  @ApiProperty({
    description: 'Taxa bruta do investimento',
    example: '115% CDI',
  })
  taxa: string;

  @ApiProperty({
    description: 'Data de vencimento',
    example: '2027-12-15',
  })
  vencimento: string;

  @ApiProperty({
    description: 'Quantidade mínima para investir',
    example: 1000.0,
  })
  qtdMinima: number;

  @ApiProperty({
    description: 'Valor líquido após impostos',
    example: 12500.5,
  })
  vl: number;
}

/**
 * DTO para oferta de Tesouro Direto/SELIC
 */
export class OfertaTesouroDto {
  @ApiProperty({
    description: 'Nome do título',
    example: 'Tesouro Selic 2029',
  })
  nom: string;

  @ApiProperty({
    description: 'Tipo do título',
    example: 'SELIC',
  })
  tipo: string;

  @ApiProperty({
    description: 'Taxa do título',
    example: 13.75,
  })
  tx: number;

  @ApiProperty({
    description: 'Data de vencimento',
    example: '2029-03-01',
  })
  data_vencto: string;

  @ApiProperty({
    description: 'Valor do título',
    example: 15000.0,
  })
  vlr: number;
}
