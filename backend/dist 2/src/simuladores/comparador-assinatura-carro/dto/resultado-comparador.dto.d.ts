export declare class BreakdownCustos {
    custoAquisicao: number;
    manutencao: number;
    seguro: number;
    ipva: number;
    taxasLicenciamento: number;
    depreciacao: number;
    custoOportunidade: number;
    custoAssinatura?: number;
    jurosFinanciamento?: number;
    iofFinanciamento?: number;
}
export declare class CenarioComparador {
    nome: string;
    custoTotal: number;
    valorRevenda: number;
    custoLiquido: number;
    breakdown: BreakdownCustos;
}
export declare class ResultadoComparadorDto {
    compraVista: CenarioComparador;
    financiamento: CenarioComparador;
    assinatura: CenarioComparador;
    melhorOpcao: 'compraVista' | 'financiamento' | 'assinatura';
    economiaMaxima: number;
    periodoAnos: number;
    urls: {
        assinatura: string;
        financiamento: string;
    };
}
