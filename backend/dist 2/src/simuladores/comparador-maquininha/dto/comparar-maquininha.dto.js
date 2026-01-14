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
exports.CompararMaquininhaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CompararMaquininhaDto {
    maquininhas_ids;
    nome;
    email;
    email_opt_in_simulation;
    compartilharDados;
    origem;
}
exports.CompararMaquininhaDto = CompararMaquininhaDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'IDs das maquininhas a comparar (mínimo 2)',
        example: [1, 2, 3],
        type: [Number],
        minItems: 2,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(2, {
        message: 'É necessário selecionar pelo menos 2 maquininhas para comparar',
    }),
    (0, class_validator_1.IsInt)({ each: true }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Array)
], CompararMaquininhaDto.prototype, "maquininhas_ids", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nome do solicitante',
        example: 'João Silva',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CompararMaquininhaDto.prototype, "nome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email do solicitante',
        example: 'joao@example.com',
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CompararMaquininhaDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Opt-in to receive simulation results via email',
        example: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], CompararMaquininhaDto.prototype, "email_opt_in_simulation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Indica se o usuário permite compartilhar seus dados',
        example: true,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CompararMaquininhaDto.prototype, "compartilharDados", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Origem da simulação (para rastreamento)',
        example: 'web',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CompararMaquininhaDto.prototype, "origem", void 0);
//# sourceMappingURL=comparar-maquininha.dto.js.map