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
exports.AmortizacaoInputDto = exports.AmortizacaoExtraordinariaDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class AmortizacaoExtraordinariaDto {
    valor;
    mesOcorrencia;
}
exports.AmortizacaoExtraordinariaDto = AmortizacaoExtraordinariaDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Extraordinary amortization amount',
        example: 22000,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], AmortizacaoExtraordinariaDto.prototype, "valor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Month when the extraordinary amortization occurs',
        example: 28,
        minimum: 1,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], AmortizacaoExtraordinariaDto.prototype, "mesOcorrencia", void 0);
class AmortizacaoInputDto {
    nome;
    email;
    email_opt_in_simulation;
    valorFinanciamento;
    taxaJurosAnual;
    prazoMeses;
    seguroMensal = 0;
    taxaAdministracao = 0;
    parcelaAtual;
    saldoDevedorAtual;
    amortizacoesExtraordinarias;
}
exports.AmortizacaoInputDto = AmortizacaoInputDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nome completo do usuário',
        example: 'João da Silva',
    }),
    (0, class_validator_1.IsString)({ message: 'Nome deve ser uma string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Nome é obrigatório' }),
    __metadata("design:type", String)
], AmortizacaoInputDto.prototype, "nome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'E-mail do usuário',
        example: 'joao@exemplo.com',
    }),
    (0, class_validator_1.IsEmail)({}, { message: 'E-mail inválido' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'E-mail é obrigatório' }),
    __metadata("design:type", String)
], AmortizacaoInputDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Opt-in to receive simulation results via email',
        example: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], AmortizacaoInputDto.prototype, "email_opt_in_simulation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Original loan amount',
        example: 128000,
        minimum: 1000,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Min)(1000),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], AmortizacaoInputDto.prototype, "valorFinanciamento", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Annual interest rate (percentage)',
        example: 9,
        minimum: 0,
        maximum: 100,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], AmortizacaoInputDto.prototype, "taxaJurosAnual", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Loan term in months',
        example: 360,
        minimum: 1,
        maximum: 600,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(600),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], AmortizacaoInputDto.prototype, "prazoMeses", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Monthly insurance amount',
        example: 40,
        default: 0,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], AmortizacaoInputDto.prototype, "seguroMensal", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Monthly administrative fee',
        example: 25,
        default: 0,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], AmortizacaoInputDto.prototype, "taxaAdministracao", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Current installment number',
        example: 28,
        minimum: 0,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], AmortizacaoInputDto.prototype, "parcelaAtual", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Current outstanding balance',
        example: 128000,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], AmortizacaoInputDto.prototype, "saldoDevedorAtual", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'List of extraordinary amortizations',
        type: [AmortizacaoExtraordinariaDto],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => AmortizacaoExtraordinariaDto),
    __metadata("design:type", Array)
], AmortizacaoInputDto.prototype, "amortizacoesExtraordinarias", void 0);
//# sourceMappingURL=amortizacao-input.dto.js.map