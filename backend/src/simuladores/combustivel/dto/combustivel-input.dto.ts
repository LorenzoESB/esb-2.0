import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CombustivelInputDto {
    @ApiProperty({
        description: 'Price of gasoline per liter',
        example: 5.49,
    })
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    precoGasolina: number;
    @ApiProperty({
        description: 'Price of ethanol per liter',
        example: 3.99,
    })
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    precoEtanol: number;
    @ApiProperty({
        description: 'Vehicle consumption with gasoline (km/l)',
        example: 12,
    })
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    consumoGasolina: number;
    @ApiProperty({
        description: 'Vehicle consumption with ethanol (km/l)',
        example: 8,
    })
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    consumoEtanol: number;

    @ApiPropertyOptional({
        description: 'User email (optional)',
        example: 'user@example.com',
    })
    @IsString()
    @IsOptional()
    email?: string;
}