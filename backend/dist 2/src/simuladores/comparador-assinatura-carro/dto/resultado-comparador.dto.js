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
exports.ResultadoComparadorDto = exports.CenarioComparador = exports.BreakdownCustos = void 0;
const swagger_1 = require("@nestjs/swagger");
class BreakdownCustos {
    custoAquisicao;
    manutencao;
    seguro;
    ipva;
    taxasLicenciamento;
    depreciacao;
    custoOportunidade;
    custoAssinatura;
    jurosFinanciamento;
    iofFinanciamento;
}
exports.BreakdownCustos = BreakdownCustos;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Custo de aquisição do veículo (compra ou financiamento). 0 para assinatura.',
        example: 80000,
    }),
    __metadata("design:type", Number)
], BreakdownCustos.prototype, "custoAquisicao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Custo total com manutenção no período. 0 para assinatura (incluído na mensalidade).',
        example: 2400,
    }),
    __metadata("design:type", Number)
], BreakdownCustos.prototype, "manutencao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Custo total com seguro no período. 0 para assinatura (incluído na mensalidade).',
        example: 9600,
    }),
    __metadata("design:type", Number)
], BreakdownCustos.prototype, "seguro", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Custo total com IPVA no período. 0 para assinatura (incluído na mensalidade).',
        example: 9600,
    }),
    __metadata("design:type", Number)
], BreakdownCustos.prototype, "ipva", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Custos com emplacamento e licenciamento no período. 0 para assinatura (incluído na mensalidade).',
        example: 990,
    }),
    __metadata("design:type", Number)
], BreakdownCustos.prototype, "taxasLicenciamento", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Depreciação acumulada do veículo no período. 0 para assinatura (não é proprietário).',
        example: 24000,
    }),
    __metadata("design:type", Number)
], BreakdownCustos.prototype, "depreciacao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Custo de oportunidade (rendimento perdido do capital investido). 0 para assinatura (sem capital imobilizado).',
        example: 5200,
    }),
    __metadata("design:type", Number)
], BreakdownCustos.prototype, "custoOportunidade", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Custo total com assinatura no período. 0 para compra à vista e financiamento.',
        example: 90000,
        required: false,
    }),
    __metadata("design:type", Number)
], BreakdownCustos.prototype, "custoAssinatura", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Juros pagos no financiamento. Não presente em compra à vista e assinatura.',
        example: 15600,
        required: false,
    }),
    __metadata("design:type", Number)
], BreakdownCustos.prototype, "jurosFinanciamento", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'IOF pago no financiamento. Não presente em compra à vista e assinatura.',
        example: 156,
        required: false,
    }),
    __metadata("design:type", Number)
], BreakdownCustos.prototype, "iofFinanciamento", void 0);
class CenarioComparador {
    nome;
    custoTotal;
    valorRevenda;
    custoLiquido;
    breakdown;
}
exports.CenarioComparador = CenarioComparador;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nome do cenário',
        example: 'Compra à Vista',
    }),
    __metadata("design:type", String)
], CenarioComparador.prototype, "nome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Custo total no período',
        example: 106790,
    }),
    __metadata("design:type", Number)
], CenarioComparador.prototype, "custoTotal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valor de revenda do veículo ao final do período. 0 para assinatura (não é proprietário).',
        example: 56000,
    }),
    __metadata("design:type", Number)
], CenarioComparador.prototype, "valorRevenda", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Custo líquido (custo total - valor revenda)',
        example: 50790,
    }),
    __metadata("design:type", Number)
], CenarioComparador.prototype, "custoLiquido", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Breakdown detalhado dos custos',
        type: BreakdownCustos,
    }),
    __metadata("design:type", BreakdownCustos)
], CenarioComparador.prototype, "breakdown", void 0);
class ResultadoComparadorDto {
    compraVista;
    financiamento;
    assinatura;
    melhorOpcao;
    economiaMaxima;
    periodoAnos;
    urls;
}
exports.ResultadoComparadorDto = ResultadoComparadorDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Cenário de compra à vista',
        type: CenarioComparador,
    }),
    __metadata("design:type", CenarioComparador)
], ResultadoComparadorDto.prototype, "compraVista", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Cenário de financiamento',
        type: CenarioComparador,
    }),
    __metadata("design:type", CenarioComparador)
], ResultadoComparadorDto.prototype, "financiamento", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Cenário de assinatura',
        type: CenarioComparador,
    }),
    __metadata("design:type", CenarioComparador)
], ResultadoComparadorDto.prototype, "assinatura", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Melhor opção baseada no menor custo líquido',
        example: 'compraVista',
        enum: ['compraVista', 'financiamento', 'assinatura'],
    }),
    __metadata("design:type", String)
], ResultadoComparadorDto.prototype, "melhorOpcao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Economia da melhor opção em relação à pior',
        example: 15230,
    }),
    __metadata("design:type", Number)
], ResultadoComparadorDto.prototype, "economiaMaxima", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Período de comparação em anos',
        example: 3,
    }),
    __metadata("design:type", Number)
], ResultadoComparadorDto.prototype, "periodoAnos", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URLs de redirecionamento para mais informações',
        example: {
            assinatura: 'https://educandoseubolso.blog.br/externo/localiza-meoo-comparador/',
            financiamento: 'https://educandoseubolso.blog.br/externo/simulador-de-financiamento-compadador-assinatura/',
        },
    }),
    __metadata("design:type", Object)
], ResultadoComparadorDto.prototype, "urls", void 0);
//# sourceMappingURL=resultado-comparador.dto.js.map