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
exports.SimularRendaFixaDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class SimularRendaFixaDto {
    nome;
    email;
    email_opt_in_simulation;
    investimentoInicial;
    prazoMeses;
}
exports.SimularRendaFixaDto = SimularRendaFixaDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nome completo do usuário',
        example: 'João da Silva',
    }),
    (0, class_validator_1.IsString)({ message: 'Nome deve ser uma string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Nome é obrigatório' }),
    __metadata("design:type", String)
], SimularRendaFixaDto.prototype, "nome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'E-mail do usuário',
        example: 'joao@exemplo.com',
    }),
    (0, class_validator_1.IsEmail)({}, { message: 'E-mail inválido' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'E-mail é obrigatório' }),
    __metadata("design:type", String)
], SimularRendaFixaDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Opt-in to receive simulation results via email',
        example: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], SimularRendaFixaDto.prototype, "email_opt_in_simulation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valor inicial do investimento em reais',
        example: 10000,
        minimum: 0,
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'Investimento inicial deve ser um número' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Investimento inicial é obrigatório' }),
    (0, class_validator_1.Min)(0, { message: 'Investimento inicial deve ser maior ou igual a zero' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SimularRendaFixaDto.prototype, "investimentoInicial", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Prazo do investimento em meses',
        example: 24,
        minimum: 1,
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'Prazo deve ser um número' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Prazo é obrigatório' }),
    (0, class_validator_1.Min)(1, { message: 'Prazo deve ser pelo menos 1 mês' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SimularRendaFixaDto.prototype, "prazoMeses", void 0);
//# sourceMappingURL=simular-renda-fixa.dto.js.map