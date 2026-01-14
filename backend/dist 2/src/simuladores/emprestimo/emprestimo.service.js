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
var EmprestimoService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
const simulator_metadata_service_1 = require("../metadata/simulator-metadata.service");
const simulator_registry_1 = require("../registry/simulator.registry");
const simular_emprestimo_dto_1 = require("./dto/simular-emprestimo.dto");
const emprestimo_calc_1 = require("./calc/emprestimo.calc");
const taxas_emprestimo_data_1 = require("./data/taxas-emprestimo.data");
const email_service_1 = require("../../email/email.service");
let EmprestimoService = EmprestimoService_1 = class EmprestimoService {
    prisma;
    metadataService;
    registry;
    emailService;
    logger = new common_1.Logger(EmprestimoService_1.name);
    constructor(prisma, metadataService, registry, emailService) {
        this.prisma = prisma;
        this.metadataService = metadataService;
        this.registry = registry;
        this.emailService = emailService;
    }
    onModuleInit() {
        this.registry.register(this);
    }
    getSimulatorType() {
        return 'loan';
    }
    async execute(input, metadata) {
        return this.simular(input, metadata);
    }
    async simular(dto, metadata) {
        try {
            this.logger.log('Starting personal loan simulation');
            const redactedDto = { ...dto, email: '***', nome: '***' };
            this.logger.debug(`Input: ${JSON.stringify(redactedDto)}`);
            let taxasPf = taxas_emprestimo_data_1.TAXAS_PF;
            let taxasPj = taxas_emprestimo_data_1.TAXAS_PJ;
            let modalidadesExcluidas = taxas_emprestimo_data_1.MODALIDADES_EXCLUIDAS_POR_TIPO;
            const params = metadata;
            if (params) {
                if (params.taxasPf) {
                    taxasPf = params.taxasPf;
                    this.logger.debug('Using taxasPf from metadata');
                }
                if (params.taxasPj) {
                    taxasPj = params.taxasPj;
                    this.logger.debug('Using taxasPj from metadata');
                }
                if (params.modalidadesExcluidasPorTipo) {
                    modalidadesExcluidas = params.modalidadesExcluidasPorTipo;
                    this.logger.debug('Using modalidadesExcluidasPorTipo from metadata');
                }
            }
            else {
                this.logger.debug('Metadata not provided in arguments, fetching...');
                const fetchedMetadata = await this.metadataService.getMetadataByType('loan');
                if (fetchedMetadata && fetchedMetadata.length > 0 && fetchedMetadata[0].parameters) {
                    const fetchedParams = fetchedMetadata[0].parameters;
                    if (fetchedParams.taxasPf)
                        taxasPf = fetchedParams.taxasPf;
                    if (fetchedParams.taxasPj)
                        taxasPj = fetchedParams.taxasPj;
                    if (fetchedParams.modalidadesExcluidasPorTipo)
                        modalidadesExcluidas = fetchedParams.modalidadesExcluidasPorTipo;
                }
            }
            const taxasDisponiveis = this.buscarTaxasDisponiveis(dto.tipoPessoa, dto.tipoEmprego, taxasPf, taxasPj, modalidadesExcluidas);
            this.logger.debug(`Found ${taxasDisponiveis.length} available rates for ${dto.tipoPessoa}`);
            const ofertas = this.calcularOfertas(taxasDisponiveis, dto.valorDesejado, dto.prazoMeses, dto.renda);
            this.logger.log(`Generated ${ofertas.length} loan offers, best rate: ${ofertas[0]?.taxaMensal}%`);
            const resultado = {
                ofertas,
                totalOfertas: ofertas.length,
                melhorOferta: ofertas[0],
                tipoPessoa: dto.tipoPessoa,
                tipoEmprego: dto.tipoEmprego,
                inputData: {
                    valorDesejado: dto.valorDesejado,
                    prazoMeses: dto.prazoMeses,
                    renda: dto.renda,
                },
            };
            await this.salvarSimulacao(dto, resultado);
            return resultado;
        }
        catch (error) {
            this.logger.error('Error in personal loan simulation', error.stack);
            throw error;
        }
    }
    buscarTaxasDisponiveis(tipoPessoa, tipoEmprego, taxasPf, taxasPj, modalidadesExcluidasPorTipo) {
        const taxasBase = tipoPessoa === simular_emprestimo_dto_1.TipoPessoa.PF
            ? taxasPf.filter((t) => t.ativo)
            : taxasPj.filter((t) => t.ativo);
        if (tipoPessoa === simular_emprestimo_dto_1.TipoPessoa.PF && tipoEmprego) {
            const modalidadesExcluidas = modalidadesExcluidasPorTipo[tipoEmprego] || [];
            if (modalidadesExcluidas.length > 0) {
                this.logger.debug(`Excluding modalities for ${tipoEmprego}: ${modalidadesExcluidas.join(', ')}`);
                return taxasBase.filter((taxa) => !modalidadesExcluidas.includes(taxa.modalidade));
            }
        }
        return taxasBase;
    }
    calcularOfertas(taxas, valorEmprestimo, prazoMeses, renda) {
        const ofertas = [];
        for (const taxa of taxas) {
            try {
                const calculo = (0, emprestimo_calc_1.calcularEmprestimoPRICE)(valorEmprestimo, prazoMeses, taxa.taxaMensal);
                let comprometimentoRenda;
                if (renda && renda > 0) {
                    const comprometimento = (0, emprestimo_calc_1.calcularComprometimentoRenda)(calculo.parcelaMensal, renda);
                    comprometimentoRenda = (0, emprestimo_calc_1.arredondar2Decimais)(comprometimento);
                }
                const oferta = {
                    nomeBanco: taxa.instituicao,
                    modalidade: taxa.modalidade,
                    valorEmprestimo: calculo.valorEmprestimo,
                    prazoMeses: calculo.prazoMeses,
                    parcelaMensal: calculo.parcelaMensal,
                    taxaMensal: calculo.taxaJurosMensal,
                    taxaAnual: calculo.taxaJurosAnual,
                    totalPago: calculo.totalPago,
                    totalJuros: calculo.totalJuros,
                    taxaEfetivaAnual: calculo.taxaEfetivaAnual,
                    logo: taxa.logo,
                    comprometimentoRenda,
                };
                ofertas.push(oferta);
            }
            catch (error) {
                this.logger.warn(`Failed to calculate offer for ${taxa.instituicao}: ${error.message}`);
            }
        }
        ofertas.sort((a, b) => a.taxaMensal - b.taxaMensal);
        return ofertas;
    }
    async salvarSimulacao(dto, resultado) {
        try {
            const simulationData = {
                simulatorType: client_1.SimulatorType.EMPRESTIMO,
                nome: dto.nome,
                email: dto.email,
                inputData: {
                    tipoPessoa: dto.tipoPessoa,
                    tipoEmprego: dto.tipoEmprego || null,
                    valorDesejado: dto.valorDesejado,
                    prazoMeses: dto.prazoMeses,
                    renda: dto.renda || null,
                    compartilharDados: dto.compartilharDados || true,
                    origem: dto.origem || null,
                },
                outputData: {
                    totalOfertas: resultado.totalOfertas,
                    melhorOferta: {
                        nomeBanco: resultado.melhorOferta.nomeBanco,
                        modalidade: resultado.melhorOferta.modalidade,
                        valorEmprestimo: resultado.melhorOferta.valorEmprestimo,
                        prazoMeses: resultado.melhorOferta.prazoMeses,
                        parcelaMensal: resultado.melhorOferta.parcelaMensal,
                        taxaMensal: resultado.melhorOferta.taxaMensal,
                        taxaAnual: resultado.melhorOferta.taxaAnual,
                        totalPago: resultado.melhorOferta.totalPago,
                        totalJuros: resultado.melhorOferta.totalJuros,
                        taxaEfetivaAnual: resultado.melhorOferta.taxaEfetivaAnual,
                        comprometimentoRenda: resultado.melhorOferta.comprometimentoRenda || null,
                    },
                    ofertas: resultado.ofertas.slice(0, 10).map((o) => ({
                        nomeBanco: o.nomeBanco,
                        modalidade: o.modalidade,
                        valorEmprestimo: o.valorEmprestimo,
                        prazoMeses: o.prazoMeses,
                        parcelaMensal: o.parcelaMensal,
                        taxaMensal: o.taxaMensal,
                        taxaAnual: o.taxaAnual,
                        totalPago: o.totalPago,
                        totalJuros: o.totalJuros,
                        taxaEfetivaAnual: o.taxaEfetivaAnual,
                        comprometimentoRenda: o.comprometimentoRenda || null,
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
                    simulationType: client_1.SimulatorType.EMPRESTIMO,
                    userEmail: dto.email,
                    userName: dto.nome,
                    input: simulationData.inputData,
                    output: simulationData.outputData,
                    summary: `Simulação de Empréstimo: ${resultado.totalOfertas} ofertas encontradas. Melhor taxa: ${resultado.melhorOferta.taxaMensal}% a.m.`,
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
exports.EmprestimoService = EmprestimoService;
exports.EmprestimoService = EmprestimoService = EmprestimoService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        simulator_metadata_service_1.SimulatorMetadataService,
        simulator_registry_1.SimulatorRegistry,
        email_service_1.EmailService])
], EmprestimoService);
//# sourceMappingURL=emprestimo.service.js.map