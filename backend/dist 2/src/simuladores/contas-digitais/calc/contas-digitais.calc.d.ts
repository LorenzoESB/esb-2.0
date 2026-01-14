import { ContaDigital, TipoPessoa } from '../data/contas-digitais.data';
export interface DadosSimulacaoFisica {
    tipoPessoa: TipoPessoa.FISICA;
    temConta: boolean;
    tarifa: number;
    saques: number;
    nDocs: number;
    nTeds: number;
    nDepositos: number;
    credito: boolean;
    debito: boolean;
    investimentos: boolean;
    transferencias: boolean;
    depCheque: boolean;
}
export interface DadosSimulacaoJuridica {
    tipoPessoa: TipoPessoa.JURIDICA;
    temConta: boolean;
    tarifa: number;
    saques: number;
    nDocs: number;
    nTeds: number;
    boletos: number;
    maquininha: boolean;
    folhaPagamento: boolean;
    debito: boolean;
    cartaoVirtual: boolean;
}
export type DadosSimulacao = DadosSimulacaoFisica | DadosSimulacaoJuridica;
export interface ResultadoComparacao {
    contaId: number;
    nome: string;
    nomeBanco: string;
    logoBanco?: string;
    mensalidadeConta: number;
    tipoPessoa: TipoPessoa;
    tarifaTotal: number;
    economia: number;
    features: {
        enviaDoc: boolean;
        recebeDoc: boolean;
        enviaTed: boolean;
        recebeTed: boolean;
        cartaoDebito: boolean;
        cartaoCredito: boolean;
        realizaSaque: boolean;
        aceitaDeposito: boolean;
        aceitaDepositoImagem: boolean;
        realizaInvestimento: boolean;
        emiteBoleto: boolean;
        maquininhaInclusa: boolean;
        cartaoVirtual: boolean;
        folhaPagamento: boolean;
    };
    observacao?: string;
    ativa: boolean;
    urlSite?: string;
}
export declare function calcularTarifaTotal(conta: ContaDigital, dados: DadosSimulacao): number | null;
export declare function verificarRequisitos(conta: ContaDigital, dados: DadosSimulacao): boolean;
export declare function calcularComparacaoContas(contas: ContaDigital[], dados: DadosSimulacao): ResultadoComparacao[];
