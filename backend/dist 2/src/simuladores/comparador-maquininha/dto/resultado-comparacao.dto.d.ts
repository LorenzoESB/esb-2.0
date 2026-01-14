export declare class CaracteristicasMaquininhaDto {
    id: number;
    nome: string;
    empresa: string;
    logo: string;
    imagem: string;
    preco: number;
    preco_promocional: number | null;
    mensalidade: number;
    chip: boolean;
    tarja: boolean;
    nfc: boolean;
    com_fio: boolean;
    imprime_recibo: boolean;
    precisa_smartphone: boolean;
    permite_antecipacao: boolean;
    atende_pf: boolean;
    atende_pj: boolean;
    vale_refeicao: boolean;
    ecommerce: boolean;
    max_parcelas: number;
    garantia: number | null;
    tipos_conexao: string[];
    bandeiras: string[];
    formas_recebimento: string[];
    observacoes: string;
    url_contratacao: string;
    cupom: string | null;
    transparencia: number | null;
    url_avaliacao: string | null;
    data_atualizacao: string;
    planos: {
        id: number;
        nome: string;
        taxa_debito: string;
        taxa_credito_vista: string;
        taxa_credito_parcelado_min: string;
        dias_repasse_debito: number;
        dias_repasse_credito: number;
        avaliacao: number;
    }[];
}
export declare class ResultadoComparacaoDto {
    maquininhas: CaracteristicasMaquininhaDto[];
    total: number;
}
