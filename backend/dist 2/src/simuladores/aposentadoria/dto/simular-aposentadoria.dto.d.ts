export declare enum ModoCalculoAposentadoria {
    RECEBER = "RECEBER",
    CONTRIBUIR = "CONTRIBUIR"
}
export declare class SimularAposentadoriaDto {
    nome: string;
    email: string;
    email_opt_in_simulation: boolean;
    modoCalculo: ModoCalculoAposentadoria;
    idadeAtual: number;
    idadeAposentadoria: number;
    valorJaAcumulado: number;
    rendaMensalDesejada?: number;
    contribuicaoMensal?: number;
    incluirCenariosSaque?: boolean;
}
