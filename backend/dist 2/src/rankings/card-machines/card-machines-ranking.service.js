"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CardMachinesRankingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardMachinesRankingService = void 0;
const common_1 = require("@nestjs/common");
const machines_data_1 = require("./data/machines.data");
const criteria_data_1 = require("./data/criteria.data");
const score_calculator_1 = require("./calc/score-calculator");
let CardMachinesRankingService = CardMachinesRankingService_1 = class CardMachinesRankingService {
    logger = new common_1.Logger(CardMachinesRankingService_1.name);
    async getRanking(query) {
        try {
            this.logger.log('Fetching card machine ranking');
            this.logger.debug(`Query filters: ${JSON.stringify(query)}`);
            let machines = (0, machines_data_1.getActiveCardMachines)();
            if (query) {
                machines = this.applyFilters(machines, query);
                this.logger.debug(`After filtering: ${machines.length} machines`);
                if (machines.length === 0) {
                    this.logger.warn('No machines after applying filters; falling back to all active machines');
                    machines = (0, machines_data_1.getActiveCardMachines)();
                }
            }
            const rankedMachines = score_calculator_1.CardMachineScoreCalculator.rankMachines(machines);
            const items = rankedMachines.map((machine) => this.toRankingItemDto(machine));
            const bestOption = items.find((item) => item.rank === 1) || items[0];
            if (!bestOption) {
                const criteria = this.getCriteriaDto();
                const lastUpdated = this.getMostRecentUpdate((0, machines_data_1.getActiveCardMachines)());
                return {
                    items: [],
                    total: 0,
                    bestOption: {
                        id: 0,
                        name: '',
                        empresa: '',
                        rank: 0,
                        isBestOption: false,
                        logo: '',
                        imagem: '',
                        features: {
                            chip: false,
                            tarja: false,
                            nfc: false,
                            com_fio: false,
                            imprime_recibo: false,
                            precisa_smartphone: false,
                            permite_antecipacao: false,
                            atende_pf: true,
                            atende_pj: true,
                            vale_refeicao: false,
                            ecommerce: false,
                            max_parcelas: 12,
                            garantia: null,
                            tipos_conexao: [],
                            bandeiras: [],
                            formas_recebimento: [],
                        },
                        pricing: {
                            preco: 0,
                            preco_promocional: null,
                            mensalidade: 0,
                        },
                        planos: [],
                        observacoes: null,
                        url_contratacao: '',
                        cupom: null,
                        transparencia: null,
                        url_avaliacao: null,
                        data_atualizacao: new Date(lastUpdated).toLocaleDateString('pt-BR'),
                    },
                    criteria,
                    lastUpdated,
                };
            }
            const criteria = this.getCriteriaDto();
            const lastUpdated = this.getMostRecentUpdate(machines);
            const response = {
                items,
                total: items.length,
                bestOption,
                criteria,
                lastUpdated,
            };
            this.logger.log(`Ranking completed successfully. Total machines: ${response.total}`);
            return response;
        }
        catch (error) {
            this.logger.error('Error fetching card machine ranking', error.stack);
            throw error;
        }
    }
    async getCriteria() {
        this.logger.log('Fetching ranking criteria');
        return this.getCriteriaDto();
    }
    applyFilters(machines, query) {
        let filtered = machines;
        if (query.nfc !== undefined) {
            filtered = filtered.filter((m) => m.features.nfc === query.nfc);
        }
        if (query.imprime_recibo !== undefined) {
            filtered = filtered.filter((m) => m.features.imprime_recibo === query.imprime_recibo);
        }
        if (query.precisa_smartphone !== undefined) {
            filtered = filtered.filter((m) => m.features.precisa_smartphone === query.precisa_smartphone);
        }
        if (query.permite_antecipacao !== undefined) {
            filtered = filtered.filter((m) => m.features.permite_antecipacao === query.permite_antecipacao);
        }
        if (query.vale_refeicao !== undefined) {
            filtered = filtered.filter((m) => m.features.vale_refeicao === query.vale_refeicao);
        }
        if (query.ecommerce !== undefined) {
            filtered = filtered.filter((m) => m.features.ecommerce === query.ecommerce);
        }
        const companies = query.companies;
        if (companies && companies.length > 0) {
            filtered = filtered.filter((m) => companies.some((company) => m.empresa.toLowerCase() === company.toLowerCase()));
        }
        if (query.sem_mensalidade !== undefined && query.sem_mensalidade) {
            filtered = filtered.filter((m) => m.pricing.mensalidade === 0);
        }
        return filtered;
    }
    toRankingItemDto(machine) {
        const ranked = machine;
        return {
            id: machine.id,
            name: machine.nome,
            rank: ranked.rank || 0,
            isBestOption: ranked.isBestOption || false,
            empresa: machine.empresa,
            logo: machine.logo,
            imagem: machine.imagem,
            features: this.toFeaturesDto(machine),
            pricing: this.toPricingDto(machine),
            planos: machine.planos,
            observacoes: machine.observacoes,
            url_contratacao: machine.url_contratacao,
            cupom: machine.cupom,
            transparencia: machine.transparencia,
            url_avaliacao: machine.url_avaliacao,
            data_atualizacao: machine.data_atualizacao.toLocaleDateString('pt-BR'),
        };
    }
    toFeaturesDto(machine) {
        return {
            chip: machine.features.chip,
            tarja: machine.features.tarja,
            nfc: machine.features.nfc,
            com_fio: machine.features.com_fio,
            imprime_recibo: machine.features.imprime_recibo,
            precisa_smartphone: machine.features.precisa_smartphone,
            permite_antecipacao: machine.features.permite_antecipacao,
            atende_pf: machine.features.atende_pf,
            atende_pj: machine.features.atende_pj,
            vale_refeicao: machine.features.vale_refeicao,
            ecommerce: machine.features.ecommerce,
            max_parcelas: machine.features.max_parcelas,
            garantia: machine.features.garantia,
            tipos_conexao: machine.features.tipos_conexao,
            bandeiras: machine.features.bandeiras,
            formas_recebimento: machine.features.formas_recebimento,
        };
    }
    toPricingDto(machine) {
        return {
            preco: machine.pricing.preco,
            preco_promocional: machine.pricing.preco_promocional,
            mensalidade: machine.pricing.mensalidade,
        };
    }
    getCriteriaDto() {
        return criteria_data_1.CARD_MACHINE_CRITERIA.map((criterion) => ({
            key: criterion.key,
            name: criterion.name,
            weight: criterion.weight,
            type: criterion.type,
            description: criterion.description,
        }));
    }
    getMostRecentUpdate(machines) {
        const dates = machines.map((m) => m.data_atualizacao);
        return new Date(Math.max(...dates.map((d) => d.getTime())));
    }
};
exports.CardMachinesRankingService = CardMachinesRankingService;
exports.CardMachinesRankingService = CardMachinesRankingService = CardMachinesRankingService_1 = __decorate([
    (0, common_1.Injectable)()
], CardMachinesRankingService);
//# sourceMappingURL=card-machines-ranking.service.js.map