export declare class JurosCompostosResumoDto {
    valorTotalFinalBruto: number;
    totalInvestido: number;
    totalEmJurosBruto: number;
    valorTotalFinal?: number;
    impostoRenda?: number;
    aliquotaIR?: number;
    totalEmJuros?: number;
}
export declare class JurosCompostosMensalDto {
    mes: number;
    valorInvestido: number;
    valorComJuros: number;
    jurosDoMes: number;
    jurosAcumulados: number;
}
export declare class JurosCompostosDetalhadoOutputDto {
    resumo: JurosCompostosResumoDto;
    detalhesMensais: JurosCompostosMensalDto[];
}
