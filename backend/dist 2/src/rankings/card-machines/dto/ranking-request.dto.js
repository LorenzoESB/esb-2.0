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
exports.CardMachineRankingQueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CardMachineRankingQueryDto {
    nfc;
    imprime_recibo;
    precisa_smartphone;
    permite_antecipacao;
    vale_refeicao;
    ecommerce;
    companies;
    sem_mensalidade;
}
exports.CardMachineRankingQueryDto = CardMachineRankingQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by NFC support',
        example: true,
        type: Boolean,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === 'true')
            return true;
        if (value === 'false')
            return false;
        return value;
    }),
    __metadata("design:type", Boolean)
], CardMachineRankingQueryDto.prototype, "nfc", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by receipt printer',
        example: true,
        type: Boolean,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === 'true')
            return true;
        if (value === 'false')
            return false;
        return value;
    }),
    __metadata("design:type", Boolean)
], CardMachineRankingQueryDto.prototype, "imprime_recibo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by smartphone requirement',
        example: false,
        type: Boolean,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === 'true')
            return true;
        if (value === 'false')
            return false;
        return value;
    }),
    __metadata("design:type", Boolean)
], CardMachineRankingQueryDto.prototype, "precisa_smartphone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by receivables anticipation',
        example: true,
        type: Boolean,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === 'true')
            return true;
        if (value === 'false')
            return false;
        return value;
    }),
    __metadata("design:type", Boolean)
], CardMachineRankingQueryDto.prototype, "permite_antecipacao", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by meal voucher acceptance',
        example: true,
        type: Boolean,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === 'true')
            return true;
        if (value === 'false')
            return false;
        return value;
    }),
    __metadata("design:type", Boolean)
], CardMachineRankingQueryDto.prototype, "vale_refeicao", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by e-commerce option',
        example: true,
        type: Boolean,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === 'true')
            return true;
        if (value === 'false')
            return false;
        return value;
    }),
    __metadata("design:type", Boolean)
], CardMachineRankingQueryDto.prototype, "ecommerce", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by company names (comma-separated)',
        example: 'InfinitePay,PagSeguro',
        type: String,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (typeof value === 'string') {
            return value.split(',').map((s) => s.trim());
        }
        return value;
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CardMachineRankingQueryDto.prototype, "companies", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by zero monthly fee',
        example: true,
        type: Boolean,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === 'true')
            return true;
        if (value === 'false')
            return false;
        return value;
    }),
    __metadata("design:type", Boolean)
], CardMachineRankingQueryDto.prototype, "sem_mensalidade", void 0);
//# sourceMappingURL=ranking-request.dto.js.map