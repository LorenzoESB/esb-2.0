"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimuladoresModule = void 0;
const common_1 = require("@nestjs/common");
const amortizacao_module_1 = require("./amortizacao/amortizacao.module");
const aposentadoria_module_1 = require("./aposentadoria/aposentadoria.module");
const combustivel_module_1 = require("./combustivel/combustivel.module");
const comparador_assinatura_carro_module_1 = require("./comparador-assinatura-carro/comparador-assinatura-carro.module");
const comparador_maquininha_module_1 = require("./comparador-maquininha/comparador-maquininha.module");
const contas_digitais_module_1 = require("./contas-digitais/contas-digitais.module");
const emprestimo_module_1 = require("./emprestimo/emprestimo.module");
const financiamento_imovel_module_1 = require("./financiamento-imovel/financiamento-imovel.module");
const financiamento_veiculos_module_1 = require("./financiamento-veiculos/financiamento-veiculos.module");
const investimentos_module_1 = require("./investimentos/investimentos.module");
const juros_compostos_module_1 = require("./juros-composts/juros-compostos.module");
const renda_fixa_module_1 = require("./renda-fixa/renda-fixa.module");
const taxa_maquininha_module_1 = require("./taxa-maquininha/taxa-maquininha.module");
const simulator_metadata_module_1 = require("./metadata/simulator-metadata.module");
const simulator_resolver_module_1 = require("./resolver/simulator-resolver.module");
let SimuladoresModule = class SimuladoresModule {
};
exports.SimuladoresModule = SimuladoresModule;
exports.SimuladoresModule = SimuladoresModule = __decorate([
    (0, common_1.Module)({
        imports: [
            simulator_metadata_module_1.SimulatorMetadataModule,
            simulator_resolver_module_1.SimulatorResolverModule,
            amortizacao_module_1.AmortizacaoModule,
            aposentadoria_module_1.AposentadoriaModule,
            combustivel_module_1.CombustivelModule,
            comparador_assinatura_carro_module_1.ComparadorAssinaturaCarroModule,
            comparador_maquininha_module_1.ComparadorMaquininhaModule,
            contas_digitais_module_1.ContasDigitaisModule,
            emprestimo_module_1.EmprestimoModule,
            financiamento_imovel_module_1.FinanciamentoImovelModule,
            financiamento_veiculos_module_1.FinanciamentoVeiculosModule,
            investimentos_module_1.InvestimentosModule,
            juros_compostos_module_1.JurosCompostosModule,
            renda_fixa_module_1.RendaFixaModule,
            taxa_maquininha_module_1.TaxaMaquininhaModule,
        ],
        controllers: [],
        providers: [],
        exports: [],
    })
], SimuladoresModule);
//# sourceMappingURL=simuladores.module.js.map