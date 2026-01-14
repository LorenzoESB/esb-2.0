export declare class OfertaEmprestimoDto {
    nomeBanco: string;
    modalidade: string;
    valorEmprestimo: number;
    prazoMeses: number;
    parcelaMensal: number;
    taxaMensal: number;
    taxaAnual: number;
    totalPago: number;
    totalJuros: number;
    taxaEfetivaAnual: number;
    logo?: string;
    comprometimentoRenda?: number;
}
export declare class ResultadoEmprestimoDto {
    ofertas: OfertaEmprestimoDto[];
    totalOfertas: number;
    melhorOferta: OfertaEmprestimoDto;
    tipoPessoa: string;
    tipoEmprego?: string;
    inputData: {
        valorDesejado: number;
        prazoMeses: number;
        renda?: number;
    };
}
