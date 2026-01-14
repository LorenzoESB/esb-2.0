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
exports.SimularAposentadoriaDto = exports.ModoCalculoAposentadoria = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
var ModoCalculoAposentadoria;
(function (ModoCalculoAposentadoria) {
    ModoCalculoAposentadoria["RECEBER"] = "RECEBER";
    ModoCalculoAposentadoria["CONTRIBUIR"] = "CONTRIBUIR";
})(ModoCalculoAposentadoria || (exports.ModoCalculoAposentadoria = ModoCalculoAposentadoria = {}));
class SimularAposentadoriaDto {
    nome;
    email;
    email_opt_in_simulation;
    modoCalculo;
    idadeAtual;
    idadeAposentadoria;
    valorJaAcumulado = 0;
    rendaMensalDesejada;
    contribuicaoMensal;
    incluirCenariosSaque = true;
}
exports.SimularAposentadoriaDto = SimularAposentadoriaDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nome completo do usuário',
        example: 'João da Silva',
    }),
    (0, class_validator_1.IsString)({ message: 'Nome deve ser uma string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Nome é obrigatório' }),
    __metadata("design:type", String)
], SimularAposentadoriaDto.prototype, "nome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'E-mail do usuário',
        example: 'joao@exemplo.com',
    }),
    (0, class_validator_1.IsEmail)({}, { message: 'E-mail inválido' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'E-mail é obrigatório' }),
    __metadata("design:type", String)
], SimularAposentadoriaDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Opt-in to receive simulation results via email',
        example: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], SimularAposentadoriaDto.prototype, "email_opt_in_simulation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: ModoCalculoAposentadoria,
        description: 'Modo de cálculo: RECEBER (calcula contribuição necessária) ou CONTRIBUIR (calcula renda futura)',
        example: ModoCalculoAposentadoria.RECEBER,
    }),
    (0, class_validator_1.IsEnum)(ModoCalculoAposentadoria, {
        message: 'Modo de cálculo deve ser RECEBER ou CONTRIBUIR',
    }),
    __metadata("design:type", String)
], SimularAposentadoriaDto.prototype, "modoCalculo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Idade atual em anos completos',
        example: 28,
        minimum: 0,
        maximum: 100,
    }),
    (0, class_validator_1.IsInt)({ message: 'Idade atual deve ser um número inteiro' }),
    (0, class_validator_1.Min)(0, { message: 'Idade atual deve ser no mínimo 0' }),
    (0, class_validator_1.Max)(100, { message: 'Idade atual deve ser no máximo 100' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SimularAposentadoriaDto.prototype, "idadeAtual", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Idade desejada para aposentadoria em anos completos',
        example: 50,
        minimum: 1,
        maximum: 100,
    }),
    (0, class_validator_1.IsInt)({ message: 'Idade de aposentadoria deve ser um número inteiro' }),
    (0, class_validator_1.Min)(1, { message: 'Idade de aposentadoria deve ser no mínimo 1' }),
    (0, class_validator_1.Max)(100, { message: 'Idade de aposentadoria deve ser no máximo 100' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SimularAposentadoriaDto.prototype, "idadeAposentadoria", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valor já acumulado em previdência privada (R$). Use 0 se não possui reserva.',
        example: 50000,
        minimum: 0,
        default: 0,
    }),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }, { message: 'Valor já acumulado deve ter no máximo 2 casas decimais' }),
    (0, class_validator_1.Min)(0, { message: 'Valor já acumulado não pode ser negativo' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SimularAposentadoriaDto.prototype, "valorJaAcumulado", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Renda mensal desejada na aposentadoria (R$). Obrigatório quando modoCalculo=RECEBER',
        example: 12000,
        minimum: 0.01,
        required: false,
    }),
    (0, class_validator_1.ValidateIf)((o) => o.modoCalculo === ModoCalculoAposentadoria.RECEBER),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }, { message: 'Renda mensal desejada deve ter no máximo 2 casas decimais' }),
    (0, class_validator_1.Min)(0.01, { message: 'Renda mensal desejada deve ser maior que zero' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SimularAposentadoriaDto.prototype, "rendaMensalDesejada", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Contribuição mensal que pretende fazer (R$). Obrigatório quando modoCalculo=CONTRIBUIR',
        example: 2000,
        minimum: 0.01,
        required: false,
    }),
    (0, class_validator_1.ValidateIf)((o) => o.modoCalculo === ModoCalculoAposentadoria.CONTRIBUIR),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }, { message: 'Contribuição mensal deve ter no máximo 2 casas decimais' }),
    (0, class_validator_1.Min)(0.01, { message: 'Contribuição mensal deve ser maior que zero' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SimularAposentadoriaDto.prototype, "contribuicaoMensal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Incluir análise de cenários de saque sustentável',
        example: true,
        default: true,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)({ message: 'incluirCenariosSaque deve ser true ou false' }),
    (0, class_transformer_1.Type)(() => Boolean),
    __metadata("design:type", Boolean)
], SimularAposentadoriaDto.prototype, "incluirCenariosSaque", void 0);
//# sourceMappingURL=simular-aposentadoria.dto.js.map