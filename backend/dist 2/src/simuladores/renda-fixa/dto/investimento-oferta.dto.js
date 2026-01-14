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
exports.OfertaTesouroDto = exports.InvestimentoOfertaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class InvestimentoOfertaDto {
    corretora;
    emissor;
    taxa;
    vencimento;
    qtdMinima;
    vl;
}
exports.InvestimentoOfertaDto = InvestimentoOfertaDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nome da corretora',
        example: 'XP Investimentos',
    }),
    __metadata("design:type", String)
], InvestimentoOfertaDto.prototype, "corretora", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nome do emissor/banco',
        example: 'Banco Daycoval',
    }),
    __metadata("design:type", String)
], InvestimentoOfertaDto.prototype, "emissor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Taxa bruta do investimento',
        example: '115% CDI',
    }),
    __metadata("design:type", String)
], InvestimentoOfertaDto.prototype, "taxa", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Data de vencimento',
        example: '2027-12-15',
    }),
    __metadata("design:type", String)
], InvestimentoOfertaDto.prototype, "vencimento", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Quantidade mínima para investir',
        example: 1000.0,
    }),
    __metadata("design:type", Number)
], InvestimentoOfertaDto.prototype, "qtdMinima", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valor líquido após impostos',
        example: 12500.5,
    }),
    __metadata("design:type", Number)
], InvestimentoOfertaDto.prototype, "vl", void 0);
class OfertaTesouroDto {
    nom;
    tipo;
    tx;
    data_vencto;
    vlr;
}
exports.OfertaTesouroDto = OfertaTesouroDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nome do título',
        example: 'Tesouro Selic 2029',
    }),
    __metadata("design:type", String)
], OfertaTesouroDto.prototype, "nom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tipo do título',
        example: 'SELIC',
    }),
    __metadata("design:type", String)
], OfertaTesouroDto.prototype, "tipo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Taxa do título',
        example: 13.75,
    }),
    __metadata("design:type", Number)
], OfertaTesouroDto.prototype, "tx", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Data de vencimento',
        example: '2029-03-01',
    }),
    __metadata("design:type", String)
], OfertaTesouroDto.prototype, "data_vencto", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valor do título',
        example: 15000.0,
    }),
    __metadata("design:type", Number)
], OfertaTesouroDto.prototype, "vlr", void 0);
//# sourceMappingURL=investimento-oferta.dto.js.map