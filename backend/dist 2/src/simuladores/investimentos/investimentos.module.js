"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvestimentosModule = void 0;
const common_1 = require("@nestjs/common");
const investimentos_controller_1 = require("./investimentos.controller");
const investimentos_service_1 = require("./investimentos.service");
let InvestimentosModule = class InvestimentosModule {
};
exports.InvestimentosModule = InvestimentosModule;
exports.InvestimentosModule = InvestimentosModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [investimentos_controller_1.InvestimentosController],
        providers: [investimentos_service_1.InvestimentosService],
        exports: [investimentos_service_1.InvestimentosService],
    })
], InvestimentosModule);
//# sourceMappingURL=investimentos.module.js.map