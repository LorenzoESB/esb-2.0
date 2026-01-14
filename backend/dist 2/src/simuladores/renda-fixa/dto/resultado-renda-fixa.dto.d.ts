import { InvestimentoOfertaDto, OfertaTesouroDto } from './investimento-oferta.dto';
export declare class ResultadoModalidadeDto {
    taxa: number;
    resultado: number;
    imposto: number;
    rendimentoLiquido: number;
    percentualRendimento: number;
    percentualRendimentoMensal: number;
    percentualRendimentoAnual: number;
}
export declare class ResultadoRendaFixaDto {
    poupanca: ResultadoModalidadeDto;
    tesouroDireto: ResultadoModalidadeDto;
    lci: ResultadoModalidadeDto;
    cdb: ResultadoModalidadeDto;
    melhorInvestimento: string;
    melhorRendimento: number;
    totalInvestido: number;
    taxaSelic: number;
    taxaCdi: number;
    taxaTr: number;
    ofertasDetalhadas?: InvestimentoOfertaDto[] | OfertaTesouroDto[];
    tipoOfertasDetalhadas?: string;
}
