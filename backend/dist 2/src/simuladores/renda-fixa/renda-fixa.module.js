"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RendaFixaModule = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const renda_fixa_controller_1 = require("./renda-fixa.controller");
const renda_fixa_service_1 = require("./renda-fixa.service");
const renda_fixa_api_client_1 = require("./clients/renda-fixa-api.client");
const email_module_1 = require("../../email/email.module");
let RendaFixaModule = class RendaFixaModule {
};
exports.RendaFixaModule = RendaFixaModule;
exports.RendaFixaModule = RendaFixaModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule.register({
                timeout: 5000,
                maxRedirects: 5,
            }),
            email_module_1.EmailModule,
        ],
        controllers: [renda_fixa_controller_1.RendaFixaController],
        providers: [renda_fixa_service_1.RendaFixaService, renda_fixa_api_client_1.RendaFixaApiClient],
        exports: [renda_fixa_service_1.RendaFixaService],
    })
], RendaFixaModule);
//# sourceMappingURL=renda-fixa.module.js.map