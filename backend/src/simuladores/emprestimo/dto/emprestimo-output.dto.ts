import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, Min } from "class-validator";

export class EmprestimoInputDto {
    @ApiProperty({
        description: 'Principal amount of the loan',
        example: 10000,
    })
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    totalEmprestado: number;

    @ApiProperty({
        description: 'Loan term in months',
        example: 36,
    })
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    prazoMeses: number;

    @ApiProperty({
        description: 'Monthly installment amount',
        example: 350,
    })
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    valorParcela: number;

    @ApiProperty({
        description: 'Monthly tax rate applied to the loan',
        example: 1.5,
    })
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    taxaJurosMensal: number;

    @ApiProperty({
        description: 'Total amount to be paid over the loan term',
        example: 12600,
    })
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    valorTotal: number;
}
