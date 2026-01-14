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
exports.SimularTaxaMaquininhaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class SimularTaxaMaquininhaDto {
    venda_debito;
    venda_credito_vista;
    venda_credito_parcelado;
    numero_parcelas;
    sem_mensalidade;
    aceita_cartao_tarja;
    sem_fio;
    pf;
    pj;
    imprime_recibo;
    wifi;
    quer_antecipar;
    n_exige_smartphone;
    aceita_vale_refeicao;
    ecommerce;
    segmento;
    nome;
    email;
    email_opt_in_simulation;
    compartilharDados;
    origem;
}
exports.SimularTaxaMaquininhaDto = SimularTaxaMaquininhaDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valor vendido no débito por mês',
        example: 5000,
        minimum: 0,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SimularTaxaMaquininhaDto.prototype, "venda_debito", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valor vendido no crédito à vista por mês',
        example: 3000,
        minimum: 0,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SimularTaxaMaquininhaDto.prototype, "venda_credito_vista", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valor vendido no crédito parcelado por mês',
        example: 2000,
        minimum: 0,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SimularTaxaMaquininhaDto.prototype, "venda_credito_parcelado", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Número de parcelas do crédito parcelado (2-12)',
        example: 6,
        minimum: 2,
        maximum: 12,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(2),
    (0, class_validator_1.Max)(12),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SimularTaxaMaquininhaDto.prototype, "numero_parcelas", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filtrar apenas maquininhas sem mensalidade',
        example: false,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SimularTaxaMaquininhaDto.prototype, "sem_mensalidade", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filtrar apenas maquininhas que aceitam cartão de tarja magnética',
        example: false,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SimularTaxaMaquininhaDto.prototype, "aceita_cartao_tarja", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filtrar apenas maquininhas sem fio (wireless)',
        example: false,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SimularTaxaMaquininhaDto.prototype, "sem_fio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filtrar apenas maquininhas que atendem Pessoa Física',
        example: false,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SimularTaxaMaquininhaDto.prototype, "pf", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filtrar apenas maquininhas que atendem Pessoa Jurídica',
        example: false,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SimularTaxaMaquininhaDto.prototype, "pj", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filtrar apenas maquininhas que imprimem recibo',
        example: false,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SimularTaxaMaquininhaDto.prototype, "imprime_recibo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filtrar apenas maquininhas com conexão Wi-Fi',
        example: false,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SimularTaxaMaquininhaDto.prototype, "wifi", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filtrar apenas maquininhas que permitem antecipação de recebíveis',
        example: false,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SimularTaxaMaquininhaDto.prototype, "quer_antecipar", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filtrar apenas maquininhas que não exigem smartphone',
        example: false,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SimularTaxaMaquininhaDto.prototype, "n_exige_smartphone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filtrar apenas maquininhas que aceitam vale refeição',
        example: false,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SimularTaxaMaquininhaDto.prototype, "aceita_vale_refeicao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filtrar apenas maquininhas com opção de e-commerce',
        example: false,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SimularTaxaMaquininhaDto.prototype, "ecommerce", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID do segmento/setor de atuação',
        example: 1,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SimularTaxaMaquininhaDto.prototype, "segmento", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nome do solicitante',
        example: 'João Silva',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SimularTaxaMaquininhaDto.prototype, "nome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email do solicitante',
        example: 'joao@example.com',
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], SimularTaxaMaquininhaDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Opt-in to receive simulation results via email',
        example: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], SimularTaxaMaquininhaDto.prototype, "email_opt_in_simulation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Indica se o usuário permite compartilhar seus dados',
        example: true,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SimularTaxaMaquininhaDto.prototype, "compartilharDados", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Origem da simulação (para rastreamento)',
        example: 'web',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SimularTaxaMaquininhaDto.prototype, "origem", void 0);
//# sourceMappingURL=simular-taxa-maquininha.dto.js.map