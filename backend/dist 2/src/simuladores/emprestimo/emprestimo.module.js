"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoModule = void 0;
const common_1 = require("@nestjs/common");
const emprestimo_controller_1 = require("./emprestimo.controller");
const emprestimo_service_1 = require("./emprestimo.service");
const prisma_module_1 = require("../../prisma/prisma.module");
const simulator_metadata_module_1 = require("../metadata/simulator-metadata.module");
const simulator_registry_module_1 = require("../registry/simulator-registry.module");
const email_module_1 = require("../../email/email.module");
let EmprestimoModule = class EmprestimoModule {
};
exports.EmprestimoModule = EmprestimoModule;
exports.EmprestimoModule = EmprestimoModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, simulator_metadata_module_1.SimulatorMetadataModule, simulator_registry_module_1.SimulatorRegistryModule, email_module_1.EmailModule],
        controllers: [emprestimo_controller_1.EmprestimoController],
        providers: [emprestimo_service_1.EmprestimoService],
        exports: [emprestimo_service_1.EmprestimoService],
    })
], EmprestimoModule);
//# sourceMappingURL=emprestimo.module.js.map