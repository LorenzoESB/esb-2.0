"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcularTarifaTotal = calcularTarifaTotal;
exports.verificarRequisitos = verificarRequisitos;
exports.calcularComparacaoContas = calcularComparacaoContas;
const contas_digitais_data_1 = require("../data/contas-digitais.data");
function calcularTarifaTotal(conta, dados) {
    let tarifaTotal = conta.valorMensalidade;
    if (dados.saques > 0) {
        if (!conta.realizaSaque) {
            return null;
        }
        const saquesEfetivos = Math.max(0, dados.saques - conta.nSaquesGratis);
        if (saquesEfetivos > 0) {
            tarifaTotal += saquesEfetivos * conta.valorSaque;
        }
    }
    let tarifaDocs = 0;
    if (dados.nDocs > 0) {
        if (!conta.enviaDoc) {
            return null;
        }
        const docsEfetivos = Math.max(0, dados.nDocs - conta.nDocsGratis);
        if (docsEfetivos > 0) {
            tarifaDocs = docsEfetivos * conta.valorDoc;
        }
    }
    let tarifaTeds = 0;
    if (dados.nTeds > 0) {
        if (!conta.enviaTed) {
            return null;
        }
        const tedsEfetivos = Math.max(0, dados.nTeds - conta.nTedsGratis);
        if (tedsEfetivos > 0) {
            tarifaTeds = tedsEfetivos * conta.valorTed;
        }
    }
    tarifaTotal += Math.max(tarifaDocs, tarifaTeds);
    if (dados.tipoPessoa === contas_digitais_data_1.TipoPessoa.FISICA) {
        const dadosPF = dados;
        if (dadosPF.nDepositos > 0) {
            if (!conta.aceitaDeposito) {
                return null;
            }
            const depositosEfetivos = Math.max(0, dadosPF.nDepositos - conta.nDepositosGratis);
            if (depositosEfetivos > 0) {
                tarifaTotal += depositosEfetivos * conta.valorDeposito;
            }
        }
    }
    if (dados.tipoPessoa === contas_digitais_data_1.TipoPessoa.JURIDICA) {
        const dadosPJ = dados;
        if (dadosPJ.boletos > 0) {
            if (!conta.emiteBoleto) {
                return null;
            }
            const boletosEfetivos = Math.max(0, dadosPJ.boletos - conta.limiteBoleto);
            if (boletosEfetivos > 0) {
                tarifaTotal += boletosEfetivos * conta.valorBoleto;
            }
        }
    }
    return tarifaTotal;
}
function verificarRequisitos(conta, dados) {
    if (dados.tipoPessoa === contas_digitais_data_1.TipoPessoa.FISICA) {
        const dadosPF = dados;
        if (dadosPF.credito && !conta.ofereceCartaoCredito) {
            return false;
        }
        if (dadosPF.debito && !conta.ofereceCartaoDebito) {
            return false;
        }
        if (dadosPF.investimentos && !conta.realizaInvestimento) {
            return false;
        }
        if (dadosPF.transferencias && !conta.recebeTed && !conta.recebeDoc) {
            return false;
        }
        if (dadosPF.depCheque && !conta.aceitaDepositoImg) {
            return false;
        }
    }
    if (dados.tipoPessoa === contas_digitais_data_1.TipoPessoa.JURIDICA) {
        const dadosPJ = dados;
        if (dadosPJ.debito && !conta.ofereceCartaoDebito) {
            return false;
        }
        if (dadosPJ.cartaoVirtual && !conta.ofereceCartaoVirtual) {
            return false;
        }
        if (dadosPJ.maquininha && !conta.maquinaCartaoInclusa) {
            return false;
        }
        if (dadosPJ.folhaPagamento && !conta.ofereceFolhaPagamentos) {
            return false;
        }
    }
    return true;
}
function calcularComparacaoContas(contas, dados) {
    const resultados = [];
    const contasFiltradas = contas.filter((conta) => conta.tipoPessoa === dados.tipoPessoa &&
        conta.ativa &&
        conta.comercialmenteAtiva);
    for (const conta of contasFiltradas) {
        if (!verificarRequisitos(conta, dados)) {
            continue;
        }
        const tarifaTotal = calcularTarifaTotal(conta, dados);
        if (tarifaTotal === null) {
            continue;
        }
        const economia = dados.temConta && dados.tarifa > 0 ? dados.tarifa - tarifaTotal : 0;
        const resultado = {
            contaId: conta.id,
            nome: conta.nome,
            nomeBanco: conta.nomeBanco,
            logoBanco: conta.logoBanco,
            mensalidadeConta: conta.valorMensalidade,
            tipoPessoa: conta.tipoPessoa,
            tarifaTotal,
            economia,
            features: {
                enviaDoc: conta.enviaDoc,
                recebeDoc: conta.recebeDoc,
                enviaTed: conta.enviaTed,
                recebeTed: conta.recebeTed,
                cartaoDebito: conta.ofereceCartaoDebito,
                cartaoCredito: conta.ofereceCartaoCredito,
                realizaSaque: conta.realizaSaque,
                aceitaDeposito: conta.aceitaDeposito,
                aceitaDepositoImagem: conta.aceitaDepositoImg,
                realizaInvestimento: conta.realizaInvestimento,
                emiteBoleto: conta.emiteBoleto,
                maquininhaInclusa: conta.maquinaCartaoInclusa,
                cartaoVirtual: conta.ofereceCartaoVirtual,
                folhaPagamento: conta.ofereceFolhaPagamentos,
            },
            observacao: conta.observacao,
            ativa: conta.ativa,
            urlSite: conta.urlSiteConta,
        };
        resultados.push(resultado);
    }
    resultados.sort((a, b) => a.tarifaTotal - b.tarifaTotal);
    return resultados;
}
//# sourceMappingURL=contas-digitais.calc.js.map