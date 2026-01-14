"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinanciamentoImovelModule = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const financiamento_imovel_controller_1 = require("./financiamento-imovel.controller");
const financiamento_imovel_service_1 = require("./financiamento-imovel.service");
const prisma_module_1 = require("../../prisma/prisma.module");
const taxas_financiamento_data_1 = require("./data/taxas-financiamento.data");
const simulator_metadata_module_1 = require("../metadata/simulator-metadata.module");
const simulator_registry_module_1 = require("../registry/simulator-registry.module");
const email_module_1 = require("../../email/email.module");
let FinanciamentoImovelModule = class FinanciamentoImovelModule {
};
exports.FinanciamentoImovelModule = FinanciamentoImovelModule;
exports.FinanciamentoImovelModule = FinanciamentoImovelModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule.register({
                timeout: 5000,
                maxRedirects: 5,
            }),
            prisma_module_1.PrismaModule,
            simulator_metadata_module_1.SimulatorMetadataModule,
            simulator_registry_module_1.SimulatorRegistryModule,
            email_module_1.EmailModule,
        ],
        controllers: [financiamento_imovel_controller_1.FinanciamentoImovelController],
        providers: [financiamento_imovel_service_1.FinanciamentoImovelService, taxas_financiamento_data_1.TaxasFinanciamentoData],
        exports: [financiamento_imovel_service_1.FinanciamentoImovelService],
    })
], FinanciamentoImovelModule);
//# sourceMappingURL=financiamento-imovel.module.js.map