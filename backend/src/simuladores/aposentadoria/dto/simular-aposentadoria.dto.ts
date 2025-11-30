import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsBoolean,
  Min,
  Max,
  ValidateIf,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export enum ModoCalculoAposentadoria {
  RECEBER = 'RECEBER',
  CONTRIBUIR = 'CONTRIBUIR',
}

export class SimularAposentadoriaDto {
  @ApiProperty({
    enum: ModoCalculoAposentadoria,
    description:
      'Modo de cálculo: RECEBER (calcula contribuição necessária) ou CONTRIBUIR (calcula renda futura)',
    example: ModoCalculoAposentadoria.RECEBER,
  })
  @IsEnum(ModoCalculoAposentadoria, {
    message: 'Modo de cálculo deve ser RECEBER ou CONTRIBUIR',
  })
  modoCalculo: ModoCalculoAposentadoria;

  @ApiProperty({
    description: 'Idade atual em anos completos',
    example: 28,
    minimum: 0,
    maximum: 100,
  })
  @IsInt({ message: 'Idade atual deve ser um número inteiro' })
  @Min(0, { message: 'Idade atual deve ser no mínimo 0' })
  @Max(100, { message: 'Idade atual deve ser no máximo 100' })
  @Type(() => Number)
  idadeAtual: number;

  @ApiProperty({
    description: 'Idade desejada para aposentadoria em anos completos',
    example: 50,
    minimum: 1,
    maximum: 100,
  })
  @IsInt({ message: 'Idade de aposentadoria deve ser um número inteiro' })
  @Min(1, { message: 'Idade de aposentadoria deve ser no mínimo 1' })
  @Max(100, { message: 'Idade de aposentadoria deve ser no máximo 100' })
  @Type(() => Number)
  idadeAposentadoria: number;

  @ApiProperty({
    description:
      'Valor já acumulado em previdência privada (R$). Use 0 se não possui reserva.',
    example: 50000,
    minimum: 0,
    default: 0,
  })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Valor já acumulado deve ter no máximo 2 casas decimais' },
  )
  @Min(0, { message: 'Valor já acumulado não pode ser negativo' })
  @Type(() => Number)
  valorJaAcumulado: number = 0;

  @ApiProperty({
    description:
      'Renda mensal desejada na aposentadoria (R$). Obrigatório quando modoCalculo=RECEBER',
    example: 12000,
    minimum: 0.01,
    required: false,
  })
  @ValidateIf((o) => o.modoCalculo === ModoCalculoAposentadoria.RECEBER)
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Renda mensal desejada deve ter no máximo 2 casas decimais' },
  )
  @Min(0.01, { message: 'Renda mensal desejada deve ser maior que zero' })
  @Type(() => Number)
  rendaMensalDesejada?: number;

  @ApiProperty({
    description:
      'Contribuição mensal que pretende fazer (R$). Obrigatório quando modoCalculo=CONTRIBUIR',
    example: 2000,
    minimum: 0.01,
    required: false,
  })
  @ValidateIf((o) => o.modoCalculo === ModoCalculoAposentadoria.CONTRIBUIR)
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Contribuição mensal deve ter no máximo 2 casas decimais' },
  )
  @Min(0.01, { message: 'Contribuição mensal deve ser maior que zero' })
  @Type(() => Number)
  contribuicaoMensal?: number;

  @ApiProperty({
    description: 'Incluir análise de cenários de saque sustentável',
    example: true,
    default: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'incluirCenariosSaque deve ser true ou false' })
  @Type(() => Boolean)
  incluirCenariosSaque?: boolean = true;
}
