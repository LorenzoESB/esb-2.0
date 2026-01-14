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
var DigitalAccountsRankingController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DigitalAccountsRankingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const digital_accounts_ranking_service_1 = require("./digital-accounts-ranking.service");
const ranking_response_dto_1 = require("./dto/ranking-response.dto");
const ranking_request_dto_1 = require("./dto/ranking-request.dto");
let DigitalAccountsRankingController = DigitalAccountsRankingController_1 = class DigitalAccountsRankingController {
    rankingService;
    logger = new common_1.Logger(DigitalAccountsRankingController_1.name);
    constructor(rankingService) {
        this.rankingService = rankingService;
    }
    async getRanking(query) {
        try {
            this.logger.log('Received request for digital accounts ranking');
            this.logger.debug(`Query parameters: ${JSON.stringify(query)}`);
            const result = await this.rankingService.getRanking(query);
            result.items = result.items.map((i) => ({
                ...i,
                logo: i.logo ?? '',
            }));
            result.bestOption = {
                ...result.bestOption,
                logo: result.bestOption?.logo ?? '',
            };
            return result;
        }
        catch (error) {
            this.logger.error('Error getting digital accounts ranking', error.stack);
            throw error;
        }
    }
    async getCriteria() {
        try {
            this.logger.log('Received request for digital account ranking criteria');
            return await this.rankingService.getCriteria();
        }
        catch (error) {
            this.logger.error('Error getting digital account ranking criteria', error.stack);
            throw error;
        }
    }
};
exports.DigitalAccountsRankingController = DigitalAccountsRankingController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Ranking de contas digitais (PF/PJ)',
        description: `
      Retorna o ranking consolidado de contas digitais com base em notas do legado.

      Critérios ponderados (0-5):
      - Tarifas e mensalidade (peso 2.5)
      - Experiência digital (peso 1.5)
      - Serviços essenciais (peso 1.25)
      - Cartão de crédito (peso 1.0)
      - Investimentos e rendimento (peso 0.75)
      - Suporte e reputação (peso 1.0)

      As notas foram importadas do antigo módulo "RankingConta" e revisadas em 12/2024.
      Não há dependência de base externa: todos os dados estão embutidos no código.
    `,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'companies',
        required: false,
        type: String,
        description: 'Filtrar por instituições (separadas por vírgula, ex.: "Banco Inter,Nubank")',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'tipo_conta',
        required: false,
        enum: ['pf', 'pj', 'ambos'],
        description: 'Filtrar por tipo de conta atendida',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'max_mensalidade',
        required: false,
        type: Number,
        description: 'Limitar por valor máximo de mensalidade',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'exige_cartao_credito',
        required: false,
        type: Boolean,
        description: 'Filtrar apenas contas com cartão de crédito disponível',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'exige_investimentos',
        required: false,
        type: Boolean,
        description: 'Filtrar apenas contas com módulo de investimentos',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Ranking retornado com sucesso',
        type: ranking_response_dto_1.DigitalAccountsRankingResponseDto,
    }),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ranking_request_dto_1.DigitalAccountsRankingQueryDto]),
    __metadata("design:returntype", Promise)
], DigitalAccountsRankingController.prototype, "getRanking", null);
__decorate([
    (0, common_1.Get)('criteria'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Critérios do ranking de contas digitais',
        description: 'Lista os critérios e pesos utilizados para calcular as notas.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Critérios retornados com sucesso',
        type: [ranking_response_dto_1.DigitalAccountCriterionDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DigitalAccountsRankingController.prototype, "getCriteria", null);
exports.DigitalAccountsRankingController = DigitalAccountsRankingController = DigitalAccountsRankingController_1 = __decorate([
    (0, swagger_1.ApiTags)('Rankings - Digital Accounts'),
    (0, common_1.Controller)('rankings/contas-digitais'),
    __metadata("design:paramtypes", [digital_accounts_ranking_service_1.DigitalAccountsRankingService])
], DigitalAccountsRankingController);
//# sourceMappingURL=digital-accounts-ranking.controller.js.map