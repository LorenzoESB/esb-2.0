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
exports.SimularFinanciamentoImovelDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class SimularFinanciamentoImovelDto {
    valorImovel;
    valorEntrada;
    prazoMeses;
    rendaMensal;
    nome;
    email;
    email_opt_in_simulation;
}
exports.SimularFinanciamentoImovelDto = SimularFinanciamentoImovelDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valor total do imóvel',
        example: 500000,
        minimum: 0,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SimularFinanciamentoImovelDto.prototype, "valorImovel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valor da entrada',
        example: 100000,
        minimum: 0,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SimularFinanciamentoImovelDto.prototype, "valorEntrada", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Prazo do financiamento em meses',
        example: 360,
        minimum: 1,
        maximum: 420,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(420),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SimularFinanciamentoImovelDto.prototype, "prazoMeses", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Renda mensal do solicitante',
        example: 10000,
        minimum: 0,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SimularFinanciamentoImovelDto.prototype, "rendaMensal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nome do solicitante',
        example: 'Maria Silva',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SimularFinanciamentoImovelDto.prototype, "nome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email do solicitante',
        example: 'maria@example.com',
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], SimularFinanciamentoImovelDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Opt-in to receive simulation results via email',
        example: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], SimularFinanciamentoImovelDto.prototype, "email_opt_in_simulation", void 0);
//# sourceMappingURL=simular-financiamento-imovel.dto.js.map