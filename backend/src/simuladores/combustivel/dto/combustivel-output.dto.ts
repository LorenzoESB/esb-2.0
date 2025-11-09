import { ApiProperty } from '@nestjs/swagger';

/**
 * Representa os custos de um combustível específico
 */
export class CustoCombustivelDto {
    @ApiProperty({
        description: 'Custo por quilômetro (valor numérico)',
        example: 0.574,
    })
    custoPorKm: number;

    @ApiProperty({
        description: 'Custo por quilômetro formatado em R$',
        example: 'R$ 0,57',
    })
    custoFormatado: string;
}

/**
 * Representa a economia entre os combustíveis
 */
export class EconomiaDto {
    @ApiProperty({
        description: 'Valor absoluto de economia por km',
        example: 0.036,
    })
    valor: number;

    @ApiProperty({
        description: 'Valor de economia formatado em R$',
        example: 'R$ 0,04',
    })
    valorFormatado: string;

    @ApiProperty({
        description: 'Percentual de economia',
        example: 6.27,
    })
    percentual: number;
}

/**
 * DTO de saída do simulador de combustível
 */
export class CombustivelOutputDto {
    @ApiProperty({
        description: 'Combustível recomendado',
        example: 'Etanol',
        enum: ['Gasolina', 'Etanol'],
    })
    recomendacao: 'Gasolina' | 'Etanol';

    @ApiProperty({
        description: 'Custos detalhados de cada combustível',
        type: () => ({
            gasolina: CustoCombustivelDto,
            etanol: CustoCombustivelDto,
        }),
    })
    custos: {
        gasolina: CustoCombustivelDto;
        etanol: CustoCombustivelDto;
    };

    @ApiProperty({
        description: 'Economia ao escolher o combustível recomendado',
        type: EconomiaDto,
    })
    economia: EconomiaDto;

    @ApiProperty({
        description: 'Mensagem amigável explicando o resultado',
        example:
            'Levando em conta a gasolina a R$5,74, o etanol a R$4,84 e o consumo do seu veículo. O combustível que mais vale a pena para abastecer o seu carro é: Etanol',
    })
    mensagem: string;
}