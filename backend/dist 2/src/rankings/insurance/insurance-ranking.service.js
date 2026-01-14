"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var InsuranceRankingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsuranceRankingService = void 0;
const common_1 = require("@nestjs/common");
const insurance_data_1 = require("./data/insurance.data");
const criteria_data_1 = require("./data/criteria.data");
const score_calculator_1 = require("./calc/score-calculator");
let InsuranceRankingService = InsuranceRankingService_1 = class InsuranceRankingService {
    logger = new common_1.Logger(InsuranceRankingService_1.name);
    async getRanking(query) {
        try {
            this.logger.log('Fetching insurance ranking');
            this.logger.debug(`Query filters: ${JSON.stringify(query)}`);
            let insurances = (0, insurance_data_1.getActiveInsuranceCompanies)();
            if (query) {
                insurances = this.applyFilters(insurances, query);
                this.logger.debug(`After filtering: ${insurances.length} companies`);
            }
            if (insurances.length === 0) {
                throw new Error('No insurance companies available for ranking');
            }
            const rankedInsurances = score_calculator_1.InsuranceScoreCalculator.recalculateAndRank(insurances);
            const items = rankedInsurances.map((insurance) => this.toRankingItemDto(insurance));
            const bestOption = items.find((item) => item.rank === 1);
            if (!bestOption) {
                throw new Error('No best option found in ranking');
            }
            const criteria = this.getCriteriaDto();
            const lastUpdated = this.getMostRecentUpdate(insurances);
            const response = {
                items,
                total: items.length,
                bestOption,
                criteria,
                lastUpdated,
            };
            this.logger.log(`Insurance ranking completed successfully. Total: ${response.total}`);
            return response;
        }
        catch (error) {
            this.logger.error('Error fetching insurance ranking', error.stack);
            throw error;
        }
    }
    async getCriteria() {
        this.logger.log('Fetching insurance ranking criteria');
        return this.getCriteriaDto();
    }
    applyFilters(insurances, query) {
        let filtered = insurances;
        if (query.companies && query.companies.length > 0) {
            filtered = filtered.filter((insurance) => query.companies.some((company) => insurance.nome.toLowerCase() === company.toLowerCase() ||
                insurance.company.toLowerCase() === company.toLowerCase()));
        }
        if (query.cobertura_total !== undefined) {
            filtered = filtered.filter((insurance) => insurance.coverage.cobertura_total === query.cobertura_total);
        }
        if (query.assistencia_24h !== undefined) {
            filtered = filtered.filter((insurance) => insurance.coverage.assistencia_24h === query.assistencia_24h);
        }
        if (query.carro_reserva !== undefined) {
            filtered = filtered.filter((insurance) => insurance.coverage.carro_reserva === query.carro_reserva);
        }
        if (query.max_preco_mensal !== undefined) {
            filtered = filtered.filter((insurance) => insurance.pricing.preco_mensal_estimado_max <=
                query.max_preco_mensal);
        }
        return filtered;
    }
    toRankingItemDto(insurance) {
        const ranked = insurance;
        const score = insurance.static_score;
        const scoreBreakdown = this.getScoreBreakdown(insurance);
        return {
            id: insurance.id,
            name: insurance.nome,
            rank: ranked.rank || 0,
            isBestOption: ranked.isBestOption || false,
            company: insurance.company,
            logo: insurance.logo,
            score,
            coverage: this.toCoverageDto(insurance),
            services: this.toServicesDto(insurance),
            pricing: this.toPricingDto(insurance),
            avaliacao_clientes: insurance.avaliacao_clientes,
            tempo_mercado_anos: insurance.tempo_mercado_anos,
            sinistros_aprovados_percentual: insurance.sinistros_aprovados_percentual,
            observacoes: insurance.observacoes,
            url_contratacao: insurance.url_contratacao,
            url_avaliacao: insurance.url_avaliacao,
            data_atualizacao: insurance.data_atualizacao.toLocaleDateString('pt-BR'),
            scoreBreakdown,
        };
    }
    toCoverageDto(insurance) {
        return {
            cobertura_basica: insurance.coverage.cobertura_basica,
            cobertura_total: insurance.coverage.cobertura_total,
            cobertura_terceiros: insurance.coverage.cobertura_terceiros,
            vidros: insurance.coverage.vidros,
            roubo_furto: insurance.coverage.roubo_furto,
            colisao: insurance.coverage.colisao,
            incendio: insurance.coverage.incendio,
            fenomenos_naturais: insurance.coverage.fenomenos_naturais,
            assistencia_24h: insurance.coverage.assistencia_24h,
            carro_reserva: insurance.coverage.carro_reserva,
        };
    }
    toServicesDto(insurance) {
        return {
            atendimento_online: insurance.services.atendimento_online,
            app_mobile: insurance.services.app_mobile,
            guincho_km: insurance.services.guincho_km,
            oficinas_referenciadas: insurance.services.oficinas_referenciadas,
            desconto_bom_motorista: insurance.services.desconto_bom_motorista,
            desconto_garagem: insurance.services.desconto_garagem,
        };
    }
    toPricingDto(insurance) {
        return {
            franquia_minima: insurance.pricing.franquia_minima,
            franquia_maxima: insurance.pricing.franquia_maxima,
            preco_mensal_estimado_min: insurance.pricing.preco_mensal_estimado_min,
            preco_mensal_estimado_max: insurance.pricing.preco_mensal_estimado_max,
        };
    }
    getScoreBreakdown(insurance) {
        const contributions = score_calculator_1.InsuranceScoreCalculator.getCriteriaContributions(insurance.raw_scores);
        return criteria_data_1.INSURANCE_CRITERIA.map((criterion) => {
            const contribution = contributions[criterion.key];
            return {
                key: criterion.key,
                name: criterion.name,
                raw_score: contribution.raw_score,
                weight: contribution.weight,
                contribution: contribution.contribution,
                percentage: contribution.percentage,
            };
        });
    }
    getCriteriaDto() {
        return criteria_data_1.INSURANCE_CRITERIA.map((criterion) => ({
            key: criterion.key,
            name: criterion.name,
            weight: criterion.weight,
            type: criterion.type,
            description: criterion.description,
        }));
    }
    getMostRecentUpdate(insurances) {
        const latest = insurances.reduce((latestDate, insurance) => {
            return insurance.data_atualizacao > latestDate
                ? insurance.data_atualizacao
                : latestDate;
        }, insurances[0].data_atualizacao);
        return latest;
    }
};
exports.InsuranceRankingService = InsuranceRankingService;
exports.InsuranceRankingService = InsuranceRankingService = InsuranceRankingService_1 = __decorate([
    (0, common_1.Injectable)()
], InsuranceRankingService);
//# sourceMappingURL=insurance-ranking.service.js.map