export interface ParametrosEconomicos {
    selicAnual: number;
    cdiAnual: number;
    trMensal: number;
}
export interface ResultadoModalidade {
    taxa: number;
    resultado: number;
    imposto: number;
    rendimentoLiquido: number;
    percentualRendimento: number;
}
export interface ComparacaoInvestimentos {
    poupanca: ResultadoModalidade;
    tesouroDireto: ResultadoModalidade;
    lci: ResultadoModalidade;
    cdb: ResultadoModalidade;
    melhorInvestimento: string;
    melhorRendimento: number;
    totalInvestido: number;
    taxaSelic: number;
    taxaCdi: number;
}
