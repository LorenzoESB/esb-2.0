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
var EmprestimoController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const emprestimo_service_1 = require("./emprestimo.service");
const simular_emprestimo_dto_1 = require("./dto/simular-emprestimo.dto");
const resultado_emprestimo_dto_1 = require("./dto/resultado-emprestimo.dto");
let EmprestimoController = EmprestimoController_1 = class EmprestimoController {
    emprestimoService;
    logger = new common_1.Logger(EmprestimoController_1.name);
    constructor(emprestimoService) {
        this.emprestimoService = emprestimoService;
    }
    async simular(dto) {
        try {
            this.logger.log(`Received personal loan simulation request for ${dto.tipoPessoa}`);
            this.logger.debug(`Input: ${JSON.stringify(dto)}`);
            const result = await this.emprestimoService.simular(dto);
            this.logger.log(`Personal loan simulation completed successfully. Total offers: ${result.totalOfertas}, Best rate: ${result.melhorOferta.taxaMensal}%`);
            return result;
        }
        catch (error) {
            this.logger.error('Error calculating personal loan simulation', error.stack);
            throw error;
        }
    }
};
exports.EmprestimoController = EmprestimoController;
__decorate([
    (0, common_1.Post)('simular'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    (0, swagger_1.ApiOperation)({
        summary: 'Simular empréstimo pessoal',
        description: `
      Simula ofertas de empréstimo pessoal comparando taxas de diferentes instituições financeiras.

      **Tipos de Pessoa:**
      - **PF (Pessoa Física)**: Empréstimos para pessoas físicas
        - Requer especificação do tipo de emprego
      - **PJ (Pessoa Jurídica)**: Empréstimos empresariais
        - Capital de giro, antecipação de recebíveis

      **Tipos de Emprego (apenas para PF):**
      - **aposentado**: Acesso a crédito consignado INSS e crédito pessoal não consignado
      - **clt**: Acesso a crédito consignado privado e crédito pessoal não consignado
      - **servidor_publico**: Acesso a crédito consignado público e crédito pessoal não consignado

      **Modalidades de Crédito PF:**
      - **Crédito Consignado INSS**: Taxas de 1,8% a 2,0% a.m. (aposentados e pensionistas)
      - **Crédito Consignado Privado**: Taxas de 2,1% a 2,3% a.m. (CLT em empresas privadas)
      - **Crédito Consignado Público**: Taxas de 2,0% a 2,2% a.m. (servidores públicos)
      - **Crédito Pessoal Não Consignado**: Taxas de 3,9% a 4,6% a.m. (todos os perfis)

      **Modalidades de Crédito PJ:**
      - **Capital de Giro**: Taxas de 2,7% a 3,2% a.m.
      - **Antecipação de Recebíveis**: Taxas de 2,6% a 2,9% a.m.

      **Sistema de Amortização:**
      - Utiliza sistema PRICE (parcelas fixas)
      - Considera juros compostos mensalmente

      **Cálculos Realizados:**
      - Parcela mensal fixa (sistema PRICE)
      - Total pago ao final do empréstimo
      - Total de juros pagos
      - Taxa de juros anual equivalente
      - Taxa efetiva anual (considerando capitalização)
      - Comprometimento de renda (se informada)

      **Ordenação:**
      - Ofertas ordenadas por taxa mensal (menor para maior)
      - Melhor oferta (menor taxa) destacada no resultado

      **Premissas:**
      - Taxas baseadas em médias de mercado
      - Não considera tarifas administrativas
      - Cálculos usando precisão de 15 dígitos decimais
    `,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Simulação calculada com sucesso',
        type: resultado_emprestimo_dto_1.ResultadoEmprestimoDto,
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
                    example: [
                        'tipoPessoa must be one of the following values: PF, PJ',
                        'valorDesejado must not be less than 0',
                        'prazoMeses must not be less than 1',
                    ],
                },
                error: { type: 'string', example: 'Bad Request' },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [simular_emprestimo_dto_1.SimularEmprestimoDto]),
    __metadata("design:returntype", Promise)
], EmprestimoController.prototype, "simular", null);
exports.EmprestimoController = EmprestimoController = EmprestimoController_1 = __decorate([
    (0, swagger_1.ApiTags)('Empréstimo Pessoal'),
    (0, common_1.Controller)('simuladores/emprestimo'),
    __metadata("design:paramtypes", [emprestimo_service_1.EmprestimoService])
], EmprestimoController);
//# sourceMappingURL=emprestimo.controller.js.map