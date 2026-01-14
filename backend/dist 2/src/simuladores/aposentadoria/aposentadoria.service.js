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
var AposentadoriaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AposentadoriaService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const decimal_js_1 = require("decimal.js");
const simular_aposentadoria_dto_1 = require("./dto/simular-aposentadoria.dto");
const aposentadoria_calc_1 = require("./calc/aposentadoria.calc");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
const email_service_1 = require("../../email/email.service");
let AposentadoriaService = AposentadoriaService_1 = class AposentadoriaService {
    configService;
    prisma;
    emailService;
    logger = new common_1.Logger(AposentadoriaService_1.name);
    taxaMensal;
    expectativaVida;
    constructor(configService, prisma, emailService) {
        this.configService = configService;
        this.prisma = prisma;
        this.emailService = emailService;
        this.taxaMensal = new decimal_js_1.default(this.configService.get('RETIREMENT_MONTHLY_RATE', 0.005));
        this.expectativaVida = this.configService.get('RETIREMENT_LIFE_EXPECTANCY', 86);
    }
    async simular(dto) {
        this.validarDados(dto);
        const mesesContribuicao = (dto.idadeAposentadoria - dto.idadeAtual) * 12;
        const mesesUsufruto = (this.expectativaVida - dto.idadeAposentadoria) * 12;
        const valorFuturoReserva = dto.valorJaAcumulado > 0
            ? (0, aposentadoria_calc_1.calcularValorFuturoCapitalInicial)(dto.valorJaAcumulado, this.taxaMensal, mesesContribuicao)
            : new decimal_js_1.default(0);
        let acumulacao;
        let usufruto;
        if (dto.modoCalculo === simular_aposentadoria_dto_1.ModoCalculoAposentadoria.RECEBER) {
            const resultado = this.calcularPorRendaDesejada(dto.rendaMensalDesejada, mesesContribuicao, mesesUsufruto, valorFuturoReserva);
            acumulacao = resultado.acumulacao;
            usufruto = resultado.usufruto;
        }
        else {
            const resultado = this.calcularPorContribuicao(dto.contribuicaoMensal, mesesContribuicao, mesesUsufruto, valorFuturoReserva);
            acumulacao = resultado.acumulacao;
            usufruto = resultado.usufruto;
        }
        const sustentabilidade = dto.incluirCenariosSaque
            ? this.calcularSustentabilidade(acumulacao.valorTotalAcumulado, usufruto.rendaMensal)
            : this.calcularSustentabilidadeSimples();
        const resumo = this.calcularResumo(dto.valorJaAcumulado, acumulacao, usufruto);
        const parametros = {
            idadeAtual: dto.idadeAtual,
            idadeAposentadoria: dto.idadeAposentadoria,
            valorJaAcumulado: dto.valorJaAcumulado,
            taxaJurosMensal: this.taxaMensal.toNumber(),
            taxaJurosAnual: (0, aposentadoria_calc_1.calcularTaxaAnual)(this.taxaMensal).toNumber(),
            expectativaVida: this.expectativaVida,
        };
        const result = {
            parametros,
            acumulacao,
            usufruto,
            sustentabilidade,
            resumo,
        };
        await this.salvarSimulacao(dto, result);
        return result;
    }
    calcularPorRendaDesejada(rendaDesejada, mesesContribuicao, mesesUsufruto, valorFuturoReserva) {
        const valorPresenteNecessario = (0, aposentadoria_calc_1.calcularValorPresente)(rendaDesejada, this.taxaMensal, mesesUsufruto);
        const valorPresenteAContribuir = valorPresenteNecessario.minus(valorFuturoReserva);
        const contribuicaoMensal = (0, aposentadoria_calc_1.calcularPagamentoMensal)(valorPresenteAContribuir, this.taxaMensal, mesesContribuicao);
        const valorFuturoContribuicoes = (0, aposentadoria_calc_1.calcularValorFuturoPagamentos)(contribuicaoMensal, this.taxaMensal, mesesContribuicao);
        const acumulacao = {
            mesesContribuicao,
            anosContribuicao: Math.round((mesesContribuicao / 12) * 10) / 10,
            contribuicaoMensal: this.arredondar(contribuicaoMensal),
            valorFuturoReserva: this.arredondar(valorFuturoReserva),
            valorFuturoContribuicoes: this.arredondar(valorFuturoContribuicoes),
            valorTotalAcumulado: this.arredondar(valorPresenteNecessario),
        };
        const usufruto = {
            idadeInicio: Math.floor(mesesContribuicao / 12) + acumulacao.anosContribuicao,
            idadeFim: this.expectativaVida,
            mesesBeneficio: mesesUsufruto,
            rendaMensal: this.arredondar(rendaDesejada),
            valorTotalRecebido: this.arredondar(new decimal_js_1.default(rendaDesejada).mul(mesesUsufruto)),
        };
        return { acumulacao, usufruto };
    }
    calcularPorContribuicao(contribuicao, mesesContribuicao, mesesUsufruto, valorFuturoReserva) {
        const valorFuturoContribuicoes = (0, aposentadoria_calc_1.calcularValorFuturoPagamentos)(contribuicao, this.taxaMensal, mesesContribuicao);
        const valorTotalAcumulado = valorFuturoContribuicoes.plus(valorFuturoReserva);
        const rendaMensal = (0, aposentadoria_calc_1.calcularRendaMensal)(valorTotalAcumulado, this.taxaMensal, mesesUsufruto);
        const acumulacao = {
            mesesContribuicao,
            anosContribuicao: Math.round((mesesContribuicao / 12) * 10) / 10,
            contribuicaoMensal: this.arredondar(contribuicao),
            valorFuturoReserva: this.arredondar(valorFuturoReserva),
            valorFuturoContribuicoes: this.arredondar(valorFuturoContribuicoes),
            valorTotalAcumulado: this.arredondar(valorTotalAcumulado),
        };
        const usufruto = {
            idadeInicio: Math.floor(mesesContribuicao / 12) + acumulacao.anosContribuicao,
            idadeFim: this.expectativaVida,
            mesesBeneficio: mesesUsufruto,
            rendaMensal: this.arredondar(rendaMensal),
            valorTotalRecebido: this.arredondar(rendaMensal.mul(mesesUsufruto)),
        };
        return { acumulacao, usufruto };
    }
    calcularSustentabilidade(patrimonio, rendaReferencia) {
        const capital = new decimal_js_1.default(patrimonio);
        const percentuais = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
        const cenarios = percentuais.map((percentual) => {
            const valorSaque = new decimal_js_1.default(rendaReferencia).mul(percentual);
            return this.criarCenarioSaque(capital, valorSaque);
        });
        return {
            cenarios,
        };
    }
    calcularSustentabilidadeSimples() {
        return {
            cenarios: [],
        };
    }
    criarCenarioSaque(capital, valorSaque) {
        const rendimentoMensal = capital.mul(this.taxaMensal);
        const duracaoMeses = (0, aposentadoria_calc_1.calcularDuracaoPatrimonio)(capital, valorSaque, this.taxaMensal);
        const consumePrincipal = valorSaque.gt(rendimentoMensal);
        const saldoFinal = duracaoMeses === Infinity
            ? capital
            : (0, aposentadoria_calc_1.calcularSaldoAposSaques)(capital, valorSaque, this.taxaMensal, duracaoMeses);
        let observacao;
        if (duracaoMeses === Infinity) {
            observacao = 'Saque sustentável indefinidamente apenas com rendimentos';
        }
        else {
            const anos = Math.floor(duracaoMeses / 12);
            observacao = `Patrimônio se esgota em ${anos} anos (${duracaoMeses} meses)`;
        }
        return {
            valorSaqueMensal: this.arredondar(valorSaque),
            duracaoMeses: duracaoMeses === Infinity ? -1 : duracaoMeses,
            duracaoAnos: duracaoMeses === Infinity ? -1 : Math.floor(duracaoMeses / 12),
            consumePrincipal,
            saldoFinal: this.arredondar(saldoFinal),
            observacao,
        };
    }
    calcularResumo(reservaInicial, acumulacao, usufruto) {
        const totalContribuicoes = acumulacao.contribuicaoMensal * acumulacao.mesesContribuicao;
        const totalInvestido = reservaInicial + totalContribuicoes;
        return {
            totalInvestido: this.arredondar(totalInvestido),
            totalRecebido: usufruto.valorTotalRecebido,
            saldoPatrimonial: this.arredondar(usufruto.valorTotalRecebido - totalInvestido),
        };
    }
    validarDados(dto) {
        if (dto.idadeAposentadoria <= dto.idadeAtual) {
            throw new common_1.BadRequestException('Idade de aposentadoria deve ser maior que idade atual');
        }
        if (dto.idadeAposentadoria > this.expectativaVida) {
            throw new common_1.BadRequestException(`Idade de aposentadoria não pode ser maior que expectativa de vida (${this.expectativaVida} anos)`);
        }
        if (dto.modoCalculo === simular_aposentadoria_dto_1.ModoCalculoAposentadoria.RECEBER) {
            if (!dto.rendaMensalDesejada || dto.rendaMensalDesejada <= 0) {
                throw new common_1.BadRequestException('Renda mensal desejada é obrigatória para modo RECEBER');
            }
        }
        if (dto.modoCalculo === simular_aposentadoria_dto_1.ModoCalculoAposentadoria.CONTRIBUIR) {
            if (!dto.contribuicaoMensal || dto.contribuicaoMensal <= 0) {
                throw new common_1.BadRequestException('Contribuição mensal é obrigatória para modo CONTRIBUIR');
            }
        }
    }
    arredondar(valor) {
        return new decimal_js_1.default(valor).toDecimalPlaces(2).toNumber();
    }
    async salvarSimulacao(input, output) {
        try {
            const simulationData = {
                simulatorType: client_1.SimulatorType.APOSENTADORIA,
                inputData: JSON.parse(JSON.stringify(input)),
                outputData: JSON.parse(JSON.stringify(output)),
                nome: input.nome,
                email: input.email,
                email_opt_in_simulation: input.email_opt_in_simulation,
                email_opt_in_at: input.email_opt_in_simulation ? new Date() : null,
            };
            await this.prisma.simulation.create({
                data: simulationData,
            });
            if (input.email_opt_in_simulation) {
                await this.emailService.sendSimulationResult({
                    simulationType: client_1.SimulatorType.APOSENTADORIA,
                    userEmail: input.email,
                    userName: input.nome,
                    input: simulationData.inputData,
                    output: simulationData.outputData,
                    summary: 'Simulação de Aposentadoria',
                    createdAt: new Date(),
                });
            }
            this.logger.log('Retirement simulation saved to database');
        }
        catch (error) {
            this.logger.warn('Failed to save retirement simulation, continuing', error?.stack);
        }
    }
};
exports.AposentadoriaService = AposentadoriaService;
exports.AposentadoriaService = AposentadoriaService = AposentadoriaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        prisma_service_1.PrismaService,
        email_service_1.EmailService])
], AposentadoriaService);
//# sourceMappingURL=aposentadoria.service.js.map