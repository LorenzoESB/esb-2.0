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
var TaxasFinanciamentoData_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxasFinanciamentoData = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let TaxasFinanciamentoData = TaxasFinanciamentoData_1 = class TaxasFinanciamentoData {
    httpService;
    logger = new common_1.Logger(TaxasFinanciamentoData_1.name);
    BCB_API_URL = 'https://olinda.bcb.gov.br/olinda/servico/taxaJuros/versao/v2/odata/TaxasJurosMensalPorMes';
    constructor(httpService) {
        this.httpService = httpService;
    }
    async obterTaxasImovel() {
        try {
            this.logger.log('Fetching real estate financing rates from BCB API');
            const filter = encodeURIComponent("Modalidade eq 'Financiamento imobiliário com taxas de mercado - Pós-fixado referenciado em TR'");
            let taxas = [];
            for (let monthsBack = 0; monthsBack <= 2; monthsBack++) {
                const mesReferencia = this.obterMesReferencia(monthsBack);
                const url = `${this.BCB_API_URL}?$filter=${filter} and anoMes eq '${mesReferencia}'&$format=json&$orderby=TaxaJurosAoAno asc`;
                this.logger.debug(`Trying BCB API for month ${mesReferencia}: ${url}`);
                const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url, {
                    timeout: 5000,
                }));
                if (!response.data || !response.data.value) {
                    this.logger.warn(`Invalid response from BCB API for month ${mesReferencia}`);
                    continue;
                }
                console.log(response.data.value);
                taxas = response.data.value;
                if (taxas.length > 0) {
                    this.logger.log(`Found ${taxas.length} rates from BCB API for month ${mesReferencia}`);
                    break;
                }
                else {
                    this.logger.warn(`No rates found for month ${mesReferencia}, trying previous month...`);
                }
            }
            if (taxas.length === 0) {
                this.logger.warn('No rates found in current or previous month');
                return this.obterTaxasFallback();
            }
            const taxasTransformadas = taxas.map((taxa) => ({
                instituicaoFinanceira: taxa.InstituicaoFinanceira,
                taxaJurosMensal: taxa.TaxaJurosAoMes,
                taxaJurosAnual: taxa.TaxaJurosAoAno,
                modalidade: taxa.Modalidade,
                cnpj: taxa.cnpj8,
            }));
            const taxasValidas = taxasTransformadas.filter((t) => t.taxaJurosAnual > 0 && t.taxaJurosMensal > 0);
            if (taxasValidas.length === 0) {
                this.logger.warn('No valid rates returned from BCB API, using fallback rates');
                return this.obterTaxasFallback();
            }
            this.logger.log(`Returning ${taxasValidas.length} valid real estate financing rates`);
            return taxasValidas;
        }
        catch (error) {
            this.logger.error('Error fetching real estate financing rates from BCB', error.stack);
            return this.obterTaxasFallback();
        }
    }
    obterMesReferencia(monthsBack = 0) {
        const dataAtual = new Date();
        dataAtual.setMonth(dataAtual.getMonth() - monthsBack);
        const ano = dataAtual.getFullYear();
        const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
        return `${ano}-${mes}`;
    }
    obterTaxasFallback() {
        this.logger.warn('Using fallback rates for real estate financing (BCB API unavailable)');
        return [
            {
                instituicaoFinanceira: 'Banco do Brasil',
                taxaJurosMensal: 0.84,
                taxaJurosAnual: 10.5,
                modalidade: 'Financiamento imobiliário com taxas de mercado - Pós-fixado referenciado em TR',
                cnpj: '00000000',
            },
            {
                instituicaoFinanceira: 'Caixa Econômica Federal',
                taxaJurosMensal: 0.87,
                taxaJurosAnual: 10.95,
                modalidade: 'Financiamento imobiliário com taxas de mercado - Pós-fixado referenciado em TR',
                cnpj: '00360305',
            },
            {
                instituicaoFinanceira: 'Itaú Unibanco',
                taxaJurosMensal: 0.91,
                taxaJurosAnual: 11.45,
                modalidade: 'Financiamento imobiliário com taxas de mercado - Pós-fixado referenciado em TR',
                cnpj: '60701190',
            },
            {
                instituicaoFinanceira: 'Bradesco',
                taxaJurosMensal: 0.93,
                taxaJurosAnual: 11.75,
                modalidade: 'Financiamento imobiliário com taxas de mercado - Pós-fixado referenciado em TR',
                cnpj: '60746948',
            },
            {
                instituicaoFinanceira: 'Santander',
                taxaJurosMensal: 0.96,
                taxaJurosAnual: 12.15,
                modalidade: 'Financiamento imobiliário com taxas de mercado - Pós-fixado referenciado em TR',
                cnpj: '90400888',
            },
            {
                instituicaoFinanceira: 'Banco Safra',
                taxaJurosMensal: 0.98,
                taxaJurosAnual: 12.45,
                modalidade: 'Financiamento imobiliário com taxas de mercado - Pós-fixado referenciado em TR',
                cnpj: '58160789',
            },
            {
                instituicaoFinanceira: 'Banco Inter',
                taxaJurosMensal: 0.89,
                taxaJurosAnual: 11.2,
                modalidade: 'Financiamento imobiliário com taxas de mercado - Pós-fixado referenciado em TR',
                cnpj: '00416968',
            },
        ];
    }
};
exports.TaxasFinanciamentoData = TaxasFinanciamentoData;
exports.TaxasFinanciamentoData = TaxasFinanciamentoData = TaxasFinanciamentoData_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], TaxasFinanciamentoData);
//# sourceMappingURL=taxas-financiamento.data.js.map