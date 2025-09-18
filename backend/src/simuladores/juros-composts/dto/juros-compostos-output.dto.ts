import { ApiProperty } from '@nestjs/swagger';

export class JurosCompostosResumoDto {
  @ApiProperty({
    description: 'Total final amount (gross)',
    example: 34720.85,
  })
  valorTotalFinalBruto: number;

  @ApiProperty({
    description: 'Total amount invested',
    example: 28000,
  })
  totalInvestido: number;

  @ApiProperty({
    description: 'Total gross interest earned',
    example: 6720.85,
  })
  totalEmJurosBruto: number;

  @ApiProperty({
    description: 'Total final amount (net)',
    required: false,
  })
  valorTotalFinal?: number;

  @ApiProperty({
    description: 'Income tax amount',
    required: false,
  })
  impostoRenda?: number;

  @ApiProperty({
    description: 'Income tax rate',
    required: false,
  })
  aliquotaIR?: number;

  @ApiProperty({
    description: 'Total net interest',
    required: false,
  })
  totalEmJuros?: number;
}

export class JurosCompostosMensalDto {
  @ApiProperty({ description: 'Month number' })
  mes: number;

  @ApiProperty({ description: 'Total invested up to this month' })
  valorInvestido: number;

  @ApiProperty({ description: 'Total value with interest' })
  valorComJuros: number;

  @ApiProperty({ description: 'Interest earned this month' })
  jurosDoMes: number;

  @ApiProperty({ description: 'Accumulated interest' })
  jurosAcumulados: number;
}

export class JurosCompostosDetalhadoOutputDto {
  @ApiProperty({ type: JurosCompostosResumoDto })
  resumo: JurosCompostosResumoDto;

  @ApiProperty({ type: [JurosCompostosMensalDto] })
  detalhesMensais: JurosCompostosMensalDto[];
}
