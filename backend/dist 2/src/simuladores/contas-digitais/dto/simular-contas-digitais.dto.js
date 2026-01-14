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
exports.SimularContasDigitaisJuridicaDto = exports.SimularContasDigitaisFisicaDto = exports.SimularContasDigitaisBaseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const contas_digitais_data_1 = require("../data/contas-digitais.data");
class SimularContasDigitaisBaseDto {
    tipoPessoa;
    temConta;
    tarifa;
    saques;
    nDocs;
    nTeds;
    debito;
    nome;
    email;
    email_opt_in_simulation;
}
exports.SimularContasDigitaisBaseDto = SimularContasDigitaisBaseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tipo de pessoa',
        example: 'fisica',
        enum: contas_digitais_data_1.TipoPessoa,
    }),
    (0, class_validator_1.IsEnum)(contas_digitais_data_1.TipoPessoa),
    __metadata("design:type", String)
], SimularContasDigitaisBaseDto.prototype, "tipoPessoa", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Já possui conta digital?',
        example: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SimularContasDigitaisBaseDto.prototype, "temConta", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tarifa mensal atual (se já possui conta)',
        example: 29.9,
        required: false,
        minimum: 0,
    }),
    (0, class_validator_1.ValidateIf)((o) => o.temConta === true),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SimularContasDigitaisBaseDto.prototype, "tarifa", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Número de saques por mês',
        example: 4,
        minimum: 0,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SimularContasDigitaisBaseDto.prototype, "saques", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Número de DOCs por mês',
        example: 0,
        minimum: 0,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SimularContasDigitaisBaseDto.prototype, "nDocs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Número de TEDs/PIX por mês',
        example: 10,
        minimum: 0,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SimularContasDigitaisBaseDto.prototype, "nTeds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Deseja cartão de débito?',
        example: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SimularContasDigitaisBaseDto.prototype, "debito", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nome do solicitante',
        example: 'João Silva',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SimularContasDigitaisBaseDto.prototype, "nome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email do solicitante',
        example: 'joao@example.com',
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], SimularContasDigitaisBaseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Opt-in to receive simulation results via email',
        example: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], SimularContasDigitaisBaseDto.prototype, "email_opt_in_simulation", void 0);
class SimularContasDigitaisFisicaDto extends SimularContasDigitaisBaseDto {
    nDepositos;
    credito;
    investimentos;
    transferencias;
    depCheque;
}
exports.SimularContasDigitaisFisicaDto = SimularContasDigitaisFisicaDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tipo de pessoa',
        example: 'fisica',
        enum: [contas_digitais_data_1.TipoPessoa.FISICA],
    }),
    (0, class_validator_1.IsEnum)([contas_digitais_data_1.TipoPessoa.FISICA]),
    __metadata("design:type", String)
], SimularContasDigitaisFisicaDto.prototype, "tipoPessoa", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Número de depósitos por mês',
        example: 2,
        minimum: 0,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SimularContasDigitaisFisicaDto.prototype, "nDepositos", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Deseja cartão de crédito?',
        example: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SimularContasDigitaisFisicaDto.prototype, "credito", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Pretende fazer investimentos?',
        example: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SimularContasDigitaisFisicaDto.prototype, "investimentos", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Recebe transferências (TED/DOC)?',
        example: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SimularContasDigitaisFisicaDto.prototype, "transferencias", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Deposita cheques por imagem?',
        example: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SimularContasDigitaisFisicaDto.prototype, "depCheque", void 0);
class SimularContasDigitaisJuridicaDto extends SimularContasDigitaisBaseDto {
    boletos;
    maquininha;
    folhaPagamento;
    cartaoVirtual;
}
exports.SimularContasDigitaisJuridicaDto = SimularContasDigitaisJuridicaDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tipo de pessoa',
        example: 'juridica',
        enum: [contas_digitais_data_1.TipoPessoa.JURIDICA],
    }),
    (0, class_validator_1.IsEnum)([contas_digitais_data_1.TipoPessoa.JURIDICA]),
    __metadata("design:type", String)
], SimularContasDigitaisJuridicaDto.prototype, "tipoPessoa", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Número de boletos emitidos por mês',
        example: 50,
        minimum: 0,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SimularContasDigitaisJuridicaDto.prototype, "boletos", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Precisa de maquininha de cartão?',
        example: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SimularContasDigitaisJuridicaDto.prototype, "maquininha", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Faz folha de pagamento?',
        example: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SimularContasDigitaisJuridicaDto.prototype, "folhaPagamento", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Deseja cartão virtual?',
        example: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SimularContasDigitaisJuridicaDto.prototype, "cartaoVirtual", void 0);
//# sourceMappingURL=simular-contas-digitais.dto.js.map