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
exports.TollPassRankingResponseDto = exports.TollPassRankingItemDto = exports.TollPassBenefitsDto = exports.TollPassPricingDto = exports.TollPassScoreBreakdownDto = exports.TollPassCriterionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class TollPassCriterionDto {
    key;
    name;
    weight;
    type;
    description;
}
exports.TollPassCriterionDto = TollPassCriterionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Chave do critério', example: 'custo_mensal' }),
    __metadata("design:type", String)
], TollPassCriterionDto.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nome do critério', example: 'Custo mensal' }),
    __metadata("design:type", String)
], TollPassCriterionDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Peso aplicado', example: 2 }),
    __metadata("design:type", Number)
], TollPassCriterionDto.prototype, "weight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tipo do critério',
        enum: ['boolean', 'numeric', 'scale'],
    }),
    __metadata("design:type", String)
], TollPassCriterionDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Descrição do critério',
        required: false,
    }),
    __metadata("design:type", String)
], TollPassCriterionDto.prototype, "description", void 0);
class TollPassScoreBreakdownDto {
    key;
    raw_score;
    weight;
    contribution;
    percentage;
    name;
}
exports.TollPassScoreBreakdownDto = TollPassScoreBreakdownDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Chave do critério', example: 'custo_mensal' }),
    __metadata("design:type", String)
], TollPassScoreBreakdownDto.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nota bruta (0-5)', example: 4.5 }),
    __metadata("design:type", Number)
], TollPassScoreBreakdownDto.prototype, "raw_score", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Peso aplicado', example: 2 }),
    __metadata("design:type", Number)
], TollPassScoreBreakdownDto.prototype, "weight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Contribuição ponderada', example: 9 }),
    __metadata("design:type", Number)
], TollPassScoreBreakdownDto.prototype, "contribution", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Participação percentual no score final',
        example: 34.5,
    }),
    __metadata("design:type", Number)
], TollPassScoreBreakdownDto.prototype, "percentage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nome do critério', example: 'Custo mensal' }),
    __metadata("design:type", String)
], TollPassScoreBreakdownDto.prototype, "name", void 0);
class TollPassPricingDto {
    mensalidade;
    adesao;
    taxa_instalacao;
}
exports.TollPassPricingDto = TollPassPricingDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Mensalidade', example: 0 }),
    __metadata("design:type", Number)
], TollPassPricingDto.prototype, "mensalidade", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Custo de adesão', example: 20 }),
    __metadata("design:type", Number)
], TollPassPricingDto.prototype, "adesao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Taxa de instalação (quando houver)',
        required: false,
        example: 0,
    }),
    __metadata("design:type", Number)
], TollPassPricingDto.prototype, "taxa_instalacao", void 0);
class TollPassBenefitsDto {
    estacionamento;
    cashback;
    parceiros;
}
exports.TollPassBenefitsDto = TollPassBenefitsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Válido em estacionamentos', example: true }),
    __metadata("design:type", Boolean)
], TollPassBenefitsDto.prototype, "estacionamento", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Oferece cashback ou pontos', example: false }),
    __metadata("design:type", Boolean)
], TollPassBenefitsDto.prototype, "cashback", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Parceiros com benefícios',
        type: [String],
    }),
    __metadata("design:type", Array)
], TollPassBenefitsDto.prototype, "parceiros", void 0);
class TollPassRankingItemDto {
    id;
    name;
    empresa;
    rank;
    isBestOption;
    logo;
    score;
    pricing;
    cobertura_rodovias;
    beneficios;
    tags_adicionais;
    url_contratacao;
    scoreBreakdown;
    data_atualizacao;
}
exports.TollPassRankingItemDto = TollPassRankingItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID', example: 1 }),
    __metadata("design:type", Number)
], TollPassRankingItemDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nome comercial', example: 'C6 Tag' }),
    __metadata("design:type", String)
], TollPassRankingItemDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Empresa responsável', example: 'C6 Bank' }),
    __metadata("design:type", String)
], TollPassRankingItemDto.prototype, "empresa", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Posição no ranking', example: 1 }),
    __metadata("design:type", Number)
], TollPassRankingItemDto.prototype, "rank", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Melhor opção', example: true }),
    __metadata("design:type", Boolean)
], TollPassRankingItemDto.prototype, "isBestOption", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Logo', example: 'https://...' }),
    __metadata("design:type", String)
], TollPassRankingItemDto.prototype, "logo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Score consolidado (0-5)', example: 4.7 }),
    __metadata("design:type", Number)
], TollPassRankingItemDto.prototype, "score", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: TollPassPricingDto }),
    __metadata("design:type", TollPassPricingDto)
], TollPassRankingItemDto.prototype, "pricing", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Cobertura estimada de rodovias/estacionamentos',
        example: 400,
    }),
    __metadata("design:type", Number)
], TollPassRankingItemDto.prototype, "cobertura_rodovias", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Benefícios adicionais',
        type: TollPassBenefitsDto,
    }),
    __metadata("design:type", TollPassBenefitsDto)
], TollPassRankingItemDto.prototype, "beneficios", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Lista de vantagens específicas',
        type: [String],
        required: false,
    }),
    __metadata("design:type", Array)
], TollPassRankingItemDto.prototype, "tags_adicionais", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'URL de contratação', example: 'https://...' }),
    __metadata("design:type", String)
], TollPassRankingItemDto.prototype, "url_contratacao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Detalhamento do score',
        type: [TollPassScoreBreakdownDto],
    }),
    __metadata("design:type", Array)
], TollPassRankingItemDto.prototype, "scoreBreakdown", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Data de atualização exibida no front',
        example: '03/12/2024',
    }),
    __metadata("design:type", String)
], TollPassRankingItemDto.prototype, "data_atualizacao", void 0);
class TollPassRankingResponseDto {
    items;
    total;
    bestOption;
    criteria;
    lastUpdated;
}
exports.TollPassRankingResponseDto = TollPassRankingResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [TollPassRankingItemDto] }),
    __metadata("design:type", Array)
], TollPassRankingResponseDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total de empresas', example: 5 }),
    __metadata("design:type", Number)
], TollPassRankingResponseDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: TollPassRankingItemDto }),
    __metadata("design:type", TollPassRankingItemDto)
], TollPassRankingResponseDto.prototype, "bestOption", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [TollPassCriterionDto] }),
    __metadata("design:type", Array)
], TollPassRankingResponseDto.prototype, "criteria", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Data mais recente de atualização',
        type: String,
        example: new Date(),
    }),
    __metadata("design:type", Date)
], TollPassRankingResponseDto.prototype, "lastUpdated", void 0);
//# sourceMappingURL=ranking-response.dto.js.map