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
var CombustivelService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CombustivelService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
const email_service_1 = require("../../email/email.service");
let CombustivelService = CombustivelService_1 = class CombustivelService {
    prisma;
    emailService;
    logger = new common_1.Logger(CombustivelService_1.name);
    constructor(prisma, emailService) {
        this.prisma = prisma;
        this.emailService = emailService;
    }
    arredondar(valor, casas = 3) {
        return Number(valor.toFixed(casas));
    }
    calcularCustoPorKm(preco, consumo) {
        return this.arredondar(preco / consumo);
    }
    calcularEconomia(custoA, custoB) {
        const maior = Math.max(custoA, custoB);
        const menor = Math.min(custoA, custoB);
        const valor = this.arredondar(maior - menor);
        const percentual = maior === 0 ? 0 : this.arredondar(((maior - menor) / maior) * 100, 2);
        return { valor, percentual };
    }
    formatarMoeda(valor) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(valor);
    }
    gerarMensagem(input, recomendacao) {
        return `Levando em conta a gasolina a ${this.formatarMoeda(input.precoGasolina)}, o etanol a ${this.formatarMoeda(input.precoEtanol)} e o consumo do seu veículo. O combustível que mais vale a pena para abastecer o seu carro é: ${recomendacao}`;
    }
    calcularCombustivelVantajoso(input) {
        const custos = {
            gasolina: this.calcularCustoPorKm(input.precoGasolina, input.consumoGasolina),
            etanol: this.calcularCustoPorKm(input.precoEtanol, input.consumoEtanol),
        };
        const recomendacao = custos.etanol < custos.gasolina ? 'Etanol' : 'Gasolina';
        const economia = this.calcularEconomia(custos.gasolina, custos.etanol);
        return { recomendacao, custos, economia };
    }
    async comparaCombustivelEtanol(input) {
        const resultado = this.calcularCombustivelVantajoso(input);
        const output = {
            recomendacao: resultado.recomendacao,
            custos: {
                gasolina: {
                    custoPorKm: resultado.custos.gasolina,
                    custoFormatado: this.formatarMoeda(resultado.custos.gasolina),
                },
                etanol: {
                    custoPorKm: resultado.custos.etanol,
                    custoFormatado: this.formatarMoeda(resultado.custos.etanol),
                },
            },
            economia: {
                valor: resultado.economia.valor,
                valorFormatado: this.formatarMoeda(resultado.economia.valor),
                percentual: resultado.economia.percentual,
            },
            mensagem: this.gerarMensagem(input, resultado.recomendacao),
        };
        await this.salvaSimulacao(input, output);
        return output;
    }
    async salvaSimulacao(input, output) {
        try {
            const simulationData = {
                simulatorType: client_1.SimulatorType.COMBUSTIVEL,
                inputData: JSON.parse(JSON.stringify(input)),
                outputData: JSON.parse(JSON.stringify(output)),
                email: input.email,
                nome: input.nome,
                email_opt_in_simulation: input.email_opt_in_simulation,
                email_opt_in_at: input.email_opt_in_simulation ? new Date() : null,
            };
            await this.prisma.simulation.create({
                data: simulationData,
            });
            if (input.email_opt_in_simulation) {
                await this.emailService.sendSimulationResult({
                    simulationType: client_1.SimulatorType.COMBUSTIVEL,
                    userEmail: input.email,
                    userName: input.nome,
                    input: simulationData.inputData,
                    output: simulationData.outputData,
                    summary: output.mensagem || 'Simulação de Combustível',
                    createdAt: new Date(),
                });
            }
            this.logger.log(`Simulação salva para o email: ${input.email}`);
        }
        catch (error) {
            this.logger.warn('Falha ao salvar simulação de combustível, continuando', error?.stack);
        }
    }
};
exports.CombustivelService = CombustivelService;
exports.CombustivelService = CombustivelService = CombustivelService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        email_service_1.EmailService])
], CombustivelService);
//# sourceMappingURL=combustivel.service.js.map