import { MachineData } from '../interfaces/machine-ranking.interface';

/**
 * Complete card machine ranking data
 *
 * Contains 10 card machines with:
 * - Static pre-calculated scores (hidden from API)
 * - Raw scores for each criterion (for verification/recalculation)
 * - Complete feature set
 * - Pricing information
 * - Available plans
 *
 * Scoring criteria (0-10 scale):
 * - competitive_rates (weight 3.0): Lower rates = higher score
 * - transparency (weight 2.0): Clear communication = higher score
 * - features (weight 1.5): More features = higher score
 * - receivables_anticipation (weight 1.0): Boolean (10 or 0)
 * - reputation (weight 1.5): Based on market presence and reviews
 * - support_quality (weight 1.0): Quality of customer service
 * - installment_options (weight 1.0): More parcelas = higher score
 * - meal_vouchers (weight 0.5): Boolean (10 or 0)
 */
export const CARD_MACHINES_DATA: MachineData[] = [
  // 1. InfinitePay - Best overall (Rank 1)
  {
    id: 1,
    nome: 'InfinitePay',
    empresa: 'InfinitePay',
    logo: 'https://example.com/logos/infinitepay.png',
    imagem: 'https://example.com/maquininhas/infinitepay.png',
    static_score: 8.92,
    raw_scores: {
      competitive_rates: 9.5, // Excelentes taxas (1,69% débito, 2,49% crédito)
      transparency: 10, // Muito transparente
      features: 8.0, // Boas funcionalidades
      receivables_anticipation: 10, // Possui antecipação
      reputation: 9.0, // Ótima reputação
      support_quality: 8.5, // Bom suporte
      installment_options: 10, // 12 parcelas
      meal_vouchers: 0, // Não aceita vale refeição
    },
    features: {
      chip: true,
      tarja: true,
      nfc: true,
      com_fio: false,
      imprime_recibo: false,
      precisa_smartphone: true,
      permite_antecipacao: true,
      atende_pf: true,
      atende_pj: true,
      vale_refeicao: false,
      ecommerce: false,
      max_parcelas: 12,
      garantia: null,
      tipos_conexao: ['Bluetooth', 'Wi-Fi'],
      bandeiras: ['Visa', 'Mastercard', 'Elo'],
      formas_recebimento: ['Conta InfinitePay', 'PIX'],
    },
    pricing: {
      preco: 0,
      preco_promocional: null,
      mensalidade: 0,
    },
    planos: [
      {
        id: 1,
        nome: 'Plano Padrão',
        taxa_debito: '1,69%',
        taxa_credito_vista: '2,49%',
        taxa_credito_parcelado_min: '3,49%',
        dias_repasse_debito: 1,
        dias_repasse_credito: 1,
        avaliacao: 9.0,
      },
    ],
    observacoes: 'Maquininha gratuita via celular com taxas muito competitivas',
    url_contratacao: 'https://infinitepay.io',
    cupom: null,
    transparencia: 10,
    url_avaliacao: 'https://blog.educandoseubolso.com.br/infinitepay',
    data_atualizacao: new Date('2024-12-01'),
    ativo: true,
  },

  // 2. Moderninha Pro (Rank 2)
  {
    id: 2,
    nome: 'Moderninha Pro',
    empresa: 'PagSeguro',
    logo: 'https://example.com/logos/pagseguro.png',
    imagem: 'https://example.com/maquininhas/moderninha-pro.png',
    static_score: 8.45,
    raw_scores: {
      competitive_rates: 8.0,
      transparency: 9.0,
      features: 9.5, // Muitas funcionalidades (impressora, NFC)
      receivables_anticipation: 10,
      reputation: 9.5, // Marca consolidada
      support_quality: 8.0,
      installment_options: 10,
      meal_vouchers: 0,
    },
    features: {
      chip: true,
      tarja: true,
      nfc: true,
      com_fio: false,
      imprime_recibo: true,
      precisa_smartphone: false,
      permite_antecipacao: true,
      atende_pf: true,
      atende_pj: true,
      vale_refeicao: false,
      ecommerce: false,
      max_parcelas: 12,
      garantia: 12,
      tipos_conexao: ['Wi-Fi', '4G', 'Bluetooth'],
      bandeiras: ['Visa', 'Mastercard', 'Elo', 'American Express', 'Hipercard'],
      formas_recebimento: ['Conta PagSeguro', 'Conta Bancária'],
    },
    pricing: {
      preco: 258.8,
      preco_promocional: 12.9,
      mensalidade: 0,
    },
    planos: [
      {
        id: 2,
        nome: 'Plano Básico',
        taxa_debito: '2,99%',
        taxa_credito_vista: '3,99%',
        taxa_credito_parcelado_min: '4,98%',
        dias_repasse_debito: 1,
        dias_repasse_credito: 30,
        avaliacao: 8.5,
      },
    ],
    observacoes: 'Maquininha completa com NFC e impressora',
    url_contratacao: 'https://pagseguro.uol.com.br/maquininha',
    cupom: 'PROMO2024',
    transparencia: 9,
    url_avaliacao: 'https://blog.educandoseubolso.com.br/moderninha-pro',
    data_atualizacao: new Date('2024-11-15'),
    ativo: true,
  },

  // 3. Ton T1 (Rank 3)
  {
    id: 3,
    nome: 'Ton T1',
    empresa: 'Ton (Stone)',
    logo: 'https://example.com/logos/ton.png',
    imagem: 'https://example.com/maquininhas/ton-t1.png',
    static_score: 8.2,
    raw_scores: {
      competitive_rates: 8.5,
      transparency: 8.5,
      features: 8.5,
      receivables_anticipation: 10,
      reputation: 8.0,
      support_quality: 7.5,
      installment_options: 10,
      meal_vouchers: 0,
    },
    features: {
      chip: true,
      tarja: true,
      nfc: true,
      com_fio: false,
      imprime_recibo: true,
      precisa_smartphone: false,
      permite_antecipacao: true,
      atende_pf: true,
      atende_pj: true,
      vale_refeicao: false,
      ecommerce: true,
      max_parcelas: 12,
      garantia: 12,
      tipos_conexao: ['Wi-Fi', '4G'],
      bandeiras: ['Visa', 'Mastercard', 'Elo', 'Hipercard'],
      formas_recebimento: ['Conta Ton', 'Conta Bancária'],
    },
    pricing: {
      preco: 138.8,
      preco_promocional: 34.8,
      mensalidade: 0,
    },
    planos: [
      {
        id: 3,
        nome: 'Ton Básico',
        taxa_debito: '1,99%',
        taxa_credito_vista: '3,19%',
        taxa_credito_parcelado_min: '4,49%',
        dias_repasse_debito: 1,
        dias_repasse_credito: 1,
        avaliacao: 8.0,
      },
    ],
    observacoes: 'Maquininha da Stone com boas taxas e repasse rápido',
    url_contratacao: 'https://ton.com.br',
    cupom: null,
    transparencia: 8,
    url_avaliacao: 'https://blog.educandoseubolso.com.br/ton',
    data_atualizacao: new Date('2024-11-20'),
    ativo: true,
  },

  // 4. SumUp Total (Rank 4)
  {
    id: 4,
    nome: 'SumUp Total',
    empresa: 'SumUp',
    logo: 'https://example.com/logos/sumup.png',
    imagem: 'https://example.com/maquininhas/sumup-total.png',
    static_score: 7.95,
    raw_scores: {
      competitive_rates: 7.5,
      transparency: 8.0,
      features: 8.0,
      receivables_anticipation: 10,
      reputation: 7.5,
      support_quality: 7.0,
      installment_options: 10,
      meal_vouchers: 0,
    },
    features: {
      chip: true,
      tarja: true,
      nfc: true,
      com_fio: false,
      imprime_recibo: true,
      precisa_smartphone: false,
      permite_antecipacao: true,
      atende_pf: true,
      atende_pj: true,
      vale_refeicao: false,
      ecommerce: false,
      max_parcelas: 12,
      garantia: 12,
      tipos_conexao: ['Wi-Fi', '4G'],
      bandeiras: ['Visa', 'Mastercard', 'Elo'],
      formas_recebimento: ['Conta SumUp', 'Conta Bancária'],
    },
    pricing: {
      preco: 298.0,
      preco_promocional: 138.0,
      mensalidade: 0,
    },
    planos: [
      {
        id: 4,
        nome: 'SumUp Padrão',
        taxa_debito: '1,99%',
        taxa_credito_vista: '3,99%',
        taxa_credito_parcelado_min: '5,49%',
        dias_repasse_debito: 1,
        dias_repasse_credito: 1,
        avaliacao: 7.8,
      },
    ],
    observacoes: 'Maquininha europeia com boa reputação internacional',
    url_contratacao: 'https://sumup.com.br',
    cupom: null,
    transparencia: 8,
    url_avaliacao: null,
    data_atualizacao: new Date('2024-11-10'),
    ativo: true,
  },

  // 5. Mercado Pago Point Pro (Rank 5)
  {
    id: 5,
    nome: 'Point Pro',
    empresa: 'Mercado Pago',
    logo: 'https://example.com/logos/mercadopago.png',
    imagem: 'https://example.com/maquininhas/point-pro.png',
    static_score: 7.7,
    raw_scores: {
      competitive_rates: 7.0,
      transparency: 7.5,
      features: 8.5,
      receivables_anticipation: 10,
      reputation: 8.5,
      support_quality: 7.0,
      installment_options: 10,
      meal_vouchers: 0,
    },
    features: {
      chip: true,
      tarja: true,
      nfc: true,
      com_fio: false,
      imprime_recibo: true,
      precisa_smartphone: false,
      permite_antecipacao: true,
      atende_pf: true,
      atende_pj: true,
      vale_refeicao: false,
      ecommerce: true,
      max_parcelas: 12,
      garantia: 12,
      tipos_conexao: ['Wi-Fi', '4G', 'Bluetooth'],
      bandeiras: ['Visa', 'Mastercard', 'Elo', 'American Express'],
      formas_recebimento: ['Conta Mercado Pago', 'Conta Bancária'],
    },
    pricing: {
      preco: 359.0,
      preco_promocional: 89.0,
      mensalidade: 0,
    },
    planos: [
      {
        id: 5,
        nome: 'Point Padrão',
        taxa_debito: '2,49%',
        taxa_credito_vista: '4,49%',
        taxa_credito_parcelado_min: '5,99%',
        dias_repasse_debito: 1,
        dias_repasse_credito: 14,
        avaliacao: 7.5,
      },
    ],
    observacoes: 'Integrada com ecossistema Mercado Pago/Mercado Livre',
    url_contratacao: 'https://mercadopago.com.br/point',
    cupom: null,
    transparencia: 7,
    url_avaliacao: null,
    data_atualizacao: new Date('2024-11-25'),
    ativo: true,
  },

  // 6. SafraPay (Rank 6)
  {
    id: 6,
    nome: 'SafraPay Smart',
    empresa: 'Banco Safra',
    logo: 'https://example.com/logos/safrapay.png',
    imagem: 'https://example.com/maquininhas/safrapay-smart.png',
    static_score: 7.4,
    raw_scores: {
      competitive_rates: 7.0,
      transparency: 7.0,
      features: 7.5,
      receivables_anticipation: 10,
      reputation: 8.0,
      support_quality: 7.5,
      installment_options: 10,
      meal_vouchers: 10, // Aceita vale refeição
    },
    features: {
      chip: true,
      tarja: true,
      nfc: true,
      com_fio: false,
      imprime_recibo: true,
      precisa_smartphone: false,
      permite_antecipacao: true,
      atende_pf: true,
      atende_pj: true,
      vale_refeicao: true,
      ecommerce: false,
      max_parcelas: 12,
      garantia: 12,
      tipos_conexao: ['Wi-Fi', '4G'],
      bandeiras: ['Visa', 'Mastercard', 'Elo', 'Alelo', 'Sodexo'],
      formas_recebimento: ['Conta Safra', 'Conta Bancária'],
    },
    pricing: {
      preco: 199.0,
      preco_promocional: null,
      mensalidade: 0,
    },
    planos: [
      {
        id: 6,
        nome: 'SafraPay Básico',
        taxa_debito: '2,75%',
        taxa_credito_vista: '4,29%',
        taxa_credito_parcelado_min: '5,79%',
        dias_repasse_debito: 1,
        dias_repasse_credito: 30,
        avaliacao: 7.2,
      },
    ],
    observacoes: 'Aceita vale refeição - ideal para restaurantes',
    url_contratacao: 'https://safrapay.com.br',
    cupom: null,
    transparencia: 7,
    url_avaliacao: null,
    data_atualizacao: new Date('2024-10-30'),
    ativo: true,
  },

  // 7. Rede Pop (Rank 7)
  {
    id: 7,
    nome: 'Rede Pop',
    empresa: 'Rede',
    logo: 'https://example.com/logos/rede.png',
    imagem: 'https://example.com/maquininhas/rede-pop.png',
    static_score: 7.1,
    raw_scores: {
      competitive_rates: 6.5,
      transparency: 6.5,
      features: 7.5,
      receivables_anticipation: 10,
      reputation: 8.5, // Marca tradicional
      support_quality: 6.5,
      installment_options: 10,
      meal_vouchers: 0,
    },
    features: {
      chip: true,
      tarja: true,
      nfc: true,
      com_fio: false,
      imprime_recibo: false,
      precisa_smartphone: true,
      permite_antecipacao: true,
      atende_pf: true,
      atende_pj: true,
      vale_refeicao: false,
      ecommerce: false,
      max_parcelas: 12,
      garantia: 12,
      tipos_conexao: ['Bluetooth'],
      bandeiras: ['Visa', 'Mastercard', 'Elo'],
      formas_recebimento: ['Conta Rede', 'Conta Bancária'],
    },
    pricing: {
      preco: 0,
      preco_promocional: null,
      mensalidade: 0,
    },
    planos: [
      {
        id: 7,
        nome: 'Rede Básico',
        taxa_debito: '3,19%',
        taxa_credito_vista: '4,99%',
        taxa_credito_parcelado_min: '6,49%',
        dias_repasse_debito: 2,
        dias_repasse_credito: 30,
        avaliacao: 7.0,
      },
    ],
    observacoes: 'Marca tradicional, gratuita via celular',
    url_contratacao: 'https://rede.com.br',
    cupom: null,
    transparencia: 6,
    url_avaliacao: null,
    data_atualizacao: new Date('2024-11-05'),
    ativo: true,
  },

  // 8. GetNet Maquininha (Rank 8)
  {
    id: 8,
    nome: 'GetNet Maquininha',
    empresa: 'GetNet (Santander)',
    logo: 'https://example.com/logos/getnet.png',
    imagem: 'https://example.com/maquininhas/getnet.png',
    static_score: 6.85,
    raw_scores: {
      competitive_rates: 6.0,
      transparency: 6.0,
      features: 7.0,
      receivables_anticipation: 10,
      reputation: 7.5,
      support_quality: 6.0,
      installment_options: 10,
      meal_vouchers: 10,
    },
    features: {
      chip: true,
      tarja: true,
      nfc: true,
      com_fio: false,
      imprime_recibo: true,
      precisa_smartphone: false,
      permite_antecipacao: true,
      atende_pf: true,
      atende_pj: true,
      vale_refeicao: true,
      ecommerce: false,
      max_parcelas: 12,
      garantia: 12,
      tipos_conexao: ['Wi-Fi', '3G'],
      bandeiras: ['Visa', 'Mastercard', 'Elo', 'Alelo'],
      formas_recebimento: ['Conta Santander', 'Conta Bancária'],
    },
    pricing: {
      preco: 248.0,
      preco_promocional: null,
      mensalidade: 0,
    },
    planos: [
      {
        id: 8,
        nome: 'GetNet Padrão',
        taxa_debito: '3,49%',
        taxa_credito_vista: '5,19%',
        taxa_credito_parcelado_min: '6,69%',
        dias_repasse_debito: 2,
        dias_repasse_credito: 30,
        avaliacao: 6.8,
      },
    ],
    observacoes: 'Aceita vale refeição, ligada ao Santander',
    url_contratacao: 'https://getnet.com.br',
    cupom: null,
    transparencia: 6,
    url_avaliacao: null,
    data_atualizacao: new Date('2024-10-20'),
    ativo: true,
  },

  // 9. Cielo LIO (Rank 9)
  {
    id: 9,
    nome: 'Cielo LIO',
    empresa: 'Cielo',
    logo: 'https://example.com/logos/cielo.png',
    imagem: 'https://example.com/maquininhas/cielo-lio.png',
    static_score: 6.5,
    raw_scores: {
      competitive_rates: 5.5,
      transparency: 5.5,
      features: 8.5, // Muitas features (apps, PDV)
      receivables_anticipation: 10,
      reputation: 9.0, // Marca líder de mercado
      support_quality: 5.5,
      installment_options: 10,
      meal_vouchers: 10,
    },
    features: {
      chip: true,
      tarja: true,
      nfc: true,
      com_fio: false,
      imprime_recibo: true,
      precisa_smartphone: false,
      permite_antecipacao: true,
      atende_pf: true,
      atende_pj: true,
      vale_refeicao: true,
      ecommerce: true,
      max_parcelas: 12,
      garantia: 12,
      tipos_conexao: ['Wi-Fi', '4G'],
      bandeiras: [
        'Visa',
        'Mastercard',
        'Elo',
        'American Express',
        'Alelo',
        'Sodexo',
      ],
      formas_recebimento: ['Conta Cielo', 'Conta Bancária'],
    },
    pricing: {
      preco: 598.0,
      preco_promocional: null,
      mensalidade: 45.0,
    },
    planos: [
      {
        id: 9,
        nome: 'Cielo Básico',
        taxa_debito: '3,99%',
        taxa_credito_vista: '5,49%',
        taxa_credito_parcelado_min: '6,99%',
        dias_repasse_debito: 2,
        dias_repasse_credito: 30,
        avaliacao: 6.5,
      },
    ],
    observacoes: 'Solução completa com apps e PDV, mas com mensalidade',
    url_contratacao: 'https://cielo.com.br',
    cupom: null,
    transparencia: 5,
    url_avaliacao: null,
    data_atualizacao: new Date('2024-11-01'),
    ativo: true,
  },

  // 10. PagBank Moderninha Plus (Rank 10)
  {
    id: 10,
    nome: 'Moderninha Plus',
    empresa: 'PagBank',
    logo: 'https://example.com/logos/pagbank.png',
    imagem: 'https://example.com/maquininhas/moderninha-plus.png',
    static_score: 6.2,
    raw_scores: {
      competitive_rates: 5.0,
      transparency: 6.0,
      features: 7.0,
      receivables_anticipation: 10,
      reputation: 7.0,
      support_quality: 5.5,
      installment_options: 8, // Só 10 parcelas
      meal_vouchers: 0,
    },
    features: {
      chip: true,
      tarja: true,
      nfc: false, // Não tem NFC
      com_fio: false,
      imprime_recibo: false,
      precisa_smartphone: true,
      permite_antecipacao: true,
      atende_pf: true,
      atende_pj: true,
      vale_refeicao: false,
      ecommerce: false,
      max_parcelas: 10,
      garantia: 6,
      tipos_conexao: ['Bluetooth'],
      bandeiras: ['Visa', 'Mastercard', 'Elo'],
      formas_recebimento: ['Conta PagBank'],
    },
    pricing: {
      preco: 89.9,
      preco_promocional: null,
      mensalidade: 0,
    },
    planos: [
      {
        id: 10,
        nome: 'PagBank Básico',
        taxa_debito: '4,49%',
        taxa_credito_vista: '5,99%',
        taxa_credito_parcelado_min: '7,49%',
        dias_repasse_debito: 1,
        dias_repasse_credito: 30,
        avaliacao: 6.0,
      },
    ],
    observacoes: 'Modelo mais básico do PagSeguro/PagBank',
    url_contratacao: 'https://pagbank.com.br',
    cupom: null,
    transparencia: 6,
    url_avaliacao: null,
    data_atualizacao: new Date('2024-10-15'),
    ativo: true,
  },
];

/**
 * Get all active card machines
 */
export function getActiveCardMachines(): MachineData[] {
  return CARD_MACHINES_DATA.filter((m) => m.ativo);
}

/**
 * Get card machine by ID
 */
export function getCardMachineById(id: number): MachineData | undefined {
  return CARD_MACHINES_DATA.find((m) => m.id === id && m.ativo);
}

/**
 * Get card machines by IDs
 */
export function getCardMachinesByIds(ids: number[]): MachineData[] {
  return CARD_MACHINES_DATA.filter((m) => ids.includes(m.id) && m.ativo);
}
