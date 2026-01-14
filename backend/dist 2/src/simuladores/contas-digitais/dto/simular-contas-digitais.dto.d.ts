import { TipoPessoa } from '../data/contas-digitais.data';
export declare class SimularContasDigitaisBaseDto {
    tipoPessoa: TipoPessoa;
    temConta: boolean;
    tarifa: number;
    saques: number;
    nDocs: number;
    nTeds: number;
    debito: boolean;
    nome: string;
    email: string;
    email_opt_in_simulation: boolean;
}
export declare class SimularContasDigitaisFisicaDto extends SimularContasDigitaisBaseDto {
    tipoPessoa: TipoPessoa.FISICA;
    nDepositos: number;
    credito: boolean;
    investimentos: boolean;
    transferencias: boolean;
    depCheque: boolean;
}
export declare class SimularContasDigitaisJuridicaDto extends SimularContasDigitaisBaseDto {
    tipoPessoa: TipoPessoa.JURIDICA;
    boletos: number;
    maquininha: boolean;
    folhaPagamento: boolean;
    cartaoVirtual: boolean;
}
export type SimularContasDigitaisDto = SimularContasDigitaisFisicaDto | SimularContasDigitaisJuridicaDto;
