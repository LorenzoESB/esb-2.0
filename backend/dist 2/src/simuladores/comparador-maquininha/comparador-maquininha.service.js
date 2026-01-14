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
var ComparadorMaquininhaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComparadorMaquininhaService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
const maquininhas_data_1 = require("../taxa-maquininha/data/maquininhas.data");
const email_service_1 = require("../../email/email.service");
let ComparadorMaquininhaService = ComparadorMaquininhaService_1 = class ComparadorMaquininhaService {
    prisma;
    emailService;
    logger = new common_1.Logger(ComparadorMaquininhaService_1.name);
    constructor(prisma, emailService) {
        this.prisma = prisma;
        this.emailService = emailService;
    }
    async listarMaquinhasDisponiveis() {
        try {
            this.logger.log('Fetching available card machines for comparison');
            const maquininhasAtivas = maquininhas_data_1.MAQUININHAS.filter((m) => m.ativo);
            const maquininhasOpcoes = maquininhasAtivas.map((m) => ({
                id: m.id,
                nome: m.nome,
                empresa: m.empresa.nome,
                logo: m.empresa.logo,
            }));
            maquininhasOpcoes.sort((a, b) => a.nome.localeCompare(b.nome));
            this.logger.log(`Found ${maquininhasOpcoes.length} active card machines available for comparison`);
            return {
                maquininhas: maquininhasOpcoes,
                total: maquininhasOpcoes.length,
            };
        }
        catch (error) {
            this.logger.error('Error fetching available card machines', error.stack);
            throw error;
        }
    }
    async comparar(dto) {
        try {
            this.logger.log(`Starting card machine comparison for ${dto.maquininhas_ids.length} machines`);
            const redactedDto = { ...dto, email: '***', nome: '***' };
            this.logger.debug(`Input: ${JSON.stringify(redactedDto)}`);
            const maquininhas = maquininhas_data_1.MAQUININHAS.filter((m) => dto.maquininhas_ids.includes(m.id) && m.ativo);
            if (maquininhas.length === 0) {
                throw new common_1.NotFoundException('Nenhuma maquininha encontrada com os IDs informados');
            }
            if (maquininhas.length < 2) {
                throw new common_1.NotFoundException('É necessário pelo menos 2 maquininhas para comparar');
            }
            this.logger.debug(`Found ${maquininhas.length} card machines to compare`);
            const maquininhasDtos = maquininhas.map((m) => ({
                id: m.id,
                nome: m.nome,
                empresa: m.empresa.nome,
                logo: m.empresa.logo,
                imagem: m.imagem,
                preco: m.valor_leitor,
                preco_promocional: m.valor_promocional,
                mensalidade: m.valor_mensalidade,
                chip: m.chip,
                tarja: m.tarja,
                nfc: m.NFC,
                com_fio: m.fio,
                imprime_recibo: m.imprime_recibo,
                precisa_smartphone: m.precisa_de_telefone,
                permite_antecipacao: m.possivel_antecipacao,
                atende_pf: m.PF,
                atende_pj: m.PJ,
                vale_refeicao: m.vale_refeicao,
                ecommerce: m.opcao_ecommerce,
                max_parcelas: m.possibilidade_parcelamento,
                garantia: m.garantia,
                tipos_conexao: m.tipo_conexao.map((tc) => tc.nome),
                bandeiras: m.bandeiras.map((b) => b.nome),
                formas_recebimento: m.forma_recebimento.map((fr) => fr.nome),
                observacoes: m.observacao,
                url_contratacao: m.planos.length > 0 ? m.planos[0].url : '#',
                cupom: m.cupom,
                transparencia: m.transparencia,
                url_avaliacao: m.url_avaliacao,
                data_atualizacao: m.atualizado_em.toLocaleDateString('pt-BR'),
                planos: m.planos
                    .filter((p) => p.ativo)
                    .map((p) => ({
                    id: p.id,
                    nome: p.nome,
                    taxa_debito: this.formatarPercentual(p.taxa_desconto_debito),
                    taxa_credito_vista: this.formatarPercentual(p.taxa_desconto_credito_vista),
                    taxa_credito_parcelado_min: this.formatarPercentual(p.taxa_desconto_credito_vista + p.taxa_adicional_parcela),
                    dias_repasse_debito: p.dias_repasse_debito,
                    dias_repasse_credito: p.dias_repasse_credito,
                    avaliacao: p.avaliacao,
                })),
            }));
            const resultado = {
                maquininhas: maquininhasDtos,
                total: maquininhasDtos.length,
            };
            await this.salvarComparacao(dto, resultado);
            this.logger.log(`Comparison completed successfully for ${resultado.total} machines`);
            return resultado;
        }
        catch (error) {
            this.logger.error('Error in card machine comparison', error.stack);
            throw error;
        }
    }
    formatarPercentual(valor) {
        return `${(valor * 100).toFixed(2).replace('.', ',')}%`;
    }
    async salvarComparacao(dto, resultado) {
        try {
            const simulationData = {
                simulatorType: client_1.SimulatorType.COMPARADOR_MAQUININHA,
                nome: dto.nome,
                email: dto.email,
                inputData: {
                    maquininhas_ids: dto.maquininhas_ids,
                    compartilharDados: dto.compartilharDados || true,
                    origem: dto.origem || null,
                },
                outputData: {
                    total: resultado.total,
                    maquininhas: resultado.maquininhas.map((m) => ({
                        id: m.id,
                        nome: m.nome,
                        empresa: m.empresa,
                        preco: m.preco,
                        mensalidade: m.mensalidade,
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
                    simulationType: client_1.SimulatorType.COMPARADOR_MAQUININHA,
                    userEmail: dto.email,
                    userName: dto.nome,
                    input: simulationData.inputData,
                    output: simulationData.outputData,
                    summary: `Comparação de ${resultado.total} maquininhas`,
                    createdAt: new Date(),
                });
            }
            this.logger.log(`Comparison saved successfully for ${dto.email} (${resultado.total} machines)`);
        }
        catch (error) {
            this.logger.error('Failed to save comparison to database', error.stack);
        }
    }
};
exports.ComparadorMaquininhaService = ComparadorMaquininhaService;
exports.ComparadorMaquininhaService = ComparadorMaquininhaService = ComparadorMaquininhaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        email_service_1.EmailService])
], ComparadorMaquininhaService);
//# sourceMappingURL=comparador-maquininha.service.js.map