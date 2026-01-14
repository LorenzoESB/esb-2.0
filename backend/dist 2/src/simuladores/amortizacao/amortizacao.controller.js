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
var AmortizacaoController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmortizacaoController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const amortizacao_service_1 = require("./amortizacao.service");
const amortizacao_input_dto_1 = require("./dto/amortizacao-input.dto");
const amortizacao_output_dto_1 = require("./dto/amortizacao-output.dto");
let AmortizacaoController = AmortizacaoController_1 = class AmortizacaoController {
    amortizacaoService;
    logger = new common_1.Logger(AmortizacaoController_1.name);
    constructor(amortizacaoService) {
        this.amortizacaoService = amortizacaoService;
    }
    async calcularAmortizacao(input) {
        try {
            this.logger.log('Received simplified amortization request');
            return await this.amortizacaoService.calcularAmortizacaoSimples(input);
        }
        catch (error) {
            this.logger.error('Error calculating simplified amortization', error.stack);
            throw error;
        }
    }
    async compararSistemas(input) {
        try {
            this.logger.log('Received simplified amortization comparison request');
            return await this.amortizacaoService.compararSistemas(input);
        }
        catch (error) {
            this.logger.error('Error comparing simplified amortization', error.stack);
            throw error;
        }
    }
};
exports.AmortizacaoController = AmortizacaoController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    (0, swagger_1.ApiOperation)({
        summary: 'Calculate simplified amortization',
        description: 'Returns a compact amortization result (novaPrestacao, prazoRestante, saldoDevedor)',
    }),
    (0, swagger_1.ApiBody)({ type: amortizacao_input_dto_1.AmortizacaoInputDto }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Simplified amortization calculated successfully',
        type: amortizacao_output_dto_1.AmortizacaoSimplesOutputDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [amortizacao_input_dto_1.AmortizacaoInputDto]),
    __metadata("design:returntype", Promise)
], AmortizacaoController.prototype, "calcularAmortizacao", null);
__decorate([
    (0, common_1.Post)('comparar'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    (0, swagger_1.ApiOperation)({
        summary: 'Compare simplified amortization scenarios',
        description: 'Returns two simplified amortization scenarios (por prazo e por prestação) and a small comparative analysis',
    }),
    (0, swagger_1.ApiBody)({ type: amortizacao_input_dto_1.AmortizacaoInputDto }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Comparison result',
        type: amortizacao_output_dto_1.SimulacaoComparativaDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [amortizacao_input_dto_1.AmortizacaoInputDto]),
    __metadata("design:returntype", Promise)
], AmortizacaoController.prototype, "compararSistemas", null);
exports.AmortizacaoController = AmortizacaoController = AmortizacaoController_1 = __decorate([
    (0, swagger_1.ApiTags)('Amortization'),
    (0, common_1.Controller)('simuladores/amortizacao'),
    __metadata("design:paramtypes", [amortizacao_service_1.AmortizacaoService])
], AmortizacaoController);
//# sourceMappingURL=amortizacao.controller.js.map