export declare enum TipoVeiculo {
    NOVO = "novo",
    USADO = "usado"
}
export declare class SimularFinanciamentoVeiculosDto {
    valorVeiculo: number;
    valorEntrada: number;
    prazoMeses: number;
    rendaMensal: number;
    tipoVeiculo: TipoVeiculo;
    nome: string;
    email: string;
    email_opt_in_simulation: boolean;
}
