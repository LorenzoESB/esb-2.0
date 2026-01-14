"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContasDigitaisModule = void 0;
const common_1 = require("@nestjs/common");
const contas_digitais_controller_1 = require("./contas-digitais.controller");
const contas_digitais_service_1 = require("./contas-digitais.service");
const contas_digitais_data_1 = require("./data/contas-digitais.data");
const email_module_1 = require("../../email/email.module");
let ContasDigitaisModule = class ContasDigitaisModule {
};
exports.ContasDigitaisModule = ContasDigitaisModule;
exports.ContasDigitaisModule = ContasDigitaisModule = __decorate([
    (0, common_1.Module)({
        imports: [email_module_1.EmailModule],
        controllers: [contas_digitais_controller_1.ContasDigitaisController],
        providers: [contas_digitais_service_1.ContasDigitaisService, contas_digitais_data_1.ContasDigitaisData],
        exports: [contas_digitais_service_1.ContasDigitaisService],
    })
], ContasDigitaisModule);
//# sourceMappingURL=contas-digitais.module.js.map