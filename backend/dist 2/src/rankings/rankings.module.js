"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankingsModule = void 0;
const common_1 = require("@nestjs/common");
const card_machines_ranking_module_1 = require("./card-machines/card-machines-ranking.module");
const insurance_ranking_module_1 = require("./insurance/insurance-ranking.module");
const digital_accounts_ranking_module_1 = require("./digital-accounts/digital-accounts-ranking.module");
const toll_passes_ranking_module_1 = require("./toll-passes/toll-passes-ranking.module");
const car_subscription_ranking_module_1 = require("./car-subscription/car-subscription-ranking.module");
let RankingsModule = class RankingsModule {
};
exports.RankingsModule = RankingsModule;
exports.RankingsModule = RankingsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            card_machines_ranking_module_1.CardMachinesRankingModule,
            insurance_ranking_module_1.InsuranceRankingModule,
            digital_accounts_ranking_module_1.DigitalAccountsRankingModule,
            toll_passes_ranking_module_1.TollPassesRankingModule,
            car_subscription_ranking_module_1.CarSubscriptionRankingModule,
        ],
        exports: [
            card_machines_ranking_module_1.CardMachinesRankingModule,
            insurance_ranking_module_1.InsuranceRankingModule,
            digital_accounts_ranking_module_1.DigitalAccountsRankingModule,
            toll_passes_ranking_module_1.TollPassesRankingModule,
            car_subscription_ranking_module_1.CarSubscriptionRankingModule,
        ],
    })
], RankingsModule);
//# sourceMappingURL=rankings.module.js.map