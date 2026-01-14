"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CombustivelOutputDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CustoDetalhadoDto {
    custoPorKm;
    custoFormatado;
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 0.57,
        description: 'Custo por quilômetro rodado com o combustível, em reais',
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CustoDetalhadoDto.prototype, "custoPorKm", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'R$ 0,57',
        description: 'Custo formatado em reais para exibição',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CustoDetalhadoDto.prototype, "custoFormatado", void 0);
class CustosDto {
    gasolina;
    etanol;
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Custos relacionados ao uso da gasolina',
        type: () => CustoDetalhadoDto,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CustoDetalhadoDto),
    __metadata("design:type", CustoDetalhadoDto)
], CustosDto.prototype, "gasolina", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Custos relacionados ao uso do etanol',
        type: () => CustoDetalhadoDto,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CustoDetalhadoDto),
    __metadata("design:type", CustoDetalhadoDto)
], CustosDto.prototype, "etanol", void 0);
class EconomiaDto {
    valor;
    valorFormatado;
    percentual;
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 0.03,
        description: 'Economia por quilômetro entre o combustível mais caro e o mais barato',
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], EconomiaDto.prototype, "valor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'R$ 0,03',
        description: 'Economia formatada em reais',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EconomiaDto.prototype, "valorFormatado", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 5.26,
        description: 'Percentual de economia em relação ao combustível mais caro',
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], EconomiaDto.prototype, "percentual", void 0);
class CombustivelOutputDto {
    recomendacao;
    custos;
    economia;
    mensagem;
}
exports.CombustivelOutputDto = CombustivelOutputDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Etanol',
        description: 'Combustível mais vantajoso com base nos preços e consumo',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CombustivelOutputDto.prototype, "recomendacao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Custos por km de cada combustível',
        type: () => CustosDto,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CustosDto),
    __metadata("design:type", CustosDto)
], CombustivelOutputDto.prototype, "custos", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Economia estimada ao escolher o combustível mais vantajoso',
        type: () => EconomiaDto,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => EconomiaDto),
    __metadata("design:type", EconomiaDto)
], CombustivelOutputDto.prototype, "economia", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Levando em conta a gasolina a R$ 5,74, o etanol a R$ 4,84 e o consumo do seu veículo. O combustível que mais vale a pena é: Etanol',
        description: 'Mensagem explicativa sobre o resultado do cálculo',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CombustivelOutputDto.prototype, "mensagem", void 0);
//# sourceMappingURL=combustivel-output.dto.js.map