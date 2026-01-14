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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var InsuranceRankingController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsuranceRankingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const insurance_ranking_service_1 = require("./insurance-ranking.service");
const ranking_response_dto_1 = require("./dto/ranking-response.dto");
const ranking_request_dto_1 = require("./dto/ranking-request.dto");
let InsuranceRankingController = InsuranceRankingController_1 = class InsuranceRankingController {
    rankingService;
    logger = new common_1.Logger(InsuranceRankingController_1.name);
    constructor(rankingService) {
        this.rankingService = rankingService;
    }
    async getRanking(query) {
        try {
            this.logger.log('Received request for insurance ranking');
            this.logger.debug(`Query parameters: ${JSON.stringify(query)}`);
            const result = await this.rankingService.getRanking(query);
            this.logger.log(`Insurance ranking returned successfully with ${result.total} items`);
            return result;
        }
        catch (error) {
            this.logger.error('Error getting insurance ranking', error.stack);
            throw error;
        }
    }
    async getCriteria() {
        try {
            this.logger.log('Received request for insurance ranking criteria');
            const result = await this.rankingService.getCriteria();
            this.logger.log(`Returned ${result.length} criteria`);
            return result;
        }
        catch (error) {
            this.logger.error('Error getting insurance ranking criteria', error.stack);
            throw error;
        }
    }
};
exports.InsuranceRankingController = InsuranceRankingController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Get insurance ranking',
        description: `
      Returns ranked list of insurance options based on weighted criteria.

      Ranking is calculated with 11 weighted criteria:
      - Preço Competitivo (peso 2.5)
      - Cobertura Completa (peso 2.5)
      - Processo de Sinistro (peso 2.0)
      - Atendimento ao Cliente (peso 1.5)
      - Solidez Financeira (peso 1.5)
      - Rede de Oficinas (peso 1.0)
      - Serviços Digitais (peso 1.0)
      - Benefícios Adicionais (peso 1.0)
      - Transparência (peso 1.5)
      - Taxa de Aprovação de Sinistros (peso 2.0)
      - Reputação (peso 1.5)

      The response includes a score breakdown per critério.
    `,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'companies',
        required: false,
        type: String,
        description: 'Filter by company names (comma-separated)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'cobertura_total',
        required: false,
        type: Boolean,
        description: 'Filter by full coverage availability',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'assistencia_24h',
        required: false,
        type: Boolean,
        description: 'Filter by 24h assistance',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'carro_reserva',
        required: false,
        type: Boolean,
        description: 'Filter by rental car availability',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'max_preco_mensal',
        required: false,
        type: Number,
        description: 'Filter by maximum estimated monthly price',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Ranking retrieved successfully',
        type: ranking_response_dto_1.InsuranceRankingResponseDto,
    }),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ranking_request_dto_1.InsuranceRankingQueryDto]),
    __metadata("design:returntype", Promise)
], InsuranceRankingController.prototype, "getRanking", null);
__decorate([
    (0, common_1.Get)('criteria'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Get insurance ranking criteria',
        description: 'Returns criteria details used for insurance ranking calculation.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Criteria retrieved successfully',
        type: [ranking_response_dto_1.InsuranceRankingCriterionDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InsuranceRankingController.prototype, "getCriteria", null);
exports.InsuranceRankingController = InsuranceRankingController = InsuranceRankingController_1 = __decorate([
    (0, swagger_1.ApiTags)('Rankings - Insurance'),
    (0, common_1.Controller)('rankings/insurance'),
    __metadata("design:paramtypes", [insurance_ranking_service_1.InsuranceRankingService])
], InsuranceRankingController);
//# sourceMappingURL=insurance-ranking.controller.js.map