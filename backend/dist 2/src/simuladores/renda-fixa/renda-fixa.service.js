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
var RendaFixaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RendaFixaService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const decimal_js_1 = require("decimal.js");
const renda_fixa_calc_1 = require("./calc/renda-fixa.calc");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
const renda_fixa_api_client_1 = require("./clients/renda-fixa-api.client");
const email_service_1 = require("../../email/email.service");
let RendaFixaService = RendaFixaService_1 = class RendaFixaService {
    httpService;
    prisma;
    rendaFixaApiClient;
    emailService;
    logger = new common_1.Logger(RendaFixaService_1.name);
    constructor(httpService, prisma, rendaFixaApiClient, emailService) {
        this.httpService = httpService;
        this.prisma = prisma;
        this.rendaFixaApiClient = rendaFixaApiClient;
        this.emailService = emailService;
    }
    async simular(dto) {
        try {
            this.logger.log('Starting fixed income simulation');
            const redactedDto = { ...dto, email: '***', nome: '***' };
            this.logger.debug(`Input: ${JSON.stringify(redactedDto)}`);
            const [selicAnual, cdiAnual, trMensal] = await Promise.all([
                this.obterSelicAtual(),
                this.obterCdiAtual(),
                this.obterTrMensal(),
            ]);
            this.logger.debug(`Economic rates: Selic=${selicAnual}%, CDI=${cdiAnual}%, TR=${trMensal}`);
            let apiResponse = null;
            try {
                apiResponse = await this.rendaFixaApiClient.consultarOfertas(dto.investimentoInicial, dto.prazoMeses);
                this.logger.debug(`External API response received: ${JSON.stringify(apiResponse)}`);
            }
            catch (error) {
                this.logger.warn('Failed to fetch from external API, will use local calculations as fallback', error.message);
            }
            const resultados = (0, renda_fixa_calc_1.calcularInvestimentosRendaFixa)(dto.investimentoInicial, dto.prazoMeses, selicAnual, cdiAnual, trMensal, apiResponse);
            const resultado = this.formatarResultado(resultados, dto.investimentoInicial, dto.prazoMeses, trMensal);
            this.logger.log('Fixed income simulation completed successfully');
            this.logger.debug(`Best investment: ${resultado.melhorInvestimento}`);
            if (apiResponse && this.rendaFixaApiClient.hasValidOffers(apiResponse)) {
                try {
                    const apiMelhorTitulo = apiResponse.resultados.melhor_titulo;
                    const apiMelhorTituloSistema = renda_fixa_api_client_1.API_TO_SYSTEM_MAP[apiMelhorTitulo];
                    if (apiMelhorTitulo !== 'POUP') {
                        const ofertas = apiResponse.resultados.listamelhortitulo;
                        if (apiMelhorTitulo === 'SELIC') {
                            resultado.ofertasDetalhadas =
                                this.transformarOfertasTesouro(ofertas);
                        }
                        else {
                            resultado.ofertasDetalhadas =
                                this.transformarOfertasInvestimento(ofertas);
                        }
                        resultado.tipoOfertasDetalhadas =
                            apiMelhorTituloSistema || apiMelhorTitulo;
                    }
                }
                catch (error) {
                    this.logger.warn('Failed to process detailed offers', error.message);
                }
            }
            await this.salvarSimulacao(dto, resultado);
            return resultado;
        }
        catch (error) {
            this.logger.error('Error in fixed income simulation', error.stack);
            throw error;
        }
    }
    transformarOfertasInvestimento(ofertas) {
        return ofertas.map((oferta) => ({
            corretora: oferta.corretora,
            emissor: oferta.emissor,
            taxa: oferta.taxa,
            vencimento: oferta.vencimento,
            qtdMinima: oferta.qtdMinima,
            vl: oferta.vl,
        }));
    }
    transformarOfertasTesouro(ofertas) {
        return ofertas.map((oferta) => ({
            nom: oferta.nom,
            tipo: oferta.tipo,
            tx: oferta.tx,
            data_vencto: oferta.data_vencto,
            vlr: oferta.vlr,
        }));
    }
    async obterSelicAtual() {
        try {
            const url = 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados/ultimos/1?formato=json';
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url, {
                timeout: 5000,
            }));
            const valorStr = response.data[0]?.valor?.replace(',', '.');
            if (!valorStr) {
                throw new Error('Selic value not found in API response');
            }
            const valor = parseFloat(valorStr);
            this.logger.debug(`Selic obtained from BCB: ${valor}%`);
            return valor;
        }
        catch (error) {
            this.logger.warn('Failed to fetch Selic from BCB, using fallback', error.message);
            return 13.75;
        }
    }
    async obterCdiAtual() {
        try {
            const url = 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.12/dados/ultimos/1?formato=json';
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url, {
                timeout: 5000,
            }));
            const valorStr = response.data[0]?.valor?.replace(',', '.');
            if (!valorStr) {
                throw new Error('CDI value not found in API response');
            }
            const cdiDiario = parseFloat(valorStr);
            const cdiAnual = (Math.pow(1 + cdiDiario / 100, 252) - 1) * 100;
            this.logger.debug(`CDI obtained from BCB: ${cdiAnual.toFixed(2)}% (from daily ${cdiDiario}%)`);
            return parseFloat(cdiAnual.toFixed(2));
        }
        catch (error) {
            this.logger.warn('Failed to fetch CDI from BCB, using fallback', error.message);
            return 13.65;
        }
    }
    async obterTrMensal() {
        try {
            const url = 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.226/dados/ultimos/1?formato=json';
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url, {
                timeout: 5000,
            }));
            const valorStr = response.data[0]?.valor?.replace(',', '.');
            if (!valorStr) {
                throw new Error('TR value not found in API response');
            }
            const trPercentual = parseFloat(valorStr);
            const trDecimal = trPercentual / 100;
            this.logger.debug(`TR obtained from BCB: ${trPercentual}% (${trDecimal})`);
            return trDecimal;
        }
        catch (error) {
            this.logger.warn('Failed to fetch TR from BCB, using fallback', error.message);
            return 0.0;
        }
    }
    formatarResultado(calculos, investimentoInicial, prazoMeses, trMensal) {
        const totalInvestido = investimentoInicial;
        return {
            poupanca: this.formatarModalidade(calculos.poupanca, totalInvestido, prazoMeses),
            tesouroDireto: this.formatarModalidade(calculos.tesouroDireto, totalInvestido, prazoMeses),
            lci: this.formatarModalidade(calculos.lci, totalInvestido, prazoMeses),
            cdb: this.formatarModalidade(calculos.cdb, totalInvestido, prazoMeses),
            melhorInvestimento: calculos.melhorInvestimento,
            melhorRendimento: this.arredondar(calculos.melhorRendimento),
            totalInvestido: this.arredondar(totalInvestido),
            taxaSelic: this.arredondar(calculos.taxaSelic),
            taxaCdi: this.arredondar(calculos.taxaCdi),
            taxaTr: this.arredondar(trMensal),
        };
    }
    formatarModalidade(modalidade, totalInvestido, prazoMeses) {
        const resultado = this.arredondar(modalidade.resultado);
        const rendimentoLiquido = resultado - totalInvestido;
        const percentualRendimento = totalInvestido > 0 ? (rendimentoLiquido / totalInvestido) * 100 : 0;
        const percentualRendimentoMensal = new decimal_js_1.default(resultado)
            .div(totalInvestido)
            .pow(new decimal_js_1.default(1).div(prazoMeses))
            .minus(1)
            .mul(100);
        const taxaMensalDecimal = modalidade.taxa;
        const percentualRendimentoAnual = new decimal_js_1.default(1)
            .plus(taxaMensalDecimal)
            .pow(12)
            .minus(1)
            .mul(100);
        return {
            taxa: this.arredondar(modalidade.taxa),
            resultado,
            imposto: this.arredondar(modalidade.imposto),
            rendimentoLiquido: this.arredondar(rendimentoLiquido),
            percentualRendimento: this.arredondar(percentualRendimento),
            percentualRendimentoMensal: this.arredondar(percentualRendimentoMensal),
            percentualRendimentoAnual: this.arredondar(percentualRendimentoAnual),
        };
    }
    arredondar(valor) {
        return new decimal_js_1.default(valor).toDecimalPlaces(2).toNumber();
    }
    async salvarSimulacao(input, output) {
        try {
            const simulationData = {
                simulatorType: client_1.SimulatorType.RENDA_FIXA,
                inputData: JSON.parse(JSON.stringify(input)),
                outputData: JSON.parse(JSON.stringify(output)),
                nome: input.nome,
                email: input.email,
                email_opt_in_simulation: input.email_opt_in_simulation,
                email_opt_in_at: input.email_opt_in_simulation ? new Date() : null,
            };
            await this.prisma.simulation.create({
                data: simulationData,
            });
            if (input.email_opt_in_simulation) {
                await this.emailService.sendSimulationResult({
                    simulationType: client_1.SimulatorType.RENDA_FIXA,
                    userEmail: input.email,
                    userName: input.nome,
                    input: simulationData.inputData,
                    output: simulationData.outputData,
                    summary: `Simulação de Renda Fixa: Melhor opção ${output.melhorInvestimento} com rendimento de R$ ${output.melhorRendimento}`,
                    createdAt: new Date(),
                });
            }
            this.logger.log('Fixed income simulation saved to database');
        }
        catch (error) {
            this.logger.warn('Failed to save fixed income simulation, continuing', error?.stack);
        }
    }
};
exports.RendaFixaService = RendaFixaService;
exports.RendaFixaService = RendaFixaService = RendaFixaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        prisma_service_1.PrismaService,
        renda_fixa_api_client_1.RendaFixaApiClient,
        email_service_1.EmailService])
], RendaFixaService);
//# sourceMappingURL=renda-fixa.service.js.map