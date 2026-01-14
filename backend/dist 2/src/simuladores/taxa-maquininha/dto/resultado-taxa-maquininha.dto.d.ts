import { TipoConexao, Bandeira, FormaRecebimento } from '../interfaces/maquininha.interface';
export declare class MaquininhaCalculadaDto {
    nome: string;
    id_maq: number;
    empresa: string;
    empresa_cnpj: string;
    logo: string;
    imagem_maquina: string;
    valor_mensal: number;
    valor_mensalidade: number;
    valor_transacao: number;
    valor_selo: number | string;
    dias_debito: number;
    dias_credito: number;
    tipo_dias_credito: string;
    dias_credito_parcelado: number;
    tipo_recebimento_parcelado: boolean;
    co_cartao: number;
    site: string;
    observacao: string;
    cupom: string | null;
    possibilidade_parcelamento: number;
    afiliacao_a_banco: boolean;
    chip: boolean;
    tarja: boolean;
    NFC: boolean;
    PF: boolean;
    PJ: boolean;
    precisa_de_telefone: boolean;
    fio: boolean;
    imprime_recibo: boolean;
    garantia: number | null;
    possivel_antecipacao: boolean;
    antecipado: boolean;
    opcao_ecommerce: boolean;
    taxas_transparentes: boolean;
    vale_refeicao: boolean;
    tipo_conexoes: TipoConexao[];
    forma_recebimento: FormaRecebimento[];
    bandeiras: Bandeira[];
    avaliacao: number;
    data_atualizacao: string;
    url_avaliacao: string | null;
    cruzamentos: any[];
    tem_parceria: boolean;
}
export declare class ResultadoTaxaMaquininhaDto {
    maquininhas: MaquininhaCalculadaDto[];
    total: number;
    melhor_opcao: MaquininhaCalculadaDto;
    input_data: {
        venda_debito: number;
        venda_credito_vista: number;
        venda_credito_parcelado: number;
        numero_parcelas: number;
        segmento?: number;
    };
}
