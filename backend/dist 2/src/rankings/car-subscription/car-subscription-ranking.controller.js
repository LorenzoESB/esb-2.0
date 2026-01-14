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
var CarSubscriptionRankingController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarSubscriptionRankingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const car_subscription_ranking_service_1 = require("./car-subscription-ranking.service");
const ranking_response_dto_1 = require("./dto/ranking-response.dto");
const ranking_request_dto_1 = require("./dto/ranking-request.dto");
let CarSubscriptionRankingController = CarSubscriptionRankingController_1 = class CarSubscriptionRankingController {
    rankingService;
    logger = new common_1.Logger(CarSubscriptionRankingController_1.name);
    constructor(rankingService) {
        this.rankingService = rankingService;
    }
    async getRanking(query) {
        try {
            this.logger.log('Received request for car subscription ranking');
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
            this.logger.error('Error getting car subscription ranking', error.stack);
            throw error;
        }
    }
    async getCriteria() {
        try {
            this.logger.log('Received request for car subscription ranking criteria');
            return await this.rankingService.getCriteria();
        }
        catch (error) {
            this.logger.error('Error getting car subscription ranking criteria', error.stack);
            throw error;
        }
    }
};
exports.CarSubscriptionRankingController = CarSubscriptionRankingController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Ranking de carros por assinatura',
        description: `
      Ranking consolidado de serviços de carro por assinatura, usando notas do legado.

      Critérios (0-5) e pesos:
      - Custo total (2.25)
      - Franquia de km (1.5)
      - Serviços inclusos (1.25)
      - Flexibilidade (1.0)
      - Reputação e rede (1.0)
      - Cobertura do seguro (1.0)
    `,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'companies',
        required: false,
        type: String,
        description: 'Filtrar por empresas (separadas por vírgula)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'max_preco_mensal',
        required: false,
        type: Number,
        description: 'Limitar por preço mensal máximo',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'exige_seguro_incluso',
        required: false,
        type: Boolean,
        description: 'Trazer apenas opções com seguro incluso',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Ranking retornado com sucesso',
        type: ranking_response_dto_1.CarSubscriptionRankingResponseDto,
    }),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ranking_request_dto_1.CarSubscriptionRankingQueryDto]),
    __metadata("design:returntype", Promise)
], CarSubscriptionRankingController.prototype, "getRanking", null);
__decorate([
    (0, common_1.Get)('criteria'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Critérios do ranking de carro por assinatura',
        description: 'Lista os critérios e pesos aplicados ao ranking.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Critérios retornados',
        type: [ranking_response_dto_1.CarSubscriptionCriterionDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CarSubscriptionRankingController.prototype, "getCriteria", null);
exports.CarSubscriptionRankingController = CarSubscriptionRankingController = CarSubscriptionRankingController_1 = __decorate([
    (0, swagger_1.ApiTags)('Rankings - Carro por assinatura'),
    (0, common_1.Controller)('rankings/assinatura-carro'),
    __metadata("design:paramtypes", [car_subscription_ranking_service_1.CarSubscriptionRankingService])
], CarSubscriptionRankingController);
//# sourceMappingURL=car-subscription-ranking.controller.js.map