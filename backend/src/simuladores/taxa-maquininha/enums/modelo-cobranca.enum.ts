/**
 * Modelo de cobrança utilizado pelas empresas de maquininhas
 * Migrated from Django models.Cobranca
 */
export enum ModeloCobranca {
  /**
   * Antecipação com juros simples
   * Formula: taxa_base + (taxa_adicional * (parcelas - 1))
   */
  ANTECIPACAO_JUROS_SIMPLES = 'Antecipação por Juros Simples',

  /**
   * Antecipação com juros compostos
   * Formula: Somatório de (1 + taxa)^n para cada parcela
   */
  ANTECIPACAO_JUROS_COMPOSTOS = 'Antecipação por Juros Compostos',

  /**
   * Cobrança por faixa de faturamento
   * 3 tipos: Preço, Taxa, Taxa Adicional
   */
  FAIXA = 'Faixa',

  /**
   * Taxa padrão (sem faixa ou antecipação)
   * Usa taxa_desconto_credito_vista e taxa_adicional_parcela
   */
  TAXA_PADRAO = 'Taxa Padrão',
}

/**
 * Tipo de faixa de faturamento
 * Migrated from Django models.Plano.tipo_faixa
 */
export enum TipoFaixa {
  /**
   * Tipo 1: Faixa define o PREÇO fixo mensal
   * Exemplo: Faturou entre R$ 1000-5000 = paga R$ 50/mês
   */
  PRECO = 1,

  /**
   * Tipo 2: Faixa define a TAXA (percentual)
   * Exemplo: Faturou entre R$ 1000-5000 = taxa de 2,5% sobre transações
   */
  TAXA = 2,

  /**
   * Tipo 3: Faixa define taxa BASE + taxa adicional por parcela
   * Exemplo: Faturou entre R$ 1000-5000 = 2% base + 0,5% por parcela adicional
   */
  TAXA_ADICIONAL = 3,
}

/**
 * Tipo de pessoa (PF ou PJ)
 */
export enum TipoPessoa {
  PF = 'PF',
  PJ = 'PJ',
}

/**
 * Tipo de recebimento do crédito parcelado
 * Migrated from Django models.Plano.tipo_recebimento_parcelado
 *
 * Note: In the database this is stored as boolean, but we use constants here
 */
export const TipoRecebimentoParcelado = {
  /**
   * True: Recebe após cada parcela
   * Exemplo: 12 parcelas = recebe em 12 momentos diferentes
   */
  APOS_CADA_PARCELA: true,

  /**
   * False: Recebe tudo de uma vez em X dias
   * Exemplo: 12 parcelas = recebe tudo em 30 dias
   */
  TUDO_DE_UMA_VEZ: false,
} as const;
