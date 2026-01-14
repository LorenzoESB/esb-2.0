"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinanciamentoVeiculosModule = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const financiamento_veiculos_controller_1 = require("./financiamento-veiculos.controller");
const financiamento_veiculos_service_1 = require("./financiamento-veiculos.service");
const prisma_module_1 = require("../../prisma/prisma.module");
const taxas_veiculos_data_1 = require("./data/taxas-veiculos.data");
const simulator_metadata_module_1 = require("../metadata/simulator-metadata.module");
const simulator_registry_module_1 = require("../registry/simulator-registry.module");
const email_module_1 = require("../../email/email.module");
let FinanciamentoVeiculosModule = class FinanciamentoVeiculosModule {
};
exports.FinanciamentoVeiculosModule = FinanciamentoVeiculosModule;
exports.FinanciamentoVeiculosModule = FinanciamentoVeiculosModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            axios_1.HttpModule.register({
                timeout: 5000,
                maxRedirects: 5,
            }),
            simulator_metadata_module_1.SimulatorMetadataModule,
            simulator_registry_module_1.SimulatorRegistryModule,
            email_module_1.EmailModule,
        ],
        controllers: [financiamento_veiculos_controller_1.FinanciamentoVeiculosController],
        providers: [financiamento_veiculos_service_1.FinanciamentoVeiculosService, taxas_veiculos_data_1.TaxasVeiculosData],
        exports: [financiamento_veiculos_service_1.FinanciamentoVeiculosService],
    })
], FinanciamentoVeiculosModule);
//# sourceMappingURL=financiamento-veiculos.module.js.map