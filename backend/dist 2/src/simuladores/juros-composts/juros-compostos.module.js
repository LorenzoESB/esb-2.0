"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JurosCompostosModule = void 0;
const common_1 = require("@nestjs/common");
const juros_compostos_controller_1 = require("./juros-compostos.controller");
const juros_compostos_service_1 = require("./juros-compostos.service");
const email_module_1 = require("../../email/email.module");
let JurosCompostosModule = class JurosCompostosModule {
};
exports.JurosCompostosModule = JurosCompostosModule;
exports.JurosCompostosModule = JurosCompostosModule = __decorate([
    (0, common_1.Module)({
        imports: [email_module_1.EmailModule],
        controllers: [juros_compostos_controller_1.JurosCompostosController],
        providers: [juros_compostos_service_1.JurosCompostosService],
        exports: [juros_compostos_service_1.JurosCompostosService],
    })
], JurosCompostosModule);
//# sourceMappingURL=juros-compostos.module.js.map