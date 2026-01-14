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
exports.ListaMaquininhasDto = exports.MaquininhaOpcaoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class MaquininhaOpcaoDto {
    id;
    nome;
    empresa;
    logo;
}
exports.MaquininhaOpcaoDto = MaquininhaOpcaoDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID único da maquininha',
        example: 1,
    }),
    __metadata("design:type", Number)
], MaquininhaOpcaoDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nome da maquininha',
        example: 'Moderninha Pro',
    }),
    __metadata("design:type", String)
], MaquininhaOpcaoDto.prototype, "nome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nome da empresa/adquirente',
        example: 'PagSeguro',
    }),
    __metadata("design:type", String)
], MaquininhaOpcaoDto.prototype, "empresa", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL do logo da maquininha',
        example: 'https://example.com/logos/pagseguro.png',
    }),
    __metadata("design:type", String)
], MaquininhaOpcaoDto.prototype, "logo", void 0);
class ListaMaquininhasDto {
    maquininhas;
    total;
}
exports.ListaMaquininhasDto = ListaMaquininhasDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Lista de maquininhas disponíveis para comparação',
        type: [MaquininhaOpcaoDto],
    }),
    __metadata("design:type", Array)
], ListaMaquininhasDto.prototype, "maquininhas", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total de maquininhas disponíveis',
        example: 40,
    }),
    __metadata("design:type", Number)
], ListaMaquininhasDto.prototype, "total", void 0);
//# sourceMappingURL=maquininha-opcao.dto.js.map