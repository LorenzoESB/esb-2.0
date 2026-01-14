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
exports.CarSubscriptionRankingResponseDto = exports.CarSubscriptionRankingItemDto = exports.CarSubscriptionBenefitsDto = exports.CarSubscriptionPricingDto = exports.CarSubscriptionScoreBreakdownDto = exports.CarSubscriptionCriterionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CarSubscriptionCriterionDto {
    key;
    name;
    weight;
    type;
    description;
}
exports.CarSubscriptionCriterionDto = CarSubscriptionCriterionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Chave do critério', example: 'custo_total' }),
    __metadata("design:type", String)
], CarSubscriptionCriterionDto.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nome', example: 'Custo total' }),
    __metadata("design:type", String)
], CarSubscriptionCriterionDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Peso', example: 2.25 }),
    __metadata("design:type", Number)
], CarSubscriptionCriterionDto.prototype, "weight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tipo de dado',
        enum: ['boolean', 'numeric', 'scale'],
    }),
    __metadata("design:type", String)
], CarSubscriptionCriterionDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Descrição',
        required: false,
    }),
    __metadata("design:type", String)
], CarSubscriptionCriterionDto.prototype, "description", void 0);
class CarSubscriptionScoreBreakdownDto {
    key;
    name;
    raw_score;
    weight;
    contribution;
    percentage;
}
exports.CarSubscriptionScoreBreakdownDto = CarSubscriptionScoreBreakdownDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Chave do critério', example: 'custo_total' }),
    __metadata("design:type", String)
], CarSubscriptionScoreBreakdownDto.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nome do critério', example: 'Custo total' }),
    __metadata("design:type", String)
], CarSubscriptionScoreBreakdownDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nota bruta (0-5)', example: 4.5 }),
    __metadata("design:type", Number)
], CarSubscriptionScoreBreakdownDto.prototype, "raw_score", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Peso', example: 2.25 }),
    __metadata("design:type", Number)
], CarSubscriptionScoreBreakdownDto.prototype, "weight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Contribuição ponderada', example: 10.12 }),
    __metadata("design:type", Number)
], CarSubscriptionScoreBreakdownDto.prototype, "contribution", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Participação percentual', example: 32.5 }),
    __metadata("design:type", Number)
], CarSubscriptionScoreBreakdownDto.prototype, "percentage", void 0);
class CarSubscriptionPricingDto {
    preco_mensal_min;
    preco_mensal_max;
    franquia_km;
}
exports.CarSubscriptionPricingDto = CarSubscriptionPricingDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Preço mensal mínimo', example: 1890 }),
    __metadata("design:type", Number)
], CarSubscriptionPricingDto.prototype, "preco_mensal_min", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Preço mensal máximo', example: 2690 }),
    __metadata("design:type", Number)
], CarSubscriptionPricingDto.prototype, "preco_mensal_max", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Franquia de km/mês', example: 1000 }),
    __metadata("design:type", Number)
], CarSubscriptionPricingDto.prototype, "franquia_km", void 0);
class CarSubscriptionBenefitsDto {
    manutencao_inclusa;
    seguro_incluso;
    ipva_incluso;
    revisao_inclusa;
    observacoes;
}
exports.CarSubscriptionBenefitsDto = CarSubscriptionBenefitsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Manutenção inclusa', example: true }),
    __metadata("design:type", Boolean)
], CarSubscriptionBenefitsDto.prototype, "manutencao_inclusa", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Seguro incluso', example: true }),
    __metadata("design:type", Boolean)
], CarSubscriptionBenefitsDto.prototype, "seguro_incluso", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'IPVA incluso', example: true }),
    __metadata("design:type", Boolean)
], CarSubscriptionBenefitsDto.prototype, "ipva_incluso", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Revisão inclusa', example: true }),
    __metadata("design:type", Boolean)
], CarSubscriptionBenefitsDto.prototype, "revisao_inclusa", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Observações adicionais',
        required: false,
        type: [String],
    }),
    __metadata("design:type", Array)
], CarSubscriptionBenefitsDto.prototype, "observacoes", void 0);
class CarSubscriptionRankingItemDto {
    id;
    name;
    empresa;
    rank;
    isBestOption;
    logo;
    score;
    pricing;
    beneficios;
    desconto;
    url_contratacao;
    scoreBreakdown;
    data_atualizacao;
}
exports.CarSubscriptionRankingItemDto = CarSubscriptionRankingItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID', example: 1 }),
    __metadata("design:type", Number)
], CarSubscriptionRankingItemDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nome do plano', example: 'Movida Mensal Flex' }),
    __metadata("design:type", String)
], CarSubscriptionRankingItemDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Empresa', example: 'Movida' }),
    __metadata("design:type", String)
], CarSubscriptionRankingItemDto.prototype, "empresa", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Posição', example: 1 }),
    __metadata("design:type", Number)
], CarSubscriptionRankingItemDto.prototype, "rank", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Melhor opção', example: true }),
    __metadata("design:type", Boolean)
], CarSubscriptionRankingItemDto.prototype, "isBestOption", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Logo', example: 'https://...' }),
    __metadata("design:type", String)
], CarSubscriptionRankingItemDto.prototype, "logo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Score (0-5)', example: 4.6 }),
    __metadata("design:type", Number)
], CarSubscriptionRankingItemDto.prototype, "score", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: CarSubscriptionPricingDto }),
    __metadata("design:type", CarSubscriptionPricingDto)
], CarSubscriptionRankingItemDto.prototype, "pricing", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: CarSubscriptionBenefitsDto }),
    __metadata("design:type", CarSubscriptionBenefitsDto)
], CarSubscriptionRankingItemDto.prototype, "beneficios", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Desconto ou benefício promocional', example: 'Primeiro mês grátis' }),
    __metadata("design:type", String)
], CarSubscriptionRankingItemDto.prototype, "desconto", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'URL de contratação', example: 'https://...' }),
    __metadata("design:type", String)
], CarSubscriptionRankingItemDto.prototype, "url_contratacao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Detalhamento do score por critério',
        type: [CarSubscriptionScoreBreakdownDto],
    }),
    __metadata("design:type", Array)
], CarSubscriptionRankingItemDto.prototype, "scoreBreakdown", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Data de atualização exibida no front',
        example: '04/12/2024',
    }),
    __metadata("design:type", String)
], CarSubscriptionRankingItemDto.prototype, "data_atualizacao", void 0);
class CarSubscriptionRankingResponseDto {
    items;
    total;
    bestOption;
    criteria;
    lastUpdated;
}
exports.CarSubscriptionRankingResponseDto = CarSubscriptionRankingResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [CarSubscriptionRankingItemDto] }),
    __metadata("design:type", Array)
], CarSubscriptionRankingResponseDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total de empresas', example: 5 }),
    __metadata("design:type", Number)
], CarSubscriptionRankingResponseDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: CarSubscriptionRankingItemDto }),
    __metadata("design:type", CarSubscriptionRankingItemDto)
], CarSubscriptionRankingResponseDto.prototype, "bestOption", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [CarSubscriptionCriterionDto] }),
    __metadata("design:type", Array)
], CarSubscriptionRankingResponseDto.prototype, "criteria", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Data mais recente de atualização',
        type: String,
    }),
    __metadata("design:type", Date)
], CarSubscriptionRankingResponseDto.prototype, "lastUpdated", void 0);
//# sourceMappingURL=ranking-response.dto.js.map