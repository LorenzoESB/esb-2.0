export declare enum TempoAplicacaoUnidade {
    MESES = "meses",
    ANOS = "anos"
}
export declare class JurosCompostosInputDto {
    nome: string;
    email: string;
    email_opt_in_simulation: boolean;
    valorInicial: number;
    aporteMensal: number;
    tempoAplicacao: number;
    tempoAplicacaoUnidade: TempoAplicacaoUnidade;
    taxaJuros: number;
}
