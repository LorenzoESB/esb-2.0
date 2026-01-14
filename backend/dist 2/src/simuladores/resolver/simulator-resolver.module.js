"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimulatorResolverModule = void 0;
const common_1 = require("@nestjs/common");
const simulator_resolver_1 = require("./simulator.resolver");
const simulator_metadata_module_1 = require("../metadata/simulator-metadata.module");
const simulator_registry_module_1 = require("../registry/simulator-registry.module");
let SimulatorResolverModule = class SimulatorResolverModule {
};
exports.SimulatorResolverModule = SimulatorResolverModule;
exports.SimulatorResolverModule = SimulatorResolverModule = __decorate([
    (0, common_1.Module)({
        imports: [simulator_metadata_module_1.SimulatorMetadataModule, simulator_registry_module_1.SimulatorRegistryModule],
        providers: [simulator_resolver_1.SimulatorResolver],
        exports: [simulator_resolver_1.SimulatorResolver],
    })
], SimulatorResolverModule);
//# sourceMappingURL=simulator-resolver.module.js.map