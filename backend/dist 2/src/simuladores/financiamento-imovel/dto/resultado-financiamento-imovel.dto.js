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
exports.ResultadoFinanciamentoImovelDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ResultadoFinanciamentoImovelDto {
    nomeBanco;
    modalidade;
    parcelaInicial;
    parcelaFinal;
    valorTotal;
    taxaJurosAnual;
    taxaJurosMensal;
    comprometimentoRenda;
    logo;
}
exports.ResultadoFinanciamentoImovelDto = ResultadoFinanciamentoImovelDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nome da instituição/banco que oferece o financiamento',
        example: 'Banco do Brasil',
    }),
    __metadata("design:type", String)
], ResultadoFinanciamentoImovelDto.prototype, "nomeBanco", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Modalidade do financiamento',
        example: 'Financiamento imobiliário com taxas de mercado - Pós-fixado referenciado em TR',
    }),
    __metadata("design:type", String)
], ResultadoFinanciamentoImovelDto.prototype, "modalidade", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valor da primeira parcela (maior parcela no SAC)',
        example: 3245.67,
    }),
    __metadata("design:type", Number)
], ResultadoFinanciamentoImovelDto.prototype, "parcelaInicial", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valor da última parcela (menor parcela no SAC)',
        example: 1123.45,
    }),
    __metadata("design:type", Number)
], ResultadoFinanciamentoImovelDto.prototype, "parcelaFinal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valor total a ser pago ao longo do financiamento',
        example: 750000,
    }),
    __metadata("design:type", Number)
], ResultadoFinanciamentoImovelDto.prototype, "valorTotal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Taxa de juros anual em percentual',
        example: 10.5,
    }),
    __metadata("design:type", Number)
], ResultadoFinanciamentoImovelDto.prototype, "taxaJurosAnual", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Taxa de juros mensal em percentual',
        example: 0.84,
    }),
    __metadata("design:type", Number)
], ResultadoFinanciamentoImovelDto.prototype, "taxaJurosMensal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Percentual de comprometimento da renda mensal com a primeira parcela',
        example: 32.46,
    }),
    __metadata("design:type", Number)
], ResultadoFinanciamentoImovelDto.prototype, "comprometimentoRenda", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL do logo da instituição financeira',
        example: 'https://example.com/media/banco-logo.png',
        required: false,
    }),
    __metadata("design:type", String)
], ResultadoFinanciamentoImovelDto.prototype, "logo", void 0);
//# sourceMappingURL=resultado-financiamento-imovel.dto.js.map