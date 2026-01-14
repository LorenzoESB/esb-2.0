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
var AposentadoriaController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AposentadoriaController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const aposentadoria_service_1 = require("./aposentadoria.service");
const simular_aposentadoria_dto_1 = require("./dto/simular-aposentadoria.dto");
const resultado_aposentadoria_dto_1 = require("./dto/resultado-aposentadoria.dto");
let AposentadoriaController = AposentadoriaController_1 = class AposentadoriaController {
    aposentadoriaService;
    logger = new common_1.Logger(AposentadoriaController_1.name);
    constructor(aposentadoriaService) {
        this.aposentadoriaService = aposentadoriaService;
    }
    async simular(dto) {
        try {
            this.logger.log('Received retirement simulation request');
            this.logger.debug(`Input: ${JSON.stringify(dto)}`);
            const result = await this.aposentadoriaService.simular(dto);
            this.logger.log('Retirement simulation completed successfully');
            this.logger.debug(`Output: ${JSON.stringify(result)}`);
            return result;
        }
        catch (error) {
            this.logger.error('Error calculating retirement simulation', error.stack);
            throw error;
        }
    }
};
exports.AposentadoriaController = AposentadoriaController;
__decorate([
    (0, common_1.Post)('simular'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    (0, swagger_1.ApiOperation)({
        summary: 'Simular planejamento de aposentadoria privada',
        description: `
      Calcula um planejamento completo de aposentadoria privada com dois modos:

      **Modo RECEBER**: Você informa quanto deseja receber mensalmente na aposentadoria,
      e o simulador calcula quanto você precisa contribuir mensalmente.

      **Modo CONTRIBUIR**: Você informa quanto pretende contribuir mensalmente,
      e o simulador calcula quanto você receberá na aposentadoria.

      O cálculo considera:
      - Taxa de juros real de 0,5% ao mês (padrão)
      - Expectativa de vida de 86 anos (padrão)
      - Valor já acumulado em previdência (se houver)
      - Análise de sustentabilidade do patrimônio

      **Premissas:**
      - Contribuições mensais constantes
      - Taxa de juros constante
      - Saques mensais constantes na aposentadoria
    `,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Simulação calculada com sucesso',
        type: resultado_aposentadoria_dto_1.ResultadoAposentadoriaDto,
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
                    example: 'Idade de aposentadoria deve ser maior que idade atual',
                },
                error: { type: 'string', example: 'Bad Request' },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [simular_aposentadoria_dto_1.SimularAposentadoriaDto]),
    __metadata("design:returntype", Promise)
], AposentadoriaController.prototype, "simular", null);
exports.AposentadoriaController = AposentadoriaController = AposentadoriaController_1 = __decorate([
    (0, swagger_1.ApiTags)('Aposentadoria'),
    (0, common_1.Controller)('simuladores/aposentadoria'),
    __metadata("design:paramtypes", [aposentadoria_service_1.AposentadoriaService])
], AposentadoriaController);
//# sourceMappingURL=aposentadoria.controller.js.map