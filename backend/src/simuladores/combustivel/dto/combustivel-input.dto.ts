import { ApiProperty } from '@nestjs/swagger';
import {
    IsNumber,
    IsPositive,
    Min,
    Max,
    IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

/**
 * DTO para entrada do simulador de combustível
 * Todos os valores devem ser numéricos positivos
 */
export class CombustivelInputDto {
    @ApiProperty({
        description: 'Preço do litro da gasolina em R$',
        example: 5.74,
        minimum: 0.01,
        maximum: 50,
    })
    @IsNotEmpty({ message: 'Preço da gasolina é obrigatório' })
    @IsNumber({}, { message: 'Preço da gasolina deve ser um número' })
    @IsPositive({ message: 'Preço da gasolina deve ser positivo' })
    @Min(0.01, { message: 'Preço da gasolina deve ser no mínimo R$ 0,01' })
    @Max(50, { message: 'Preço da gasolina deve ser no máximo R$ 50,00' })
    @Type(() => Number)
    precoGasolina: number;

    @ApiProperty({
        description: 'Preço do litro do etanol em R$',
        example: 4.84,
        minimum: 0.01,
        maximum: 50,
    })
    @IsNotEmpty({ message: 'Preço do etanol é obrigatório' })
    @IsNumber({}, { message: 'Preço do etanol deve ser um número' })
    @IsPositive({ message: 'Preço do etanol deve ser positivo' })
    @Min(0.01, { message: 'Preço do etanol deve ser no mínimo R$ 0,01' })
    @Max(50, { message: 'Preço do etanol deve ser no máximo R$ 50,00' })
    @Type(() => Number)
    precoEtanol: number;

    @ApiProperty({
        description: 'Consumo de gasolina do veículo em Km/L',
        example: 10,
        minimum: 0.1,
        maximum: 100,
    })
    @IsNotEmpty({ message: 'Consumo de gasolina é obrigatório' })
    @IsNumber({}, { message: 'Consumo de gasolina deve ser um número' })
    @IsPositive({ message: 'Consumo de gasolina deve ser positivo' })
    @Min(0.1, { message: 'Consumo de gasolina deve ser no mínimo 0,1 km/L' })
    @Max(100, { message: 'Consumo de gasolina deve ser no máximo 100 km/L' })
    @Type(() => Number)
    consumoGasolina: number;

    @ApiProperty({
        description: 'Consumo de etanol do veículo em Km/L',
        example: 9,
        minimum: 0.1,
        maximum: 100,
    })
    @IsNotEmpty({ message: 'Consumo de etanol é obrigatório' })
    @IsNumber({}, { message: 'Consumo de etanol deve ser um número' })
    @IsPositive({ message: 'Consumo de etanol deve ser positivo' })
    @Min(0.1, { message: 'Consumo de etanol deve ser no mínimo 0,1 km/L' })
    @Max(100, { message: 'Consumo de etanol deve ser no máximo 100 km/L' })
    @Type(() => Number)
    consumoEtanol: number;
}