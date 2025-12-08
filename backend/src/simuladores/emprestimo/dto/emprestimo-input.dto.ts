import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsString, Min } from 'class-validator';
import { SituacaoEmprego } from '../enums/situacao-emprego.enum';

export class EmprestimoInputDto {
  @ApiProperty({
    description: 'Principal amount of the loan',
    example: 10000,
  })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  valorEmprestimo: number;

  @ApiProperty({
    description: 'Loan term in months',
    example: 36,
  })
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  prazoMeses: number;

  @ApiProperty({
    description: 'What is your employment situation?',
    example: 'CLT',
  })
  @IsEnum(SituacaoEmprego)
  @Type(() => String)
  situacaoEmprego: SituacaoEmprego;
}
