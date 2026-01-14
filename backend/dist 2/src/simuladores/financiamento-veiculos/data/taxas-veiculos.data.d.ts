import { HttpService } from '@nestjs/axios';
export interface TaxaFinanciamentoVeiculos {
    instituicaoFinanceira: string;
    taxaJurosMensal: number;
    taxaJurosAnual: number;
    modalidade: string;
    cnpj: string;
    tipoVeiculo: 'novo' | 'usado';
}
export declare class TaxasVeiculosData {
    private readonly httpService;
    private readonly logger;
    private readonly BCB_API_URL;
    constructor(httpService: HttpService);
    obterTaxasVeiculos(tipoVeiculo: 'novo' | 'usado'): Promise<TaxaFinanciamentoVeiculos[]>;
    private obterMesReferencia;
    private obterTaxasFallback;
}
