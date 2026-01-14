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
exports.ResultadoAposentadoriaDto = exports.ResumoDto = exports.SustentabilidadeDto = exports.CenarioSaqueDto = exports.UsufrutoDto = exports.AcumulacaoDto = exports.ParametrosCalculoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ParametrosCalculoDto {
    idadeAtual;
    idadeAposentadoria;
    valorJaAcumulado;
    taxaJurosMensal;
    taxaJurosAnual;
    expectativaVida;
}
exports.ParametrosCalculoDto = ParametrosCalculoDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Idade atual informada (anos)',
        example: 28,
    }),
    __metadata("design:type", Number)
], ParametrosCalculoDto.prototype, "idadeAtual", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Idade de aposentadoria informada (anos)',
        example: 50,
    }),
    __metadata("design:type", Number)
], ParametrosCalculoDto.prototype, "idadeAposentadoria", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valor já acumulado em previdência (R$)',
        example: 50000,
    }),
    __metadata("design:type", Number)
], ParametrosCalculoDto.prototype, "valorJaAcumulado", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Taxa de juros real mensal utilizada (decimal)',
        example: 0.005,
    }),
    __metadata("design:type", Number)
], ParametrosCalculoDto.prototype, "taxaJurosMensal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Taxa de juros real anual equivalente (decimal)',
        example: 0.0617,
    }),
    __metadata("design:type", Number)
], ParametrosCalculoDto.prototype, "taxaJurosAnual", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Expectativa de vida utilizada no cálculo (anos)',
        example: 86,
    }),
    __metadata("design:type", Number)
], ParametrosCalculoDto.prototype, "expectativaVida", void 0);
class AcumulacaoDto {
    mesesContribuicao;
    anosContribuicao;
    contribuicaoMensal;
    valorFuturoReserva;
    valorFuturoContribuicoes;
    valorTotalAcumulado;
}
exports.AcumulacaoDto = AcumulacaoDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Período de contribuição em meses',
        example: 264,
    }),
    __metadata("design:type", Number)
], AcumulacaoDto.prototype, "mesesContribuicao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Período de contribuição em anos',
        example: 22,
    }),
    __metadata("design:type", Number)
], AcumulacaoDto.prototype, "anosContribuicao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Contribuição mensal necessária ou informada (R$)',
        example: 2836.26,
    }),
    __metadata("design:type", Number)
], AcumulacaoDto.prototype, "contribuicaoMensal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valor futuro da reserva atual corrigida (R$)',
        example: 143439.97,
    }),
    __metadata("design:type", Number)
], AcumulacaoDto.prototype, "valorFuturoReserva", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valor futuro das contribuições mensais (R$)',
        example: 1978286.07,
    }),
    __metadata("design:type", Number)
], AcumulacaoDto.prototype, "valorFuturoContribuicoes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valor total acumulado na aposentadoria (R$)',
        example: 2121726.04,
    }),
    __metadata("design:type", Number)
], AcumulacaoDto.prototype, "valorTotalAcumulado", void 0);
class UsufrutoDto {
    idadeInicio;
    idadeFim;
    mesesBeneficio;
    rendaMensal;
    valorTotalRecebido;
}
exports.UsufrutoDto = UsufrutoDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Idade de início do benefício (anos)',
        example: 50,
    }),
    __metadata("design:type", Number)
], UsufrutoDto.prototype, "idadeInicio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Idade final considerada - expectativa de vida (anos)',
        example: 86,
    }),
    __metadata("design:type", Number)
], UsufrutoDto.prototype, "idadeFim", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Período de recebimento do benefício em meses',
        example: 432,
    }),
    __metadata("design:type", Number)
], UsufrutoDto.prototype, "mesesBeneficio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Renda mensal na aposentadoria (R$)',
        example: 12000,
    }),
    __metadata("design:type", Number)
], UsufrutoDto.prototype, "rendaMensal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valor total que receberá durante toda aposentadoria (R$)',
        example: 5184000,
    }),
    __metadata("design:type", Number)
], UsufrutoDto.prototype, "valorTotalRecebido", void 0);
class CenarioSaqueDto {
    valorSaqueMensal;
    duracaoMeses;
    duracaoAnos;
    consumePrincipal;
    saldoFinal;
    observacao;
}
exports.CenarioSaqueDto = CenarioSaqueDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valor do saque mensal neste cenário (R$)',
        example: 10000,
    }),
    __metadata("design:type", Number)
], CenarioSaqueDto.prototype, "valorSaqueMensal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Duração do patrimônio com este saque em meses',
        example: 360,
    }),
    __metadata("design:type", Number)
], CenarioSaqueDto.prototype, "duracaoMeses", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Duração do patrimônio com este saque em anos',
        example: 30,
    }),
    __metadata("design:type", Number)
], CenarioSaqueDto.prototype, "duracaoAnos", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Indica se este saque consome o capital principal',
        example: false,
    }),
    __metadata("design:type", Boolean)
], CenarioSaqueDto.prototype, "consumePrincipal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Saldo remanescente ao final do período ou na expectativa de vida (R$)',
        example: 0,
    }),
    __metadata("design:type", Number)
], CenarioSaqueDto.prototype, "saldoFinal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Observação sobre este cenário',
        example: 'Saque sustentável indefinidamente apenas com rendimentos',
    }),
    __metadata("design:type", String)
], CenarioSaqueDto.prototype, "observacao", void 0);
class SustentabilidadeDto {
    cenarios;
}
exports.SustentabilidadeDto = SustentabilidadeDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Cenários de saque analisados',
        type: [CenarioSaqueDto],
    }),
    __metadata("design:type", Array)
], SustentabilidadeDto.prototype, "cenarios", void 0);
class ResumoDto {
    totalInvestido;
    totalRecebido;
    saldoPatrimonial;
}
exports.ResumoDto = ResumoDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total investido (contribuições totais + reserva inicial) (R$)',
        example: 812683.24,
    }),
    __metadata("design:type", Number)
], ResumoDto.prototype, "totalInvestido", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total que receberá na aposentadoria (R$)',
        example: 5184000,
    }),
    __metadata("design:type", Number)
], ResumoDto.prototype, "totalRecebido", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Saldo patrimonial (total recebido - total investido) (R$). Pode ser positivo ou negativo.',
        example: 4371316.76,
    }),
    __metadata("design:type", Number)
], ResumoDto.prototype, "saldoPatrimonial", void 0);
class ResultadoAposentadoriaDto {
    parametros;
    acumulacao;
    usufruto;
    sustentabilidade;
    resumo;
}
exports.ResultadoAposentadoriaDto = ResultadoAposentadoriaDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Parâmetros utilizados no cálculo',
        type: ParametrosCalculoDto,
    }),
    __metadata("design:type", ParametrosCalculoDto)
], ResultadoAposentadoriaDto.prototype, "parametros", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Informações da fase de acumulação',
        type: AcumulacaoDto,
    }),
    __metadata("design:type", AcumulacaoDto)
], ResultadoAposentadoriaDto.prototype, "acumulacao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Informações da fase de usufruto (benefício)',
        type: UsufrutoDto,
    }),
    __metadata("design:type", UsufrutoDto)
], ResultadoAposentadoriaDto.prototype, "usufruto", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Análise de sustentabilidade do patrimônio',
        type: SustentabilidadeDto,
    }),
    __metadata("design:type", SustentabilidadeDto)
], ResultadoAposentadoriaDto.prototype, "sustentabilidade", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Resumo executivo do planejamento',
        type: ResumoDto,
    }),
    __metadata("design:type", ResumoDto)
], ResultadoAposentadoriaDto.prototype, "resumo", void 0);
//# sourceMappingURL=resultado-aposentadoria.dto.js.map