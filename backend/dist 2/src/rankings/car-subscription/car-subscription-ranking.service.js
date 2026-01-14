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
var CarSubscriptionRankingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarSubscriptionRankingService = void 0;
const common_1 = require("@nestjs/common");
const car_subscriptions_data_1 = require("./data/car-subscriptions.data");
const criteria_data_1 = require("./data/criteria.data");
const score_calculator_1 = require("./calc/score-calculator");
const legacy_prisma_service_1 = require("../../prisma/legacy-prisma.service");
let CarSubscriptionRankingService = CarSubscriptionRankingService_1 = class CarSubscriptionRankingService {
    legacy;
    logger = new common_1.Logger(CarSubscriptionRankingService_1.name);
    constructor(legacy) {
        this.legacy = legacy;
    }
    async getRanking(query) {
        try {
            this.logger.log('Fetching car subscription ranking');
            this.logger.debug(`Query filters: ${JSON.stringify(query)}`);
            let items = (0, car_subscriptions_data_1.getActiveCarSubscriptions)();
            if (query) {
                items = this.applyFilters(items, query);
                this.logger.debug(`After filtering: ${items.length} items`);
            }
            if (items.length === 0) {
                const criteria = this.getCriteriaDto();
                const lastUpdated = new Date();
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
                        score: 0,
                        pricing: { preco_mensal_min: 0, preco_mensal_max: 0, franquia_km: 0 },
                        beneficios: {
                            manutencao_inclusa: false,
                            seguro_incluso: false,
                            ipva_incluso: false,
                            revisao_inclusa: false,
                            observacoes: [],
                        },
                        desconto: '',
                        url_contratacao: '',
                        scoreBreakdown: [],
                        data_atualizacao: '',
                    },
                    criteria,
                    lastUpdated,
                };
            }
            const ranked = score_calculator_1.CarSubscriptionScoreCalculator.rank(items);
            const responseItems = ranked.map((item) => this.toRankingItemDto(item));
            let bestOption = responseItems.find((item) => item.rank === 1);
            if (!bestOption) {
                bestOption = responseItems[0];
            }
            if (bestOption && (bestOption.logo === undefined || bestOption.logo === null)) {
                bestOption.logo = '';
            }
            const criteria = this.getCriteriaDto();
            const lastUpdated = this.getMostRecentUpdate(items);
            await this.hydrateMissingFromLegacy(responseItems);
            return {
                items: responseItems,
                total: responseItems.length,
                bestOption,
                criteria,
                lastUpdated,
            };
        }
        catch (error) {
            this.logger.error('Error fetching car subscription ranking', error.stack);
            throw error;
        }
    }
    async getCriteria() {
        return this.getCriteriaDto();
    }
    applyFilters(items, query) {
        let filtered = items;
        if (query.companies && query.companies.length > 0) {
            filtered = filtered.filter((item) => query.companies.some((company) => item.nome.toLowerCase() === company.toLowerCase() ||
                item.empresa.toLowerCase() === company.toLowerCase()));
        }
        if (query.max_preco_mensal !== undefined) {
            filtered = filtered.filter((item) => item.pricing.preco_mensal_max <= query.max_preco_mensal);
        }
        if (query.exige_seguro_incluso === true) {
            filtered = filtered.filter((item) => item.beneficios.seguro_incluso);
        }
        return filtered;
    }
    toRankingItemDto(item) {
        const ranked = item;
        return {
            id: item.id,
            name: item.nome,
            empresa: item.empresa,
            rank: ranked.rank || 0,
            isBestOption: ranked.isBestOption || false,
            logo: item.logo,
            score: Number(item.score?.toFixed(2) ?? item.static_score ?? 0),
            pricing: item.pricing,
            beneficios: item.beneficios,
            desconto: item.desconto,
            url_contratacao: item.url_contratacao,
            scoreBreakdown: ranked.scoreBreakdown || [],
            data_atualizacao: item.data_atualizacao.toLocaleDateString('pt-BR'),
        };
    }
    getCriteriaDto() {
        return criteria_data_1.CAR_SUBSCRIPTION_CRITERIA.map((criterion) => ({
            key: criterion.key,
            name: criterion.name,
            weight: criterion.weight,
            type: criterion.type,
            description: criterion.description,
        }));
    }
    getMostRecentUpdate(items) {
        const dates = items.map((item) => item.data_atualizacao);
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
            WHERE LOWER(nome) = LOWER(${item.empresa})
            LIMIT 1
          `;
                    const path = rows?.[0]?.logo;
                    if (path && typeof path === 'string' && path.trim() !== '') {
                        item.logo = mediaBase ? `${mediaBase}${path.startsWith('/') ? '' : '/'}${path}` : path;
                    }
                }
                catch (e) {
                    this.logger.warn(`Legacy hydration failed for empresa "${item.empresa}": ${e?.message}`);
                }
            }
        }
    }
};
exports.CarSubscriptionRankingService = CarSubscriptionRankingService;
exports.CarSubscriptionRankingService = CarSubscriptionRankingService = CarSubscriptionRankingService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [legacy_prisma_service_1.LegacyPrismaService])
], CarSubscriptionRankingService);
//# sourceMappingURL=car-subscription-ranking.service.js.map