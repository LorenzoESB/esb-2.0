import { ApiProperty } from '@nestjs/swagger';

/**
 * Características de uma maquininha para comparação
 */
export class CaracteristicasMaquininhaDto {
  @ApiProperty({ description: 'ID da maquininha', example: 1 })
  id: number;

  @ApiProperty({
    description: 'Nome da maquininha',
    example: 'Moderninha Pro',
  })
  nome: string;

  @ApiProperty({ description: 'Nome da empresa', example: 'PagSeguro' })
  empresa: string;

  @ApiProperty({
    description: 'URL do logo',
    example: 'https://example.com/logos/pagseguro.png',
  })
  logo: string;

  @ApiProperty({
    description: 'URL da imagem da maquininha',
    example: 'https://example.com/maquininhas/moderninha-pro.png',
  })
  imagem: string;

  @ApiProperty({ description: 'Preço da maquininha', example: 258.80 })
  preco: number;

  @ApiProperty({
    description: 'Preço promocional (se houver)',
    example: 12.90,
    nullable: true,
  })
  preco_promocional: number | null;

  @ApiProperty({
    description: 'Mensalidade (R$ 0 se gratuita)',
    example: 0,
  })
  mensalidade: number;

  @ApiProperty({
    description: 'Aceita chip',
    example: true,
  })
  chip: boolean;

  @ApiProperty({
    description: 'Aceita tarja magnética',
    example: true,
  })
  tarja: boolean;

  @ApiProperty({
    description: 'Aceita NFC (aproximação)',
    example: true,
  })
  nfc: boolean;

  @ApiProperty({
    description: 'Possui fio',
    example: false,
  })
  com_fio: boolean;

  @ApiProperty({
    description: 'Imprime recibo',
    example: true,
  })
  imprime_recibo: boolean;

  @ApiProperty({
    description: 'Precisa de smartphone',
    example: false,
  })
  precisa_smartphone: boolean;

  @ApiProperty({
    description: 'Permite antecipação de recebíveis',
    example: true,
  })
  permite_antecipacao: boolean;

  @ApiProperty({
    description: 'Atende Pessoa Física',
    example: true,
  })
  atende_pf: boolean;

  @ApiProperty({
    description: 'Atende Pessoa Jurídica',
    example: true,
  })
  atende_pj: boolean;

  @ApiProperty({
    description: 'Aceita vale refeição',
    example: false,
  })
  vale_refeicao: boolean;

  @ApiProperty({
    description: 'Possui opção e-commerce',
    example: false,
  })
  ecommerce: boolean;

  @ApiProperty({
    description: 'Máximo de parcelas',
    example: 12,
  })
  max_parcelas: number;

  @ApiProperty({
    description: 'Garantia em anos',
    example: 1,
    nullable: true,
  })
  garantia: number | null;

  @ApiProperty({
    description: 'Tipos de conexão disponíveis',
    example: ['Wi-Fi', '4G', 'Bluetooth'],
  })
  tipos_conexao: string[];

  @ApiProperty({
    description: 'Bandeiras aceitas',
    example: ['Visa', 'Mastercard', 'Elo', 'American Express'],
  })
  bandeiras: string[];

  @ApiProperty({
    description: 'Formas de recebimento',
    example: ['Conta PagSeguro', 'Conta Bancária'],
  })
  formas_recebimento: string[];

  @ApiProperty({
    description: 'Observações sobre a maquininha',
    example: 'Maquininha completa com NFC e impressora',
  })
  observacoes: string;

  @ApiProperty({
    description: 'URL para contratação',
    example: 'https://pagseguro.uol.com.br',
  })
  url_contratacao: string;

  @ApiProperty({
    description: 'Cupom de desconto',
    example: 'PROMO2024',
    nullable: true,
  })
  cupom: string | null;

  @ApiProperty({
    description: 'Avaliação de transparência (0-10)',
    example: 9,
    nullable: true,
  })
  transparencia: number | null;

  @ApiProperty({
    description: 'URL da avaliação/review',
    example: 'https://blog.gerentedesonhos.com.br/moderninha-pro',
    nullable: true,
  })
  url_avaliacao: string | null;

  @ApiProperty({
    description: 'Data da última atualização',
    example: '15/11/2024',
  })
  data_atualizacao: string;

  @ApiProperty({
    description: 'Planos disponíveis',
    type: 'array',
    example: [
      {
        id: 1,
        nome: 'Plano Básico',
        taxa_debito: '2,99%',
        taxa_credito_vista: '3,99%',
        taxa_credito_parcelado_min: '4,98%',
        dias_repasse_debito: 1,
        dias_repasse_credito: 30,
        avaliacao: 8.5,
      },
    ],
  })
  planos: {
    id: number;
    nome: string;
    taxa_debito: string;
    taxa_credito_vista: string;
    taxa_credito_parcelado_min: string;
    dias_repasse_debito: number;
    dias_repasse_credito: number;
    avaliacao: number;
  }[];
}

/**
 * Resultado da comparação
 */
export class ResultadoComparacaoDto {
  @ApiProperty({
    description: 'Maquininhas comparadas',
    type: [CaracteristicasMaquininhaDto],
  })
  maquininhas: CaracteristicasMaquininhaDto[];

  @ApiProperty({
    description: 'Total de maquininhas comparadas',
    example: 3,
  })
  total: number;
}
