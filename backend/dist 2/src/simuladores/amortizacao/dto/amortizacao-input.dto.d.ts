export declare class AmortizacaoExtraordinariaDto {
    valor: number;
    mesOcorrencia: number;
}
export declare class AmortizacaoInputDto {
    nome: string;
    email: string;
    email_opt_in_simulation: boolean;
    valorFinanciamento: number;
    taxaJurosAnual: number;
    prazoMeses: number;
    seguroMensal?: number;
    taxaAdministracao?: number;
    parcelaAtual?: number;
    saldoDevedorAtual?: number;
    amortizacoesExtraordinarias?: AmortizacaoExtraordinariaDto[];
}
