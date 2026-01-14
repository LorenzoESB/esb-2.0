import { TipoPessoa } from '../data/contas-digitais.data';
export declare class FeaturesContaDigitalDto {
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
}
export declare class ResultadoContasDigitaisDto {
    contaId: number;
    nome: string;
    nomeBanco: string;
    logoBanco?: string;
    mensalidadeConta: number;
    tipoPessoa: TipoPessoa;
    tarifaTotal: number;
    economia: number;
    features: FeaturesContaDigitalDto;
    observacao?: string;
    ativa: boolean;
    urlSite?: string;
}
