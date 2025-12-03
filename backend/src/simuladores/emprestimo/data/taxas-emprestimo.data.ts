/**
 * taxas-emprestimo.data.ts
 *
 * Data source for personal loan interest rates
 * Based on real market averages from Brazilian financial institutions
 *
 * In production, this should be replaced with:
 * - Database queries to a JurosPessoal table
 * - External API calls to fetch current rates
 * - Regular updates via cron jobs
 */

export interface TaxaEmprestimo {
  instituicao: string;
  modalidade: string;
  taxaMensal: number; // Taxa mensal em %
  taxaAnual: number; // Taxa anual em %
  pessoaFisica: boolean; // true = PF, false = PJ
  ativo: boolean;
  logo?: string;
}

/**
 * Taxas de empréstimo para Pessoa Física (PF)
 *
 * Modalidades excluídas por tipo de emprego:
 * - aposentado: exclui "consignado privado" e "consignado público"
 * - clt: exclui "consignado INSS" e "consignado público"
 * - servidor_publico: exclui "consignado INSS" e "consignado privado"
 */
export const TAXAS_PF: TaxaEmprestimo[] = [
  // Crédito Consignado INSS (melhores taxas)
  {
    instituicao: 'Banco do Brasil',
    modalidade: 'Crédito pessoal consignado INSS - Pré-fixado',
    taxaMensal: 1.83,
    taxaAnual: 24.37,
    pessoaFisica: true,
    ativo: true,
  },
  {
    instituicao: 'Caixa Econômica Federal',
    modalidade: 'Crédito pessoal consignado INSS - Pré-fixado',
    taxaMensal: 1.89,
    taxaAnual: 25.16,
    pessoaFisica: true,
    ativo: true,
  },
  {
    instituicao: 'Itaú Unibanco',
    modalidade: 'Crédito pessoal consignado INSS - Pré-fixado',
    taxaMensal: 1.94,
    taxaAnual: 25.89,
    pessoaFisica: true,
    ativo: true,
  },
  {
    instituicao: 'Bradesco',
    modalidade: 'Crédito pessoal consignado INSS - Pré-fixado',
    taxaMensal: 1.97,
    taxaAnual: 26.29,
    pessoaFisica: true,
    ativo: true,
  },
  {
    instituicao: 'Santander',
    modalidade: 'Crédito pessoal consignado INSS - Pré-fixado',
    taxaMensal: 2.01,
    taxaAnual: 26.98,
    pessoaFisica: true,
    ativo: true,
  },

  // Crédito Consignado Privado (taxas intermediárias)
  {
    instituicao: 'Banco do Brasil',
    modalidade: 'Crédito pessoal consignado privado - Pré-fixado',
    taxaMensal: 2.15,
    taxaAnual: 28.95,
    pessoaFisica: true,
    ativo: true,
  },
  {
    instituicao: 'Itaú Unibanco',
    modalidade: 'Crédito pessoal consignado privado - Pré-fixado',
    taxaMensal: 2.18,
    taxaAnual: 29.45,
    pessoaFisica: true,
    ativo: true,
  },
  {
    instituicao: 'Bradesco',
    modalidade: 'Crédito pessoal consignado privado - Pré-fixado',
    taxaMensal: 2.22,
    taxaAnual: 30.08,
    pessoaFisica: true,
    ativo: true,
  },
  {
    instituicao: 'Santander',
    modalidade: 'Crédito pessoal consignado privado - Pré-fixado',
    taxaMensal: 2.25,
    taxaAnual: 30.56,
    pessoaFisica: true,
    ativo: true,
  },

  // Crédito Consignado Público
  {
    instituicao: 'Banco do Brasil',
    modalidade: 'Crédito pessoal consignado público - Pré-fixado',
    taxaMensal: 2.05,
    taxaAnual: 27.56,
    pessoaFisica: true,
    ativo: true,
  },
  {
    instituicao: 'Caixa Econômica Federal',
    modalidade: 'Crédito pessoal consignado público - Pré-fixado',
    taxaMensal: 2.08,
    taxaAnual: 28.02,
    pessoaFisica: true,
    ativo: true,
  },
  {
    instituicao: 'Itaú Unibanco',
    modalidade: 'Crédito pessoal consignado público - Pré-fixado',
    taxaMensal: 2.12,
    taxaAnual: 28.63,
    pessoaFisica: true,
    ativo: true,
  },

  // Crédito Pessoal Não Consignado (taxas mais altas)
  {
    instituicao: 'Banco do Brasil',
    modalidade: 'Crédito pessoal não consignado - Pré-fixado',
    taxaMensal: 4.12,
    taxaAnual: 62.47,
    pessoaFisica: true,
    ativo: true,
  },
  {
    instituicao: 'Caixa Econômica Federal',
    modalidade: 'Crédito pessoal não consignado - Pré-fixado',
    taxaMensal: 4.25,
    taxaAnual: 64.77,
    pessoaFisica: true,
    ativo: true,
  },
  {
    instituicao: 'Itaú Unibanco',
    modalidade: 'Crédito pessoal não consignado - Pré-fixado',
    taxaMensal: 4.35,
    taxaAnual: 66.89,
    pessoaFisica: true,
    ativo: true,
  },
  {
    instituicao: 'Bradesco',
    modalidade: 'Crédito pessoal não consignado - Pré-fixado',
    taxaMensal: 4.42,
    taxaAnual: 68.42,
    pessoaFisica: true,
    ativo: true,
  },
  {
    instituicao: 'Santander',
    modalidade: 'Crédito pessoal não consignado - Pré-fixado',
    taxaMensal: 4.55,
    taxaAnual: 70.68,
    pessoaFisica: true,
    ativo: true,
  },
  {
    instituicao: 'Banco Inter',
    modalidade: 'Crédito pessoal não consignado - Pré-fixado',
    taxaMensal: 3.89,
    taxaAnual: 58.53,
    pessoaFisica: true,
    ativo: true,
  },
  {
    instituicao: 'Nubank',
    modalidade: 'Crédito pessoal não consignado - Pré-fixado',
    taxaMensal: 3.99,
    taxaAnual: 60.16,
    pessoaFisica: true,
    ativo: true,
  },
  {
    instituicao: 'C6 Bank',
    modalidade: 'Crédito pessoal não consignado - Pré-fixado',
    taxaMensal: 4.05,
    taxaAnual: 61.36,
    pessoaFisica: true,
    ativo: true,
  },
];

