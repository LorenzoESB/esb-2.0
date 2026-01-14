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
class EmprestimoInputDto {
    totalEmprestado;
    prazoMeses;
    valorParcela;
    taxaJurosMensal;
    valorTotal;
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
], EmprestimoInputDto.prototype, "totalEmprestado", void 0);
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
        description: 'Monthly installment amount',
        example: 350,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], EmprestimoInputDto.prototype, "valorParcela", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Monthly tax rate applied to the loan',
        example: 1.5,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], EmprestimoInputDto.prototype, "taxaJurosMensal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total amount to be paid over the loan term',
        example: 12600,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], EmprestimoInputDto.prototype, "valorTotal", void 0);
//# sourceMappingURL=emprestimo-output.dto.js.map