import { Maquininha, Plano, ResultadoMaquininha, FiltrosMaquininha } from '../interfaces/maquininha.interface';
export declare function calcularAntecipacao(val_credito_p: number, num_parcelas: number, plano: Plano): number;
export declare function calcularAntecipacaoComposto(val_credito_p: number, num_parcelas: number, plano: Plano): number;
export declare function inFilter(maq: Maquininha, filtros: FiltrosMaquininha | null): boolean;
export declare function calcularMaq(val_credito: number, val_debito: number, val_credito_p: number, num_parcelas: number, setor: number | null, filtros: FiltrosMaquininha | null, maquinas: Maquininha[]): ResultadoMaquininha[];
export declare function arredondar2Decimais(valor: number): number;
