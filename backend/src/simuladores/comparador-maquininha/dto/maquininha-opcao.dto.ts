import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para opção de maquininha disponível para seleção
 * Usado no formulário de comparação
 */
export class MaquininhaOpcaoDto {
  @ApiProperty({
    description: 'ID único da maquininha',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Nome da maquininha',
    example: 'Moderninha Pro',
  })
  nome: string;

  @ApiProperty({
    description: 'Nome da empresa/adquirente',
    example: 'PagSeguro',
  })
  empresa: string;

  @ApiProperty({
    description: 'URL do logo da maquininha',
    example: 'https://example.com/logos/pagseguro.png',
  })
  logo: string;
}

/**
 * DTO para lista de maquininhas disponíveis
 */
export class ListaMaquininhasDto {
  @ApiProperty({
    description: 'Lista de maquininhas disponíveis para comparação',
    type: [MaquininhaOpcaoDto],
  })
  maquininhas: MaquininhaOpcaoDto[];

  @ApiProperty({
    description: 'Total de maquininhas disponíveis',
    example: 40,
  })
  total: number;
}
