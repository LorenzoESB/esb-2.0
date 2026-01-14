export interface TaxaEmprestimo {
    instituicao: string;
    modalidade: string;
    taxaMensal: number;
    taxaAnual: number;
    pessoaFisica: boolean;
    ativo: boolean;
    logo?: string;
}
export declare const TAXAS_PF: TaxaEmprestimo[];
export declare const TAXAS_PJ: TaxaEmprestimo[];
export declare const MODALIDADES_EXCLUIDAS_POR_TIPO: Record<string, string[]>;
