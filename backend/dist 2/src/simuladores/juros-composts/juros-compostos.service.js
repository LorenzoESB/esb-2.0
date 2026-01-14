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
var JurosCompostosService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JurosCompostosService = void 0;
const common_1 = require("@nestjs/common");
const juros_compostos_input_dto_1 = require("./dto/juros-compostos-input.dto");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
const email_service_1 = require("../../email/email.service");
let JurosCompostosService = JurosCompostosService_1 = class JurosCompostosService {
    prisma;
    emailService;
    logger = new common_1.Logger(JurosCompostosService_1.name);
    constructor(prisma, emailService) {
        this.prisma = prisma;
        this.emailService = emailService;
    }
    aliquotasIR = {
        ate180: 0.225,
        ate360: 0.2,
        ate720: 0.175,
        acima720: 0.15,
    };
    async calculaJurosCompostos(input) {
        const redactedInput = { ...input, email: '***', nome: '***' };
        this.logger.debug('Calculating compound interest', { input: redactedInput });
        const periodoMeses = this.calcularPeriodoMeses(input.tempoAplicacao, input.tempoAplicacaoUnidade);
        const tempoEmDias = this.converterParaDias(input.tempoAplicacao, input.tempoAplicacaoUnidade);
        const calculo = this.calcularJurosCompostosMesAMes(input.valorInicial, input.aporteMensal, periodoMeses, input.taxaJuros);
        const aliquotaIR = this.getAliquotaIR(tempoEmDias);
        const rendimentoBruto = calculo.rendimentoTotalBruto;
        const impostoRenda = rendimentoBruto * aliquotaIR;
        const rendimentoLiquido = rendimentoBruto - impostoRenda;
        const detalhesMensaisFormatados = calculo.detalhesMensais.map((detalhe) => ({
            mes: detalhe.mes,
            valorInvestido: this.formatarValor(detalhe.totalAportado),
            valorComJuros: this.formatarValor(detalhe.novoSaldo),
            jurosDoMes: this.formatarValor(detalhe.rendimentoMes),
            jurosAcumulados: this.formatarValor(detalhe.rendimentoAcumulado),
        }));
        const result = {
            resumo: {
                valorTotalFinalBruto: this.formatarValor(calculo.saldoFinal),
                totalInvestido: this.formatarValor(calculo.totalAportado),
                totalEmJurosBruto: this.formatarValor(rendimentoBruto),
            },
            detalhesMensais: detalhesMensaisFormatados,
        };
        this.logger.debug('Compound interest calculated successfully', {
            totalFinal: result.resumo.valorTotalFinalBruto,
        });
        try {
            await this.salvarSimulacao(input, result);
        }
        catch (error) {
            this.logger.error('Error saving simulation to database', error.stack);
        }
        return result;
    }
    async salvarSimulacao(input, output) {
        const simulationData = {
            simulatorType: client_1.SimulatorType.JUROS_COMPOSTOS,
            email: input.email,
            nome: input.nome,
            inputData: JSON.parse(JSON.stringify(input)),
            outputData: JSON.parse(JSON.stringify(output)),
            email_opt_in_simulation: input.email_opt_in_simulation,
            email_opt_in_at: input.email_opt_in_simulation ? new Date() : null,
        };
        this.logger.debug('Saving simulation to database', {
            hasInputData: !!simulationData.inputData,
            hasOutputData: !!simulationData.outputData,
            outputDataKeys: Object.keys(simulationData.outputData),
        });
        const saved = await this.prisma.simulation.create({
            data: simulationData,
        });
        if (input.email_opt_in_simulation) {
            await this.emailService.sendSimulationResult({
                simulationType: client_1.SimulatorType.JUROS_COMPOSTOS,
                userEmail: input.email,
                userName: input.nome,
                input: simulationData.inputData,
                output: simulationData.outputData,
                summary: `Simulação de Juros Compostos: Total investido: R$ ${output.resumo.totalInvestido}, Valor final: R$ ${output.resumo.valorTotalFinalBruto}`,
                createdAt: new Date(),
            });
        }
        this.logger.log('Simulation saved to database', {
            id: saved.id,
            hasOutputData: !!saved.outputData,
        });
    }
    getAliquotaIR(dias) {
        if (dias <= 180)
            return this.aliquotasIR.ate180;
        if (dias <= 360)
            return this.aliquotasIR.ate360;
        if (dias <= 720)
            return this.aliquotasIR.ate720;
        return this.aliquotasIR.acima720;
    }
    converterParaDias(tempo, unidade) {
        return unidade === juros_compostos_input_dto_1.TempoAplicacaoUnidade.ANOS ? tempo * 365 : tempo * 30;
    }
    calcularPeriodoMeses(tempo, unidade) {
        return unidade === juros_compostos_input_dto_1.TempoAplicacaoUnidade.ANOS ? tempo * 12 : tempo;
    }
    calcularJurosCompostosMesAMes(valorInicial, aporteMensal, periodoMeses, taxaJurosAnual) {
        const taxaMensal = Math.pow(1 + taxaJurosAnual / 100, 1 / 12) - 1;
        let saldo = valorInicial;
        let totalAportado = valorInicial;
        let rendimentoAcumulado = 0;
        const detalhesMensais = [];
        for (let mes = 1; mes <= periodoMeses; mes++) {
            const saldoAnterior = saldo;
            const rendimentoMes = saldo * taxaMensal;
            const aporteDoMes = aporteMensal;
            const novoSaldo = saldo + rendimentoMes + aporteDoMes;
            rendimentoAcumulado += rendimentoMes;
            totalAportado += aporteMensal;
            detalhesMensais.push({
                mes,
                saldoAnterior,
                rendimentoMes,
                aporte: aporteDoMes,
                novoSaldo,
                rendimentoAcumulado,
                totalAportado,
            });
            saldo = novoSaldo;
        }
        return {
            saldoFinal: saldo,
            rendimentoTotalBruto: rendimentoAcumulado,
            totalAportado,
            detalhesMensais,
        };
    }
    formatarValor(valor) {
        return parseFloat(valor.toFixed(2));
    }
};
exports.JurosCompostosService = JurosCompostosService;
exports.JurosCompostosService = JurosCompostosService = JurosCompostosService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        email_service_1.EmailService])
], JurosCompostosService);
//# sourceMappingURL=juros-compostos.service.js.map