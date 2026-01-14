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
exports.EmprestimoInputDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const situacao_emprego_enum_1 = require("../enums/situacao-emprego.enum");
class EmprestimoInputDto {
    valorEmprestimo;
    prazoMeses;
    situacaoEmprego;
}
exports.EmprestimoInputDto = EmprestimoInputDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Principal amount of the loan',
        example: 10000,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], EmprestimoInputDto.prototype, "valorEmprestimo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Loan term in months',
        example: 36,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], EmprestimoInputDto.prototype, "prazoMeses", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'What is your employment situation?',
        example: 'CLT',
    }),
    (0, class_validator_1.IsEnum)(situacao_emprego_enum_1.SituacaoEmprego),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], EmprestimoInputDto.prototype, "situacaoEmprego", void 0);
//# sourceMappingURL=emprestimo-input.dto.js.map