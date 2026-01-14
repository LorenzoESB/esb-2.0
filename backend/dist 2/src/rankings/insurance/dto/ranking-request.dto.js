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
exports.InsuranceRankingQueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class InsuranceRankingQueryDto {
    companies;
    cobertura_total;
    assistencia_24h;
    carro_reserva;
    max_preco_mensal;
}
exports.InsuranceRankingQueryDto = InsuranceRankingQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by companies (comma-separated)',
        example: 'Azul Seguros,Porto Seguro',
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
], InsuranceRankingQueryDto.prototype, "companies", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by full coverage availability',
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
], InsuranceRankingQueryDto.prototype, "cobertura_total", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by 24h assistance availability',
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
], InsuranceRankingQueryDto.prototype, "assistencia_24h", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by availability of rental car coverage',
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
], InsuranceRankingQueryDto.prototype, "carro_reserva", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Maximum estimated monthly price',
        example: 450,
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        const parsed = parseFloat(value);
        return Number.isNaN(parsed) ? value : parsed;
    }),
    __metadata("design:type", Number)
], InsuranceRankingQueryDto.prototype, "max_preco_mensal", void 0);
//# sourceMappingURL=ranking-request.dto.js.map