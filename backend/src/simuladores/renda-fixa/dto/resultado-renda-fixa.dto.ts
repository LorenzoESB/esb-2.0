import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  InvestimentoOfertaDto,
  OfertaTesouroDto,
} from './investimento-oferta.dto';

export class ResultadoModalidadeDto {
  @ApiProperty({
    description: 'Taxa mensal aplicada (em decimal)',
    example: 0.005,
  })
  taxa: number;

  @ApiProperty({
    description: 'Valor final após rendimento',
    example: 15000.5,
  })
  resultado: number;

  @ApiProperty({
    description: 'Valor do imposto de renda retido (se aplicável)',
    example: 250.75,
  })
  imposto: number;

  @ApiProperty({
    description: 'Rendimento líquido (resultado - investimento total)',
    example: 4500.5,
  })
  rendimentoLiquido: number;

  @ApiProperty({
    description: 'Percentual de rendimento sobre o investido',
    example: 45.0,
  })
  percentualRendimento: number;
}

export class ResultadoRendaFixaDto {
  @ApiProperty({
    description: 'Resultados para Poupança',
    type: ResultadoModalidadeDto,
  })
  poupanca: ResultadoModalidadeDto;

  @ApiProperty({
    description: 'Resultados para Tesouro Direto (Selic)',
    type: ResultadoModalidadeDto,
  })
  tesouroDireto: ResultadoModalidadeDto;

  @ApiProperty({
    description: 'Resultados para LCI (Letra de Crédito Imobiliário)',
    type: ResultadoModalidadeDto,
  })
  lci: ResultadoModalidadeDto;

  @ApiProperty({
    description: 'Resultados para CDB (Certificado de Depósito Bancário)',
    type: ResultadoModalidadeDto,
  })
  cdb: ResultadoModalidadeDto;

  @ApiProperty({
    description: 'Nome do melhor investimento',
    example: 'LCI',
  })
  melhorInvestimento: string;

  @ApiProperty({
    description: 'Rendimento do melhor investimento',
    example: 5000.0,
  })
  melhorRendimento: number;

  @ApiProperty({
    description: 'Total investido (inicial + aportes)',
    example: 22000.0,
  })
  totalInvestido: number;

  @ApiProperty({
    description: 'Taxa Selic anual vigente',
    example: 13.75,
  })
  taxaSelic: number;

  @ApiProperty({
    description: 'Taxa CDI anual vigente',
    example: 13.65,
  })
  taxaCdi: number;

  @ApiProperty({
    description: 'Taxa TR mensal vigente',
    example: 0.001,
  })
  taxaTr: number;

  @ApiPropertyOptional({
    description:
      'Lista de ofertas detalhadas de investimento do melhor tipo (CDB/LCI/Tesouro)',
    type: [InvestimentoOfertaDto],
    example: [
      {
        corretora: 'XP Investimentos',
        emissor: 'Banco Daycoval',
        taxa: '115% CDI',
        vencimento: '2027-12-15',
        qtdMinima: 1000.0,
        vl: 12500.5,
      },
    ],
  })
  ofertasDetalhadas?: InvestimentoOfertaDto[] | OfertaTesouroDto[];
}
