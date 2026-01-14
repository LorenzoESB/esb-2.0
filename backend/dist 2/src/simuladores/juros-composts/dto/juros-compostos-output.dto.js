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
exports.JurosCompostosDetalhadoOutputDto = exports.JurosCompostosMensalDto = exports.JurosCompostosResumoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class JurosCompostosResumoDto {
    valorTotalFinalBruto;
    totalInvestido;
    totalEmJurosBruto;
    valorTotalFinal;
    impostoRenda;
    aliquotaIR;
    totalEmJuros;
}
exports.JurosCompostosResumoDto = JurosCompostosResumoDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total final amount (gross)',
        example: 34720.85,
    }),
    __metadata("design:type", Number)
], JurosCompostosResumoDto.prototype, "valorTotalFinalBruto", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total amount invested',
        example: 28000,
    }),
    __metadata("design:type", Number)
], JurosCompostosResumoDto.prototype, "totalInvestido", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total gross interest earned',
        example: 6720.85,
    }),
    __metadata("design:type", Number)
], JurosCompostosResumoDto.prototype, "totalEmJurosBruto", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total final amount (net)',
        required: false,
    }),
    __metadata("design:type", Number)
], JurosCompostosResumoDto.prototype, "valorTotalFinal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Income tax amount',
        required: false,
    }),
    __metadata("design:type", Number)
], JurosCompostosResumoDto.prototype, "impostoRenda", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Income tax rate',
        required: false,
    }),
    __metadata("design:type", Number)
], JurosCompostosResumoDto.prototype, "aliquotaIR", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total net interest',
        required: false,
    }),
    __metadata("design:type", Number)
], JurosCompostosResumoDto.prototype, "totalEmJuros", void 0);
class JurosCompostosMensalDto {
    mes;
    valorInvestido;
    valorComJuros;
    jurosDoMes;
    jurosAcumulados;
}
exports.JurosCompostosMensalDto = JurosCompostosMensalDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Month number' }),
    __metadata("design:type", Number)
], JurosCompostosMensalDto.prototype, "mes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total invested up to this month' }),
    __metadata("design:type", Number)
], JurosCompostosMensalDto.prototype, "valorInvestido", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total value with interest' }),
    __metadata("design:type", Number)
], JurosCompostosMensalDto.prototype, "valorComJuros", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Interest earned this month' }),
    __metadata("design:type", Number)
], JurosCompostosMensalDto.prototype, "jurosDoMes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Accumulated interest' }),
    __metadata("design:type", Number)
], JurosCompostosMensalDto.prototype, "jurosAcumulados", void 0);
class JurosCompostosDetalhadoOutputDto {
    resumo;
    detalhesMensais;
}
exports.JurosCompostosDetalhadoOutputDto = JurosCompostosDetalhadoOutputDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: JurosCompostosResumoDto }),
    __metadata("design:type", JurosCompostosResumoDto)
], JurosCompostosDetalhadoOutputDto.prototype, "resumo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [JurosCompostosMensalDto] }),
    __metadata("design:type", Array)
], JurosCompostosDetalhadoOutputDto.prototype, "detalhesMensais", void 0);
//# sourceMappingURL=juros-compostos-output.dto.js.map