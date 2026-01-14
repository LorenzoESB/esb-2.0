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
exports.SimularEmprestimoDto = exports.TipoEmprego = exports.TipoPessoa = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
var TipoPessoa;
(function (TipoPessoa) {
    TipoPessoa["PF"] = "PF";
    TipoPessoa["PJ"] = "PJ";
})(TipoPessoa || (exports.TipoPessoa = TipoPessoa = {}));
var TipoEmprego;
(function (TipoEmprego) {
    TipoEmprego["APOSENTADO"] = "aposentado";
    TipoEmprego["CLT"] = "clt";
    TipoEmprego["SERVIDOR_PUBLICO"] = "servidor_publico";
})(TipoEmprego || (exports.TipoEmprego = TipoEmprego = {}));
class SimularEmprestimoDto {
    tipoPessoa;
    tipoEmprego;
    valorDesejado;
    prazoMeses;
    renda;
    nome;
    email;
    email_opt_in_simulation;
    compartilharDados;
    origem;
}
exports.SimularEmprestimoDto = SimularEmprestimoDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tipo de pessoa: PF (Pessoa Física) ou PJ (Pessoa Jurídica)',
        example: 'PF',
        enum: TipoPessoa,
    }),
    (0, class_validator_1.IsEnum)(TipoPessoa),
    __metadata("design:type", String)
], SimularEmprestimoDto.prototype, "tipoPessoa", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tipo de emprego (obrigatório apenas para PF): aposentado, clt, servidor_publico',
        example: 'clt',
        enum: TipoEmprego,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(TipoEmprego),
    __metadata("design:type", String)
], SimularEmprestimoDto.prototype, "tipoEmprego", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valor desejado do empréstimo',
        example: 10000,
        minimum: 0,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SimularEmprestimoDto.prototype, "valorDesejado", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Prazo desejado em meses',
        example: 24,
        minimum: 1,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SimularEmprestimoDto.prototype, "prazoMeses", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Renda mensal do solicitante (opcional)',
        example: 5000,
        minimum: 0,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SimularEmprestimoDto.prototype, "renda", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nome do solicitante',
        example: 'João Silva',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SimularEmprestimoDto.prototype, "nome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email do solicitante',
        example: 'joao@example.com',
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], SimularEmprestimoDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Opt-in to receive simulation results via email',
        example: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], SimularEmprestimoDto.prototype, "email_opt_in_simulation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Indica se o usuário permite compartilhar seus dados',
        example: true,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SimularEmprestimoDto.prototype, "compartilharDados", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Origem da simulação (para rastreamento)',
        example: 'web',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SimularEmprestimoDto.prototype, "origem", void 0);
//# sourceMappingURL=simular-emprestimo.dto.js.map