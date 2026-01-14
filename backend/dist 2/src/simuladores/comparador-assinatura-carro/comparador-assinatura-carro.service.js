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
var ComparadorAssinaturaCarroService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComparadorAssinaturaCarroService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
const comparador_calc_1 = require("./calc/comparador.calc");
const comparador_constants_1 = require("./constants/comparador.constants");
const email_service_1 = require("../../email/email.service");
let ComparadorAssinaturaCarroService = ComparadorAssinaturaCarroService_1 = class ComparadorAssinaturaCarroService {
    prisma;
    emailService;
    logger = new common_1.Logger(ComparadorAssinaturaCarroService_1.name);
    constructor(prisma, emailService) {
        this.prisma = prisma;
        this.emailService = emailService;
    }
    async simular(dto) {
        try {
            this.logger.log('Starting car subscription comparator simulation');
            const redactedDto = { ...dto, email: '***', nome: '***' };
            this.logger.debug(`Input: ${JSON.stringify(redactedDto)}`);
            this.validarDados(dto);
            const tempoUsoAnos = dto.tempoUsoCarroMeses / 12;
            const resultado = (0, comparador_calc_1.compararCenarios)(dto.valorVeiculo, dto.entradaFinanciamento, dto.prazoFinanciamentoMeses, dto.valorAssinaturaMensal, dto.prazoAssinaturaMeses, tempoUsoAnos);
            const resultadoDto = {
                compraVista: this.formatarCenario(resultado.compraVista),
                financiamento: this.formatarCenario(resultado.financiamento),
                assinatura: this.formatarCenario(resultado.assinatura),
                melhorOpcao: resultado.melhorOpcao,
                economiaMaxima: resultado.economiaMaxima,
                periodoAnos: tempoUsoAnos,
                urls: {
                    assinatura: comparador_constants_1.URLS_REDIRECIONAMENTO.ASSINATURA_URL,
                    financiamento: comparador_constants_1.URLS_REDIRECIONAMENTO.FINANCIAMENTO_URL,
                },
            };
            this.logger.log(`Comparison completed. Best option: ${resultado.melhorOpcao}, savings: R$ ${resultado.economiaMaxima.toFixed(2)}`);
            await this.salvarSimulacao(dto, resultadoDto);
            return resultadoDto;
        }
        catch (error) {
            this.logger.error('Error in car subscription comparator simulation', error.stack);
            throw error;
        }
    }
    validarDados(dto) {
        if (dto.valorVeiculo <= 0) {
            throw new Error('Vehicle value must be greater than zero');
        }
        if (dto.entradaFinanciamento >= dto.valorVeiculo) {
            throw new Error('Down payment must be less than vehicle value');
        }
        if (dto.valorAssinaturaMensal <= 0) {
            throw new Error('Subscription cost must be greater than zero');
        }
        if (dto.tempoUsoCarroMeses < 12 || dto.tempoUsoCarroMeses > 60) {
            throw new Error('Car usage time must be between 12 and 60 months');
        }
    }
    formatarCenario(cenario) {
        return {
            nome: cenario.nome,
            custoTotal: cenario.custoTotal,
            valorRevenda: cenario.valorRevenda,
            custoLiquido: cenario.custoLiquido,
            breakdown: cenario.breakdown,
        };
    }
    async salvarSimulacao(dto, resultado) {
        try {
            const simulationData = {
                simulatorType: client_1.SimulatorType.COMPARADOR_ASSINATURA_CARRO,
                nome: dto.nome,
                email: dto.email,
                inputData: {
                    valorVeiculo: dto.valorVeiculo,
                    entradaFinanciamento: dto.entradaFinanciamento,
                    prazoFinanciamentoMeses: dto.prazoFinanciamentoMeses,
                    valorAssinaturaMensal: dto.valorAssinaturaMensal,
                    prazoAssinaturaMeses: dto.prazoAssinaturaMeses,
                    tempoUsoCarroMeses: dto.tempoUsoCarroMeses,
                },
                outputData: {
                    melhorOpcao: resultado.melhorOpcao,
                    economiaMaxima: resultado.economiaMaxima,
                    compraVista: {
                        custoTotal: resultado.compraVista.custoTotal,
                        custoLiquido: resultado.compraVista.custoLiquido,
                        valorRevenda: resultado.compraVista.valorRevenda,
                    },
                    financiamento: {
                        custoTotal: resultado.financiamento.custoTotal,
                        custoLiquido: resultado.financiamento.custoLiquido,
                        valorRevenda: resultado.financiamento.valorRevenda,
                    },
                    assinatura: {
                        custoTotal: resultado.assinatura.custoTotal,
                        custoLiquido: resultado.assinatura.custoLiquido,
                        valorRevenda: resultado.assinatura.valorRevenda,
                    },
                },
                email_opt_in_simulation: dto.email_opt_in_simulation,
                email_opt_in_at: dto.email_opt_in_simulation ? new Date() : null,
            };
            await this.prisma.simulation.create({
                data: simulationData,
            });
            if (dto.email_opt_in_simulation) {
                await this.emailService.sendSimulationResult({
                    simulationType: client_1.SimulatorType.COMPARADOR_ASSINATURA_CARRO,
                    userEmail: dto.email,
                    userName: dto.nome,
                    input: simulationData.inputData,
                    output: simulationData.outputData,
                    summary: `Melhor opção: ${resultado.melhorOpcao}, Economia: R$ ${resultado.economiaMaxima.toFixed(2)}`,
                    createdAt: new Date(),
                });
            }
            this.logger.log(`Simulation saved successfully for ${dto.email} (Vehicle: R$ ${dto.valorVeiculo})`);
        }
        catch (error) {
            this.logger.error('Failed to save simulation to database', error.stack);
        }
    }
};
exports.ComparadorAssinaturaCarroService = ComparadorAssinaturaCarroService;
exports.ComparadorAssinaturaCarroService = ComparadorAssinaturaCarroService = ComparadorAssinaturaCarroService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        email_service_1.EmailService])
], ComparadorAssinaturaCarroService);
//# sourceMappingURL=comparador-assinatura-carro.service.js.map