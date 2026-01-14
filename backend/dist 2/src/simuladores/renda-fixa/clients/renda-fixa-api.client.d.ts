import { HttpService } from '@nestjs/axios';
export interface RendaFixaApiRequestPayload {
    valor: string;
    dc: string;
    tipo: string[];
    indexador: string;
    corretora: string;
}
export interface OfertaInvestimento {
    corretora: string;
    emissor: string;
    taxa: string;
    vencimento: string;
    qtdMinima: number;
    vl: number;
}
export interface OfertaTesouro {
    nom: string;
    tipo: string;
    tx: number;
    data_vencto: string;
    vlr: number;
}
export interface RendaFixaApiResponse {
    resultados: {
        CDB?: any;
        LCI?: any;
        SELIC?: any;
        POUP?: any;
        CDI?: number;
        cdi?: number;
        melhor_titulo: string;
        listamelhortitulo: OfertaInvestimento[] | OfertaTesouro[];
    };
}
export declare const INVESTMENT_TYPE_MAP: Record<string, string>;
export declare const API_TO_SYSTEM_MAP: Record<string, string>;
export declare class RendaFixaApiClient {
    private readonly httpService;
    private readonly logger;
    private readonly API_URL;
    constructor(httpService: HttpService);
    consultarOfertas(investimento: number, prazoMeses: number): Promise<RendaFixaApiResponse>;
    hasValidOffers(response: RendaFixaApiResponse): boolean;
}
