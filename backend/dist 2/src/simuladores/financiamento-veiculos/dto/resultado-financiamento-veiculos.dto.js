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
exports.ResultadoFinanciamentoVeiculosDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ResultadoFinanciamentoVeiculosDto {
    nomeBanco;
    modalidade;
    parcelaMensal;
    valorTotal;
    valorIOF;
    taxaJurosAnual;
    taxaJurosMensal;
    comprometimentoRenda;
    logo;
}
exports.ResultadoFinanciamentoVeiculosDto = ResultadoFinanciamentoVeiculosDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nome da instituição/banco que oferece o financiamento',
        example: 'Banco Santander',
    }),
    __metadata("design:type", String)
], ResultadoFinanciamentoVeiculosDto.prototype, "nomeBanco", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Modalidade do financiamento',
        example: 'Aquisição de veículos automotores - Veículos novos',
    }),
    __metadata("design:type", String)
], ResultadoFinanciamentoVeiculosDto.prototype, "modalidade", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valor da parcela mensal (fixa no sistema PRICE)',
        example: 1456.78,
    }),
    __metadata("design:type", Number)
], ResultadoFinanciamentoVeiculosDto.prototype, "parcelaMensal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valor total a ser pago ao longo do financiamento',
        example: 69925.44,
    }),
    __metadata("design:type", Number)
], ResultadoFinanciamentoVeiculosDto.prototype, "valorTotal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valor do IOF (Imposto sobre Operações Financeiras)',
        example: 125.44,
    }),
    __metadata("design:type", Number)
], ResultadoFinanciamentoVeiculosDto.prototype, "valorIOF", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Taxa de juros anual em percentual',
        example: 24.5,
    }),
    __metadata("design:type", Number)
], ResultadoFinanciamentoVeiculosDto.prototype, "taxaJurosAnual", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Taxa de juros mensal em percentual',
        example: 1.84,
    }),
    __metadata("design:type", Number)
], ResultadoFinanciamentoVeiculosDto.prototype, "taxaJurosMensal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Percentual de comprometimento da renda mensal com a parcela',
        example: 18.21,
    }),
    __metadata("design:type", Number)
], ResultadoFinanciamentoVeiculosDto.prototype, "comprometimentoRenda", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL do logo da instituição financeira',
        example: 'https://example.com/media/banco-logo.png',
        required: false,
    }),
    __metadata("design:type", String)
], ResultadoFinanciamentoVeiculosDto.prototype, "logo", void 0);
//# sourceMappingURL=resultado-financiamento-veiculos.dto.js.map