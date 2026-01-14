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
var RendaFixaController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RendaFixaController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const renda_fixa_service_1 = require("./renda-fixa.service");
const simular_renda_fixa_dto_1 = require("./dto/simular-renda-fixa.dto");
const resultado_renda_fixa_dto_1 = require("./dto/resultado-renda-fixa.dto");
let RendaFixaController = RendaFixaController_1 = class RendaFixaController {
    rendaFixaService;
    logger = new common_1.Logger(RendaFixaController_1.name);
    constructor(rendaFixaService) {
        this.rendaFixaService = rendaFixaService;
    }
    async simular(dto) {
        try {
            this.logger.log('Received fixed income simulation request');
            this.logger.debug(`Input: ${JSON.stringify(dto)}`);
            const result = await this.rendaFixaService.simular(dto);
            this.logger.log('Fixed income simulation completed successfully');
            this.logger.debug(`Best investment: ${result.melhorInvestimento}`);
            return result;
        }
        catch (error) {
            this.logger.error('Error calculating fixed income simulation', error.stack);
            throw error;
        }
    }
};
exports.RendaFixaController = RendaFixaController;
__decorate([
    (0, common_1.Post)('simular'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    (0, swagger_1.ApiOperation)({
        summary: 'Simular investimentos em renda fixa',
        description: `
      Compara diferentes modalidades de investimento em renda fixa:

      **Modalidades Comparadas:**
      - **Poupança**: TR + 0,5% ao mês (isenta de IR)
      - **Tesouro Direto (Selic)**: Taxa Selic (com IR regressivo)
      - **LCI**: 90% do CDI (isenta de IR)
      - **CDB**: 110% do CDI (com IR regressivo)

      **Taxas Utilizadas:**
      - Selic: Taxa atual obtida da API do Banco Central
      - CDI: Taxa atual obtida da API do Banco Central
      - TR: Taxa atual obtida da API do Banco Central

      **Imposto de Renda (IR) - Tabela Regressiva:**
      - Até 180 dias: 22,5%
      - 181 a 360 dias: 20%
      - 361 a 720 dias: 17,5%
      - Acima de 720 dias: 15%

      **Cálculo:**
      - Considera investimento inicial
      - Permite aportes mensais opcionais
      - Calcula com juros compostos
      - Aplica IR apenas em investimentos tributáveis
      - Identifica o melhor investimento automaticamente

      **Premissas:**
      - Aportes mensais constantes
      - Taxas de juros constantes durante o período
      - Não considera taxas de administração ou custódia
    `,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Simulação calculada com sucesso',
        type: resultado_renda_fixa_dto_1.ResultadoRendaFixaDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Dados inválidos fornecidos',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 400 },
                message: {
                    oneOf: [
                        { type: 'string' },
                        { type: 'array', items: { type: 'string' } },
                    ],
                    example: 'Investimento inicial é obrigatório',
                },
                error: { type: 'string', example: 'Bad Request' },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [simular_renda_fixa_dto_1.SimularRendaFixaDto]),
    __metadata("design:returntype", Promise)
], RendaFixaController.prototype, "simular", null);
exports.RendaFixaController = RendaFixaController = RendaFixaController_1 = __decorate([
    (0, swagger_1.ApiTags)('Renda Fixa'),
    (0, common_1.Controller)('simuladores/renda-fixa'),
    __metadata("design:paramtypes", [renda_fixa_service_1.RendaFixaService])
], RendaFixaController);
//# sourceMappingURL=renda-fixa.controller.js.map