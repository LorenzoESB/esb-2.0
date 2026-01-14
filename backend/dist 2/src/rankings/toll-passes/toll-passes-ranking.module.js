"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TollPassesRankingModule = void 0;
const common_1 = require("@nestjs/common");
const toll_passes_ranking_service_1 = require("./toll-passes-ranking.service");
const toll_passes_ranking_controller_1 = require("./toll-passes-ranking.controller");
const legacy_prisma_module_1 = require("../../prisma/legacy-prisma.module");
let TollPassesRankingModule = class TollPassesRankingModule {
};
exports.TollPassesRankingModule = TollPassesRankingModule;
exports.TollPassesRankingModule = TollPassesRankingModule = __decorate([
    (0, common_1.Module)({
        imports: [legacy_prisma_module_1.LegacyPrismaModule],
        controllers: [toll_passes_ranking_controller_1.TollPassesRankingController],
        providers: [toll_passes_ranking_service_1.TollPassesRankingService],
        exports: [toll_passes_ranking_service_1.TollPassesRankingService],
    })
], TollPassesRankingModule);
//# sourceMappingURL=toll-passes-ranking.module.js.map