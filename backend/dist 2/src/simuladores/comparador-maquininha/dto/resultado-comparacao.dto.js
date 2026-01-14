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
exports.ResultadoComparacaoDto = exports.CaracteristicasMaquininhaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CaracteristicasMaquininhaDto {
    id;
    nome;
    empresa;
    logo;
    imagem;
    preco;
    preco_promocional;
    mensalidade;
    chip;
    tarja;
    nfc;
    com_fio;
    imprime_recibo;
    precisa_smartphone;
    permite_antecipacao;
    atende_pf;
    atende_pj;
    vale_refeicao;
    ecommerce;
    max_parcelas;
    garantia;
    tipos_conexao;
    bandeiras;
    formas_recebimento;
    observacoes;
    url_contratacao;
    cupom;
    transparencia;
    url_avaliacao;
    data_atualizacao;
    planos;
}
exports.CaracteristicasMaquininhaDto = CaracteristicasMaquininhaDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID da maquininha', example: 1 }),
    __metadata("design:type", Number)
], CaracteristicasMaquininhaDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nome da maquininha',
        example: 'Moderninha Pro',
    }),
    __metadata("design:type", String)
], CaracteristicasMaquininhaDto.prototype, "nome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nome da empresa', example: 'PagSeguro' }),
    __metadata("design:type", String)
], CaracteristicasMaquininhaDto.prototype, "empresa", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL do logo',
        example: 'https://example.com/logos/pagseguro.png',
    }),
    __metadata("design:type", String)
], CaracteristicasMaquininhaDto.prototype, "logo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL da imagem da maquininha',
        example: 'https://example.com/maquininhas/moderninha-pro.png',
    }),
    __metadata("design:type", String)
], CaracteristicasMaquininhaDto.prototype, "imagem", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Preço da maquininha', example: 258.8 }),
    __metadata("design:type", Number)
], CaracteristicasMaquininhaDto.prototype, "preco", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Preço promocional (se houver)',
        example: 12.9,
        nullable: true,
    }),
    __metadata("design:type", Object)
], CaracteristicasMaquininhaDto.prototype, "preco_promocional", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mensalidade (R$ 0 se gratuita)',
        example: 0,
    }),
    __metadata("design:type", Number)
], CaracteristicasMaquininhaDto.prototype, "mensalidade", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Aceita chip',
        example: true,
    }),
    __metadata("design:type", Boolean)
], CaracteristicasMaquininhaDto.prototype, "chip", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Aceita tarja magnética',
        example: true,
    }),
    __metadata("design:type", Boolean)
], CaracteristicasMaquininhaDto.prototype, "tarja", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Aceita NFC (aproximação)',
        example: true,
    }),
    __metadata("design:type", Boolean)
], CaracteristicasMaquininhaDto.prototype, "nfc", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Possui fio',
        example: false,
    }),
    __metadata("design:type", Boolean)
], CaracteristicasMaquininhaDto.prototype, "com_fio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Imprime recibo',
        example: true,
    }),
    __metadata("design:type", Boolean)
], CaracteristicasMaquininhaDto.prototype, "imprime_recibo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Precisa de smartphone',
        example: false,
    }),
    __metadata("design:type", Boolean)
], CaracteristicasMaquininhaDto.prototype, "precisa_smartphone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Permite antecipação de recebíveis',
        example: true,
    }),
    __metadata("design:type", Boolean)
], CaracteristicasMaquininhaDto.prototype, "permite_antecipacao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Atende Pessoa Física',
        example: true,
    }),
    __metadata("design:type", Boolean)
], CaracteristicasMaquininhaDto.prototype, "atende_pf", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Atende Pessoa Jurídica',
        example: true,
    }),
    __metadata("design:type", Boolean)
], CaracteristicasMaquininhaDto.prototype, "atende_pj", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Aceita vale refeição',
        example: false,
    }),
    __metadata("design:type", Boolean)
], CaracteristicasMaquininhaDto.prototype, "vale_refeicao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Possui opção e-commerce',
        example: false,
    }),
    __metadata("design:type", Boolean)
], CaracteristicasMaquininhaDto.prototype, "ecommerce", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Máximo de parcelas',
        example: 12,
    }),
    __metadata("design:type", Number)
], CaracteristicasMaquininhaDto.prototype, "max_parcelas", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Garantia em anos',
        example: 1,
        nullable: true,
    }),
    __metadata("design:type", Object)
], CaracteristicasMaquininhaDto.prototype, "garantia", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tipos de conexão disponíveis',
        example: ['Wi-Fi', '4G', 'Bluetooth'],
    }),
    __metadata("design:type", Array)
], CaracteristicasMaquininhaDto.prototype, "tipos_conexao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Bandeiras aceitas',
        example: ['Visa', 'Mastercard', 'Elo', 'American Express'],
    }),
    __metadata("design:type", Array)
], CaracteristicasMaquininhaDto.prototype, "bandeiras", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Formas de recebimento',
        example: ['Conta PagSeguro', 'Conta Bancária'],
    }),
    __metadata("design:type", Array)
], CaracteristicasMaquininhaDto.prototype, "formas_recebimento", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Observações sobre a maquininha',
        example: 'Maquininha completa com NFC e impressora',
    }),
    __metadata("design:type", String)
], CaracteristicasMaquininhaDto.prototype, "observacoes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL para contratação',
        example: 'https://pagseguro.uol.com.br',
    }),
    __metadata("design:type", String)
], CaracteristicasMaquininhaDto.prototype, "url_contratacao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Cupom de desconto',
        example: 'PROMO2024',
        nullable: true,
    }),
    __metadata("design:type", Object)
], CaracteristicasMaquininhaDto.prototype, "cupom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Avaliação de transparência (0-10)',
        example: 9,
        nullable: true,
    }),
    __metadata("design:type", Object)
], CaracteristicasMaquininhaDto.prototype, "transparencia", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL da avaliação/review',
        example: 'https://blog.gerentedesonhos.com.br/moderninha-pro',
        nullable: true,
    }),
    __metadata("design:type", Object)
], CaracteristicasMaquininhaDto.prototype, "url_avaliacao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Data da última atualização',
        example: '15/11/2024',
    }),
    __metadata("design:type", String)
], CaracteristicasMaquininhaDto.prototype, "data_atualizacao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Planos disponíveis',
        type: 'array',
        example: [
            {
                id: 1,
                nome: 'Plano Básico',
                taxa_debito: '2,99%',
                taxa_credito_vista: '3,99%',
                taxa_credito_parcelado_min: '4,98%',
                dias_repasse_debito: 1,
                dias_repasse_credito: 30,
                avaliacao: 8.5,
            },
        ],
    }),
    __metadata("design:type", Array)
], CaracteristicasMaquininhaDto.prototype, "planos", void 0);
class ResultadoComparacaoDto {
    maquininhas;
    total;
}
exports.ResultadoComparacaoDto = ResultadoComparacaoDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Maquininhas comparadas',
        type: [CaracteristicasMaquininhaDto],
    }),
    __metadata("design:type", Array)
], ResultadoComparacaoDto.prototype, "maquininhas", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total de maquininhas comparadas',
        example: 3,
    }),
    __metadata("design:type", Number)
], ResultadoComparacaoDto.prototype, "total", void 0);
//# sourceMappingURL=resultado-comparacao.dto.js.map