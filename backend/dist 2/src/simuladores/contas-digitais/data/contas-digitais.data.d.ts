export declare enum TipoPessoa {
    FISICA = "fisica",
    JURIDICA = "juridica"
}
export declare enum TipoDeposito {
    DINHEIRO = "dinheiro",
    CHEQUE = "cheque",
    AMBOS = "ambos"
}
export interface ContaDigital {
    id: number;
    nome: string;
    tipoPessoa: TipoPessoa;
    nomeBanco: string;
    logoBanco?: string;
    valorMensalidade: number;
    nSaquesGratis: number;
    realizaSaque: boolean;
    valorSaque: number;
    nDocsGratis: number;
    enviaDoc: boolean;
    recebeDoc: boolean;
    valorDoc: number;
    nTedsGratis: number;
    enviaTed: boolean;
    recebeTed: boolean;
    valorTed: number;
    nDepositosGratis: number;
    aceitaDeposito: boolean;
    valorDeposito: number;
    tipoDeposito: TipoDeposito;
    limiteBoleto: number;
    emiteBoleto: boolean;
    valorBoleto: number;
    ofereceCartaoCredito: boolean;
    ofereceCartaoDebito: boolean;
    aceitaDepositoImg: boolean;
    realizaInvestimento: boolean;
    ofereceCartaoVirtual: boolean;
    maquinaCartaoInclusa: boolean;
    ofereceFolhaPagamentos: boolean;
    urlSiteConta?: string;
    ativa: boolean;
    comercialmenteAtiva: boolean;
    observacao?: string;
}
export declare class ContasDigitaisData {
    private readonly contas;
    obterTodasContas(): ContaDigital[];
    obterContasPorTipo(tipoPessoa: TipoPessoa): ContaDigital[];
    obterContaPorId(id: number): ContaDigital | undefined;
}
