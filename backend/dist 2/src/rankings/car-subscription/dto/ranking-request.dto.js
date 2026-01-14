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
exports.CarSubscriptionRankingQueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CarSubscriptionRankingQueryDto {
    companies;
    max_preco_mensal;
    exige_seguro_incluso;
}
exports.CarSubscriptionRankingQueryDto = CarSubscriptionRankingQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        description: 'Filtrar por empresas (separadas por vírgula)',
        example: 'Movida,Unidas',
    }),
    (0, class_transformer_1.Transform)(({ value }) => typeof value === 'string'
        ? value.split(',').map((v) => v.trim()).filter(Boolean)
        : value),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CarSubscriptionRankingQueryDto.prototype, "companies", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Valor máximo mensal (R$)',
        example: 2500,
    }),
    (0, class_transformer_1.Transform)(({ value }) => (value !== undefined ? Number(value) : undefined)),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CarSubscriptionRankingQueryDto.prototype, "max_preco_mensal", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filtrar apenas opções com seguro incluso',
        example: true,
    }),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CarSubscriptionRankingQueryDto.prototype, "exige_seguro_incluso", void 0);
//# sourceMappingURL=ranking-request.dto.js.map