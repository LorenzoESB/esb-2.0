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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinanciamentoVeiculosController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const financiamento_veiculos_service_1 = require("./financiamento-veiculos.service");
const simular_financiamento_veiculos_dto_1 = require("./dto/simular-financiamento-veiculos.dto");
const resultado_financiamento_veiculos_dto_1 = require("./dto/resultado-financiamento-veiculos.dto");
let FinanciamentoVeiculosController = class FinanciamentoVeiculosController {
    financiamentoVeiculosService;
    constructor(financiamentoVeiculosService) {
        this.financiamentoVeiculosService = financiamentoVeiculosService;
    }
    async simular(dto) {
        return this.financiamentoVeiculosService.simular(dto);
    }
};
exports.FinanciamentoVeiculosController = FinanciamentoVeiculosController;
__decorate([
    (0, common_1.Post)('/simular'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Simula financiamento de veículos',
        description: 'Calcula ofertas de financiamento de veículos usando sistema PRICE (Sistema Francês - parcelas fixas). Inclui cálculo de IOF. Retorna ofertas de múltiplos bancos ordenadas pela menor parcela mensal.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Simulação realizada com sucesso',
        type: [resultado_financiamento_veiculos_dto_1.ResultadoFinanciamentoVeiculosDto],
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Dados inválidos fornecidos',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Erro interno ao processar simulação',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [simular_financiamento_veiculos_dto_1.SimularFinanciamentoVeiculosDto]),
    __metadata("design:returntype", Promise)
], FinanciamentoVeiculosController.prototype, "simular", null);
exports.FinanciamentoVeiculosController = FinanciamentoVeiculosController = __decorate([
    (0, swagger_1.ApiTags)('Simuladores'),
    (0, common_1.Controller)('/simuladores/financiamento-veiculos'),
    __metadata("design:paramtypes", [financiamento_veiculos_service_1.FinanciamentoVeiculosService])
], FinanciamentoVeiculosController);
//# sourceMappingURL=financiamento-veiculos.controller.js.map