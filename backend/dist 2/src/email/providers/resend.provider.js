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
var ResendProvider_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResendProvider = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const resend_1 = require("resend");
let ResendProvider = ResendProvider_1 = class ResendProvider {
    configService;
    logger = new common_1.Logger(ResendProvider_1.name);
    resend;
    constructor(configService) {
        this.configService = configService;
        const apiKey = this.configService.get('RESEND_API_KEY');
        if (!apiKey) {
            this.logger.warn('RESEND_API_KEY is not defined. Email sending will fail.');
        }
        this.resend = new resend_1.Resend(apiKey || 're_missing_key');
    }
    async sendEmail(to, subject, html) {
        const maskedTo = to.replace(/(.{1,2})(.*)(@.*)/, '$1***$3');
        if (!this.configService.get('RESEND_API_KEY')) {
            this.logger.error('Cannot send email: RESEND_API_KEY is missing');
            return;
        }
        try {
            const from = this.configService.get('EMAIL_FROM') || 'Educando Seu Bolso <nao-responda@educandoseubolso.com>';
            const data = await this.resend.emails.send({
                from,
                to,
                subject,
                html,
            });
            if (data.error) {
                this.logger.error(`Failed to send email to ${maskedTo}: ${data.error.message}`);
                throw new Error(data.error.message);
            }
            this.logger.log(`Email sent successfully to ${maskedTo}, id: ${data.data?.id}`);
        }
        catch (error) {
            this.logger.error(`Error sending email to ${maskedTo}: ${error.message}`, error.stack);
            throw error;
        }
    }
};
exports.ResendProvider = ResendProvider;
exports.ResendProvider = ResendProvider = ResendProvider_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ResendProvider);
//# sourceMappingURL=resend.provider.js.map