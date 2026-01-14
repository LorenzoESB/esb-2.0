import { HttpService } from '@nestjs/axios';
export interface TaxaFinanciamentoImovel {
    instituicaoFinanceira: string;
    taxaJurosMensal: number;
    taxaJurosAnual: number;
    modalidade: string;
    cnpj: string;
}
export declare class TaxasFinanciamentoData {
    private readonly httpService;
    private readonly logger;
    private readonly BCB_API_URL;
    constructor(httpService: HttpService);
    obterTaxasImovel(): Promise<TaxaFinanciamentoImovel[]>;
    private obterMesReferencia;
    private obterTaxasFallback;
}
