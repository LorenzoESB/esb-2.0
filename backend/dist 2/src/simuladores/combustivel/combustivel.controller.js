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
var CombustivelController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CombustivelController = void 0;
const common_1 = require("@nestjs/common");
const combustivel_service_1 = require("./combustivel.service");
const swagger_1 = require("@nestjs/swagger");
const combustivel_input_dto_1 = require("./dto/combustivel-input.dto");
const combustivel_output_dto_1 = require("./dto/combustivel-output.dto");
let CombustivelController = CombustivelController_1 = class CombustivelController {
    combustivelService;
    logger = new common_1.Logger(CombustivelController_1.name);
    constructor(combustivelService) {
        this.combustivelService = combustivelService;
    }
    async comparaEconomia(input) {
        try {
            this.logger.log('Received fuel economy comparison request');
            return await this.combustivelService.comparaCombustivelEtanol(input);
        }
        catch (error) {
            this.logger.error('Error calculating fuel economy comparison', error.stack);
            throw error;
        }
    }
};
exports.CombustivelController = CombustivelController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    (0, swagger_1.ApiOperation)({
        summary: 'Compare fuel economy between gasoline and ethanol',
        description: 'Returns a summary of the comparison and a message indicating the recommended fuel type',
    }),
    (0, swagger_1.ApiBody)({ type: combustivel_input_dto_1.CombustivelInputDto }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Fuel economy comparison completed successfully',
        type: combustivel_output_dto_1.CombustivelOutputDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [combustivel_input_dto_1.CombustivelInputDto]),
    __metadata("design:returntype", Promise)
], CombustivelController.prototype, "comparaEconomia", null);
exports.CombustivelController = CombustivelController = CombustivelController_1 = __decorate([
    (0, swagger_1.ApiTags)('Combustível'),
    (0, common_1.Controller)('simuladores/combustivel/comparar'),
    __metadata("design:paramtypes", [combustivel_service_1.CombustivelService])
], CombustivelController);
//# sourceMappingURL=combustivel.controller.js.map