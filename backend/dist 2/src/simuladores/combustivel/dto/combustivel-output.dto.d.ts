declare class CustoDetalhadoDto {
    custoPorKm: number;
    custoFormatado: string;
}
declare class CustosDto {
    gasolina: CustoDetalhadoDto;
    etanol: CustoDetalhadoDto;
}
declare class EconomiaDto {
    valor: number;
    valorFormatado: string;
    percentual: number;
}
export declare class CombustivelOutputDto {
    recomendacao: string;
    custos: CustosDto;
    economia: EconomiaDto;
    mensagem: string;
}
export {};
