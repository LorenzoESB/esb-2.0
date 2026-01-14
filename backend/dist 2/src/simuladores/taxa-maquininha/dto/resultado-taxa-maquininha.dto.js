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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultadoTaxaMaquininhaDto = exports.MaquininhaCalculadaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class MaquininhaCalculadaDto {
    nome;
    id_maq;
    empresa;
    empresa_cnpj;
    logo;
    imagem_maquina;
    valor_mensal;
    valor_mensalidade;
    valor_transacao;
    valor_selo;
    dias_debito;
    dias_credito;
    tipo_dias_credito;
    dias_credito_parcelado;
    tipo_recebimento_parcelado;
    co_cartao;
    site;
    observacao;
    cupom;
    possibilidade_parcelamento;
    afiliacao_a_banco;
    chip;
    tarja;
    NFC;
    PF;
    PJ;
    precisa_de_telefone;
    fio;
    imprime_recibo;
    garantia;
    possivel_antecipacao;
    antecipado;
    opcao_ecommerce;
    taxas_transparentes;
    vale_refeicao;
    tipo_conexoes;
    forma_recebimento;
    bandeiras;
    avaliacao;
    data_atualizacao;
    url_avaliacao;
    cruzamentos;
    tem_parceria;
}
exports.MaquininhaCalculadaDto = MaquininhaCalculadaDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nome completo (maquininha + plano)',
        example: 'Moderninha Pro PagSeguro - Plano Básico',
    }),
    __metadata("design:type", String)
], MaquininhaCalculadaDto.prototype, "nome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID da maquininha',
        example: 1,
    }),
    __metadata("design:type", Number)
], MaquininhaCalculadaDto.prototype, "id_maq", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nome da empresa',
        example: 'PagSeguro',
    }),
    __metadata("design:type", String)
], MaquininhaCalculadaDto.prototype, "empresa", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'CNPJ da empresa',
        example: '08.561.701/0001-01',
    }),
    __metadata("design:type", String)
], MaquininhaCalculadaDto.prototype, "empresa_cnpj", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL do logo da empresa',
        example: 'https://example.com/media/logos/pagseguro.png',
    }),
    __metadata("design:type", String)
], MaquininhaCalculadaDto.prototype, "logo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL da imagem da maquininha',
        example: 'https://example.com/media/maquininhas/moderninha-pro.png',
    }),
    __metadata("design:type", String)
], MaquininhaCalculadaDto.prototype, "imagem_maquina", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Custo mensal total (principal métrica de comparação)',
        example: 125.5,
    }),
    __metadata("design:type", Number)
], MaquininhaCalculadaDto.prototype, "valor_mensal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valor da mensalidade (se houver)',
        example: 0,
    }),
    __metadata("design:type", Number)
], MaquininhaCalculadaDto.prototype, "valor_mensalidade", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valor por transação (se houver)',
        example: 0,
    }),
    __metadata("design:type", Number)
], MaquininhaCalculadaDto.prototype, "valor_transacao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Percentual de desconto (selo promocional)',
        example: 20,
    }),
    __metadata("design:type", Object)
], MaquininhaCalculadaDto.prototype, "valor_selo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Dias para repasse do débito',
        example: 1,
    }),
    __metadata("design:type", Number)
], MaquininhaCalculadaDto.prototype, "dias_debito", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Dias para repasse do crédito à vista',
        example: 30,
    }),
    __metadata("design:type", Number)
], MaquininhaCalculadaDto.prototype, "dias_credito", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tipo de dias (úteis ou corridos)',
        example: 'Dias Corridos',
    }),
    __metadata("design:type", String)
], MaquininhaCalculadaDto.prototype, "tipo_dias_credito", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Dias para repasse do crédito parcelado',
        example: 30,
    }),
    __metadata("design:type", Number)
], MaquininhaCalculadaDto.prototype, "dias_credito_parcelado", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Recebe após cada parcela ou tudo de uma vez',
        example: false,
    }),
    __metadata("design:type", Boolean)
], MaquininhaCalculadaDto.prototype, "tipo_recebimento_parcelado", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID do plano',
        example: 15,
    }),
    __metadata("design:type", Number)
], MaquininhaCalculadaDto.prototype, "co_cartao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL para contratação',
        example: 'https://pagseguro.uol.com.br',
    }),
    __metadata("design:type", String)
], MaquininhaCalculadaDto.prototype, "site", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Observações sobre a maquininha',
        example: 'Aceita todas as bandeiras',
    }),
    __metadata("design:type", String)
], MaquininhaCalculadaDto.prototype, "observacao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Código do cupom de desconto (se houver)',
        example: 'PROMO20',
        nullable: true,
    }),
    __metadata("design:type", Object)
], MaquininhaCalculadaDto.prototype, "cupom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Máximo de parcelas aceitas',
        example: 12,
    }),
    __metadata("design:type", Number)
], MaquininhaCalculadaDto.prototype, "possibilidade_parcelamento", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Requer afiliação a banco',
        example: false,
    }),
    __metadata("design:type", Boolean)
], MaquininhaCalculadaDto.prototype, "afiliacao_a_banco", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Aceita chip',
        example: true,
    }),
    __metadata("design:type", Boolean)
], MaquininhaCalculadaDto.prototype, "chip", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Aceita tarja magnética',
        example: true,
    }),
    __metadata("design:type", Boolean)
], MaquininhaCalculadaDto.prototype, "tarja", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Aceita NFC (aproximação)',
        example: true,
    }),
    __metadata("design:type", Boolean)
], MaquininhaCalculadaDto.prototype, "NFC", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Atende Pessoa Física',
        example: true,
    }),
    __metadata("design:type", Boolean)
], MaquininhaCalculadaDto.prototype, "PF", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Atende Pessoa Jurídica',
        example: true,
    }),
    __metadata("design:type", Boolean)
], MaquininhaCalculadaDto.prototype, "PJ", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Precisa de telefone/smartphone',
        example: false,
    }),
    __metadata("design:type", Boolean)
], MaquininhaCalculadaDto.prototype, "precisa_de_telefone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Possui fio',
        example: false,
    }),
    __metadata("design:type", Boolean)
], MaquininhaCalculadaDto.prototype, "fio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Imprime recibo',
        example: true,
    }),
    __metadata("design:type", Boolean)
], MaquininhaCalculadaDto.prototype, "imprime_recibo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Garantia em anos',
        example: 1,
        nullable: true,
    }),
    __metadata("design:type", Object)
], MaquininhaCalculadaDto.prototype, "garantia", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Permite antecipação de recebíveis',
        example: true,
    }),
    __metadata("design:type", Boolean)
], MaquininhaCalculadaDto.prototype, "possivel_antecipacao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Este plano é antecipado',
        example: false,
    }),
    __metadata("design:type", Boolean)
], MaquininhaCalculadaDto.prototype, "antecipado", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Possui opção de e-commerce',
        example: false,
    }),
    __metadata("design:type", Boolean)
], MaquininhaCalculadaDto.prototype, "opcao_ecommerce", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Taxas transparentes',
        example: true,
    }),
    __metadata("design:type", Boolean)
], MaquininhaCalculadaDto.prototype, "taxas_transparentes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Aceita vale refeição',
        example: false,
    }),
    __metadata("design:type", Boolean)
], MaquininhaCalculadaDto.prototype, "vale_refeicao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tipos de conexão disponíveis',
        example: [{ nome: 'Wi-Fi' }, { nome: '4G' }],
    }),
    __metadata("design:type", Array)
], MaquininhaCalculadaDto.prototype, "tipo_conexoes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Formas de recebimento',
        example: [{ nome: 'PIX' }, { nome: 'TED' }],
    }),
    __metadata("design:type", Array)
], MaquininhaCalculadaDto.prototype, "forma_recebimento", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Bandeiras aceitas',
        example: [
            { nome: 'Visa', classeCss: 'visa' },
            { nome: 'Mastercard', classeCss: 'mastercard' },
        ],
    }),
    __metadata("design:type", Array)
], MaquininhaCalculadaDto.prototype, "bandeiras", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Avaliação do plano (0-10)',
        example: 8.5,
    }),
    __metadata("design:type", Number)
], MaquininhaCalculadaDto.prototype, "avaliacao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Data da última atualização',
        example: '15/11/2024',
    }),
    __metadata("design:type", String)
], MaquininhaCalculadaDto.prototype, "data_atualizacao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL da avaliação/review',
        example: 'https://blog.gerentedesonhos.com.br/review-moderninha',
        nullable: true,
    }),
    __metadata("design:type", Object)
], MaquininhaCalculadaDto.prototype, "url_avaliacao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Cruzamentos/ofertas relacionadas',
        example: [],
    }),
    __metadata("design:type", Array)
], MaquininhaCalculadaDto.prototype, "cruzamentos", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Empresa é parceira',
        example: true,
    }),
    __metadata("design:type", Boolean)
], MaquininhaCalculadaDto.prototype, "tem_parceria", void 0);
class ResultadoTaxaMaquininhaDto {
    maquininhas;
    total;
    melhor_opcao;
    input_data;
}
exports.ResultadoTaxaMaquininhaDto = ResultadoTaxaMaquininhaDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Lista de maquininhas calculadas, ordenadas por custo mensal (menor primeiro)',
        type: [MaquininhaCalculadaDto],
    }),
    __metadata("design:type", Array)
], ResultadoTaxaMaquininhaDto.prototype, "maquininhas", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total de maquininhas encontradas',
        example: 15,
    }),
    __metadata("design:type", Number)
], ResultadoTaxaMaquininhaDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Melhor opção (menor custo mensal)',
        type: MaquininhaCalculadaDto,
    }),
    __metadata("design:type", MaquininhaCalculadaDto)
], ResultadoTaxaMaquininhaDto.prototype, "melhor_opcao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Dados de entrada da simulação',
        example: {
            venda_debito: 5000,
            venda_credito_vista: 3000,
            venda_credito_parcelado: 2000,
            numero_parcelas: 6,
        },
    }),
    __metadata("design:type", Object)
], ResultadoTaxaMaquininhaDto.prototype, "input_data", void 0);
//# sourceMappingURL=resultado-taxa-maquininha.dto.js.map