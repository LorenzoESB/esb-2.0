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
exports.CombustivelInputDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CombustivelInputDto {
    nome;
    email;
    email_opt_in_simulation;
    precoGasolina;
    precoEtanol;
    consumoGasolina;
    consumoEtanol;
}
exports.CombustivelInputDto = CombustivelInputDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nome completo do usuário',
        example: 'João da Silva',
    }),
    (0, class_validator_1.IsString)({ message: 'Nome deve ser uma string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Nome é obrigatório' }),
    __metadata("design:type", String)
], CombustivelInputDto.prototype, "nome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'E-mail do usuário',
        example: 'joao@exemplo.com',
    }),
    (0, class_validator_1.IsEmail)({}, { message: 'E-mail inválido' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'E-mail é obrigatório' }),
    __metadata("design:type", String)
], CombustivelInputDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Opt-in to receive simulation results via email',
        example: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], CombustivelInputDto.prototype, "email_opt_in_simulation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Price of gasoline per liter',
        example: 5.49,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CombustivelInputDto.prototype, "precoGasolina", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Price of ethanol per liter',
        example: 3.99,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CombustivelInputDto.prototype, "precoEtanol", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vehicle consumption with gasoline (km/l)',
        example: 12,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CombustivelInputDto.prototype, "consumoGasolina", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vehicle consumption with ethanol (km/l)',
        example: 8,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CombustivelInputDto.prototype, "consumoEtanol", void 0);
//# sourceMappingURL=combustivel-input.dto.js.map