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
exports.DigitalAccountsRankingQueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class DigitalAccountsRankingQueryDto {
    companies;
    tipo_conta;
    max_mensalidade;
    exige_cartao_credito;
    exige_investimentos;
}
exports.DigitalAccountsRankingQueryDto = DigitalAccountsRankingQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        description: 'Filtrar por nomes de banco/fintech (separados por vírgula)',
        example: 'Banco Inter,Nubank',
    }),
    (0, class_transformer_1.Transform)(({ value }) => typeof value === 'string'
        ? value.split(',').map((v) => v.trim()).filter(Boolean)
        : value),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], DigitalAccountsRankingQueryDto.prototype, "companies", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filtrar por tipo de conta',
        enum: ['pf', 'pj', 'ambos'],
        example: 'pf',
    }),
    (0, class_validator_1.IsEnum)(['pf', 'pj', 'ambos']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], DigitalAccountsRankingQueryDto.prototype, "tipo_conta", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Limite máximo de mensalidade (R$)',
        example: 10,
    }),
    (0, class_transformer_1.Transform)(({ value }) => (value !== undefined ? Number(value) : undefined)),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], DigitalAccountsRankingQueryDto.prototype, "max_mensalidade", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Exibir apenas contas com cartão de crédito disponível',
        example: true,
    }),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], DigitalAccountsRankingQueryDto.prototype, "exige_cartao_credito", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Exibir apenas contas com investimentos integrados',
        example: true,
    }),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], DigitalAccountsRankingQueryDto.prototype, "exige_investimentos", void 0);
//# sourceMappingURL=ranking-request.dto.js.map