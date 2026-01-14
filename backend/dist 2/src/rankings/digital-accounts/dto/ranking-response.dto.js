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
exports.DigitalAccountsRankingResponseDto = exports.DigitalAccountRankingItemDto = exports.DigitalAccountFeaturesDto = exports.DigitalAccountScoreBreakdownDto = exports.DigitalAccountCriterionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class DigitalAccountCriterionDto {
    key;
    name;
    weight;
    type;
    description;
}
exports.DigitalAccountCriterionDto = DigitalAccountCriterionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Chave única do critério', example: 'tarifas' }),
    __metadata("design:type", String)
], DigitalAccountCriterionDto.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nome do critério', example: 'Tarifas e mensalidade' }),
    __metadata("design:type", String)
], DigitalAccountCriterionDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Peso aplicado no cálculo', example: 2.5 }),
    __metadata("design:type", Number)
], DigitalAccountCriterionDto.prototype, "weight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tipo do critério',
        enum: ['boolean', 'numeric', 'scale'],
        example: 'numeric',
    }),
    __metadata("design:type", String)
], DigitalAccountCriterionDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Descrição do critério',
        required: false,
        example: 'Avalia custo fixo mensal e isenções',
    }),
    __metadata("design:type", String)
], DigitalAccountCriterionDto.prototype, "description", void 0);
class DigitalAccountScoreBreakdownDto {
    key;
    name;
    raw_score;
    weight;
    contribution;
    percentage;
}
exports.DigitalAccountScoreBreakdownDto = DigitalAccountScoreBreakdownDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Chave do critério', example: 'tarifas' }),
    __metadata("design:type", String)
], DigitalAccountScoreBreakdownDto.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nome do critério', example: 'Tarifas e mensalidade' }),
    __metadata("design:type", String)
], DigitalAccountScoreBreakdownDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nota bruta (0-5)', example: 4.8 }),
    __metadata("design:type", Number)
], DigitalAccountScoreBreakdownDto.prototype, "raw_score", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Peso aplicado', example: 2.5 }),
    __metadata("design:type", Number)
], DigitalAccountScoreBreakdownDto.prototype, "weight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Contribuição ponderada', example: 12.0 }),
    __metadata("design:type", Number)
], DigitalAccountScoreBreakdownDto.prototype, "contribution", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Participação percentual no score final', example: 32.5 }),
    __metadata("design:type", Number)
], DigitalAccountScoreBreakdownDto.prototype, "percentage", void 0);
class DigitalAccountFeaturesDto {
    credit_card;
    debit_card;
    investments;
    boletos;
    saques_ilimitados;
    atendimento_humanizado;
}
exports.DigitalAccountFeaturesDto = DigitalAccountFeaturesDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Oferece cartão de crédito', example: true }),
    __metadata("design:type", Boolean)
], DigitalAccountFeaturesDto.prototype, "credit_card", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Oferece cartão de débito', example: true }),
    __metadata("design:type", Boolean)
], DigitalAccountFeaturesDto.prototype, "debit_card", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Possui investimentos integrados', example: true }),
    __metadata("design:type", Boolean)
], DigitalAccountFeaturesDto.prototype, "investments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Gera boletos sem custo', example: true }),
    __metadata("design:type", Boolean)
], DigitalAccountFeaturesDto.prototype, "boletos", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Saques ilimitados ou sem tarifa', example: true }),
    __metadata("design:type", Boolean)
], DigitalAccountFeaturesDto.prototype, "saques_ilimitados", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Atendimento humano disponível', example: true }),
    __metadata("design:type", Boolean)
], DigitalAccountFeaturesDto.prototype, "atendimento_humanizado", void 0);
class DigitalAccountRankingItemDto {
    id;
    name;
    bank;
    rank;
    isBestOption;
    logo;
    monthly_fee;
    account_type;
    score;
    url_ranking;
    call_to_action;
    highlights;
    features;
    scoreBreakdown;
    data_atualizacao;
}
exports.DigitalAccountRankingItemDto = DigitalAccountRankingItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Identificador da conta', example: 1 }),
    __metadata("design:type", Number)
], DigitalAccountRankingItemDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nome comercial', example: 'Banco Inter' }),
    __metadata("design:type", String)
], DigitalAccountRankingItemDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Instituição financeira', example: 'Banco Inter S.A.' }),
    __metadata("design:type", String)
], DigitalAccountRankingItemDto.prototype, "bank", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Posição no ranking (1 = melhor)', example: 1 }),
    __metadata("design:type", Number)
], DigitalAccountRankingItemDto.prototype, "rank", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Indica a melhor opção', example: true }),
    __metadata("design:type", Boolean)
], DigitalAccountRankingItemDto.prototype, "isBestOption", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Logo', example: 'https://.../inter.png' }),
    __metadata("design:type", String)
], DigitalAccountRankingItemDto.prototype, "logo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Mensalidade ou tarifa de manutenção', example: 0 }),
    __metadata("design:type", Number)
], DigitalAccountRankingItemDto.prototype, "monthly_fee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tipo de conta atendida',
        example: 'ambos',
    }),
    __metadata("design:type", String)
], DigitalAccountRankingItemDto.prototype, "account_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Score consolidado (0-5)', example: 4.8 }),
    __metadata("design:type", Number)
], DigitalAccountRankingItemDto.prototype, "score", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'URL de contratação ou avaliação', example: 'https://...' }),
    __metadata("design:type", String)
], DigitalAccountRankingItemDto.prototype, "url_ranking", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Texto do botão', example: 'Abrir conta' }),
    __metadata("design:type", String)
], DigitalAccountRankingItemDto.prototype, "call_to_action", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Principais destaques',
        type: [String],
    }),
    __metadata("design:type", Array)
], DigitalAccountRankingItemDto.prototype, "highlights", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Recursos e serviços',
        type: DigitalAccountFeaturesDto,
    }),
    __metadata("design:type", DigitalAccountFeaturesDto)
], DigitalAccountRankingItemDto.prototype, "features", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Detalhamento do score por critério',
        type: [DigitalAccountScoreBreakdownDto],
    }),
    __metadata("design:type", Array)
], DigitalAccountRankingItemDto.prototype, "scoreBreakdown", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Data de atualização exibida no front',
        example: '05/12/2024',
    }),
    __metadata("design:type", String)
], DigitalAccountRankingItemDto.prototype, "data_atualizacao", void 0);
class DigitalAccountsRankingResponseDto {
    items;
    total;
    bestOption;
    criteria;
    lastUpdated;
}
exports.DigitalAccountsRankingResponseDto = DigitalAccountsRankingResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [DigitalAccountRankingItemDto] }),
    __metadata("design:type", Array)
], DigitalAccountsRankingResponseDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total de contas ranqueadas', example: 5 }),
    __metadata("design:type", Number)
], DigitalAccountsRankingResponseDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: DigitalAccountRankingItemDto }),
    __metadata("design:type", DigitalAccountRankingItemDto)
], DigitalAccountsRankingResponseDto.prototype, "bestOption", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [DigitalAccountCriterionDto] }),
    __metadata("design:type", Array)
], DigitalAccountsRankingResponseDto.prototype, "criteria", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Data mais recente de atualização dos dados',
        example: new Date(),
        type: String,
    }),
    __metadata("design:type", Date)
], DigitalAccountsRankingResponseDto.prototype, "lastUpdated", void 0);
//# sourceMappingURL=ranking-response.dto.js.map