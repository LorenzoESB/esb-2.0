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
exports.ResultadoEmprestimoDto = exports.OfertaEmprestimoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class OfertaEmprestimoDto {
    nomeBanco;
    modalidade;
    valorEmprestimo;
    prazoMeses;
    parcelaMensal;
    taxaMensal;
    taxaAnual;
    totalPago;
    totalJuros;
    taxaEfetivaAnual;
    logo;
    comprometimentoRenda;
}
exports.OfertaEmprestimoDto = OfertaEmprestimoDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nome da instituição/banco que oferece o empréstimo',
        example: 'Banco do Brasil',
    }),
    __metadata("design:type", String)
], OfertaEmprestimoDto.prototype, "nomeBanco", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tipo/modalidade do empréstimo',
        example: 'Crédito pessoal consignado INSS - Pré-fixado',
    }),
    __metadata("design:type", String)
], OfertaEmprestimoDto.prototype, "modalidade", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valor do empréstimo',
        example: 10000,
    }),
    __metadata("design:type", Number)
], OfertaEmprestimoDto.prototype, "valorEmprestimo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Prazo do empréstimo em meses',
        example: 24,
    }),
    __metadata("design:type", Number)
], OfertaEmprestimoDto.prototype, "prazoMeses", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valor da parcela mensal',
        example: 520.5,
    }),
    __metadata("design:type", Number)
], OfertaEmprestimoDto.prototype, "parcelaMensal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Taxa de juros mensal em percentual',
        example: 2.5,
    }),
    __metadata("design:type", Number)
], OfertaEmprestimoDto.prototype, "taxaMensal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Taxa de juros anual em percentual',
        example: 34.49,
    }),
    __metadata("design:type", Number)
], OfertaEmprestimoDto.prototype, "taxaAnual", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valor total a ser pago ao longo do empréstimo',
        example: 12492,
    }),
    __metadata("design:type", Number)
], OfertaEmprestimoDto.prototype, "totalPago", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total de juros pagos',
        example: 2492,
    }),
    __metadata("design:type", Number)
], OfertaEmprestimoDto.prototype, "totalJuros", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Taxa efetiva anual (considerando capitalização composta)',
        example: 35.2,
    }),
    __metadata("design:type", Number)
], OfertaEmprestimoDto.prototype, "taxaEfetivaAnual", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL do logo da instituição financeira',
        example: 'https://example.com/media/banco-logo.png',
        required: false,
    }),
    __metadata("design:type", String)
], OfertaEmprestimoDto.prototype, "logo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Percentual de comprometimento da renda (se renda foi informada)',
        example: 10.41,
        required: false,
    }),
    __metadata("design:type", Number)
], OfertaEmprestimoDto.prototype, "comprometimentoRenda", void 0);
class ResultadoEmprestimoDto {
    ofertas;
    totalOfertas;
    melhorOferta;
    tipoPessoa;
    tipoEmprego;
    inputData;
}
exports.ResultadoEmprestimoDto = ResultadoEmprestimoDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Lista de ofertas de empréstimo disponíveis, ordenadas por taxa mensal (menor para maior)',
        type: [OfertaEmprestimoDto],
    }),
    __metadata("design:type", Array)
], ResultadoEmprestimoDto.prototype, "ofertas", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Número total de ofertas encontradas',
        example: 15,
    }),
    __metadata("design:type", Number)
], ResultadoEmprestimoDto.prototype, "totalOfertas", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Melhor oferta (menor taxa de juros)',
        type: OfertaEmprestimoDto,
    }),
    __metadata("design:type", OfertaEmprestimoDto)
], ResultadoEmprestimoDto.prototype, "melhorOferta", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tipo de pessoa da simulação',
        example: 'PF',
    }),
    __metadata("design:type", String)
], ResultadoEmprestimoDto.prototype, "tipoPessoa", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tipo de emprego (apenas para PF)',
        example: 'clt',
        required: false,
    }),
    __metadata("design:type", String)
], ResultadoEmprestimoDto.prototype, "tipoEmprego", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Dados de entrada da simulação',
        example: {
            valorDesejado: 10000,
            prazoMeses: 24,
            renda: 5000,
        },
    }),
    __metadata("design:type", Object)
], ResultadoEmprestimoDto.prototype, "inputData", void 0);
//# sourceMappingURL=resultado-emprestimo.dto.js.map