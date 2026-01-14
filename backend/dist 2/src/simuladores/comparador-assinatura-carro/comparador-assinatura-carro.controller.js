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
exports.ComparadorAssinaturaCarroController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const comparador_assinatura_carro_service_1 = require("./comparador-assinatura-carro.service");
const simular_comparador_dto_1 = require("./dto/simular-comparador.dto");
const resultado_comparador_dto_1 = require("./dto/resultado-comparador.dto");
let ComparadorAssinaturaCarroController = class ComparadorAssinaturaCarroController {
    comparadorService;
    constructor(comparadorService) {
        this.comparadorService = comparadorService;
    }
    async simular(dto) {
        return this.comparadorService.simular(dto);
    }
};
exports.ComparadorAssinaturaCarroController = ComparadorAssinaturaCarroController;
__decorate([
    (0, common_1.Post)('/simular'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Compara compra, financiamento e assinatura de veículos',
        description: 'Realiza análise comparativa de custos entre comprar à vista, financiar ou assinar um veículo. Inclui todos os custos de propriedade (manutenção, IPVA, seguro, depreciação, custo de oportunidade). Determina a melhor opção financeira baseada no período especificado.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Comparação realizada com sucesso',
        type: resultado_comparador_dto_1.ResultadoComparadorDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Dados inválidos fornecidos',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Erro interno ao processar comparação',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [simular_comparador_dto_1.SimularComparadorDto]),
    __metadata("design:returntype", Promise)
], ComparadorAssinaturaCarroController.prototype, "simular", null);
exports.ComparadorAssinaturaCarroController = ComparadorAssinaturaCarroController = __decorate([
    (0, swagger_1.ApiTags)('Simuladores'),
    (0, common_1.Controller)('/simuladores/comparador-assinatura-carro'),
    __metadata("design:paramtypes", [comparador_assinatura_carro_service_1.ComparadorAssinaturaCarroService])
], ComparadorAssinaturaCarroController);
//# sourceMappingURL=comparador-assinatura-carro.controller.js.map