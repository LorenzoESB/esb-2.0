"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcularAntecipacao = calcularAntecipacao;
exports.calcularAntecipacaoComposto = calcularAntecipacaoComposto;
exports.inFilter = inFilter;
exports.calcularMaq = calcularMaq;
exports.arredondar2Decimais = arredondar2Decimais;
const decimal_js_1 = require("decimal.js");
const modelo_cobranca_enum_1 = require("../enums/modelo-cobranca.enum");
decimal_js_1.default.set({ precision: 19, rounding: decimal_js_1.default.ROUND_HALF_UP });
function calcularAntecipacao(val_credito_p, num_parcelas, plano) {
    try {
        const taxa_desc_credito = new decimal_js_1.default(plano.taxa_desconto_credito_vista).div(100);
        const taxa_adicional_parc = new decimal_js_1.default(plano.taxa_adicional_parcela).div(100);
        const taxa_atual = taxa_desc_credito.plus(taxa_adicional_parc.times(num_parcelas - 1));
        const total_taxa_ant = new decimal_js_1.default(val_credito_p).times(new decimal_js_1.default(1).minus(taxa_atual));
        const val_credito_parcelado = new decimal_js_1.default(val_credito_p).minus(total_taxa_ant);
        return val_credito_parcelado.times(100).toNumber();
    }
    catch (error) {
        throw new Error(`Erro ao calcular antecipação simples: ${error.message}`);
    }
}
function calcularAntecipacaoComposto(val_credito_p, num_parcelas, plano) {
    try {
        const taxa_desc_credito = new decimal_js_1.default(plano.taxa_desconto_credito_vista).div(100);
        const taxa_adic_parcela = new decimal_js_1.default(plano.taxa_adicional_parcela).div(100);
        const valor_parcela = new decimal_js_1.default(val_credito_p).div(num_parcelas);
        const parcela_liq_taxa_desc = valor_parcela.times(new decimal_js_1.default(1).minus(taxa_desc_credito));
        const total_liq_desc = parcela_liq_taxa_desc.times(num_parcelas);
        const resto_liq_desc = new decimal_js_1.default(val_credito_p).minus(total_liq_desc);
        let total_acumulado_tx_ant = parcela_liq_taxa_desc.times(1);
        const aux = new decimal_js_1.default(1).plus(taxa_adic_parcela);
        for (let i = 1; i < num_parcelas; i++) {
            const potencia = aux.pow(i);
            const tx_ant = potencia.minus(1);
            const taxa_pronta = new decimal_js_1.default(1).minus(tx_ant);
            const resultado_tx_ant = parcela_liq_taxa_desc.times(taxa_pronta);
            total_acumulado_tx_ant = total_acumulado_tx_ant.plus(resultado_tx_ant);
        }
        const total_tx_ant = total_liq_desc.minus(total_acumulado_tx_ant);
        const valor_credito_parc = total_tx_ant.plus(resto_liq_desc);
        return valor_credito_parc.times(100).toNumber();
    }
    catch (error) {
        throw new Error(`Erro ao calcular antecipação composta: ${error.message}`);
    }
}
function inFilter(maq, filtros) {
    try {
        if (filtros === null) {
            return true;
        }
        const { mensalidade, tarja, fio, PF, PJ, imprime_recibo, wifi, quero_antecipar, precisa_de_telefone, vale_refeicao, opcao_ecommerce, } = filtros;
        if (mensalidade && (maq.valor_mensalidade > 0 || ehPlanoControle(maq))) {
            if (maq.sem_mensalidade !== true) {
                return false;
            }
        }
        if (opcao_ecommerce && !maq.opcao_ecommerce) {
            return false;
        }
        if (tarja && !maq.tarja) {
            return false;
        }
        if (fio && maq.fio) {
            return false;
        }
        if (PJ && !maq.PJ) {
            return false;
        }
        let maq_wifi = false;
        for (const tipo of maq.tipo_conexao) {
            if (tipo.nome === 'Wi-Fi') {
                maq_wifi = true;
                break;
            }
        }
        if (wifi && !maq_wifi) {
            return false;
        }
        if (PF && !maq.PF) {
            return false;
        }
        if (imprime_recibo && !maq.imprime_recibo) {
            return false;
        }
        if (precisa_de_telefone && maq.precisa_de_telefone) {
            return false;
        }
        if (vale_refeicao && !maq.vale_refeicao) {
            return false;
        }
        return true;
    }
    catch (error) {
        throw new Error(`Erro ao aplicar filtros: ${error.message}`);
    }
}
function ehPlanoControle(maq) {
    return maq.planos.some((plano) => plano.grupo === 5);
}
function calcularMaq(val_credito, val_debito, val_credito_p, num_parcelas, setor, filtros, maquinas) {
    try {
        const retorno = [];
        for (const maq of maquinas) {
            if (!inFilter(maq, filtros)) {
                continue;
            }
            let todos_planos;
            if (filtros?.quero_antecipar) {
                todos_planos = maq.planos.filter((p) => p.antecipado === true);
            }
            else {
                todos_planos = maq.planos;
            }
            for (const plano of todos_planos) {
                if (!plano.ativo) {
                    continue;
                }
                if (maq.possibilidade_parcelamento < num_parcelas) {
                    continue;
                }
                let no_setor = true;
                if (plano.segmentos && plano.segmentos.length > 0) {
                    if (setor !== null) {
                        const segmentoEncontrado = plano.segmentos.find((seg) => seg.id === setor && seg.ativo);
                        if (!segmentoEncontrado) {
                            no_setor = false;
                        }
                    }
                    else {
                        no_setor = false;
                    }
                }
                if (!no_setor) {
                    continue;
                }
                let plano_viavel = true;
                let total_mensal_geral = 0;
                const modelo_cobranca = plano.modelo_cobranca === modelo_cobranca_enum_1.ModeloCobranca.FAIXA;
                if (val_debito === 0 &&
                    !modelo_cobranca &&
                    plano.taxa_desconto_debito === 0) {
                    continue;
                }
                const valores_juros = plano.taxas || [];
                let valor_debito = 0;
                let valor_credito = 0;
                let valor_credito_parc = 0;
                if (!modelo_cobranca) {
                    valor_credito = new decimal_js_1.default(val_credito)
                        .times(plano.taxa_desconto_credito_vista)
                        .toNumber();
                    valor_debito = new decimal_js_1.default(val_debito)
                        .times(plano.taxa_desconto_debito)
                        .toNumber();
                }
                if (plano.modelo_cobranca === modelo_cobranca_enum_1.ModeloCobranca.ANTECIPACAO_JUROS_SIMPLES) {
                    valor_credito_parc = calcularAntecipacao(val_credito_p, num_parcelas, plano);
                }
                else if (plano.modelo_cobranca === modelo_cobranca_enum_1.ModeloCobranca.ANTECIPACAO_JUROS_COMPOSTOS) {
                    valor_credito_parc = calcularAntecipacaoComposto(val_credito_p, num_parcelas, plano);
                }
                else if (modelo_cobranca) {
                    const resultado = calcularPorFaixa(plano, val_credito, val_debito, val_credito_p, num_parcelas);
                    if (resultado.plano_viavel) {
                        valor_debito = resultado.valor_debito;
                        valor_credito = resultado.valor_credito;
                        valor_credito_parc = resultado.valor_credito_parc;
                        total_mensal_geral = resultado.total_mensal_geral;
                    }
                    else {
                        plano_viavel = false;
                    }
                }
                else {
                    if (valores_juros.length <= 1) {
                        let taxa_base = plano.taxa_desconto_credito_vista;
                        if (valores_juros.length === 1) {
                            taxa_base = valores_juros[0].taxa;
                        }
                        const taxa_parcela = taxa_base + (num_parcelas - 1) * plano.taxa_adicional_parcela;
                        valor_credito_parc = val_credito_p * taxa_parcela;
                    }
                    else {
                        const taxaParcela = valores_juros.find((t) => t.parcela === num_parcelas);
                        if (taxaParcela) {
                            valor_credito_parc = val_credito_p * taxaParcela.taxa;
                        }
                        else {
                            continue;
                        }
                    }
                }
                if (!plano_viavel) {
                    continue;
                }
                const subtotal = valor_debito + valor_credito + valor_credito_parc;
                const total_mensal_juros = new decimal_js_1.default(subtotal).div(100).toNumber();
                const venda_mensal_cliente = val_credito + val_debito + val_credito_p;
                let total_mensal_compra_maq = 0;
                let valor_leitor = maq.valor_leitor;
                let valor_selo = '';
                if (maq.valor_promocional && maq.valor_promocional > 0) {
                    valor_leitor = maq.valor_promocional;
                    valor_selo = Math.round((maq.valor_promocional / maq.valor_leitor - 1) * -100);
                }
                if (valor_leitor > 0) {
                    if (maq.garantia && maq.garantia !== 0 && maq.garantia < 100) {
                        total_mensal_compra_maq = valor_leitor / (maq.garantia * 12);
                    }
                    else {
                        total_mensal_compra_maq = valor_leitor / 12;
                    }
                }
                let total_mensal_aluguel_maq = 0;
                if (maq.taxa_condicional) {
                    if (maq.minimo_sem_taxa &&
                        venda_mensal_cliente < maq.minimo_sem_taxa) {
                        total_mensal_aluguel_maq =
                            (maq.minimo_sem_taxa - venda_mensal_cliente) *
                                ((maq.taxa || 0) / 100);
                    }
                }
                else {
                    if (maq.valor_mensalidade > 0 && maq.minimo_sem_mensalidade) {
                        if (maq.mensalidade_condicional &&
                            venda_mensal_cliente >= maq.minimo_sem_mensalidade) {
                            total_mensal_aluguel_maq = 0;
                        }
                        else {
                            total_mensal_aluguel_maq = maq.valor_mensalidade;
                        }
                    }
                }
                if (total_mensal_geral === 0) {
                    total_mensal_geral =
                        total_mensal_juros +
                            total_mensal_compra_maq +
                            total_mensal_aluguel_maq;
                }
                if (total_mensal_geral > 1 && plano_viavel) {
                    let val_mensalidade = maq.valor_mensalidade;
                    if (plano.grupo === 5) {
                        if (maq.sem_mensalidade !== true &&
                            plano.faixa_faturamento &&
                            plano.faixa_faturamento.length > 0) {
                            val_mensalidade = plano.faixa_faturamento[0].valor;
                        }
                    }
                    const resultado = {
                        nome: `${maq.nome} ${plano.nome}`,
                        id_maq: maq.id,
                        empresa: maq.empresa.nome,
                        empresa_cnpj: maq.empresa.cnpj,
                        logo: maq.empresa.logo,
                        imagem_maquina: maq.imagem,
                        valor_mensal: total_mensal_geral,
                        valor_selo: valor_selo,
                        cupom: maq.cupom,
                        dias_debito: plano.dias_repasse_debito,
                        tipo_dias_credito: plano.tipo_dias_credito.tipo,
                        dias_credito: plano.dias_repasse_credito,
                        co_cartao: plano.id,
                        observacao: maq.observacao,
                        dias_credito_parcelado: plano.dias_repasse_credito_parc,
                        tipo_recebimento_parcelado: plano.tipo_recebimento_parcelado,
                        valor_mensalidade: val_mensalidade,
                        valor_transacao: maq.valor_transacao,
                        afiliacao_a_banco: maq.afiliacao_a_banco,
                        chip: maq.chip,
                        tarja: maq.tarja,
                        tipo_conexoes: maq.tipo_conexao,
                        opcao_ecommerce: maq.opcao_ecommerce,
                        forma_recebimento: maq.forma_recebimento,
                        taxas_transparentes: maq.taxas_transparentes,
                        vale_refeicao: maq.vale_refeicao,
                        NFC: maq.NFC,
                        PF: maq.PF,
                        PJ: maq.PJ,
                        precisa_de_telefone: maq.precisa_de_telefone,
                        fio: maq.fio,
                        imprime_recibo: maq.imprime_recibo,
                        garantia: maq.garantia,
                        possivel_antecipacao: maq.possivel_antecipacao,
                        antecipado: plano.antecipado,
                        bandeiras: maq.bandeiras,
                        avaliacao: plano.avaliacao,
                        data_atualizacao: maq.atualizado_em.toLocaleDateString('pt-BR'),
                        url_avaliacao: maq.url_avaliacao,
                        cruzamentos: [],
                        tem_parceria: maq.empresa.parceiro,
                        site: plano.url,
                        possibilidade_parcelamento: maq.possibilidade_parcelamento,
                    };
                    retorno.push(resultado);
                }
            }
        }
        if (retorno.length === 0) {
            throw new Error('Nenhuma maquininha encontrada com os critérios informados');
        }
        retorno.sort((a, b) => b.avaliacao - a.avaliacao);
        return retorno;
    }
    catch (error) {
        throw new Error(`Erro ao calcular maquininhas: ${error.message}`);
    }
}
function calcularPorFaixa(plano, val_credito, val_debito, val_credito_p, num_parcelas) {
    const faixas = plano.faixa_faturamento || [];
    const soma = new decimal_js_1.default(val_credito)
        .plus(val_debito)
        .plus(val_credito_p)
        .toNumber();
    let valor_debito = 0;
    let valor_credito = 0;
    let valor_credito_parc = 0;
    let total_mensal_geral = 0;
    let plano_viavel = true;
    let i = 0;
    let faixa_encontrada = false;
    if (plano.tipo_faixa === modelo_cobranca_enum_1.TipoFaixa.PRECO) {
        for (const faixa of faixas) {
            if (faixa.minimo <= soma && soma <= faixa.maximo) {
                total_mensal_geral = faixa.valor;
                faixa_encontrada = true;
                break;
            }
            i++;
        }
        if (!faixa_encontrada && i === faixas.length) {
            const ultima_faixa = faixas[faixas.length - 1];
            if (ultima_faixa && ultima_faixa.minimo <= soma) {
                const excedente = soma - ultima_faixa.maximo;
                total_mensal_geral =
                    ultima_faixa.valor +
                        new decimal_js_1.default(plano.taxa_valor_excedente)
                            .div(100)
                            .times(excedente)
                            .toNumber();
            }
            else {
                plano_viavel = false;
            }
        }
        else if (!faixa_encontrada) {
            plano_viavel = false;
        }
    }
    else if (plano.tipo_faixa === modelo_cobranca_enum_1.TipoFaixa.TAXA) {
        for (const faixa of faixas) {
            if (faixa.minimo <= soma && soma <= faixa.maximo) {
                let taxa_credito_parc = faixa.taxa_credito_p;
                if (num_parcelas > 6) {
                    taxa_credito_parc = faixa.taxa_credito_p2;
                }
                valor_credito = new decimal_js_1.default(val_credito)
                    .times(faixa.taxa_credito)
                    .toNumber();
                valor_debito = new decimal_js_1.default(val_debito).times(faixa.valor).toNumber();
                valor_credito_parc = new decimal_js_1.default(val_credito_p)
                    .times(taxa_credito_parc)
                    .toNumber();
                faixa_encontrada = true;
                break;
            }
            i++;
        }
        if (!faixa_encontrada && i === faixas.length) {
            const ultima_faixa = faixas[faixas.length - 1];
            if (ultima_faixa && ultima_faixa.minimo <= soma) {
                let taxa_credito_parc = ultima_faixa.taxa_credito_p;
                if (num_parcelas > 6) {
                    taxa_credito_parc = ultima_faixa.taxa_credito_p2;
                }
                valor_credito = new decimal_js_1.default(val_credito)
                    .times(ultima_faixa.taxa_credito)
                    .toNumber();
                valor_debito = new decimal_js_1.default(val_debito)
                    .times(ultima_faixa.valor)
                    .toNumber();
                valor_credito_parc = new decimal_js_1.default(val_credito_p)
                    .times(taxa_credito_parc)
                    .toNumber();
            }
            else {
                plano_viavel = false;
            }
        }
        else if (!faixa_encontrada) {
            plano_viavel = false;
        }
    }
    else {
        for (const faixa of faixas) {
            if (faixa.minimo <= soma && soma <= faixa.maximo) {
                const taxa_credito_parc_base = faixa.taxa_credito_p;
                valor_credito = new decimal_js_1.default(val_credito)
                    .times(faixa.taxa_credito)
                    .toNumber();
                valor_debito = new decimal_js_1.default(val_debito).times(faixa.valor).toNumber();
                let parcela_atual = 1;
                let taxa_atual = taxa_credito_parc_base;
                while (parcela_atual < num_parcelas) {
                    taxa_atual += plano.taxa_adicional_parcela;
                    parcela_atual++;
                }
                valor_credito_parc = taxa_atual * val_credito_p;
                faixa_encontrada = true;
                break;
            }
            i++;
        }
        if (!faixa_encontrada && i === faixas.length) {
            const ultima_faixa = faixas[faixas.length - 1];
            if (ultima_faixa && ultima_faixa.minimo <= soma) {
                const taxa_credito_parc_base = ultima_faixa.taxa_credito_p;
                valor_credito = new decimal_js_1.default(val_credito)
                    .times(ultima_faixa.taxa_credito)
                    .toNumber();
                valor_debito = new decimal_js_1.default(val_debito)
                    .times(ultima_faixa.valor)
                    .toNumber();
                let parcela_atual = 1;
                let taxa_atual = taxa_credito_parc_base;
                while (parcela_atual < num_parcelas) {
                    taxa_atual += plano.taxa_adicional_parcela;
                    parcela_atual++;
                }
                valor_credito_parc = taxa_atual * val_credito_p;
            }
            else {
                plano_viavel = false;
            }
        }
        else if (!faixa_encontrada) {
            plano_viavel = false;
        }
    }
    return {
        plano_viavel,
        valor_debito,
        valor_credito,
        valor_credito_parc,
        total_mensal_geral,
    };
}
function arredondar2Decimais(valor) {
    return Math.round(valor * 100) / 100;
}
//# sourceMappingURL=taxa-maquininha.calc.js.map