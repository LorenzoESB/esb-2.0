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
var AmortizacaoService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmortizacaoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
const email_service_1 = require("../../email/email.service");
let AmortizacaoService = AmortizacaoService_1 = class AmortizacaoService {
    prisma;
    emailService;
    logger = new common_1.Logger(AmortizacaoService_1.name);
    constructor(prisma, emailService) {
        this.prisma = prisma;
        this.emailService = emailService;
    }
    async calcularAmortizacao(input) {
        return this.calcularAmortizacaoSimples(input);
    }
    async salvarSimulacao(input, output) {
        try {
            const simulationData = {
                simulatorType: client_1.SimulatorType.AMORTIZACAO,
                email: input.email,
                nome: input.nome,
                inputData: JSON.parse(JSON.stringify(input)),
                outputData: JSON.parse(JSON.stringify(output)),
                email_opt_in_simulation: input.email_opt_in_simulation,
                email_opt_in_at: input.email_opt_in_simulation ? new Date() : null,
            };
            await this.prisma.simulation.create({ data: simulationData });
            if (input.email_opt_in_simulation) {
                await this.emailService.sendSimulationResult({
                    simulationType: client_1.SimulatorType.AMORTIZACAO,
                    userEmail: input.email,
                    userName: input.nome,
                    input: simulationData.inputData,
                    output: simulationData.outputData,
                    summary: output.mensagem || 'Simulação de Amortização',
                    createdAt: new Date(),
                });
            }
        }
        catch (error) {
            this.logger.warn('Failed to save simplified simulation, continuing', error?.stack);
        }
    }
    calcularTaxaJurosMensal(taxaAnual) {
        if (!taxaAnual || taxaAnual === 0)
            return 0;
        const anualDecimal = taxaAnual / 100;
        return Math.pow(1 + anualDecimal, 1 / 12) - 1;
    }
    computeTotalInterest(saldoInicial, amortizacaoMensal, taxaMensal, meses) {
        let saldo = saldoInicial;
        let totalJuros = 0;
        for (let i = 0; i < meses && saldo > 0.000001; i++) {
            const juros = saldo * taxaMensal;
            totalJuros += juros;
            const amort = Math.min(amortizacaoMensal, saldo);
            saldo = Math.max(0, saldo - amort);
        }
        return totalJuros;
    }
    async calcularAmortizacaoSimples(input) {
        const redactedInput = { ...input, email: '***', nome: '***' };
        this.logger.debug('Calculating simplified amortization', { input: redactedInput });
        const taxaMensal = this.calcularTaxaJurosMensal(input.taxaJurosAnual || 0);
        const saldoInicial = input.saldoDevedorAtual ?? input.valorFinanciamento;
        const prazoTotal = input.prazoMeses || 0;
        const parcelaAtual = input.parcelaAtual || 0;
        const prazoRestante = Math.max(0, prazoTotal - parcelaAtual);
        const seguro = input.seguroMensal || 0;
        const taxaAdm = input.taxaAdministracao || 0;
        let saldoDevedor = saldoInicial;
        if (input.amortizacoesExtraordinarias &&
            input.amortizacoesExtraordinarias.length > 0) {
            for (const ae of input.amortizacoesExtraordinarias) {
                if ((ae.mesOcorrencia || 0) <= parcelaAtual) {
                    saldoDevedor = Math.max(0, saldoDevedor - (ae.valor || 0));
                }
            }
        }
        const jurosAtual = saldoDevedor * taxaMensal;
        const amortizacaoMensal = prazoRestante > 0 ? saldoDevedor / prazoRestante : saldoDevedor;
        const novaPrestacao = jurosAtual + amortizacaoMensal + seguro + taxaAdm;
        const resumo = {
            sistemaAmortizacao: 'SIMPLES',
            novaPrestacao: Math.round(novaPrestacao * 100) / 100,
            prazoRestante,
            saldoDevedor: Math.round(saldoDevedor * 100) / 100,
            novaAmortizacaoMensal: Math.round(amortizacaoMensal * 100) / 100,
        };
        const output = {
            resumo,
            mensagem: 'Simulação simplificada',
        };
        await this.salvarSimulacao(input, output);
        return output;
    }
    async compararSistemas(input) {
        const redactedInput = { ...input, email: '***', nome: '***' };
        this.logger.debug('Calculating simplified comparison', { input: redactedInput });
        const taxaMensal = this.calcularTaxaJurosMensal(input.taxaJurosAnual || 0);
        const saldoInicial = input.saldoDevedorAtual ?? input.valorFinanciamento;
        const prazoTotal = input.prazoMeses || 0;
        const parcelaAtual = input.parcelaAtual || 0;
        const prazoRestanteOriginal = Math.max(0, prazoTotal - parcelaAtual);
        let somaExtra = 0;
        if (input.amortizacoesExtraordinarias &&
            input.amortizacoesExtraordinarias.length > 0) {
            somaExtra = input.amortizacoesExtraordinarias.reduce((s, a) => {
                const occ = a?.mesOcorrencia || 0;
                return s + (occ <= parcelaAtual ? a?.valor || 0 : 0);
            }, 0);
        }
        const novoSaldo = Math.max(0, saldoInicial - somaExtra);
        const seguro = input.seguroMensal || 0;
        const taxaAdm = input.taxaAdministracao || 0;
        const amortizacaoMensalOriginal = prazoTotal > 0 ? input.valorFinanciamento / prazoTotal : 0;
        const trEstimada = 1.00116;
        const saldoDev = saldoInicial;
        const amortExtra = somaExtra;
        const saldoTr = Math.max(0, saldoDev - amortExtra) * trEstimada;
        const amortMes = amortizacaoMensalOriginal;
        const saldoAmortizacao = Math.max(0, saldoTr - amortMes);
        const prestacaoTemp = amortMes + taxaMensal * saldoDev;
        const taxasSeguro = seguro + taxaAdm;
        const valorPagoTemp = prestacaoTemp + taxasSeguro;
        let aux = prazoTotal - parcelaAtual + 1;
        aux = aux > 0 ? saldoDev / aux : saldoDev;
        aux = valorPagoTemp + aux;
        const prestacaoVirtual = Math.round(aux * 100) / 100 - amortMes;
        const val = prestacaoVirtual - seguro - taxaAdm - saldoAmortizacao * taxaMensal;
        let prazoPrazo;
        if (val <= 0) {
            prazoPrazo = prazoRestanteOriginal;
        }
        else {
            let prazoRest = Math.floor(saldoAmortizacao / val);
            if (prazoRest <= 0)
                prazoRest = 1;
            prazoPrazo = Math.min(prazoRest, prazoRestanteOriginal);
        }
        const novaAmortizacaoPrazo = prazoPrazo > 0
            ? saldoAmortizacao / prazoPrazo
            : amortizacaoMensalOriginal;
        const novaPrestacaoPrazo = saldoAmortizacao * taxaMensal + novaAmortizacaoPrazo + taxasSeguro;
        const novaAmortizacaoPrestacao = prazoRestanteOriginal > 0 ? novoSaldo / prazoRestanteOriginal : 0;
        const novaPrestacaoPrestacao = novoSaldo * taxaMensal + novaAmortizacaoPrestacao + seguro + taxaAdm;
        const mesesOriginais = prazoRestanteOriginal;
        const totalJurosOrig = this.computeTotalInterest(novoSaldo, amortizacaoMensalOriginal, taxaMensal, mesesOriginais);
        const totalJurosPrazo = this.computeTotalInterest(novoSaldo, novaAmortizacaoPrazo, taxaMensal, prazoPrazo);
        const economiaJurosPrazo = Math.round((totalJurosOrig - totalJurosPrazo) * 100) / 100;
        const simulacaoPrazo = {
            resumo: {
                sistemaAmortizacao: 'POR_PRAZO',
                novaPrestacao: Math.round(novaPrestacaoPrazo * 100) / 100,
                prazoRestante: prazoPrazo,
                saldoDevedor: Math.round(novoSaldo * 100) / 100,
                novaAmortizacaoMensal: Math.round(novaAmortizacaoPrazo * 100) / 100,
                reducaoPrazo: Math.max(0, prazoRestanteOriginal - prazoPrazo),
                economiaJuros: economiaJurosPrazo,
            },
            mensagem: 'Amortização reduzindo prazo',
        };
        const totalJurosPrestacaoNew = this.computeTotalInterest(novoSaldo, novaAmortizacaoPrestacao, taxaMensal, prazoRestanteOriginal);
        const economiaJurosPrestacao = Math.round((totalJurosOrig - totalJurosPrestacaoNew) * 100) / 100;
        const amortizacaoAtual = prazoRestanteOriginal > 0
            ? saldoInicial / prazoRestanteOriginal
            : saldoInicial;
        const jurosAtualParaReducao = saldoInicial * taxaMensal;
        const prestacaoAtualCalc = jurosAtualParaReducao + amortizacaoAtual + seguro + taxaAdm;
        const reducaoPrestacaoVal = Math.round(Math.max(0, prestacaoAtualCalc - novaPrestacaoPrestacao) * 100) / 100;
        const simulacaoPrestacao = {
            resumo: {
                sistemaAmortizacao: 'POR_PRESTACAO',
                novaPrestacao: Math.round(novaPrestacaoPrestacao * 100) / 100,
                prazoRestante: prazoRestanteOriginal,
                saldoDevedor: Math.round(novoSaldo * 100) / 100,
                novaAmortizacaoMensal: Math.round(novaAmortizacaoPrestacao * 100) / 100,
                reducaoPrestacao: reducaoPrestacaoVal,
                economiaJuros: economiaJurosPrestacao,
            },
            mensagem: 'Amortização reduzindo prestação',
        };
        const simulacoes = [simulacaoPrazo, simulacaoPrestacao];
        const analiseComparativa = {
            sistemaComMenorPrestacao: simulacaoPrazo.resumo.novaPrestacao <=
                simulacaoPrestacao.resumo.novaPrestacao
                ? simulacaoPrazo.resumo.sistemaAmortizacao
                : simulacaoPrestacao.resumo.sistemaAmortizacao,
            sistemaComMenorPrazo: simulacaoPrazo.resumo.prazoRestante <=
                simulacaoPrestacao.resumo.prazoRestante
                ? simulacaoPrazo.resumo.sistemaAmortizacao
                : simulacaoPrestacao.resumo.sistemaAmortizacao,
            diferencaPrestacao: Math.round(Math.abs(simulacaoPrazo.resumo.novaPrestacao -
                simulacaoPrestacao.resumo.novaPrestacao) * 100) / 100,
        };
        return { simulacoes, analiseComparativa };
    }
};
exports.AmortizacaoService = AmortizacaoService;
exports.AmortizacaoService = AmortizacaoService = AmortizacaoService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        email_service_1.EmailService])
], AmortizacaoService);
//# sourceMappingURL=amortizacao.service.js.map