/**
 * Taxas de empréstimo para Pessoa Jurídica (PJ)
 *
 * Modalidades incluem:
 * - Capital de giro
 * - Antecipação de recebíveis
 * - Crédito rotativo
 */
export const TAXAS_PJ: TaxaEmprestimo[] = [
  {
    instituicao: 'Banco do Brasil',
    modalidade: 'Capital de giro - Pré-fixado',
    taxaMensal: 2.85,
    taxaAnual: 39.85,
    pessoaFisica: false,
    ativo: true,
  },
  {
    instituicao: 'Caixa Econômica Federal',
    modalidade: 'Capital de giro - Pré-fixado',
    taxaMensal: 2.92,
    taxaAnual: 41.13,
    pessoaFisica: false,
    ativo: true,
  },
  {
    instituicao: 'Itaú Unibanco',
    modalidade: 'Capital de giro - Pré-fixado',
    taxaMensal: 2.99,
    taxaAnual: 42.42,
    pessoaFisica: false,
    ativo: true,
  },
  {
    instituicao: 'Bradesco',
    modalidade: 'Capital de giro - Pré-fixado',
    taxaMensal: 3.05,
    taxaAnual: 43.54,
    pessoaFisica: false,
    ativo: true,
  },
  {
    instituicao: 'Santander',
    modalidade: 'Capital de giro - Pré-fixado',
    taxaMensal: 3.12,
    taxaAnual: 44.86,
    pessoaFisica: false,
    ativo: true,
  },
  {
    instituicao: 'Banco Inter',
    modalidade: 'Capital de giro - Pré-fixado',
    taxaMensal: 2.75,
    taxaAnual: 38.39,
    pessoaFisica: false,
    ativo: true,
  },
  {
    instituicao: 'Banco do Brasil',
    modalidade: 'Antecipação de recebíveis - Pré-fixado',
    taxaMensal: 2.65,
    taxaAnual: 36.88,
    pessoaFisica: false,
    ativo: true,
  },
  {
    instituicao: 'Itaú Unibanco',
    modalidade: 'Antecipação de recebíveis - Pré-fixado',
    taxaMensal: 2.72,
    taxaAnual: 37.94,
    pessoaFisica: false,
    ativo: true,
  },
  {
    instituicao: 'Bradesco',
    modalidade: 'Antecipação de recebíveis - Pré-fixado',
    taxaMensal: 2.78,
    taxaAnual: 38.86,
    pessoaFisica: false,
    ativo: true,
  },
  {
    instituicao: 'Santander',
    modalidade: 'Antecipação de recebíveis - Pré-fixado',
    taxaMensal: 2.85,
    taxaAnual: 39.85,
    pessoaFisica: false,
    ativo: true,
  },
  {
    instituicao: 'Safra',
    modalidade: 'Capital de giro - Pré-fixado',
    taxaMensal: 2.95,
    taxaAnual: 41.68,
    pessoaFisica: false,
    ativo: true,
  },
  {
    instituicao: 'BTG Pactual',
    modalidade: 'Capital de giro - Pré-fixado',
    taxaMensal: 2.88,
    taxaAnual: 40.38,
    pessoaFisica: false,
    ativo: true,
  },
];

/**
 * Modalidades excluídas por tipo de emprego
 */
export const MODALIDADES_EXCLUIDAS_POR_TIPO: Record<string, string[]> = {
  aposentado: [
    'Crédito pessoal consignado privado - Pré-fixado',
    'Crédito pessoal consignado público - Pré-fixado',
  ],
  clt: [
    'Crédito pessoal consignado INSS - Pré-fixado',
    'Crédito pessoal consignado público - Pré-fixado',
  ],
  servidor_publico: [
    'Crédito pessoal consignado INSS - Pré-fixado',
    'Crédito pessoal consignado privado - Pré-fixado',
  ],
};
