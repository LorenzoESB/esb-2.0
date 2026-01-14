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
var TaxaMaquininhaController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxaMaquininhaController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const taxa_maquininha_service_1 = require("./taxa-maquininha.service");
const simular_taxa_maquininha_dto_1 = require("./dto/simular-taxa-maquininha.dto");
const resultado_taxa_maquininha_dto_1 = require("./dto/resultado-taxa-maquininha.dto");
let TaxaMaquininhaController = TaxaMaquininhaController_1 = class TaxaMaquininhaController {
    taxaMaquininhaService;
    logger = new common_1.Logger(TaxaMaquininhaController_1.name);
    constructor(taxaMaquininhaService) {
        this.taxaMaquininhaService = taxaMaquininhaService;
    }
    async simular(dto) {
        try {
            this.logger.log(`Received card machine fee simulation request from ${dto.email}`);
            this.logger.debug(`Input: ${JSON.stringify(dto)}`);
            const result = await this.taxaMaquininhaService.simular(dto);
            this.logger.log(`Card machine simulation completed successfully. Total machines: ${result.total}, Best option: ${result.melhor_opcao.nome} (R$ ${result.melhor_opcao.valor_mensal.toFixed(2)}/mês)`);
            return result;
        }
        catch (error) {
            this.logger.error('Error calculating card machine fee simulation', error.stack);
            throw error;
        }
    }
};
exports.TaxaMaquininhaController = TaxaMaquininhaController;
__decorate([
    (0, common_1.Post)('simular'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    (0, swagger_1.ApiOperation)({
        summary: 'Simular taxas de maquininhas de cartão',
        description: `
      Calcula e compara os custos mensais de diversas maquininhas de cartão com base no perfil de vendas informado.

      **Migrado do Django (gerentesonhos/apps/maquininhas)**

      ## Como Funciona

      O simulador calcula o **custo total mensal** para cada maquininha considerando:

      ### 1. Taxas sobre Transações (MDR)
      - **Débito**: Taxa percentual sobre vendas no débito
      - **Crédito à vista**: Taxa percentual sobre vendas no crédito à vista
      - **Crédito parcelado**: Taxa que varia conforme número de parcelas

      ### 2. Modelos de Cobrança

      Existem 4 modelos principais:

      **a) Antecipação por Juros Simples**
      - Taxa cresce linearmente: base + (taxa_adicional × parcelas)
      - Exemplo: 3% base + 0,5% por parcela = 6% em 6x

      **b) Antecipação por Juros Compostos**
      - Taxa cresce exponencialmente: (1 + taxa)^n
      - Usado quando a empresa antecipa automaticamente

      **c) Faixa de Faturamento** (3 tipos)
      - **Tipo 1 - Preço Fixo**: Faturou R$ 5k-15k = paga R$ 50/mês fixo
      - **Tipo 2 - Taxa por Faixa**: Faturou R$ 5k-15k = taxa de 2,5%
      - **Tipo 3 - Taxa Adicional**: Faturou R$ 5k-15k = 2% base + 0,3%/parcela

      **d) Taxa Padrão**
      - Taxa fixa por tipo de transação
      - Pode ter taxa adicional por parcela ou taxas específicas por número de parcelas

      ### 3. Custos da Máquina
      - **Compra**: Amortizado pela garantia (geralmente 1-3 anos)
      - **Aluguel/Mensalidade**: Pode ser condicional (isento acima de certo faturamento)

      ### 4. Filtros Disponíveis
      - **sem_mensalidade**: Apenas maquininhas sem taxa mensal
      - **wifi**: Com conexão Wi-Fi
      - **pf/pj**: Tipo de pessoa atendida
      - **aceita_cartao_tarja**: Aceita tarja magnética
      - **imprime_recibo**: Tem impressora
      - **aceita_vale_refeicao**: Aceita cartões de alimentação
      - **n_exige_smartphone**: Funciona sem celular
      - **quer_antecipar**: Permite antecipação de recebíveis
      - **ecommerce**: Possui opção para vendas online

      ## Cálculo do Custo Mensal

      \`\`\`
      CUSTO TOTAL MENSAL =
        (débito_vendas × taxa_débito) +
        (crédito_vista_vendas × taxa_crédito_vista) +
        (crédito_parcelado_vendas × taxa_parcelado_calculada) +
        (preço_máquina / (garantia_anos × 12)) +
        mensalidade_ou_taxa_condicional
      \`\`\`

      ## Ordenação dos Resultados

      Os resultados são ordenados por **menor custo mensal**, permitindo identificar rapidamente a opção mais econômica para o perfil de vendas informado.

      ## Dias de Repasse

      Cada maquininha tem prazos diferentes para repasse do dinheiro:
      - **Débito**: Geralmente 1 dia útil
      - **Crédito à vista**: 14 a 30 dias
      - **Crédito parcelado**: 30+ dias ou após cada parcela

      ## Precisão dos Cálculos

      Utiliza **Decimal.js com 19 dígitos de precisão** para garantir exatidão nos cálculos financeiros, idêntico ao Python Decimal usado no sistema legado.

      ## Premissas

      - Taxas baseadas em dados reais das empresas
      - Considera apenas maquininhas ativas
      - Planos devem estar ativos e compatíveis com o número de parcelas
      - Segmentos específicos (se informado) filtram planos disponíveis
    `,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Simulação calculada com sucesso',
        type: resultado_taxa_maquininha_dto_1.ResultadoTaxaMaquininhaDto,
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
                        'venda_debito must not be less than 0',
                        'numero_parcelas must not be less than 2',
                        'numero_parcelas must not be greater than 12',
                    ],
                },
                error: { type: 'string', example: 'Bad Request' },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [simular_taxa_maquininha_dto_1.SimularTaxaMaquininhaDto]),
    __metadata("design:returntype", Promise)
], TaxaMaquininhaController.prototype, "simular", null);
exports.TaxaMaquininhaController = TaxaMaquininhaController = TaxaMaquininhaController_1 = __decorate([
    (0, swagger_1.ApiTags)('Taxa Maquininha'),
    (0, common_1.Controller)('simuladores/taxa-maquininha'),
    __metadata("design:paramtypes", [taxa_maquininha_service_1.TaxaMaquininhaService])
], TaxaMaquininhaController);
//# sourceMappingURL=taxa-maquininha.controller.js.map