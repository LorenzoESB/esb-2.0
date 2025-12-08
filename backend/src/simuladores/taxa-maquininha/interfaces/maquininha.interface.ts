import {
  ModeloCobranca,
  TipoFaixa,
  TipoRecebimentoParcelado,
} from '../enums/modelo-cobranca.enum';

/**
 * Bandeira de cartão aceita pela maquininha
 * Migrated from Django models.Bandeira
 */
export interface Bandeira {
  nome: string;
  classeCss?: string;
  imagem?: string;
}

/**
 * Tipo de conexão disponível
 * Migrated from Django models.TipoConexao
 */
export interface TipoConexao {
  nome: string; // 'Wi-Fi', '3G', '4G', 'Bluetooth', etc.
}

/**
 * Forma de recebimento aceita
 * Migrated from Django models.FormaRecebimento
 */
export interface FormaRecebimento {
  nome: string;
}

/**
 * Segmento/setor de atuação
 * Migrated from Django models.Segmento
 */
export interface Segmento {
  id: number;
  nome: string;
  ativo: boolean;
}

/**
 * Tipo de dias na função crédito
 * Migrated from Django models.TipoDiasCredito
 */
export interface TipoDiasCredito {
  id: number;
  tipo: string; // Exemplo: 'Dias Úteis', 'Dias Corridos'
}

/**
 * Faixa de faturamento para pricing baseado em volume
 * Migrated from Django models.FaixaFaturamento
 */
export interface FaixaFaturamento {
  /** Valor/Taxa do débito (usado conforme tipo_faixa) */
  valor: number;
  /** Faturamento mínimo para esta faixa */
  minimo: number;
  /** Faturamento máximo para esta faixa */
  maximo: number;
  /** Taxa para crédito à vista */
  taxa_credito: number;
  /** Taxa para crédito parcelado (2 a 6 vezes) */
  taxa_credito_p: number;
  /** Taxa para crédito parcelado (7 a 12 vezes) */
  taxa_credito_p2: number;
}

/**
 * Taxa específica por número de parcelas
 * Migrated from Django models.Taxa
 */
export interface Taxa {
  /** Número da parcela */
  parcela: number;
  /** Taxa para esta parcela específica */
  taxa: number;
}

/**
 * Empresa/Marca da maquininha
 * Migrated from Django core.models.Marca
 */
export interface Empresa {
  id: number;
  nome: string;
  cnpj: string;
  logo: string;
  parceiro: boolean; // Se é parceiro do Gerente de Sonhos
}

/**
 * Plano de uma maquininha
 * Migrated from Django models.Plano
 */
export interface Plano {
  id: number;
  nome: string;
  ativo: boolean;

  // Taxas de desconto
  taxa_desconto_debito: number;
  taxa_desconto_credito_vista: number;
  taxa_adicional_parcela: number;

  // Dias de repasse
  dias_repasse_debito: number;
  dias_repasse_credito: number;
  dias_repasse_credito_parc: number;
  tipo_dias_credito: TipoDiasCredito;

  // Tipo de recebimento
  tipo_recebimento_parcelado: boolean; // TipoRecebimentoParcelado

  // Modelo de cobrança
  modelo_cobranca: ModeloCobranca;
  antecipado: boolean;

  // Faixas (se modelo_cobranca == FAIXA)
  tipo_faixa: TipoFaixa;
  faixa_faturamento: FaixaFaturamento[];
  taxa_valor_excedente: number; // Taxa sobre valor excedente à última faixa

  // Taxas por parcela (se não usar taxa_adicional_parcela)
  taxas: Taxa[];

  // Segmentos permitidos
  segmentos: Segmento[];

  // Avaliação
  avaliacao: number; // 0-10

  // URL para contratação
  url: string;

  // Grupo (para organização interna)
  grupo: number; // 1-5: laranja, amarelo, azul, verde, controle
}

/**
 * Maquininha de cartão
 * Migrated from Django models.Maquina
 */
export interface Maquininha {
  id: number;
  nome: string;
  ativo: boolean;

  // Empresa/Marca
  empresa: Empresa;

  // Preços
  valor_leitor: number;
  valor_promocional: number | null;
  valor_mensalidade: number;
  valor_transacao: number;

  // Parcelamento
  possibilidade_parcelamento: number; // Máximo de parcelas (1-12)

  // Mensalidade condicional
  mensalidade_condicional: boolean;
  minimo_sem_mensalidade: number | null;

  // Taxa condicional
  taxa_condicional: boolean;
  minimo_sem_taxa: number | null;
  taxa: number | null; // Taxa percentual sobre valor faltante

  // Características físicas
  chip: boolean;
  tarja: boolean;
  NFC: boolean;
  fio: boolean; // true = com fio, false = sem fio
  imprime_recibo: boolean;
  precisa_de_telefone: boolean;

  // Funcionalidades
  email_recibo: boolean;
  sms_recibo: boolean;
  possivel_antecipacao: boolean;
  opcao_ecommerce: boolean;
  taxas_transparentes: boolean;
  vale_refeicao: boolean;

  // Afiliação
  afiliacao_a_banco: boolean;
  sem_mensalidade: boolean;

  // Pessoa
  PF: boolean;
  PJ: boolean;

  // Garantia
  garantia: number | null; // Em anos

  // Relacionamentos
  planos: Plano[];
  bandeiras: Bandeira[];
  tipo_conexao: TipoConexao[];
  forma_recebimento: FormaRecebimento[];

  // Avaliação
  transparencia: number | null; // 0-10
  url_avaliacao: string | null;

  // Outros
  observacao: string;
  imagem: string;
  cupom: string | null;
  atualizado_em: Date;
}

/**
 * Resultado do cálculo de uma maquininha
 * Retornado pela função calcular_maq
 */
export interface ResultadoMaquininha {
  // Identificação
  nome: string; // Nome completo: maquina + plano
  id_maq: number;
  empresa: string;
  empresa_cnpj: string;
  logo: string;
  imagem_maquina: string;

  // Custos
  valor_mensal: number; // Custo total mensal
  valor_mensalidade: number;
  valor_transacao: number;
  valor_selo: number | string; // Desconto percentual ou ''

  // Dias de repasse
  dias_debito: number;
  dias_credito: number;
  tipo_dias_credito: string;
  dias_credito_parcelado: number;
  tipo_recebimento_parcelado: boolean;

  // Plano
  co_cartao: number; // ID do plano
  site: string;
  observacao: string;
  cupom: string | null;

  // Características
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

  // Relacionamentos
  tipo_conexoes: TipoConexao[];
  forma_recebimento: FormaRecebimento[];
  bandeiras: Bandeira[];

  // Avaliação
  avaliacao: number;
  data_atualizacao: string;
  url_avaliacao: string | null;

  // Parcerias/Cruzamentos
  cruzamentos: any[];
  tem_parceria: boolean;
}

/**
 * Filtros para a simulação
 * Migrated from calculos.py in_filter function
 */
export interface FiltrosMaquininha {
  mensalidade: boolean; // sem_mensalidade
  tarja: boolean; // aceita_cartao_tarja
  fio: boolean; // sem_fio
  PF: boolean; // pessoa física
  PJ: boolean; // pessoa jurídica
  imprime_recibo: boolean;
  wifi: boolean;
  quero_antecipar: boolean;
  precisa_de_telefone: boolean; // n_exige_smartphone
  vale_refeicao: boolean; // aceita_vale_refeicao
  opcao_ecommerce: boolean;
}
