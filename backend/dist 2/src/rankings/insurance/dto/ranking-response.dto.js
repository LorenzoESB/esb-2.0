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
exports.InsuranceRankingResponseDto = exports.InsuranceRankingItemDto = exports.InsurancePricingDto = exports.InsuranceServicesDto = exports.InsuranceCoverageDto = exports.InsuranceScoreBreakdownDto = exports.InsuranceRankingCriterionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class InsuranceRankingCriterionDto {
    key;
    name;
    weight;
    type;
    description;
}
exports.InsuranceRankingCriterionDto = InsuranceRankingCriterionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique key for the criterion',
        example: 'price_competitiveness',
    }),
    __metadata("design:type", String)
], InsuranceRankingCriterionDto.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Display name of the criterion',
        example: 'Preço Competitivo',
    }),
    __metadata("design:type", String)
], InsuranceRankingCriterionDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Weight of this criterion in score calculation',
        example: 2.5,
    }),
    __metadata("design:type", Number)
], InsuranceRankingCriterionDto.prototype, "weight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Type of criterion value',
        enum: ['boolean', 'numeric', 'scale'],
        example: 'numeric',
    }),
    __metadata("design:type", String)
], InsuranceRankingCriterionDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Optional description of the criterion',
        example: 'Competitividade dos preços de franquia e mensalidade',
        required: false,
    }),
    __metadata("design:type", String)
], InsuranceRankingCriterionDto.prototype, "description", void 0);
class InsuranceScoreBreakdownDto {
    key;
    name;
    raw_score;
    weight;
    contribution;
    percentage;
}
exports.InsuranceScoreBreakdownDto = InsuranceScoreBreakdownDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Criterion key',
        example: 'price_competitiveness',
    }),
    __metadata("design:type", String)
], InsuranceScoreBreakdownDto.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Criterion display name',
        example: 'Preço Competitivo',
    }),
    __metadata("design:type", String)
], InsuranceScoreBreakdownDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Raw score (0-10)',
        example: 9.5,
    }),
    __metadata("design:type", Number)
], InsuranceScoreBreakdownDto.prototype, "raw_score", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Weight applied to the criterion',
        example: 2.5,
    }),
    __metadata("design:type", Number)
], InsuranceScoreBreakdownDto.prototype, "weight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Weighted contribution to final score',
        example: 1.32,
    }),
    __metadata("design:type", Number)
], InsuranceScoreBreakdownDto.prototype, "contribution", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Percentage contribution to final score',
        example: 18.4,
    }),
    __metadata("design:type", Number)
], InsuranceScoreBreakdownDto.prototype, "percentage", void 0);
class InsuranceCoverageDto {
    cobertura_basica;
    cobertura_total;
    cobertura_terceiros;
    vidros;
    roubo_furto;
    colisao;
    incendio;
    fenomenos_naturais;
    assistencia_24h;
    carro_reserva;
}
exports.InsuranceCoverageDto = InsuranceCoverageDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Basic coverage', example: true }),
    __metadata("design:type", Boolean)
], InsuranceCoverageDto.prototype, "cobertura_basica", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Full coverage', example: true }),
    __metadata("design:type", Boolean)
], InsuranceCoverageDto.prototype, "cobertura_total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Third-party coverage', example: true }),
    __metadata("design:type", Boolean)
], InsuranceCoverageDto.prototype, "cobertura_terceiros", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Glass coverage', example: true }),
    __metadata("design:type", Boolean)
], InsuranceCoverageDto.prototype, "vidros", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Theft coverage', example: true }),
    __metadata("design:type", Boolean)
], InsuranceCoverageDto.prototype, "roubo_furto", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Collision coverage', example: true }),
    __metadata("design:type", Boolean)
], InsuranceCoverageDto.prototype, "colisao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Fire coverage', example: true }),
    __metadata("design:type", Boolean)
], InsuranceCoverageDto.prototype, "incendio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Natural events coverage', example: true }),
    __metadata("design:type", Boolean)
], InsuranceCoverageDto.prototype, "fenomenos_naturais", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '24/7 assistance', example: true }),
    __metadata("design:type", Boolean)
], InsuranceCoverageDto.prototype, "assistencia_24h", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Rental car availability', example: true }),
    __metadata("design:type", Boolean)
], InsuranceCoverageDto.prototype, "carro_reserva", void 0);
class InsuranceServicesDto {
    atendimento_online;
    app_mobile;
    guincho_km;
    oficinas_referenciadas;
    desconto_bom_motorista;
    desconto_garagem;
}
exports.InsuranceServicesDto = InsuranceServicesDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Online support available', example: true }),
    __metadata("design:type", Boolean)
], InsuranceServicesDto.prototype, "atendimento_online", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Mobile app available', example: true }),
    __metadata("design:type", Boolean)
], InsuranceServicesDto.prototype, "app_mobile", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Towing kilometers (null = unlimited)',
        example: null,
        nullable: true,
    }),
    __metadata("design:type", Object)
], InsuranceServicesDto.prototype, "guincho_km", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Number of partner workshops',
        example: 5000,
        nullable: true,
    }),
    __metadata("design:type", Object)
], InsuranceServicesDto.prototype, "oficinas_referenciadas", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Safe driver discount', example: true }),
    __metadata("design:type", Boolean)
], InsuranceServicesDto.prototype, "desconto_bom_motorista", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Garage discount', example: true }),
    __metadata("design:type", Boolean)
], InsuranceServicesDto.prototype, "desconto_garagem", void 0);
class InsurancePricingDto {
    franquia_minima;
    franquia_maxima;
    preco_mensal_estimado_min;
    preco_mensal_estimado_max;
}
exports.InsurancePricingDto = InsurancePricingDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Minimum deductible amount', example: 1500 }),
    __metadata("design:type", Number)
], InsurancePricingDto.prototype, "franquia_minima", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Maximum deductible amount', example: 3000 }),
    __metadata("design:type", Number)
], InsurancePricingDto.prototype, "franquia_maxima", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Minimum estimated monthly price',
        example: 150,
    }),
    __metadata("design:type", Number)
], InsurancePricingDto.prototype, "preco_mensal_estimado_min", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Maximum estimated monthly price',
        example: 400,
    }),
    __metadata("design:type", Number)
], InsurancePricingDto.prototype, "preco_mensal_estimado_max", void 0);
class InsuranceRankingItemDto {
    id;
    name;
    rank;
    isBestOption;
    company;
    logo;
    score;
    coverage;
    services;
    pricing;
    avaliacao_clientes;
    tempo_mercado_anos;
    sinistros_aprovados_percentual;
    observacoes;
    url_contratacao;
    url_avaliacao;
    data_atualizacao;
    scoreBreakdown;
}
exports.InsuranceRankingItemDto = InsuranceRankingItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Insurance ID', example: 1 }),
    __metadata("design:type", Number)
], InsuranceRankingItemDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Display name', example: 'Azul Seguros' }),
    __metadata("design:type", String)
], InsuranceRankingItemDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Rank position (1 = best)', example: 1 }),
    __metadata("design:type", Number)
], InsuranceRankingItemDto.prototype, "rank", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether this is the best option',
        example: true,
    }),
    __metadata("design:type", Boolean)
], InsuranceRankingItemDto.prototype, "isBestOption", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Insurance company legal name',
        example: 'Azul Companhia de Seguros Gerais',
    }),
    __metadata("design:type", String)
], InsuranceRankingItemDto.prototype, "company", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Logo URL',
        example: 'https://example.com/logos/azul-seguros.png',
    }),
    __metadata("design:type", String)
], InsuranceRankingItemDto.prototype, "logo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Final calculated score (0-10)',
        example: 9.05,
    }),
    __metadata("design:type", Number)
], InsuranceRankingItemDto.prototype, "score", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Coverage details' }),
    __metadata("design:type", InsuranceCoverageDto)
], InsuranceRankingItemDto.prototype, "coverage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Services offered' }),
    __metadata("design:type", InsuranceServicesDto)
], InsuranceRankingItemDto.prototype, "services", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Pricing information' }),
    __metadata("design:type", InsurancePricingDto)
], InsuranceRankingItemDto.prototype, "pricing", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Customer rating (0-5)', example: 4.8 }),
    __metadata("design:type", Number)
], InsuranceRankingItemDto.prototype, "avaliacao_clientes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Years in the market',
        example: 15,
    }),
    __metadata("design:type", Number)
], InsuranceRankingItemDto.prototype, "tempo_mercado_anos", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Claim approval rate in percentage',
        example: 92,
    }),
    __metadata("design:type", Number)
], InsuranceRankingItemDto.prototype, "sinistros_aprovados_percentual", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Observations or notes',
        example: 'Cobertura completa e excelente atendimento',
        nullable: true,
    }),
    __metadata("design:type", Object)
], InsuranceRankingItemDto.prototype, "observacoes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL for contracting the insurance',
        example: 'https://azulseguros.com.br',
    }),
    __metadata("design:type", String)
], InsuranceRankingItemDto.prototype, "url_contratacao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL for detailed review',
        example: 'https://blog.educandoseubolso.com.br/azul-seguros',
        nullable: true,
    }),
    __metadata("design:type", Object)
], InsuranceRankingItemDto.prototype, "url_avaliacao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Last update date (locale string)',
        example: '01/12/2024',
    }),
    __metadata("design:type", String)
], InsuranceRankingItemDto.prototype, "data_atualizacao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Score breakdown per criterion',
        type: [InsuranceScoreBreakdownDto],
    }),
    __metadata("design:type", Array)
], InsuranceRankingItemDto.prototype, "scoreBreakdown", void 0);
class InsuranceRankingResponseDto {
    items;
    total;
    bestOption;
    criteria;
    lastUpdated;
}
exports.InsuranceRankingResponseDto = InsuranceRankingResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [InsuranceRankingItemDto] }),
    __metadata("design:type", Array)
], InsuranceRankingResponseDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total items', example: 10 }),
    __metadata("design:type", Number)
], InsuranceRankingResponseDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Best option in the ranking' }),
    __metadata("design:type", InsuranceRankingItemDto)
], InsuranceRankingResponseDto.prototype, "bestOption", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Criteria used for the ranking',
        type: [InsuranceRankingCriterionDto],
    }),
    __metadata("design:type", Array)
], InsuranceRankingResponseDto.prototype, "criteria", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date of the last update',
        example: new Date('2024-12-01'),
    }),
    __metadata("design:type", Date)
], InsuranceRankingResponseDto.prototype, "lastUpdated", void 0);
//# sourceMappingURL=ranking-response.dto.js.map