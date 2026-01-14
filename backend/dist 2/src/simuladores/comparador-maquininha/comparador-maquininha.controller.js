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
var ComparadorMaquininhaController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComparadorMaquininhaController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const comparador_maquininha_service_1 = require("./comparador-maquininha.service");
const comparar_maquininha_dto_1 = require("./dto/comparar-maquininha.dto");
const resultado_comparacao_dto_1 = require("./dto/resultado-comparacao.dto");
const maquininha_opcao_dto_1 = require("./dto/maquininha-opcao.dto");
let ComparadorMaquininhaController = ComparadorMaquininhaController_1 = class ComparadorMaquininhaController {
    comparadorMaquininhaService;
    logger = new common_1.Logger(ComparadorMaquininhaController_1.name);
    constructor(comparadorMaquininhaService) {
        this.comparadorMaquininhaService = comparadorMaquininhaService;
    }
    async listarMaquininhas() {
        try {
            this.logger.log('Received request to list available card machines');
            const result = await this.comparadorMaquininhaService.listarMaquinhasDisponiveis();
            this.logger.log(`Successfully returned ${result.total} available card machines`);
            return result;
        }
        catch (error) {
            this.logger.error('Error listing available card machines', error.stack);
            throw error;
        }
    }
    async comparar(dto) {
        try {
            this.logger.log(`Received comparison request for ${dto.maquininhas_ids.length} card machines from ${dto.email}`);
            this.logger.debug(`Input: ${JSON.stringify(dto)}`);
            const result = await this.comparadorMaquininhaService.comparar(dto);
            this.logger.log(`Comparison completed successfully. Total machines compared: ${result.total}`);
            return result;
        }
        catch (error) {
            this.logger.error('Error in card machine comparison', error.stack);
            throw error;
        }
    }
};
exports.ComparadorMaquininhaController = ComparadorMaquininhaController;
__decorate([
    (0, common_1.Get)('maquininhas'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar maquininhas disponíveis para comparação',
        description: `
      Retorna lista simplificada de todas as maquininhas ativas disponíveis
      para seleção no comparador.

      ## Informações Retornadas

      Para cada maquininha:
      - **ID**: Identificador único para usar na comparação
      - **Nome**: Nome comercial da maquininha
      - **Empresa**: Nome da adquirente/empresa
      - **Logo**: URL do logo para exibição

      ## Uso

      Use este endpoint para popular a lista de seleção no frontend.
      Os IDs retornados devem ser enviados no endpoint de comparação:
      \`POST /simuladores/comparador-maquininha/comparar\`

      ## Observações

      - Apenas maquininhas ativas são retornadas
      - A lista é ordenada alfabeticamente por nome
      - Não requer autenticação
    `,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de maquininhas disponíveis',
        type: maquininha_opcao_dto_1.ListaMaquininhasDto,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ComparadorMaquininhaController.prototype, "listarMaquininhas", null);
__decorate([
    (0, common_1.Post)('comparar'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    (0, swagger_1.ApiOperation)({
        summary: 'Comparar maquininhas de cartão lado a lado',
        description: `
      Compara características e especificações de múltiplas maquininhas de cartão.

      **Diferença do Simulador de Taxas:**
      - **Taxa Maquininha**: Calcula custo mensal baseado em vendas informadas
      - **Comparador**: Compara features e especificações técnicas lado a lado

      ## O que é comparado

      ### Características Físicas
      - Aceita chip, tarja magnética, NFC
      - Com ou sem fio
      - Imprime recibo
      - Precisa de smartphone

      ### Funcionalidades
      - Permite antecipação de recebíveis
      - Atende PF/PJ
      - Aceita vale refeição
      - Possui opção e-commerce

      ### Custos Básicos
      - Preço da maquininha
      - Preço promocional (se houver)
      - Mensalidade

      ### Especificações Técnicas
      - Máximo de parcelas
      - Garantia
      - Tipos de conexão (Wi-Fi, 4G, Bluetooth)
      - Bandeiras aceitas
      - Formas de recebimento

      ### Planos Disponíveis
      Para cada plano:
      - Nome do plano
      - Taxa de débito
      - Taxa de crédito à vista
      - Taxa mínima de crédito parcelado
      - Dias de repasse
      - Avaliação do plano

      ## Uso Recomendado

      Use este endpoint quando:
      - Cliente quer comparar especificações técnicas
      - Não tem perfil de vendas definido ainda
      - Quer entender diferenças entre maquininhas
      - Está na fase inicial de pesquisa

      Para calcular custos mensais baseados em vendas, use:
      \`POST /simuladores/taxa-maquininha/simular\`

      ## Limite de Comparação

      Mínimo: 2 maquininhas
      Recomendado: 2-5 maquininhas (para melhor visualização)
    `,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Comparação realizada com sucesso',
        type: resultado_comparacao_dto_1.ResultadoComparacaoDto,
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
                        'É necessário selecionar pelo menos 2 maquininhas para comparar',
                    ],
                },
                error: { type: 'string', example: 'Bad Request' },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comparar_maquininha_dto_1.CompararMaquininhaDto]),
    __metadata("design:returntype", Promise)
], ComparadorMaquininhaController.prototype, "comparar", null);
exports.ComparadorMaquininhaController = ComparadorMaquininhaController = ComparadorMaquininhaController_1 = __decorate([
    (0, swagger_1.ApiTags)('Comparador Maquininha'),
    (0, common_1.Controller)('simuladores/comparador-maquininha'),
    __metadata("design:paramtypes", [comparador_maquininha_service_1.ComparadorMaquininhaService])
], ComparadorMaquininhaController);
//# sourceMappingURL=comparador-maquininha.controller.js.map