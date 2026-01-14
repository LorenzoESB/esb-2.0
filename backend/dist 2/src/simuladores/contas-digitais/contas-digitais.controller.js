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
var ContasDigitaisController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContasDigitaisController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const contas_digitais_service_1 = require("./contas-digitais.service");
const simular_contas_digitais_dto_1 = require("./dto/simular-contas-digitais.dto");
const resultado_contas_digitais_dto_1 = require("./dto/resultado-contas-digitais.dto");
let ContasDigitaisController = ContasDigitaisController_1 = class ContasDigitaisController {
    contasDigitaisService;
    logger = new common_1.Logger(ContasDigitaisController_1.name);
    constructor(contasDigitaisService) {
        this.contasDigitaisService = contasDigitaisService;
    }
    async simularPessoaFisica(dto) {
        this.logger.log(`POST /simuladores/contas-digitais/pessoa-fisica - ${dto.email}`);
        return this.contasDigitaisService.simularPessoaFisica(dto);
    }
    async simularPessoaJuridica(dto) {
        this.logger.log(`POST /simuladores/contas-digitais/pessoa-juridica - ${dto.email}`);
        return this.contasDigitaisService.simularPessoaJuridica(dto);
    }
};
exports.ContasDigitaisController = ContasDigitaisController;
__decorate([
    (0, common_1.Post)('pessoa-fisica'),
    (0, swagger_1.ApiOperation)({
        summary: 'Simular contas digitais para Pessoa Física',
        description: 'Compara contas digitais brasileiras baseado no perfil de uso e requisitos do cliente pessoa física. Retorna lista ordenada por menor custo mensal total.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Simulação realizada com sucesso',
        type: [resultado_contas_digitais_dto_1.ResultadoContasDigitaisDto],
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Dados de entrada inválidos',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [simular_contas_digitais_dto_1.SimularContasDigitaisFisicaDto]),
    __metadata("design:returntype", Promise)
], ContasDigitaisController.prototype, "simularPessoaFisica", null);
__decorate([
    (0, common_1.Post)('pessoa-juridica'),
    (0, swagger_1.ApiOperation)({
        summary: 'Simular contas digitais para Pessoa Jurídica',
        description: 'Compara contas digitais PJ brasileiras baseado no perfil de uso e requisitos da empresa. Retorna lista ordenada por menor custo mensal total.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Simulação realizada com sucesso',
        type: [resultado_contas_digitais_dto_1.ResultadoContasDigitaisDto],
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Dados de entrada inválidos',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [simular_contas_digitais_dto_1.SimularContasDigitaisJuridicaDto]),
    __metadata("design:returntype", Promise)
], ContasDigitaisController.prototype, "simularPessoaJuridica", null);
exports.ContasDigitaisController = ContasDigitaisController = ContasDigitaisController_1 = __decorate([
    (0, swagger_1.ApiTags)('Simuladores - Contas Digitais'),
    (0, common_1.Controller)('simuladores/contas-digitais'),
    __metadata("design:paramtypes", [contas_digitais_service_1.ContasDigitaisService])
], ContasDigitaisController);
//# sourceMappingURL=contas-digitais.controller.js.map