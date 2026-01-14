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
var SimulatorRegistry_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimulatorRegistry = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
let SimulatorRegistry = SimulatorRegistry_1 = class SimulatorRegistry {
    moduleRef;
    logger = new common_1.Logger(SimulatorRegistry_1.name);
    strategies = new Map();
    constructor(moduleRef) {
        this.moduleRef = moduleRef;
    }
    onModuleInit() {
        this.logger.log('Initializing SimulatorRegistry...');
    }
    register(strategy) {
        const type = strategy.getSimulatorType();
        if (this.strategies.has(type)) {
            this.logger.warn(`Overwriting strategy for simulator type: ${type}`);
        }
        this.strategies.set(type, strategy);
        this.logger.log(`Registered strategy for: ${type}`);
    }
    getStrategy(type) {
        return this.strategies.get(type);
    }
    getAvailableTypes() {
        return Array.from(this.strategies.keys());
    }
};
exports.SimulatorRegistry = SimulatorRegistry;
exports.SimulatorRegistry = SimulatorRegistry = SimulatorRegistry_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.ModuleRef])
], SimulatorRegistry);
//# sourceMappingURL=simulator.registry.js.map