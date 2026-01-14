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
var ContasDigitaisService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContasDigitaisService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
const contas_digitais_data_1 = require("./data/contas-digitais.data");
const contas_digitais_calc_1 = require("./calc/contas-digitais.calc");
const email_service_1 = require("../../email/email.service");
let ContasDigitaisService = ContasDigitaisService_1 = class ContasDigitaisService {
    prisma;
    contasDigitaisData;
    emailService;
    logger = new common_1.Logger(ContasDigitaisService_1.name);
    constructor(prisma, contasDigitaisData, emailService) {
        this.prisma = prisma;
        this.contasDigitaisData = contasDigitaisData;
        this.emailService = emailService;
    }
    async simularPessoaFisica(dto) {
        try {
            this.logger.log('Starting digital accounts simulation (Pessoa Física)');
            const redactedDto = { ...dto, email: '***' };
            this.logger.debug(`Input: ${JSON.stringify(redactedDto)}`);
            const dadosSimulacao = {
                tipoPessoa: contas_digitais_data_1.TipoPessoa.FISICA,
                temConta: dto.temConta,
                tarifa: dto.tarifa || 0,
                saques: dto.saques,
                nDocs: dto.nDocs,
                nTeds: dto.nTeds,
                nDepositos: dto.nDepositos,
                credito: dto.credito,
                debito: dto.debito,
                investimentos: dto.investimentos,
                transferencias: dto.transferencias,
                depCheque: dto.depCheque,
            };
            const todasContas = this.contasDigitaisData.obterTodasContas();
            this.logger.debug(`Total accounts in database: ${todasContas.length}`);
            const resultados = (0, contas_digitais_calc_1.calcularComparacaoContas)(todasContas, dadosSimulacao);
            this.logger.log(`Found ${resultados.length} matching accounts for Pessoa Física`);
            if (resultados.length > 0) {
                this.logger.log(`Best option: ${resultados[0].nomeBanco} - ${resultados[0].nome} (R$ ${resultados[0].tarifaTotal.toFixed(2)}/month)`);
            }
            await this.salvarSimulacao(dto, resultados);
            return resultados;
        }
        catch (error) {
            this.logger.error('Error in digital accounts simulation (PF)', error.stack);
            throw error;
        }
    }
    async simularPessoaJuridica(dto) {
        try {
            this.logger.log('Starting digital accounts simulation (Pessoa Jurídica)');
            this.logger.debug(`Input: ${JSON.stringify(dto)}`);
            const dadosSimulacao = {
                tipoPessoa: contas_digitais_data_1.TipoPessoa.JURIDICA,
                temConta: dto.temConta,
                tarifa: dto.tarifa || 0,
                saques: dto.saques,
                nDocs: dto.nDocs,
                nTeds: dto.nTeds,
                boletos: dto.boletos,
                maquininha: dto.maquininha,
                folhaPagamento: dto.folhaPagamento,
                debito: dto.debito,
                cartaoVirtual: dto.cartaoVirtual,
            };
            const todasContas = this.contasDigitaisData.obterTodasContas();
            this.logger.debug(`Total accounts in database: ${todasContas.length}`);
            const resultados = (0, contas_digitais_calc_1.calcularComparacaoContas)(todasContas, dadosSimulacao);
            this.logger.log(`Found ${resultados.length} matching accounts for Pessoa Jurídica`);
            if (resultados.length > 0) {
                this.logger.log(`Best option: ${resultados[0].nomeBanco} - ${resultados[0].nome} (R$ ${resultados[0].tarifaTotal.toFixed(2)}/month)`);
            }
            await this.salvarSimulacao(dto, resultados);
            return resultados;
        }
        catch (error) {
            this.logger.error('Error in digital accounts simulation (PJ)', error.stack);
            throw error;
        }
    }
    async salvarSimulacao(dto, resultados) {
        try {
            const melhorOpcao = resultados[0];
            const simulationData = {
                simulatorType: client_1.SimulatorType.CONTAS_DIGITAIS,
                nome: dto.nome,
                email: dto.email,
                inputData: {
                    tipoPessoa: dto.tipoPessoa,
                    temConta: dto.temConta,
                    tarifa: dto.tarifa,
                    saques: dto.saques,
                    nDocs: dto.nDocs,
                    nTeds: dto.nTeds,
                    debito: dto.debito,
                    ...(dto.tipoPessoa === contas_digitais_data_1.TipoPessoa.FISICA && {
                        nDepositos: dto.nDepositos,
                        credito: dto.credito,
                        investimentos: dto.investimentos,
                        transferencias: dto.transferencias,
                        depCheque: dto.depCheque,
                    }),
                    ...(dto.tipoPessoa === contas_digitais_data_1.TipoPessoa.JURIDICA && {
                        boletos: dto.boletos,
                        maquininha: dto.maquininha,
                        folhaPagamento: dto.folhaPagamento,
                        cartaoVirtual: dto.cartaoVirtual,
                    }),
                },
                outputData: {
                    totalContas: resultados.length,
                    melhorOpcao: melhorOpcao
                        ? {
                            contaId: melhorOpcao.contaId,
                            nome: melhorOpcao.nome,
                            nomeBanco: melhorOpcao.nomeBanco,
                            tarifaTotal: melhorOpcao.tarifaTotal,
                            economia: melhorOpcao.economia,
                        }
                        : null,
                    contas: resultados.slice(0, 10).map((r) => ({
                        contaId: r.contaId,
                        nome: r.nome,
                        nomeBanco: r.nomeBanco,
                        tarifaTotal: r.tarifaTotal,
                        economia: r.economia,
                    })),
                },
                email_opt_in_simulation: dto.email_opt_in_simulation,
                email_opt_in_at: dto.email_opt_in_simulation ? new Date() : null,
            };
            await this.prisma.simulation.create({
                data: simulationData,
            });
            if (dto.email_opt_in_simulation) {
                await this.emailService.sendSimulationResult({
                    simulationType: client_1.SimulatorType.CONTAS_DIGITAIS,
                    userEmail: dto.email,
                    userName: dto.nome,
                    input: simulationData.inputData,
                    output: simulationData.outputData,
                    summary: melhorOpcao
                        ? `Melhor opção: ${melhorOpcao.nomeBanco} - ${melhorOpcao.nome} (R$ ${melhorOpcao.tarifaTotal.toFixed(2)}/mês)`
                        : 'Simulação de Contas Digitais',
                    createdAt: new Date(),
                });
            }
            this.logger.log(`Simulation saved successfully for ${dto.email} (${dto.tipoPessoa})`);
        }
        catch (error) {
            this.logger.error('Failed to save simulation to database', error.stack);
        }
    }
};
exports.ContasDigitaisService = ContasDigitaisService;
exports.ContasDigitaisService = ContasDigitaisService = ContasDigitaisService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        contas_digitais_data_1.ContasDigitaisData,
        email_service_1.EmailService])
], ContasDigitaisService);
//# sourceMappingURL=contas-digitais.service.js.map