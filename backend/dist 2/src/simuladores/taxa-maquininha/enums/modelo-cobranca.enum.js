"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoRecebimentoParcelado = exports.TipoPessoa = exports.TipoFaixa = exports.ModeloCobranca = void 0;
var ModeloCobranca;
(function (ModeloCobranca) {
    ModeloCobranca["ANTECIPACAO_JUROS_SIMPLES"] = "Antecipa\u00E7\u00E3o por Juros Simples";
    ModeloCobranca["ANTECIPACAO_JUROS_COMPOSTOS"] = "Antecipa\u00E7\u00E3o por Juros Compostos";
    ModeloCobranca["FAIXA"] = "Faixa";
    ModeloCobranca["TAXA_PADRAO"] = "Taxa Padr\u00E3o";
})(ModeloCobranca || (exports.ModeloCobranca = ModeloCobranca = {}));
var TipoFaixa;
(function (TipoFaixa) {
    TipoFaixa[TipoFaixa["PRECO"] = 1] = "PRECO";
    TipoFaixa[TipoFaixa["TAXA"] = 2] = "TAXA";
    TipoFaixa[TipoFaixa["TAXA_ADICIONAL"] = 3] = "TAXA_ADICIONAL";
})(TipoFaixa || (exports.TipoFaixa = TipoFaixa = {}));
var TipoPessoa;
(function (TipoPessoa) {
    TipoPessoa["PF"] = "PF";
    TipoPessoa["PJ"] = "PJ";
})(TipoPessoa || (exports.TipoPessoa = TipoPessoa = {}));
exports.TipoRecebimentoParcelado = {
    APOS_CADA_PARCELA: true,
    TUDO_DE_UMA_VEZ: false,
};
//# sourceMappingURL=modelo-cobranca.enum.js.map