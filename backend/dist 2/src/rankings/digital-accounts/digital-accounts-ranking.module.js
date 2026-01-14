"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DigitalAccountsRankingModule = void 0;
const common_1 = require("@nestjs/common");
const digital_accounts_ranking_service_1 = require("./digital-accounts-ranking.service");
const digital_accounts_ranking_controller_1 = require("./digital-accounts-ranking.controller");
const legacy_prisma_module_1 = require("../../prisma/legacy-prisma.module");
let DigitalAccountsRankingModule = class DigitalAccountsRankingModule {
};
exports.DigitalAccountsRankingModule = DigitalAccountsRankingModule;
exports.DigitalAccountsRankingModule = DigitalAccountsRankingModule = __decorate([
    (0, common_1.Module)({
        imports: [legacy_prisma_module_1.LegacyPrismaModule],
        controllers: [digital_accounts_ranking_controller_1.DigitalAccountsRankingController],
        providers: [digital_accounts_ranking_service_1.DigitalAccountsRankingService],
        exports: [digital_accounts_ranking_service_1.DigitalAccountsRankingService],
    })
], DigitalAccountsRankingModule);
//# sourceMappingURL=digital-accounts-ranking.module.js.map