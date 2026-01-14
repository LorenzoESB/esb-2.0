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
var CardMachinesRankingController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardMachinesRankingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const card_machines_ranking_service_1 = require("./card-machines-ranking.service");
const ranking_response_dto_1 = require("./dto/ranking-response.dto");
const ranking_request_dto_1 = require("./dto/ranking-request.dto");
let CardMachinesRankingController = CardMachinesRankingController_1 = class CardMachinesRankingController {
    rankingService;
    logger = new common_1.Logger(CardMachinesRankingController_1.name);
    constructor(rankingService) {
        this.rankingService = rankingService;
    }
    async getRanking(query) {
        try {
            this.logger.log('Received request for card machine ranking');
            this.logger.debug(`Query parameters: ${JSON.stringify(query)}`);
            const result = await this.rankingService.getRanking(query);
            this.logger.log(`Ranking returned successfully with ${result.total} machines`);
            return result;
        }
        catch (error) {
            this.logger.error('Error getting card machine ranking', error.stack);
            throw error;
        }
    }
    async getCriteria() {
        try {
            this.logger.log('Received request for ranking criteria');
            const result = await this.rankingService.getCriteria();
            this.logger.log(`Returned ${result.length} criteria`);
            return result;
        }
        catch (error) {
            this.logger.error('Error getting ranking criteria', error.stack);
            throw error;
        }
    }
};
exports.CardMachinesRankingController = CardMachinesRankingController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Get card machine ranking',
        description: `
      Returns ranked list of card machines based on weighted criteria.

      ## How Ranking Works

      Machines are ranked based on 8 weighted criteria:
      - **Competitive Rates** (weight 3.0): Most important factor
      - **Transparency** (weight 2.0): Clarity in communication
      - **Features** (weight 1.5): Functionality and technology
      - **Receivables Anticipation** (weight 1.0): Binary criterion
      - **Reputation** (weight 1.5): Market presence
      - **Support Quality** (weight 1.0): Customer service
      - **Installment Options** (weight 1.0): Payment flexibility
      - **Meal Vouchers** (weight 0.5): Specific feature

      ## Difference from Comparator

      - **Ranking**: Shows pre-calculated ranking based on overall quality
      - **Comparator** (\`/simuladores/comparador-maquininha\`): Compares selected machines side-by-side

      ## Filtering

      You can filter the ranking by:
      - Features (NFC, printer, smartphone requirement, etc.)
      - Company names
      - Zero monthly fee

      After filtering, machines are re-ranked among the filtered set.

      ## Response

      - Items sorted by rank (best first)
      - Best option highlighted
      - Scores HIDDEN (only rank position shown)
      - Criteria with weights included

      ## Example Use Cases

      - Show top 5 card machines overall
      - Filter machines with NFC and no monthly fee
      - Compare only specific brands
    `,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'nfc',
        required: false,
        type: Boolean,
        description: 'Filter by NFC support',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'imprime_recibo',
        required: false,
        type: Boolean,
        description: 'Filter by receipt printer',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'precisa_smartphone',
        required: false,
        type: Boolean,
        description: 'Filter by smartphone requirement',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'permite_antecipacao',
        required: false,
        type: Boolean,
        description: 'Filter by receivables anticipation',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'vale_refeicao',
        required: false,
        type: Boolean,
        description: 'Filter by meal voucher acceptance',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'ecommerce',
        required: false,
        type: Boolean,
        description: 'Filter by e-commerce option',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'companies',
        required: false,
        type: String,
        description: 'Filter by company names (comma-separated, e.g., "InfinitePay,PagSeguro")',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'sem_mensalidade',
        required: false,
        type: Boolean,
        description: 'Filter by zero monthly fee',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Ranking retrieved successfully',
        type: ranking_response_dto_1.CardMachineRankingResponseDto,
    }),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ranking_request_dto_1.CardMachineRankingQueryDto]),
    __metadata("design:returntype", Promise)
], CardMachinesRankingController.prototype, "getRanking", null);
__decorate([
    (0, common_1.Get)('criteria'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Get ranking criteria details',
        description: `
      Returns details about the criteria used for ranking calculation.

      ## Information Returned

      For each criterion:
      - **Key**: Unique identifier
      - **Name**: Display name (in Portuguese)
      - **Weight**: Importance in calculation (higher = more important)
      - **Type**: Data type (boolean, numeric, scale)
      - **Description**: What this criterion measures

      ## Use Case

      Use this endpoint to:
      - Explain to users how ranking is calculated
      - Show transparency in methodology
      - Display criteria weights in UI

      ## Note

      Criteria weights are static and defined in code.
      They may be updated when ranking methodology changes.
    `,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Criteria retrieved successfully',
        type: [ranking_response_dto_1.RankingCriterionDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CardMachinesRankingController.prototype, "getCriteria", null);
exports.CardMachinesRankingController = CardMachinesRankingController = CardMachinesRankingController_1 = __decorate([
    (0, swagger_1.ApiTags)('Rankings - Card Machines'),
    (0, common_1.Controller)('rankings/card-machines'),
    __metadata("design:paramtypes", [card_machines_ranking_service_1.CardMachinesRankingService])
], CardMachinesRankingController);
//# sourceMappingURL=card-machines-ranking.controller.js.map