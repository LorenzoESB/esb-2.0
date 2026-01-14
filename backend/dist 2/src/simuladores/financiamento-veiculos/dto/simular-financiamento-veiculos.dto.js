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
exports.SimularFinanciamentoVeiculosDto = exports.TipoVeiculo = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
var TipoVeiculo;
(function (TipoVeiculo) {
    TipoVeiculo["NOVO"] = "novo";
    TipoVeiculo["USADO"] = "usado";
})(TipoVeiculo || (exports.TipoVeiculo = TipoVeiculo = {}));
class SimularFinanciamentoVeiculosDto {
    valorVeiculo;
    valorEntrada;
    prazoMeses;
    rendaMensal;
    tipoVeiculo;
    nome;
    email;
    email_opt_in_simulation;
}
exports.SimularFinanciamentoVeiculosDto = SimularFinanciamentoVeiculosDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valor total do veículo',
        example: 80000,
        minimum: 0,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SimularFinanciamentoVeiculosDto.prototype, "valorVeiculo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valor da entrada',
        example: 20000,
        minimum: 0,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SimularFinanciamentoVeiculosDto.prototype, "valorEntrada", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Prazo do financiamento em meses',
        example: 48,
        minimum: 6,
        maximum: 60,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(6),
    (0, class_validator_1.Max)(60),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SimularFinanciamentoVeiculosDto.prototype, "prazoMeses", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Renda mensal do solicitante',
        example: 8000,
        minimum: 0,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SimularFinanciamentoVeiculosDto.prototype, "rendaMensal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tipo de veículo (novo ou usado)',
        example: 'novo',
        enum: TipoVeiculo,
    }),
    (0, class_validator_1.IsEnum)(TipoVeiculo),
    __metadata("design:type", String)
], SimularFinanciamentoVeiculosDto.prototype, "tipoVeiculo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nome do solicitante',
        example: 'João Silva',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SimularFinanciamentoVeiculosDto.prototype, "nome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email do solicitante',
        example: 'joao@example.com',
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], SimularFinanciamentoVeiculosDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Opt-in to receive simulation results via email',
        example: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], SimularFinanciamentoVeiculosDto.prototype, "email_opt_in_simulation", void 0);
//# sourceMappingURL=simular-financiamento-veiculos.dto.js.map