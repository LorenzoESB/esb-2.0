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
exports.ResultadoRendaFixaDto = exports.ResultadoModalidadeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const investimento_oferta_dto_1 = require("./investimento-oferta.dto");
class ResultadoModalidadeDto {
    taxa;
    resultado;
    imposto;
    rendimentoLiquido;
    percentualRendimento;
    percentualRendimentoMensal;
    percentualRendimentoAnual;
}
exports.ResultadoModalidadeDto = ResultadoModalidadeDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Taxa mensal aplicada (em decimal)',
        example: 0.005,
    }),
    __metadata("design:type", Number)
], ResultadoModalidadeDto.prototype, "taxa", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valor final após rendimento (montante líquido final)',
        example: 15000.5,
    }),
    __metadata("design:type", Number)
], ResultadoModalidadeDto.prototype, "resultado", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valor do imposto de renda retido (se aplicável)',
        example: 250.75,
    }),
    __metadata("design:type", Number)
], ResultadoModalidadeDto.prototype, "imposto", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Rendimento líquido (resultado - investimento total)',
        example: 4500.5,
    }),
    __metadata("design:type", Number)
], ResultadoModalidadeDto.prototype, "rendimentoLiquido", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Percentual de rendimento total sobre o período completo',
        example: 45.0,
    }),
    __metadata("design:type", Number)
], ResultadoModalidadeDto.prototype, "percentualRendimento", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Percentual de rendimento mensal (taxa do instrumento)',
        example: 1.08,
    }),
    __metadata("design:type", Number)
], ResultadoModalidadeDto.prototype, "percentualRendimentoMensal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Percentual de rendimento anual equivalente (taxa anualizada)',
        example: 13.62,
    }),
    __metadata("design:type", Number)
], ResultadoModalidadeDto.prototype, "percentualRendimentoAnual", void 0);
class ResultadoRendaFixaDto {
    poupanca;
    tesouroDireto;
    lci;
    cdb;
    melhorInvestimento;
    melhorRendimento;
    totalInvestido;
    taxaSelic;
    taxaCdi;
    taxaTr;
    ofertasDetalhadas;
    tipoOfertasDetalhadas;
}
exports.ResultadoRendaFixaDto = ResultadoRendaFixaDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Resultados para Poupança',
        type: ResultadoModalidadeDto,
    }),
    __metadata("design:type", ResultadoModalidadeDto)
], ResultadoRendaFixaDto.prototype, "poupanca", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Resultados para Tesouro Direto (Selic)',
        type: ResultadoModalidadeDto,
    }),
    __metadata("design:type", ResultadoModalidadeDto)
], ResultadoRendaFixaDto.prototype, "tesouroDireto", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Resultados para LCI (Letra de Crédito Imobiliário)',
        type: ResultadoModalidadeDto,
    }),
    __metadata("design:type", ResultadoModalidadeDto)
], ResultadoRendaFixaDto.prototype, "lci", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Resultados para CDB (Certificado de Depósito Bancário)',
        type: ResultadoModalidadeDto,
    }),
    __metadata("design:type", ResultadoModalidadeDto)
], ResultadoRendaFixaDto.prototype, "cdb", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nome do melhor investimento',
        example: 'LCI',
    }),
    __metadata("design:type", String)
], ResultadoRendaFixaDto.prototype, "melhorInvestimento", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Rendimento do melhor investimento',
        example: 5000.0,
    }),
    __metadata("design:type", Number)
], ResultadoRendaFixaDto.prototype, "melhorRendimento", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total investido (inicial + aportes)',
        example: 22000.0,
    }),
    __metadata("design:type", Number)
], ResultadoRendaFixaDto.prototype, "totalInvestido", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Taxa Selic anual vigente',
        example: 13.75,
    }),
    __metadata("design:type", Number)
], ResultadoRendaFixaDto.prototype, "taxaSelic", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Taxa CDI anual vigente',
        example: 13.65,
    }),
    __metadata("design:type", Number)
], ResultadoRendaFixaDto.prototype, "taxaCdi", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Taxa TR mensal vigente',
        example: 0.001,
    }),
    __metadata("design:type", Number)
], ResultadoRendaFixaDto.prototype, "taxaTr", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Lista de ofertas detalhadas de investimento do melhor tipo (CDB/LCI/Tesouro)',
        type: [investimento_oferta_dto_1.InvestimentoOfertaDto],
        example: [
            {
                corretora: 'XP Investimentos',
                emissor: 'Banco Daycoval',
                taxa: '115% CDI',
                vencimento: '2027-12-15',
                qtdMinima: 1000.0,
                vl: 12500.5,
            },
        ],
    }),
    __metadata("design:type", Array)
], ResultadoRendaFixaDto.prototype, "ofertasDetalhadas", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Tipo de investimento das ofertas detalhadas (pode diferir do melhorInvestimento se a API externa calculou diferente)',
        example: 'LCI',
    }),
    __metadata("design:type", String)
], ResultadoRendaFixaDto.prototype, "tipoOfertasDetalhadas", void 0);
//# sourceMappingURL=resultado-renda-fixa.dto.js.map