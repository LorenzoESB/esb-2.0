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
var SimulatorMetadataService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimulatorMetadataService = void 0;
const common_1 = require("@nestjs/common");
const strapi_service_1 = require("../../integrations/strapi/strapi.service");
let SimulatorMetadataService = SimulatorMetadataService_1 = class SimulatorMetadataService {
    strapiService;
    logger = new common_1.Logger(SimulatorMetadataService_1.name);
    constructor(strapiService) {
        this.strapiService = strapiService;
    }
    async getMetadataBySlug(slug) {
        try {
            const metadata = await this.strapiService.getSimulatorMetadata(slug);
            return metadata;
        }
        catch (error) {
            this.logger.error(`Error fetching metadata for simulator ${slug}`, error);
            return null;
        }
    }
    async getMetadataByType(type) {
        try {
            return await this.strapiService.getSimulatorsByType(type);
        }
        catch (error) {
            this.logger.error(`Error fetching metadata for type ${type}`, error);
            return [];
        }
    }
};
exports.SimulatorMetadataService = SimulatorMetadataService;
exports.SimulatorMetadataService = SimulatorMetadataService = SimulatorMetadataService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [strapi_service_1.StrapiService])
], SimulatorMetadataService);
//# sourceMappingURL=simulator-metadata.service.js.map