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
exports.AmortizacaoSimplesOutputDto = exports.ResumoSimplesDto = exports.SimulacaoComparativaDto = exports.AmortizacaoOutputDto = exports.ResumoAmortizacaoDto = exports.ParcelaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ParcelaDto {
    numero;
    dataVencimento;
    saldoInicial;
    amortizacao;
    juros;
    prestacao;
    seguro;
    taxaAdministracao;
    pagamentoTotal;
    saldoFinal;
    amortizacaoExtraordinaria;
    amortizacaoAcumulada;
    jurosAcumulados;
}
exports.ParcelaDto = ParcelaDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Installment number' }),
    __metadata("design:type", Number)
], ParcelaDto.prototype, "numero", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Payment date', required: false }),
    __metadata("design:type", String)
], ParcelaDto.prototype, "dataVencimento", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Beginning balance' }),
    __metadata("design:type", Number)
], ParcelaDto.prototype, "saldoInicial", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Principal payment' }),
    __metadata("design:type", Number)
], ParcelaDto.prototype, "amortizacao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Interest payment' }),
    __metadata("design:type", Number)
], ParcelaDto.prototype, "juros", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total payment (principal + interest)' }),
    __metadata("design:type", Number)
], ParcelaDto.prototype, "prestacao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Insurance amount' }),
    __metadata("design:type", Number)
], ParcelaDto.prototype, "seguro", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Administrative fee' }),
    __metadata("design:type", Number)
], ParcelaDto.prototype, "taxaAdministracao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total payment including fees' }),
    __metadata("design:type", Number)
], ParcelaDto.prototype, "pagamentoTotal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ending balance' }),
    __metadata("design:type", Number)
], ParcelaDto.prototype, "saldoFinal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Extraordinary amortization amount',
        required: false,
    }),
    __metadata("design:type", Number)
], ParcelaDto.prototype, "amortizacaoExtraordinaria", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Accumulated principal paid' }),
    __metadata("design:type", Number)
], ParcelaDto.prototype, "amortizacaoAcumulada", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Accumulated interest paid' }),
    __metadata("design:type", Number)
], ParcelaDto.prototype, "jurosAcumulados", void 0);
class ResumoAmortizacaoDto {
    valorFinanciamento;
    taxaJurosAnual;
    taxaJurosMensal;
    prazoOriginal;
    prazoEfetivo;
    totalPago;
    totalJuros;
    totalAmortizacao;
    totalSeguro;
    totalTaxaAdministracao;
    totalAmortizacoesExtraordinarias;
    prestacaoMedia;
    primeiraPrestacao;
    ultimaPrestacao;
    sistemaAmortizacao;
    custoEfetivoTotal;
}
exports.ResumoAmortizacaoDto = ResumoAmortizacaoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Loan principal amount' }),
    __metadata("design:type", Number)
], ResumoAmortizacaoDto.prototype, "valorFinanciamento", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Annual interest rate (percentage)' }),
    __metadata("design:type", Number)
], ResumoAmortizacaoDto.prototype, "taxaJurosAnual", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Monthly interest rate (percentage)' }),
    __metadata("design:type", Number)
], ResumoAmortizacaoDto.prototype, "taxaJurosMensal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Original loan term in months' }),
    __metadata("design:type", Number)
], ResumoAmortizacaoDto.prototype, "prazoOriginal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Effective loan term after extraordinary amortizations',
    }),
    __metadata("design:type", Number)
], ResumoAmortizacaoDto.prototype, "prazoEfetivo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total amount paid' }),
    __metadata("design:type", Number)
], ResumoAmortizacaoDto.prototype, "totalPago", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total interest paid' }),
    __metadata("design:type", Number)
], ResumoAmortizacaoDto.prototype, "totalJuros", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total principal paid' }),
    __metadata("design:type", Number)
], ResumoAmortizacaoDto.prototype, "totalAmortizacao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total insurance paid' }),
    __metadata("design:type", Number)
], ResumoAmortizacaoDto.prototype, "totalSeguro", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total administrative fees paid' }),
    __metadata("design:type", Number)
], ResumoAmortizacaoDto.prototype, "totalTaxaAdministracao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total extraordinary amortizations' }),
    __metadata("design:type", Number)
], ResumoAmortizacaoDto.prototype, "totalAmortizacoesExtraordinarias", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Average monthly payment' }),
    __metadata("design:type", Number)
], ResumoAmortizacaoDto.prototype, "prestacaoMedia", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'First payment amount' }),
    __metadata("design:type", Number)
], ResumoAmortizacaoDto.prototype, "primeiraPrestacao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Last payment amount' }),
    __metadata("design:type", Number)
], ResumoAmortizacaoDto.prototype, "ultimaPrestacao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Amortization system used' }),
    __metadata("design:type", String)
], ResumoAmortizacaoDto.prototype, "sistemaAmortizacao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Effective cost of financing (CET)' }),
    __metadata("design:type", Number)
], ResumoAmortizacaoDto.prototype, "custoEfetivoTotal", void 0);
class AmortizacaoOutputDto {
    resumo;
    parcelas;
    graficoDados;
}
exports.AmortizacaoOutputDto = AmortizacaoOutputDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: ResumoAmortizacaoDto }),
    __metadata("design:type", ResumoAmortizacaoDto)
], AmortizacaoOutputDto.prototype, "resumo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ParcelaDto] }),
    __metadata("design:type", Array)
], AmortizacaoOutputDto.prototype, "parcelas", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Monthly evolution chart data',
        required: false,
    }),
    __metadata("design:type", Object)
], AmortizacaoOutputDto.prototype, "graficoDados", void 0);
class SimulacaoComparativaDto {
    simulacoes;
    analiseComparativa;
}
exports.SimulacaoComparativaDto = SimulacaoComparativaDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => AmortizacaoSimplesOutputDto, isArray: true }),
    __metadata("design:type", Array)
], SimulacaoComparativaDto.prototype, "simulacoes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Comparative analysis' }),
    __metadata("design:type", Object)
], SimulacaoComparativaDto.prototype, "analiseComparativa", void 0);
class ResumoSimplesDto {
    sistemaAmortizacao;
    novaPrestacao;
    prazoRestante;
    saldoDevedor;
    novaAmortizacaoMensal;
    reducaoPrazo;
    reducaoPrestacao;
    economiaJuros;
}
exports.ResumoSimplesDto = ResumoSimplesDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Amortization system used' }),
    __metadata("design:type", String)
], ResumoSimplesDto.prototype, "sistemaAmortizacao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'New (next) payment amount' }),
    __metadata("design:type", Number)
], ResumoSimplesDto.prototype, "novaPrestacao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Remaining term in months' }),
    __metadata("design:type", Number)
], ResumoSimplesDto.prototype, "prazoRestante", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Current outstanding balance' }),
    __metadata("design:type", Number)
], ResumoSimplesDto.prototype, "saldoDevedor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'New monthly amortization amount',
        required: false,
    }),
    __metadata("design:type", Number)
], ResumoSimplesDto.prototype, "novaAmortizacaoMensal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Reduction in term (months) compared to original remaining term',
        required: false,
    }),
    __metadata("design:type", Number)
], ResumoSimplesDto.prototype, "reducaoPrazo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Reduction in installment amount (if applicable)',
        required: false,
    }),
    __metadata("design:type", Number)
], ResumoSimplesDto.prototype, "reducaoPrestacao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Interest savings compared to the original schedule',
        required: false,
    }),
    __metadata("design:type", Number)
], ResumoSimplesDto.prototype, "economiaJuros", void 0);
class AmortizacaoSimplesOutputDto {
    resumo;
    mensagem;
}
exports.AmortizacaoSimplesOutputDto = AmortizacaoSimplesOutputDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: ResumoSimplesDto }),
    __metadata("design:type", ResumoSimplesDto)
], AmortizacaoSimplesOutputDto.prototype, "resumo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Optional short message', required: false }),
    __metadata("design:type", String)
], AmortizacaoSimplesOutputDto.prototype, "mensagem", void 0);
//# sourceMappingURL=amortizacao-output.dto.js.map