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
var RendaFixaApiClient_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RendaFixaApiClient = exports.API_TO_SYSTEM_MAP = exports.INVESTMENT_TYPE_MAP = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
exports.INVESTMENT_TYPE_MAP = {
    Poupança: 'POUP',
    'Tesouro Direto': 'SELIC',
    LCI: 'LCI',
    CDB: 'CDB',
};
exports.API_TO_SYSTEM_MAP = {
    POUP: 'Poupança',
    SELIC: 'Tesouro Direto',
    LCI: 'LCI',
    CDB: 'CDB',
};
let RendaFixaApiClient = RendaFixaApiClient_1 = class RendaFixaApiClient {
    httpService;
    logger = new common_1.Logger(RendaFixaApiClient_1.name);
    API_URL = 'https://api2.apprendafixa.com.br/vx/educando/get_investments';
    constructor(httpService) {
        this.httpService = httpService;
    }
    async consultarOfertas(investimento, prazoMeses) {
        try {
            const prazoDias = prazoMeses * 30 + Math.floor(prazoMeses / 12) * 6;
            const payload = {
                valor: investimento.toString(),
                dc: prazoDias.toString(),
                tipo: ['CDB', 'LCI', 'SELIC'],
                indexador: 'CDI',
                corretora: '',
            };
            this.logger.debug(`Fetching investment offers: valor=${investimento}, prazo=${prazoDias} dias`);
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(this.API_URL, payload, {
                headers: { 'Content-Type': 'application/json' },
                timeout: 5000,
            }));
            this.logger.log(`Successfully fetched ${response.data.resultados.listamelhortitulo?.length || 0} investment offers`);
            return response.data;
        }
        catch (error) {
            this.logger.error('Failed to fetch investment offers from external API', error.stack);
            throw error;
        }
    }
    hasValidOffers(response) {
        return (response?.resultados?.listamelhortitulo &&
            Array.isArray(response.resultados.listamelhortitulo) &&
            response.resultados.listamelhortitulo.length > 0);
    }
};
exports.RendaFixaApiClient = RendaFixaApiClient;
exports.RendaFixaApiClient = RendaFixaApiClient = RendaFixaApiClient_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], RendaFixaApiClient);
//# sourceMappingURL=renda-fixa-api.client.js.map