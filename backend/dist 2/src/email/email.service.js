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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var EmailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const email_provider_interface_1 = require("./interfaces/email-provider.interface");
const simulation_result_template_1 = require("./templates/simulation-result.template");
let EmailService = EmailService_1 = class EmailService {
    emailProvider;
    logger = new common_1.Logger(EmailService_1.name);
    constructor(emailProvider) {
        this.emailProvider = emailProvider;
    }
    async sendSimulationResult(payload) {
        const maskedEmail = payload.userEmail.replace(/(.{1,2})(.*)(@.*)/, '$1***$3');
        this.logger.log(`Preparing to send simulation result email to ${maskedEmail}`);
        try {
            const html = (0, simulation_result_template_1.generateSimulationEmail)(payload);
            const subject = `Seu resultado: ${payload.simulationType.replace(/_/g, ' ')}`;
            await this.emailProvider.sendEmail(payload.userEmail, subject, html);
            this.logger.log(`Simulation result email sent successfully to ${maskedEmail}`);
        }
        catch (error) {
            this.logger.error(`Failed to send simulation result email to ${maskedEmail}`, error.stack);
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = EmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(email_provider_interface_1.EMAIL_PROVIDER)),
    __metadata("design:paramtypes", [Object])
], EmailService);
//# sourceMappingURL=email.service.js.map