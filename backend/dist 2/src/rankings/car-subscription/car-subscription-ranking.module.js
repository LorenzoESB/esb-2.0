"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarSubscriptionRankingModule = void 0;
const common_1 = require("@nestjs/common");
const car_subscription_ranking_service_1 = require("./car-subscription-ranking.service");
const car_subscription_ranking_controller_1 = require("./car-subscription-ranking.controller");
const legacy_prisma_module_1 = require("../../prisma/legacy-prisma.module");
let CarSubscriptionRankingModule = class CarSubscriptionRankingModule {
};
exports.CarSubscriptionRankingModule = CarSubscriptionRankingModule;
exports.CarSubscriptionRankingModule = CarSubscriptionRankingModule = __decorate([
    (0, common_1.Module)({
        imports: [legacy_prisma_module_1.LegacyPrismaModule],
        controllers: [car_subscription_ranking_controller_1.CarSubscriptionRankingController],
        providers: [car_subscription_ranking_service_1.CarSubscriptionRankingService],
        exports: [car_subscription_ranking_service_1.CarSubscriptionRankingService],
    })
], CarSubscriptionRankingModule);
//# sourceMappingURL=car-subscription-ranking.module.js.map