import { ModeloCobranca, TipoFaixa } from '../enums/modelo-cobranca.enum';
export interface Bandeira {
    nome: string;
    classeCss?: string;
    imagem?: string;
}
export interface TipoConexao {
    nome: string;
}
export interface FormaRecebimento {
    nome: string;
}
export interface Segmento {
    id: number;
    nome: string;
    ativo: boolean;
}
export interface TipoDiasCredito {
    id: number;
    tipo: string;
}
export interface FaixaFaturamento {
    valor: number;
    minimo: number;
    maximo: number;
    taxa_credito: number;
    taxa_credito_p: number;
    taxa_credito_p2: number;
}
export interface Taxa {
    parcela: number;
    taxa: number;
}
export interface Empresa {
    id: number;
    nome: string;
    cnpj: string;
    logo: string;
    parceiro: boolean;
}
export interface Plano {
    id: number;
    nome: string;
    ativo: boolean;
    taxa_desconto_debito: number;
    taxa_desconto_credito_vista: number;
    taxa_adicional_parcela: number;
    dias_repasse_debito: number;
    dias_repasse_credito: number;
    dias_repasse_credito_parc: number;
    tipo_dias_credito: TipoDiasCredito;
    tipo_recebimento_parcelado: boolean;
    modelo_cobranca: ModeloCobranca;
    antecipado: boolean;
    tipo_faixa: TipoFaixa;
    faixa_faturamento: FaixaFaturamento[];
    taxa_valor_excedente: number;
    taxas: Taxa[];
    segmentos: Segmento[];
    avaliacao: number;
    url: string;
    grupo: number;
}
export interface Maquininha {
    id: number;
    nome: string;
    ativo: boolean;
    empresa: Empresa;
    valor_leitor: number;
    valor_promocional: number | null;
    valor_mensalidade: number;
    valor_transacao: number;
    possibilidade_parcelamento: number;
    mensalidade_condicional: boolean;
    minimo_sem_mensalidade: number | null;
    taxa_condicional: boolean;
    minimo_sem_taxa: number | null;
    taxa: number | null;
    chip: boolean;
    tarja: boolean;
    NFC: boolean;
    fio: boolean;
    imprime_recibo: boolean;
    precisa_de_telefone: boolean;
    email_recibo: boolean;
    sms_recibo: boolean;
    possivel_antecipacao: boolean;
    opcao_ecommerce: boolean;
    taxas_transparentes: boolean;
    vale_refeicao: boolean;
    afiliacao_a_banco: boolean;
    sem_mensalidade: boolean;
    PF: boolean;
    PJ: boolean;
    garantia: number | null;
    planos: Plano[];
    bandeiras: Bandeira[];
    tipo_conexao: TipoConexao[];
    forma_recebimento: FormaRecebimento[];
    transparencia: number | null;
    url_avaliacao: string | null;
    observacao: string;
    imagem: string;
    cupom: string | null;
    atualizado_em: Date;
}
export interface ResultadoMaquininha {
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
export interface FiltrosMaquininha {
    mensalidade: boolean;
    tarja: boolean;
    fio: boolean;
    PF: boolean;
    PJ: boolean;
    imprime_recibo: boolean;
    wifi: boolean;
    quero_antecipar: boolean;
    precisa_de_telefone: boolean;
    vale_refeicao: boolean;
    opcao_ecommerce: boolean;
}
