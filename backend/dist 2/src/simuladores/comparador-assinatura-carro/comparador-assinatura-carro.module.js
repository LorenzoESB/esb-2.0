"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComparadorAssinaturaCarroModule = void 0;
const common_1 = require("@nestjs/common");
const comparador_assinatura_carro_controller_1 = require("./comparador-assinatura-carro.controller");
const comparador_assinatura_carro_service_1 = require("./comparador-assinatura-carro.service");
const email_module_1 = require("../../email/email.module");
let ComparadorAssinaturaCarroModule = class ComparadorAssinaturaCarroModule {
};
exports.ComparadorAssinaturaCarroModule = ComparadorAssinaturaCarroModule;
exports.ComparadorAssinaturaCarroModule = ComparadorAssinaturaCarroModule = __decorate([
    (0, common_1.Module)({
        imports: [email_module_1.EmailModule],
        controllers: [comparador_assinatura_carro_controller_1.ComparadorAssinaturaCarroController],
        providers: [comparador_assinatura_carro_service_1.ComparadorAssinaturaCarroService],
        exports: [comparador_assinatura_carro_service_1.ComparadorAssinaturaCarroService],
    })
], ComparadorAssinaturaCarroModule);
//# sourceMappingURL=comparador-assinatura-carro.module.js.map