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
var JurosCompostosController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JurosCompostosController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const juros_compostos_service_1 = require("./juros-compostos.service");
const juros_compostos_input_dto_1 = require("./dto/juros-compostos-input.dto");
const juros_compostos_output_dto_1 = require("./dto/juros-compostos-output.dto");
let JurosCompostosController = JurosCompostosController_1 = class JurosCompostosController {
    jurosCompostosService;
    logger = new common_1.Logger(JurosCompostosController_1.name);
    constructor(jurosCompostosService) {
        this.jurosCompostosService = jurosCompostosService;
    }
    async calculaJurosCompostos(input) {
        try {
            this.logger.log('Received compound interest calculation request');
            const data = await this.jurosCompostosService.calculaJurosCompostos(input);
            return {
                message: 'Compound interest calculation received',
                data,
            };
        }
        catch (error) {
            this.logger.error('Error calculating compound interest', error.stack);
            throw error;
        }
    }
};
exports.JurosCompostosController = JurosCompostosController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    (0, swagger_1.ApiOperation)({
        summary: 'Calculate compound interest',
        description: 'Calculates compound interest based on initial value, monthly contributions, time period, and interest rate',
    }),
    (0, swagger_1.ApiBody)({ type: juros_compostos_input_dto_1.JurosCompostosInputDto }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Compound interest calculated successfully',
        type: juros_compostos_output_dto_1.JurosCompostosDetalhadoOutputDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input data',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server error',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [juros_compostos_input_dto_1.JurosCompostosInputDto]),
    __metadata("design:returntype", Promise)
], JurosCompostosController.prototype, "calculaJurosCompostos", null);
exports.JurosCompostosController = JurosCompostosController = JurosCompostosController_1 = __decorate([
    (0, swagger_1.ApiTags)('Compound Interest'),
    (0, common_1.Controller)('simuladores/juros-compostos'),
    __metadata("design:paramtypes", [juros_compostos_service_1.JurosCompostosService])
], JurosCompostosController);
//# sourceMappingURL=juros-compostos.controller.js.map