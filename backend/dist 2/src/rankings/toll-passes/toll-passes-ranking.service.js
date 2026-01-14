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
var TollPassesRankingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TollPassesRankingService = void 0;
const common_1 = require("@nestjs/common");
const toll_passes_data_1 = require("./data/toll-passes.data");
const criteria_data_1 = require("./data/criteria.data");
const score_calculator_1 = require("./calc/score-calculator");
const legacy_prisma_service_1 = require("../../prisma/legacy-prisma.service");
let TollPassesRankingService = TollPassesRankingService_1 = class TollPassesRankingService {
    legacy;
    logger = new common_1.Logger(TollPassesRankingService_1.name);
    constructor(legacy) {
        this.legacy = legacy;
    }
    async getRanking(query) {
        try {
            this.logger.log('Fetching toll pass ranking');
            this.logger.debug(`Query filters: ${JSON.stringify(query)}`);
            let items = (0, toll_passes_data_1.getActiveTollPasses)();
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
                        pricing: { mensalidade: 0, adesao: 0 },
                        cobertura_rodovias: 0,
                        beneficios: { estacionamento: false, cashback: false, parceiros: [] },
                        tags_adicionais: [],
                        url_contratacao: '',
                        scoreBreakdown: [],
                        data_atualizacao: '',
                    },
                    criteria,
                    lastUpdated,
                };
            }
            const ranked = score_calculator_1.TollPassScoreCalculator.rank(items);
            const responseItems = ranked.map((item) => this.toRankingItemDto(item));
            let bestOption = responseItems.find((item) => item.rank === 1);
            if (!bestOption) {
                bestOption = responseItems[0];
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
            this.logger.error('Error fetching toll pass ranking', error.stack);
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
        if (query.max_mensalidade !== undefined) {
            filtered = filtered.filter((item) => item.pricing.mensalidade <= query.max_mensalidade);
        }
        if (query.exige_estacionamento === true) {
            filtered = filtered.filter((item) => item.beneficios.estacionamento);
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
            cobertura_rodovias: item.cobertura_rodovias,
            beneficios: item.beneficios,
            tags_adicionais: item.tags_adicionais,
            url_contratacao: item.url_contratacao,
            scoreBreakdown: ranked.scoreBreakdown || [],
            data_atualizacao: item.data_atualizacao.toLocaleDateString('pt-BR'),
        };
    }
    getCriteriaDto() {
        return criteria_data_1.TOLL_PASS_CRITERIA.map((criterion) => ({
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
exports.TollPassesRankingService = TollPassesRankingService;
exports.TollPassesRankingService = TollPassesRankingService = TollPassesRankingService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [legacy_prisma_service_1.LegacyPrismaService])
], TollPassesRankingService);
//# sourceMappingURL=toll-passes-ranking.service.js.map