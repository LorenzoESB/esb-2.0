export declare enum TipoPessoa {
    PF = "PF",
    PJ = "PJ"
}
export declare enum TipoEmprego {
    APOSENTADO = "aposentado",
    CLT = "clt",
    SERVIDOR_PUBLICO = "servidor_publico"
}
export declare class SimularEmprestimoDto {
    tipoPessoa: TipoPessoa;
    tipoEmprego?: TipoEmprego;
    valorDesejado: number;
    prazoMeses: number;
    renda?: number;
    nome: string;
    email: string;
    email_opt_in_simulation: boolean;
    compartilharDados?: boolean;
    origem?: string;
}
