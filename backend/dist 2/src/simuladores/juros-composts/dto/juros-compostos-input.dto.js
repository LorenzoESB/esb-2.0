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
exports.JurosCompostosInputDto = exports.TempoAplicacaoUnidade = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
var TempoAplicacaoUnidade;
(function (TempoAplicacaoUnidade) {
    TempoAplicacaoUnidade["MESES"] = "meses";
    TempoAplicacaoUnidade["ANOS"] = "anos";
})(TempoAplicacaoUnidade || (exports.TempoAplicacaoUnidade = TempoAplicacaoUnidade = {}));
class JurosCompostosInputDto {
    nome;
    email;
    email_opt_in_simulation;
    valorInicial;
    aporteMensal;
    tempoAplicacao;
    tempoAplicacaoUnidade;
    taxaJuros;
}
exports.JurosCompostosInputDto = JurosCompostosInputDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nome completo do usuário',
        example: 'João da Silva',
    }),
    (0, class_validator_1.IsString)({ message: 'Nome deve ser uma string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Nome é obrigatório' }),
    __metadata("design:type", String)
], JurosCompostosInputDto.prototype, "nome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'E-mail do usuário',
        example: 'joao@exemplo.com',
    }),
    (0, class_validator_1.IsEmail)({}, { message: 'E-mail inválido' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'E-mail é obrigatório' }),
    __metadata("design:type", String)
], JurosCompostosInputDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Opt-in to receive simulation results via email',
        example: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], JurosCompostosInputDto.prototype, "email_opt_in_simulation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Initial investment amount',
        example: 10000,
        minimum: 0,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], JurosCompostosInputDto.prototype, "valorInicial", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Monthly contribution amount',
        example: 500,
        minimum: 0,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], JurosCompostosInputDto.prototype, "aporteMensal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Investment period',
        example: 3,
        minimum: 1,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Min)(1),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], JurosCompostosInputDto.prototype, "tempoAplicacao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Time unit for investment period',
        enum: TempoAplicacaoUnidade,
        example: TempoAplicacaoUnidade.ANOS,
    }),
    (0, class_validator_1.IsEnum)(TempoAplicacaoUnidade),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], JurosCompostosInputDto.prototype, "tempoAplicacaoUnidade", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Annual interest rate (percentage)',
        example: 11,
        minimum: 0,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], JurosCompostosInputDto.prototype, "taxaJuros", void 0);
//# sourceMappingURL=juros-compostos-input.dto.js.map