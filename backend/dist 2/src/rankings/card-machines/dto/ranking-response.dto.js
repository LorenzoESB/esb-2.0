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
exports.CardMachineRankingResponseDto = exports.CardMachineRankingItemDto = exports.MachinePricingDto = exports.MachineFeaturesDto = exports.MachinePlanDto = exports.RankingCriterionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class RankingCriterionDto {
    key;
    name;
    weight;
    type;
    description;
}
exports.RankingCriterionDto = RankingCriterionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique key for the criterion',
        example: 'competitive_rates',
    }),
    __metadata("design:type", String)
], RankingCriterionDto.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Display name of the criterion',
        example: 'Taxas Competitivas',
    }),
    __metadata("design:type", String)
], RankingCriterionDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Weight of this criterion in score calculation',
        example: 3.0,
    }),
    __metadata("design:type", Number)
], RankingCriterionDto.prototype, "weight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Type of criterion value',
        enum: ['boolean', 'numeric', 'scale'],
        example: 'numeric',
    }),
    __metadata("design:type", String)
], RankingCriterionDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Optional description of the criterion',
        example: 'Avalia o quão competitivas são as taxas',
        required: false,
    }),
    __metadata("design:type", String)
], RankingCriterionDto.prototype, "description", void 0);
class MachinePlanDto {
    id;
    nome;
    taxa_debito;
    taxa_credito_vista;
    taxa_credito_parcelado_min;
    dias_repasse_debito;
    dias_repasse_credito;
    avaliacao;
}
exports.MachinePlanDto = MachinePlanDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Plan ID',
        example: 1,
    }),
    __metadata("design:type", Number)
], MachinePlanDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Plan name',
        example: 'Plano Padrão',
    }),
    __metadata("design:type", String)
], MachinePlanDto.prototype, "nome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Debit rate (formatted percentage)',
        example: '1,69%',
    }),
    __metadata("design:type", String)
], MachinePlanDto.prototype, "taxa_debito", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Credit rate (formatted percentage)',
        example: '2,49%',
    }),
    __metadata("design:type", String)
], MachinePlanDto.prototype, "taxa_credito_vista", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Minimum installment credit rate (formatted percentage)',
        example: '3,49%',
    }),
    __metadata("design:type", String)
], MachinePlanDto.prototype, "taxa_credito_parcelado_min", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Days until debit payment',
        example: 1,
    }),
    __metadata("design:type", Number)
], MachinePlanDto.prototype, "dias_repasse_debito", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Days until credit payment',
        example: 1,
    }),
    __metadata("design:type", Number)
], MachinePlanDto.prototype, "dias_repasse_credito", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Plan rating (0-10)',
        example: 9.0,
    }),
    __metadata("design:type", Number)
], MachinePlanDto.prototype, "avaliacao", void 0);
class MachineFeaturesDto {
    chip;
    tarja;
    nfc;
    com_fio;
    imprime_recibo;
    precisa_smartphone;
    permite_antecipacao;
    atende_pf;
    atende_pj;
    vale_refeicao;
    ecommerce;
    max_parcelas;
    garantia;
    tipos_conexao;
    bandeiras;
    formas_recebimento;
}
exports.MachineFeaturesDto = MachineFeaturesDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Accepts chip cards', example: true }),
    __metadata("design:type", Boolean)
], MachineFeaturesDto.prototype, "chip", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Accepts magnetic stripe', example: true }),
    __metadata("design:type", Boolean)
], MachineFeaturesDto.prototype, "tarja", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Accepts NFC/contactless', example: true }),
    __metadata("design:type", Boolean)
], MachineFeaturesDto.prototype, "nfc", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Wired connection', example: false }),
    __metadata("design:type", Boolean)
], MachineFeaturesDto.prototype, "com_fio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Prints receipt', example: true }),
    __metadata("design:type", Boolean)
], MachineFeaturesDto.prototype, "imprime_recibo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Requires smartphone', example: false }),
    __metadata("design:type", Boolean)
], MachineFeaturesDto.prototype, "precisa_smartphone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Allows receivables anticipation',
        example: true,
    }),
    __metadata("design:type", Boolean)
], MachineFeaturesDto.prototype, "permite_antecipacao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Serves individuals (PF)', example: true }),
    __metadata("design:type", Boolean)
], MachineFeaturesDto.prototype, "atende_pf", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Serves businesses (PJ)', example: true }),
    __metadata("design:type", Boolean)
], MachineFeaturesDto.prototype, "atende_pj", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Accepts meal vouchers', example: false }),
    __metadata("design:type", Boolean)
], MachineFeaturesDto.prototype, "vale_refeicao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Has e-commerce option', example: false }),
    __metadata("design:type", Boolean)
], MachineFeaturesDto.prototype, "ecommerce", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Maximum installments', example: 12 }),
    __metadata("design:type", Number)
], MachineFeaturesDto.prototype, "max_parcelas", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Warranty in months',
        example: 12,
        nullable: true,
    }),
    __metadata("design:type", Object)
], MachineFeaturesDto.prototype, "garantia", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Connection types',
        example: ['Wi-Fi', '4G', 'Bluetooth'],
        type: [String],
    }),
    __metadata("design:type", Array)
], MachineFeaturesDto.prototype, "tipos_conexao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Accepted card brands',
        example: ['Visa', 'Mastercard', 'Elo'],
        type: [String],
    }),
    __metadata("design:type", Array)
], MachineFeaturesDto.prototype, "bandeiras", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Payment methods',
        example: ['Conta InfinitePay', 'PIX'],
        type: [String],
    }),
    __metadata("design:type", Array)
], MachineFeaturesDto.prototype, "formas_recebimento", void 0);
class MachinePricingDto {
    preco;
    preco_promocional;
    mensalidade;
}
exports.MachinePricingDto = MachinePricingDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Machine price',
        example: 0,
    }),
    __metadata("design:type", Number)
], MachinePricingDto.prototype, "preco", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Promotional price',
        example: null,
        nullable: true,
    }),
    __metadata("design:type", Object)
], MachinePricingDto.prototype, "preco_promocional", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Monthly fee',
        example: 0,
    }),
    __metadata("design:type", Number)
], MachinePricingDto.prototype, "mensalidade", void 0);
class CardMachineRankingItemDto {
    id;
    name;
    rank;
    isBestOption;
    empresa;
    logo;
    imagem;
    features;
    pricing;
    planos;
    observacoes;
    url_contratacao;
    cupom;
    transparencia;
    url_avaliacao;
    data_atualizacao;
}
exports.CardMachineRankingItemDto = CardMachineRankingItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Machine ID',
        example: 1,
    }),
    __metadata("design:type", Number)
], CardMachineRankingItemDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Machine name',
        example: 'InfinitePay',
    }),
    __metadata("design:type", String)
], CardMachineRankingItemDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Rank position (1 = best)',
        example: 1,
    }),
    __metadata("design:type", Number)
], CardMachineRankingItemDto.prototype, "rank", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether this is the best option',
        example: true,
    }),
    __metadata("design:type", Boolean)
], CardMachineRankingItemDto.prototype, "isBestOption", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Company name',
        example: 'InfinitePay',
    }),
    __metadata("design:type", String)
], CardMachineRankingItemDto.prototype, "empresa", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Company logo URL',
        example: 'https://example.com/logos/infinitepay.png',
    }),
    __metadata("design:type", String)
], CardMachineRankingItemDto.prototype, "logo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Machine image URL',
        example: 'https://example.com/maquininhas/infinitepay.png',
    }),
    __metadata("design:type", String)
], CardMachineRankingItemDto.prototype, "imagem", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Machine features',
        type: MachineFeaturesDto,
    }),
    __metadata("design:type", MachineFeaturesDto)
], CardMachineRankingItemDto.prototype, "features", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Pricing information',
        type: MachinePricingDto,
    }),
    __metadata("design:type", MachinePricingDto)
], CardMachineRankingItemDto.prototype, "pricing", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Available plans',
        type: [MachinePlanDto],
    }),
    __metadata("design:type", Array)
], CardMachineRankingItemDto.prototype, "planos", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Additional observations',
        example: 'Maquininha gratuita via celular com taxas muito competitivas',
        nullable: true,
    }),
    __metadata("design:type", Object)
], CardMachineRankingItemDto.prototype, "observacoes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Contracting URL',
        example: 'https://infinitepay.io',
    }),
    __metadata("design:type", String)
], CardMachineRankingItemDto.prototype, "url_contratacao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Coupon code',
        example: null,
        nullable: true,
    }),
    __metadata("design:type", Object)
], CardMachineRankingItemDto.prototype, "cupom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Transparency score (0-10)',
        example: 10,
        nullable: true,
    }),
    __metadata("design:type", Object)
], CardMachineRankingItemDto.prototype, "transparencia", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Review URL',
        example: 'https://blog.educandoseubolso.com.br/infinitepay',
        nullable: true,
    }),
    __metadata("design:type", Object)
], CardMachineRankingItemDto.prototype, "url_avaliacao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Last update date (DD/MM/YYYY)',
        example: '01/12/2024',
    }),
    __metadata("design:type", String)
], CardMachineRankingItemDto.prototype, "data_atualizacao", void 0);
class CardMachineRankingResponseDto {
    items;
    total;
    bestOption;
    criteria;
    lastUpdated;
}
exports.CardMachineRankingResponseDto = CardMachineRankingResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ranked card machines (sorted by rank)',
        type: [CardMachineRankingItemDto],
    }),
    __metadata("design:type", Array)
], CardMachineRankingResponseDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total number of machines in ranking',
        example: 10,
    }),
    __metadata("design:type", Number)
], CardMachineRankingResponseDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Best option (rank 1)',
        type: CardMachineRankingItemDto,
    }),
    __metadata("design:type", CardMachineRankingItemDto)
], CardMachineRankingResponseDto.prototype, "bestOption", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Criteria used for ranking',
        type: [RankingCriterionDto],
    }),
    __metadata("design:type", Array)
], CardMachineRankingResponseDto.prototype, "criteria", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'When the ranking was last updated',
        example: '2024-12-01T00:00:00.000Z',
    }),
    __metadata("design:type", Date)
], CardMachineRankingResponseDto.prototype, "lastUpdated", void 0);
//# sourceMappingURL=ranking-response.dto.js.map