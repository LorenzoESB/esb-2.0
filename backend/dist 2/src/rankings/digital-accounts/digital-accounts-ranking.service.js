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
var DigitalAccountsRankingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DigitalAccountsRankingService = void 0;
const common_1 = require("@nestjs/common");
const accounts_data_1 = require("./data/accounts.data");
const criteria_data_1 = require("./data/criteria.data");
const score_calculator_1 = require("./calc/score-calculator");
const legacy_prisma_service_1 = require("../../prisma/legacy-prisma.service");
let DigitalAccountsRankingService = DigitalAccountsRankingService_1 = class DigitalAccountsRankingService {
    legacy;
    logger = new common_1.Logger(DigitalAccountsRankingService_1.name);
    constructor(legacy) {
        this.legacy = legacy;
    }
    async getRanking(query) {
        try {
            this.logger.log('Fetching digital accounts ranking');
            this.logger.debug(`Query filters: ${JSON.stringify(query)}`);
            let accounts = (0, accounts_data_1.getActiveDigitalAccounts)();
            if (query) {
                accounts = this.applyFilters(accounts, query);
                this.logger.debug(`After filtering: ${accounts.length} accounts`);
            }
            if (accounts.length === 0) {
                const criteria = this.getCriteriaDto();
                const lastUpdated = new Date();
                return {
                    items: [],
                    total: 0,
                    bestOption: {
                        id: 0,
                        name: '',
                        bank: '',
                        rank: 0,
                        isBestOption: false,
                        logo: '',
                        monthly_fee: 0,
                        account_type: 'ambos',
                        score: 0,
                        url_ranking: '',
                        call_to_action: '',
                        highlights: [],
                        features: {
                            credit_card: false,
                            debit_card: false,
                            investments: false,
                            boletos: false,
                            saques_ilimitados: false,
                            atendimento_humanizado: false,
                        },
                        scoreBreakdown: [],
                        data_atualizacao: '',
                    },
                    criteria,
                    lastUpdated,
                };
            }
            const rankedAccounts = score_calculator_1.DigitalAccountsScoreCalculator.rankAccounts(accounts);
            const items = rankedAccounts.map((account) => this.toRankingItemDto(account));
            let bestOption = items.find((item) => item.rank === 1);
            if (!bestOption) {
                bestOption = items[0];
            }
            const criteria = this.getCriteriaDto();
            const lastUpdated = this.getMostRecentUpdate(accounts);
            await this.hydrateMissingFromLegacy(items);
            return {
                items,
                total: items.length,
                bestOption,
                criteria,
                lastUpdated,
            };
        }
        catch (error) {
            this.logger.error('Error fetching digital accounts ranking', error.stack);
            throw error;
        }
    }
    async getCriteria() {
        return this.getCriteriaDto();
    }
    applyFilters(accounts, query) {
        let filtered = accounts;
        if (query.companies && query.companies.length > 0) {
            filtered = filtered.filter((account) => query.companies.some((company) => account.nome.toLowerCase() === company.toLowerCase() ||
                account.banco.toLowerCase() === company.toLowerCase()));
        }
        if (query.tipo_conta) {
            filtered = filtered.filter((account) => account.tipo_conta === 'ambos' || account.tipo_conta === query.tipo_conta);
        }
        if (query.max_mensalidade !== undefined) {
            filtered = filtered.filter((account) => account.mensalidade <= query.max_mensalidade);
        }
        if (query.exige_cartao_credito === true) {
            filtered = filtered.filter((account) => account.features.credit_card);
        }
        if (query.exige_investimentos === true) {
            filtered = filtered.filter((account) => account.features.investments);
        }
        return filtered;
    }
    toRankingItemDto(account) {
        const ranked = account;
        return {
            id: account.id,
            name: account.nome,
            bank: account.banco,
            rank: ranked.rank || 0,
            isBestOption: ranked.isBestOption || false,
            logo: account.logo,
            monthly_fee: account.mensalidade,
            account_type: account.tipo_conta,
            score: Number(account.score?.toFixed(2) ?? account.static_score),
            url_ranking: account.url_ranking,
            call_to_action: account.botao,
            highlights: account.destaques,
            features: this.toFeaturesDto(account),
            scoreBreakdown: ranked.scoreBreakdown || [],
            data_atualizacao: account.data_atualizacao.toLocaleDateString('pt-BR'),
        };
    }
    toFeaturesDto(account) {
        return {
            credit_card: account.features.credit_card,
            debit_card: account.features.debit_card,
            investments: account.features.investments,
            boletos: account.features.boletos,
            saques_ilimitados: account.features.saques_ilimitados,
            atendimento_humanizado: account.features.atendimento_humanizado,
        };
    }
    getCriteriaDto() {
        return criteria_data_1.DIGITAL_ACCOUNT_CRITERIA.map((criterion) => ({
            key: criterion.key,
            name: criterion.name,
            weight: criterion.weight,
            type: criterion.type,
            description: criterion.description,
        }));
    }
    getMostRecentUpdate(accounts) {
        const dates = accounts.map((account) => account.data_atualizacao);
        return new Date(Math.max(...dates.map((d) => d.getTime())));
    }
    async hydrateMissingFromLegacy(items) {
        const mediaBase = process.env.LEGACY_MEDIA_BASE_URL || '';
        for (const item of items) {
            if (!item.logo || item.logo.trim() === '') {
                try {
                    const rows = await this.legacy.safeQueryRaw `
            SELECT logo
            FROM core_marca
            WHERE LOWER(nome) = LOWER(${item.bank})
            LIMIT 1
          `;
                    const path = rows?.[0]?.logo;
                    if (path && typeof path === 'string' && path.trim() !== '') {
                        item.logo = mediaBase ? `${mediaBase}${path.startsWith('/') ? '' : '/'}${path}` : path;
                    }
                }
                catch (e) {
                    this.logger.warn(`Legacy hydration failed for bank "${item.bank}": ${e?.message}`);
                }
            }
        }
    }
};
exports.DigitalAccountsRankingService = DigitalAccountsRankingService;
exports.DigitalAccountsRankingService = DigitalAccountsRankingService = DigitalAccountsRankingService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [legacy_prisma_service_1.LegacyPrismaService])
], DigitalAccountsRankingService);
//# sourceMappingURL=digital-accounts-ranking.service.js.map