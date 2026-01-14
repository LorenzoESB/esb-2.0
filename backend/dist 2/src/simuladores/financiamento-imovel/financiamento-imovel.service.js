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
var FinanciamentoImovelService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinanciamentoImovelService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
const financiamento_imovel_calc_1 = require("./calc/financiamento-imovel.calc");
const taxas_financiamento_data_1 = require("./data/taxas-financiamento.data");
const simulator_metadata_service_1 = require("../metadata/simulator-metadata.service");
const simulator_registry_1 = require("../registry/simulator.registry");
const email_service_1 = require("../../email/email.service");
let FinanciamentoImovelService = FinanciamentoImovelService_1 = class FinanciamentoImovelService {
    prisma;
    taxasFinanciamentoData;
    metadataService;
    registry;
    emailService;
    logger = new common_1.Logger(FinanciamentoImovelService_1.name);
    constructor(prisma, taxasFinanciamentoData, metadataService, registry, emailService) {
        this.prisma = prisma;
        this.taxasFinanciamentoData = taxasFinanciamentoData;
        this.metadataService = metadataService;
        this.registry = registry;
        this.emailService = emailService;
    }
    onModuleInit() {
        this.registry.register(this);
    }
    getSimulatorType() {
        return 'real-estate-financing';
    }
    async execute(input, metadata) {
        return this.simular(input, metadata);
    }
    async simular(dto, metadata) {
        try {
            this.logger.log('Starting real estate financing simulation');
            const redactedDto = { ...dto, email: '***', nome: '***' };
            this.logger.debug(`Input: ${JSON.stringify(redactedDto)}`);
            this.validarDados(dto);
            const valorFinanciado = dto.valorImovel - dto.valorEntrada;
            this.logger.debug(`Financing amount: R$ ${valorFinanciado.toFixed(2)} (Property: R$ ${dto.valorImovel.toFixed(2)}, Down payment: R$ ${dto.valorEntrada.toFixed(2)})`);
            let taxas = [];
            const params = metadata;
            if (params) {
                if (params.realEstateRates && Array.isArray(params.realEstateRates) && params.realEstateRates.length > 0) {
                    taxas = params.realEstateRates;
                    this.logger.debug(`Using ${taxas.length} rates from metadata`);
                }
                else if (params.rates && Array.isArray(params.rates) && params.rates.length > 0) {
                    taxas = params.rates.filter((r) => r.type === 'real_estate' || !r.type);
                }
            }
            else {
                const fetchedMetadata = await this.metadataService.getMetadataByType('financing');
                if (fetchedMetadata && fetchedMetadata.length > 0 && fetchedMetadata[0].parameters) {
                    const fetchedParams = fetchedMetadata[0].parameters;
                    if (fetchedParams.realEstateRates && Array.isArray(fetchedParams.realEstateRates) && fetchedParams.realEstateRates.length > 0) {
                        taxas = fetchedParams.realEstateRates;
                    }
                    else if (fetchedParams.rates && Array.isArray(fetchedParams.rates) && fetchedParams.rates.length > 0) {
                        taxas = fetchedParams.rates.filter((r) => r.type === 'real_estate' || !r.type);
                    }
                }
            }
            if (taxas.length === 0) {
                taxas = await this.taxasFinanciamentoData.obterTaxasImovel();
            }
            this.logger.debug(`Found ${taxas.length} financing rates`);
            const ofertas = this.calcularOfertas(taxas, valorFinanciado, dto.prazoMeses, dto.rendaMensal);
            this.logger.log(`Generated ${ofertas.length} financing offers, best rate: ${ofertas[0]?.taxaJurosAnual}% per year`);
            await this.salvarSimulacao(dto, ofertas);
            return ofertas;
        }
        catch (error) {
            this.logger.error('Error in real estate financing simulation', error.stack);
            throw error;
        }
    }
    validarDados(dto) {
        if (dto.valorEntrada >= dto.valorImovel) {
            throw new Error('Down payment must be less than property value');
        }
        const valorFinanciado = dto.valorImovel - dto.valorEntrada;
        if (valorFinanciado <= 0) {
            throw new Error('Financing amount must be greater than zero');
        }
        if (dto.rendaMensal <= 0) {
            throw new Error('Monthly income must be greater than zero');
        }
        if (dto.prazoMeses <= 0) {
            throw new Error('Term must be greater than zero months');
        }
    }
    calcularOfertas(taxas, valorFinanciado, prazoMeses, rendaMensal) {
        const ofertas = [];
        for (const taxa of taxas) {
            try {
                const calculo = (0, financiamento_imovel_calc_1.calcularFinanciamentoSAC)(valorFinanciado, prazoMeses, taxa.taxaJurosAnual, rendaMensal);
                const oferta = {
                    nomeBanco: taxa.instituicaoFinanceira,
                    modalidade: taxa.modalidade,
                    parcelaInicial: calculo.parcelaInicial,
                    parcelaFinal: calculo.parcelaFinal,
                    valorTotal: calculo.valorTotal,
                    taxaJurosAnual: calculo.taxaJurosAnual,
                    taxaJurosMensal: calculo.taxaJurosMensal,
                    comprometimentoRenda: calculo.comprometimentoRenda,
                    logo: undefined,
                };
                ofertas.push(oferta);
            }
            catch (error) {
                this.logger.warn(`Failed to calculate offer for ${taxa.instituicaoFinanceira}: ${error.message}`);
            }
        }
        ofertas.sort((a, b) => a.parcelaInicial - b.parcelaInicial);
        return ofertas;
    }
    async salvarSimulacao(dto, ofertas) {
        try {
            const melhorOferta = ofertas[0];
            const simulationData = {
                simulatorType: client_1.SimulatorType.FINANCIAMENTO_IMOVEL,
                nome: dto.nome,
                email: dto.email,
                inputData: {
                    valorImovel: dto.valorImovel,
                    valorEntrada: dto.valorEntrada,
                    prazoMeses: dto.prazoMeses,
                    rendaMensal: dto.rendaMensal,
                },
                outputData: {
                    totalOfertas: ofertas.length,
                    melhorOferta: melhorOferta
                        ? {
                            nomeBanco: melhorOferta.nomeBanco,
                            modalidade: melhorOferta.modalidade,
                            parcelaInicial: melhorOferta.parcelaInicial,
                            parcelaFinal: melhorOferta.parcelaFinal,
                            valorTotal: melhorOferta.valorTotal,
                            taxaJurosAnual: melhorOferta.taxaJurosAnual,
                            taxaJurosMensal: melhorOferta.taxaJurosMensal,
                            comprometimentoRenda: melhorOferta.comprometimentoRenda,
                        }
                        : null,
                    ofertas: ofertas.slice(0, 10).map((o) => ({
                        nomeBanco: o.nomeBanco,
                        modalidade: o.modalidade,
                        parcelaInicial: o.parcelaInicial,
                        parcelaFinal: o.parcelaFinal,
                        valorTotal: o.valorTotal,
                        taxaJurosAnual: o.taxaJurosAnual,
                        taxaJurosMensal: o.taxaJurosMensal,
                        comprometimentoRenda: o.comprometimentoRenda,
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
                    simulationType: client_1.SimulatorType.FINANCIAMENTO_IMOVEL,
                    userEmail: dto.email,
                    userName: dto.nome,
                    input: simulationData.inputData,
                    output: simulationData.outputData,
                    summary: `Simulação de Financiamento Imobiliário: ${ofertas.length} ofertas. Melhor taxa: ${melhorOferta?.taxaJurosAnual}% a.a.`,
                    createdAt: new Date(),
                });
            }
            this.logger.log(`Simulation saved successfully for ${dto.email} (Property: R$ ${dto.valorImovel})`);
        }
        catch (error) {
            this.logger.error('Failed to save simulation to database', error.stack);
        }
    }
};
exports.FinanciamentoImovelService = FinanciamentoImovelService;
exports.FinanciamentoImovelService = FinanciamentoImovelService = FinanciamentoImovelService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        taxas_financiamento_data_1.TaxasFinanciamentoData,
        simulator_metadata_service_1.SimulatorMetadataService,
        simulator_registry_1.SimulatorRegistry,
        email_service_1.EmailService])
], FinanciamentoImovelService);
//# sourceMappingURL=financiamento-imovel.service.js.map