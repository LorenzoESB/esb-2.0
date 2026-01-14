"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardMachinesRankingModule = void 0;
const common_1 = require("@nestjs/common");
const card_machines_ranking_controller_1 = require("./card-machines-ranking.controller");
const card_machines_ranking_service_1 = require("./card-machines-ranking.service");
let CardMachinesRankingModule = class CardMachinesRankingModule {
};
exports.CardMachinesRankingModule = CardMachinesRankingModule;
exports.CardMachinesRankingModule = CardMachinesRankingModule = __decorate([
    (0, common_1.Module)({
        controllers: [card_machines_ranking_controller_1.CardMachinesRankingController],
        providers: [card_machines_ranking_service_1.CardMachinesRankingService],
        exports: [card_machines_ranking_service_1.CardMachinesRankingService],
    })
], CardMachinesRankingModule);
//# sourceMappingURL=card-machines-ranking.module.js.map