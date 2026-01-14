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
var TollPassesRankingController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TollPassesRankingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const toll_passes_ranking_service_1 = require("./toll-passes-ranking.service");
const ranking_response_dto_1 = require("./dto/ranking-response.dto");
const ranking_request_dto_1 = require("./dto/ranking-request.dto");
let TollPassesRankingController = TollPassesRankingController_1 = class TollPassesRankingController {
    rankingService;
    logger = new common_1.Logger(TollPassesRankingController_1.name);
    constructor(rankingService) {
        this.rankingService = rankingService;
    }
    async getRanking(query) {
        try {
            this.logger.log('Received request for toll pass ranking');
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
            this.logger.error('Error getting toll pass ranking', error.stack);
            throw error;
        }
    }
    async getCriteria() {
        try {
            this.logger.log('Received request for toll pass ranking criteria');
            return await this.rankingService.getCriteria();
        }
        catch (error) {
            this.logger.error('Error getting toll pass criteria', error.stack);
            throw error;
        }
    }
};
exports.TollPassesRankingController = TollPassesRankingController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Ranking de tags de pedágio expresso',
        description: `
      Retorna o ranking das principais tags/adesivos de pedágio expresso.

      Critérios (0-5) e pesos:
      - Custo mensal (2.0)
      - Cobertura (1.5)
      - Benefícios (1.0)
      - Facilidade de uso (1.0)
      - Transparência (0.5)

      Os dados são auto contidos e foram importados do ranking legado
      (top_pedagio) com revisão em 12/2024.
    `,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'companies',
        required: false,
        type: String,
        description: 'Filtrar por empresas (separadas por vírgula)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'max_mensalidade',
        required: false,
        type: Number,
        description: 'Filtrar por mensalidade máxima',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'exige_estacionamento',
        required: false,
        type: Boolean,
        description: 'Retornar apenas opções aceitas em estacionamentos parceiros',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Ranking retornado com sucesso',
        type: ranking_response_dto_1.TollPassRankingResponseDto,
    }),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ranking_request_dto_1.TollPassRankingQueryDto]),
    __metadata("design:returntype", Promise)
], TollPassesRankingController.prototype, "getRanking", null);
__decorate([
    (0, common_1.Get)('criteria'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Critérios do ranking de pedágio expresso',
        description: 'Lista os critérios e pesos utilizados para cálculo.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Critérios retornados',
        type: [ranking_response_dto_1.TollPassCriterionDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TollPassesRankingController.prototype, "getCriteria", null);
exports.TollPassesRankingController = TollPassesRankingController = TollPassesRankingController_1 = __decorate([
    (0, swagger_1.ApiTags)('Rankings - Pedágio expresso'),
    (0, common_1.Controller)('rankings/pedagios'),
    __metadata("design:paramtypes", [toll_passes_ranking_service_1.TollPassesRankingService])
], TollPassesRankingController);
//# sourceMappingURL=toll-passes-ranking.controller.js.map