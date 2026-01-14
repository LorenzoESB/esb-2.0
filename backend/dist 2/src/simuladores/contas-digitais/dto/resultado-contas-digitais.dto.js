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
exports.ResultadoContasDigitaisDto = exports.FeaturesContaDigitalDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const contas_digitais_data_1 = require("../data/contas-digitais.data");
class FeaturesContaDigitalDto {
    enviaDoc;
    recebeDoc;
    enviaTed;
    recebeTed;
    cartaoDebito;
    cartaoCredito;
    realizaSaque;
    aceitaDeposito;
    aceitaDepositoImagem;
    realizaInvestimento;
    emiteBoleto;
    maquininhaInclusa;
    cartaoVirtual;
    folhaPagamento;
}
exports.FeaturesContaDigitalDto = FeaturesContaDigitalDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Envia DOC',
        example: false,
    }),
    __metadata("design:type", Boolean)
], FeaturesContaDigitalDto.prototype, "enviaDoc", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Recebe DOC',
        example: true,
    }),
    __metadata("design:type", Boolean)
], FeaturesContaDigitalDto.prototype, "recebeDoc", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Envia TED',
        example: true,
    }),
    __metadata("design:type", Boolean)
], FeaturesContaDigitalDto.prototype, "enviaTed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Recebe TED',
        example: true,
    }),
    __metadata("design:type", Boolean)
], FeaturesContaDigitalDto.prototype, "recebeTed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Oferece cartão de débito',
        example: true,
    }),
    __metadata("design:type", Boolean)
], FeaturesContaDigitalDto.prototype, "cartaoDebito", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Oferece cartão de crédito',
        example: true,
    }),
    __metadata("design:type", Boolean)
], FeaturesContaDigitalDto.prototype, "cartaoCredito", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Realiza saques',
        example: true,
    }),
    __metadata("design:type", Boolean)
], FeaturesContaDigitalDto.prototype, "realizaSaque", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Aceita depósitos',
        example: true,
    }),
    __metadata("design:type", Boolean)
], FeaturesContaDigitalDto.prototype, "aceitaDeposito", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Aceita depósito de cheque por imagem',
        example: false,
    }),
    __metadata("design:type", Boolean)
], FeaturesContaDigitalDto.prototype, "aceitaDepositoImagem", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Permite fazer investimentos',
        example: true,
    }),
    __metadata("design:type", Boolean)
], FeaturesContaDigitalDto.prototype, "realizaInvestimento", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Emite boletos (PJ)',
        example: false,
    }),
    __metadata("design:type", Boolean)
], FeaturesContaDigitalDto.prototype, "emiteBoleto", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Maquininha de cartão inclusa (PJ)',
        example: false,
    }),
    __metadata("design:type", Boolean)
], FeaturesContaDigitalDto.prototype, "maquininhaInclusa", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Oferece cartão virtual (PJ)',
        example: true,
    }),
    __metadata("design:type", Boolean)
], FeaturesContaDigitalDto.prototype, "cartaoVirtual", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Oferece folha de pagamentos (PJ)',
        example: false,
    }),
    __metadata("design:type", Boolean)
], FeaturesContaDigitalDto.prototype, "folhaPagamento", void 0);
class ResultadoContasDigitaisDto {
    contaId;
    nome;
    nomeBanco;
    logoBanco;
    mensalidadeConta;
    tipoPessoa;
    tarifaTotal;
    economia;
    features;
    observacao;
    ativa;
    urlSite;
}
exports.ResultadoContasDigitaisDto = ResultadoContasDigitaisDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID da conta',
        example: 1,
    }),
    __metadata("design:type", Number)
], ResultadoContasDigitaisDto.prototype, "contaId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nome da conta',
        example: 'Nubank Conta PF',
    }),
    __metadata("design:type", String)
], ResultadoContasDigitaisDto.prototype, "nome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nome do banco',
        example: 'Nubank',
    }),
    __metadata("design:type", String)
], ResultadoContasDigitaisDto.prototype, "nomeBanco", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Logo do banco (slug)',
        example: 'nubank',
        required: false,
    }),
    __metadata("design:type", String)
], ResultadoContasDigitaisDto.prototype, "logoBanco", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mensalidade da conta (tarifa fixa)',
        example: 0,
    }),
    __metadata("design:type", Number)
], ResultadoContasDigitaisDto.prototype, "mensalidadeConta", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tipo de pessoa',
        example: 'fisica',
        enum: contas_digitais_data_1.TipoPessoa,
    }),
    __metadata("design:type", String)
], ResultadoContasDigitaisDto.prototype, "tipoPessoa", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tarifa total mensal (mensalidade + transações)',
        example: 13.0,
    }),
    __metadata("design:type", Number)
], ResultadoContasDigitaisDto.prototype, "tarifaTotal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Economia em relação à conta atual',
        example: 16.9,
    }),
    __metadata("design:type", Number)
], ResultadoContasDigitaisDto.prototype, "economia", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Funcionalidades da conta',
        type: FeaturesContaDigitalDto,
    }),
    __metadata("design:type", FeaturesContaDigitalDto)
], ResultadoContasDigitaisDto.prototype, "features", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Observações sobre a conta',
        example: 'Conta 100% digital com anuidade zero no cartão de crédito',
        required: false,
    }),
    __metadata("design:type", String)
], ResultadoContasDigitaisDto.prototype, "observacao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Conta está ativa',
        example: true,
    }),
    __metadata("design:type", Boolean)
], ResultadoContasDigitaisDto.prototype, "ativa", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL do site da conta',
        example: 'https://nubank.com.br',
        required: false,
    }),
    __metadata("design:type", String)
], ResultadoContasDigitaisDto.prototype, "urlSite", void 0);
//# sourceMappingURL=resultado-contas-digitais.dto.js.map