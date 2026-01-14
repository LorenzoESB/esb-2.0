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
var TaxaMaquininhaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxaMaquininhaService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
const taxa_maquininha_calc_1 = require("./calc/taxa-maquininha.calc");
const maquininhas_data_1 = require("./data/maquininhas.data");
const email_service_1 = require("../../email/email.service");
let TaxaMaquininhaService = TaxaMaquininhaService_1 = class TaxaMaquininhaService {
    prisma;
    emailService;
    logger = new common_1.Logger(TaxaMaquininhaService_1.name);
    constructor(prisma, emailService) {
        this.prisma = prisma;
        this.emailService = emailService;
    }
    async simular(dto) {
        try {
            this.logger.log('Starting card machine fee simulation');
            const redactedDto = { ...dto, email: '***', nome: '***' };
            this.logger.debug(`Input: ${JSON.stringify(redactedDto)}`);
            const filtros = this.montarFiltros(dto);
            const maquininhas = (0, maquininhas_data_1.getMaquininhasAtivas)();
            this.logger.debug(`Loaded ${maquininhas.length} active card machines from data`);
            const resultados = (0, taxa_maquininha_calc_1.calcularMaq)(dto.venda_credito_vista, dto.venda_debito, dto.venda_credito_parcelado, dto.numero_parcelas, dto.segmento || null, filtros, maquininhas);
            this.logger.log(`Calculation completed. Found ${resultados.length} matching machines`);
            const maquininhasDtos = resultados.map((r) => ({
                nome: r.nome,
                id_maq: r.id_maq,
                empresa: r.empresa,
                empresa_cnpj: r.empresa_cnpj,
                logo: r.logo,
                imagem_maquina: r.imagem_maquina,
                valor_mensal: r.valor_mensal,
                valor_mensalidade: r.valor_mensalidade,
                valor_transacao: r.valor_transacao,
                valor_selo: r.valor_selo,
                dias_debito: r.dias_debito,
                dias_credito: r.dias_credito,
                tipo_dias_credito: r.tipo_dias_credito,
                dias_credito_parcelado: r.dias_credito_parcelado,
                tipo_recebimento_parcelado: r.tipo_recebimento_parcelado,
                co_cartao: r.co_cartao,
                site: r.site,
                observacao: r.observacao,
                cupom: r.cupom,
                possibilidade_parcelamento: r.possibilidade_parcelamento,
                afiliacao_a_banco: r.afiliacao_a_banco,
                chip: r.chip,
                tarja: r.tarja,
                NFC: r.NFC,
                PF: r.PF,
                PJ: r.PJ,
                precisa_de_telefone: r.precisa_de_telefone,
                fio: r.fio,
                imprime_recibo: r.imprime_recibo,
                garantia: r.garantia,
                possivel_antecipacao: r.possivel_antecipacao,
                antecipado: r.antecipado,
                opcao_ecommerce: r.opcao_ecommerce,
                taxas_transparentes: r.taxas_transparentes,
                vale_refeicao: r.vale_refeicao,
                tipo_conexoes: r.tipo_conexoes,
                forma_recebimento: r.forma_recebimento,
                bandeiras: r.bandeiras,
                avaliacao: r.avaliacao,
                data_atualizacao: r.data_atualizacao,
                url_avaliacao: r.url_avaliacao,
                cruzamentos: r.cruzamentos,
                tem_parceria: r.tem_parceria,
            }));
            const maquininhasOrdenadas = [...maquininhasDtos].sort((a, b) => a.valor_mensal - b.valor_mensal);
            const resultado = {
                maquininhas: maquininhasOrdenadas,
                total: maquininhasOrdenadas.length,
                melhor_opcao: maquininhasOrdenadas[0],
                input_data: {
                    venda_debito: dto.venda_debito,
                    venda_credito_vista: dto.venda_credito_vista,
                    venda_credito_parcelado: dto.venda_credito_parcelado,
                    numero_parcelas: dto.numero_parcelas,
                    segmento: dto.segmento,
                },
            };
            await this.salvarSimulacao(dto, resultado);
            this.logger.log(`Simulation completed successfully. Best option: ${resultado.melhor_opcao.nome} (R$ ${resultado.melhor_opcao.valor_mensal.toFixed(2)}/mês)`);
            return resultado;
        }
        catch (error) {
            this.logger.error('Error in card machine simulation', error.stack);
            throw error;
        }
    }
    montarFiltros(dto) {
        const temFiltros = dto.sem_mensalidade ||
            dto.aceita_cartao_tarja ||
            dto.sem_fio ||
            dto.pf ||
            dto.pj ||
            dto.imprime_recibo ||
            dto.wifi ||
            dto.quer_antecipar ||
            dto.n_exige_smartphone ||
            dto.aceita_vale_refeicao ||
            dto.ecommerce;
        if (!temFiltros) {
            return null;
        }
        return {
            mensalidade: dto.sem_mensalidade || false,
            tarja: dto.aceita_cartao_tarja || false,
            fio: dto.sem_fio || false,
            PF: dto.pf || false,
            PJ: dto.pj || false,
            imprime_recibo: dto.imprime_recibo || false,
            wifi: dto.wifi || false,
            quero_antecipar: dto.quer_antecipar || false,
            precisa_de_telefone: dto.n_exige_smartphone || false,
            vale_refeicao: dto.aceita_vale_refeicao || false,
            opcao_ecommerce: dto.ecommerce || false,
        };
    }
    async salvarSimulacao(dto, resultado) {
        try {
            const simulationData = {
                simulatorType: client_1.SimulatorType.TAXA_MAQUININHA,
                nome: dto.nome,
                email: dto.email,
                inputData: {
                    venda_debito: dto.venda_debito,
                    venda_credito_vista: dto.venda_credito_vista,
                    venda_credito_parcelado: dto.venda_credito_parcelado,
                    numero_parcelas: dto.numero_parcelas,
                    segmento: dto.segmento || null,
                    sem_mensalidade: dto.sem_mensalidade || false,
                    aceita_cartao_tarja: dto.aceita_cartao_tarja || false,
                    sem_fio: dto.sem_fio || false,
                    pf: dto.pf || false,
                    pj: dto.pj || false,
                    imprime_recibo: dto.imprime_recibo || false,
                    wifi: dto.wifi || false,
                    quer_antecipar: dto.quer_antecipar || false,
                    n_exige_smartphone: dto.n_exige_smartphone || false,
                    aceita_vale_refeicao: dto.aceita_vale_refeicao || false,
                    ecommerce: dto.ecommerce || false,
                    compartilharDados: dto.compartilharDados || true,
                    origem: dto.origem || null,
                },
                outputData: {
                    total: resultado.total,
                    melhor_opcao: {
                        nome: resultado.melhor_opcao.nome,
                        empresa: resultado.melhor_opcao.empresa,
                        valor_mensal: resultado.melhor_opcao.valor_mensal,
                        avaliacao: resultado.melhor_opcao.avaliacao,
                    },
                    top_10: resultado.maquininhas.slice(0, 10).map((m) => ({
                        nome: m.nome,
                        empresa: m.empresa,
                        valor_mensal: m.valor_mensal,
                        avaliacao: m.avaliacao,
                        dias_debito: m.dias_debito,
                        dias_credito: m.dias_credito,
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
                    simulationType: client_1.SimulatorType.TAXA_MAQUININHA,
                    userEmail: dto.email,
                    userName: dto.nome,
                    input: simulationData.inputData,
                    output: simulationData.outputData,
                    summary: `Simulação de Taxa de Maquininha: Melhor opção ${resultado.melhor_opcao.nome} (R$ ${resultado.melhor_opcao.valor_mensal.toFixed(2)}/mês)`,
                    createdAt: new Date(),
                });
            }
            this.logger.log(`Simulation saved successfully for ${dto.email} (${resultado.total} results)`);
        }
        catch (error) {
            this.logger.error('Failed to save simulation to database', error.stack);
        }
    }
};
exports.TaxaMaquininhaService = TaxaMaquininhaService;
exports.TaxaMaquininhaService = TaxaMaquininhaService = TaxaMaquininhaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        email_service_1.EmailService])
], TaxaMaquininhaService);
//# sourceMappingURL=taxa-maquininha.service.js.map