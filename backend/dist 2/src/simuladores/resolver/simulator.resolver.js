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
var SimulatorResolver_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimulatorResolver = void 0;
const common_1 = require("@nestjs/common");
const simulator_metadata_service_1 = require("../metadata/simulator-metadata.service");
const simulator_registry_1 = require("../registry/simulator.registry");
let SimulatorResolver = SimulatorResolver_1 = class SimulatorResolver {
    metadataService;
    registry;
    logger = new common_1.Logger(SimulatorResolver_1.name);
    constructor(metadataService, registry) {
        this.metadataService = metadataService;
        this.registry = registry;
    }
    async resolveAndExecute(slug, input) {
        this.logger.log(`Resolving simulator execution for slug: ${slug}`);
        const metadata = await this.metadataService.getMetadataBySlug(slug);
        if (!metadata) {
            this.logger.error(`Metadata not found for slug: ${slug}`);
            throw new common_1.NotFoundException(`Simulator not found: ${slug}`);
        }
        const type = metadata.type;
        this.logger.debug(`Simulator type identified: ${type}`);
        const strategy = this.registry.getStrategy(type);
        if (!strategy) {
            this.logger.error(`No strategy registered for type: ${type}`);
            throw new common_1.NotFoundException(`Simulator strategy not implemented for type: ${type}`);
        }
        this.logger.log(`Executing strategy ${type} for ${slug}`);
        return strategy.execute(input, metadata.parameters);
    }
};
exports.SimulatorResolver = SimulatorResolver;
exports.SimulatorResolver = SimulatorResolver = SimulatorResolver_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [simulator_metadata_service_1.SimulatorMetadataService,
        simulator_registry_1.SimulatorRegistry])
], SimulatorResolver);
//# sourceMappingURL=simulator.resolver.js.map