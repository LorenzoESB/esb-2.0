export declare class ParametrosCalculoDto {
    idadeAtual: number;
    idadeAposentadoria: number;
    valorJaAcumulado: number;
    taxaJurosMensal: number;
    taxaJurosAnual: number;
    expectativaVida: number;
}
export declare class AcumulacaoDto {
    mesesContribuicao: number;
    anosContribuicao: number;
    contribuicaoMensal: number;
    valorFuturoReserva: number;
    valorFuturoContribuicoes: number;
    valorTotalAcumulado: number;
}
export declare class UsufrutoDto {
    idadeInicio: number;
    idadeFim: number;
    mesesBeneficio: number;
    rendaMensal: number;
    valorTotalRecebido: number;
}
export declare class CenarioSaqueDto {
    valorSaqueMensal: number;
    duracaoMeses: number;
    duracaoAnos: number;
    consumePrincipal: boolean;
    saldoFinal: number;
    observacao: string;
}
export declare class SustentabilidadeDto {
    cenarios: CenarioSaqueDto[];
}
export declare class ResumoDto {
    totalInvestido: number;
    totalRecebido: number;
    saldoPatrimonial: number;
}
export declare class ResultadoAposentadoriaDto {
    parametros: ParametrosCalculoDto;
    acumulacao: AcumulacaoDto;
    usufruto: UsufrutoDto;
    sustentabilidade: SustentabilidadeDto;
    resumo: ResumoDto;
}
