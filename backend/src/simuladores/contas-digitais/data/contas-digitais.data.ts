import { Injectable } from '@nestjs/common';

/**
 * Tipo de pessoa
 */
export enum TipoPessoa {
  FISICA = 'fisica',
  JURIDICA = 'juridica',
}

/**
 * Tipo de depósito aceito
 */
export enum TipoDeposito {
  DINHEIRO = 'dinheiro',
  CHEQUE = 'cheque',
  AMBOS = 'ambos',
}

/**
 * Interface para conta digital
 * Representa uma conta digital com toda a estrutura de tarifas
 */
export interface ContaDigital {
  id: number;
  nome: string;
  tipoPessoa: TipoPessoa;
  nomeBanco: string;
  logoBanco?: string;

  // Tarifas básicas
  valorMensalidade: number; // Tarifa mensal da conta

  // Saques
  nSaquesGratis: number; // Número de saques gratuitos por mês
  realizaSaque: boolean; // Permite realizar saques
  valorSaque: number; // Custo por saque adicional

  // DOCs (transferências entre bancos)
  nDocsGratis: number; // Número de DOCs gratuitos por mês
  enviaDoc: boolean; // Permite enviar DOCs
  recebeDoc: boolean; // Permite receber DOCs
  valorDoc: number; // Custo por DOC adicional

  // TEDs (transferências eletrônicas)
  nTedsGratis: number; // Número de TEDs gratuitos por mês
  enviaTed: boolean; // Permite enviar TEDs
  recebeTed: boolean; // Permite receber TEDs
  valorTed: number; // Custo por TED adicional

  // Depósitos
  nDepositosGratis: number; // Número de depósitos gratuitos por mês
  aceitaDeposito: boolean; // Aceita depósitos
  valorDeposito: number; // Custo por depósito adicional
  tipoDeposito: TipoDeposito; // Tipo de depósito aceito

  // Boletos (apenas para PJ)
  limiteBoleto: number; // Limite de boletos por mês
  emiteBoleto: boolean; // Permite emissão de boletos
  valorBoleto: number; // Custo por boleto emitido

  // Funcionalidades
  ofereceCartaoCredito: boolean; // Oferece cartão de crédito
  ofereceCartaoDebito: boolean; // Oferece cartão de débito
  aceitaDepositoImg: boolean; // Aceita depósito de cheque por imagem
  realizaInvestimento: boolean; // Permite fazer investimentos
  ofereceCartaoVirtual: boolean; // Oferece cartão virtual (PJ)
  maquinaCartaoInclusa: boolean; // Maquininha de cartão inclusa (PJ)
  ofereceFolhaPagamentos: boolean; // Oferece folha de pagamentos (PJ)

  // Metadados
  urlSiteConta?: string; // URL do site da conta
  ativa: boolean; // Conta está ativa
  comercialmenteAtiva: boolean; // Conta está comercialmente ativa
  observacao?: string; // Observações sobre a conta
}

/**
 * Serviço de dados de contas digitais
 * Fornece dados estáticos de contas digitais brasileiras
 */
@Injectable()
export class ContasDigitaisData {
  /**
   * Lista completa de contas digitais disponíveis
   * Dados atualizados com base nas condições de mercado (2024-2025)
   */
  private readonly contas: ContaDigital[] = [
    // ==================== PESSOA FÍSICA ====================

    // Nubank - Pessoa Física
    {
      id: 1,
      nome: 'Nubank Conta PF',
      tipoPessoa: TipoPessoa.FISICA,
      nomeBanco: 'Nubank',
      logoBanco: 'nubank',
      valorMensalidade: 0,
      nSaquesGratis: 4,
      realizaSaque: true,
      valorSaque: 6.5,
      nDocsGratis: 0,
      enviaDoc: false,
      recebeDoc: true,
      valorDoc: 0,
      nTedsGratis: 999, // Ilimitado via PIX
      enviaTed: true,
      recebeTed: true,
      valorTed: 0,
      nDepositosGratis: 999,
      aceitaDeposito: true,
      valorDeposito: 0,
      tipoDeposito: TipoDeposito.DINHEIRO,
      limiteBoleto: 0,
      emiteBoleto: false,
      valorBoleto: 0,
      ofereceCartaoCredito: true,
      ofereceCartaoDebito: true,
      aceitaDepositoImg: false,
      realizaInvestimento: true,
      ofereceCartaoVirtual: true,
      maquinaCartaoInclusa: false,
      ofereceFolhaPagamentos: false,
      urlSiteConta: 'https://nubank.com.br',
      ativa: true,
      comercialmenteAtiva: true,
      observacao: 'Conta 100% digital com anuidade zero no cartão de crédito',
    },

    // Inter - Pessoa Física
    {
      id: 2,
      nome: 'Conta Digital Inter PF',
      tipoPessoa: TipoPessoa.FISICA,
      nomeBanco: 'Inter',
      logoBanco: 'inter',
      valorMensalidade: 0,
      nSaquesGratis: 8,
      realizaSaque: true,
      valorSaque: 6.9,
      nDocsGratis: 0,
      enviaDoc: false,
      recebeDoc: true,
      valorDoc: 0,
      nTedsGratis: 999,
      enviaTed: true,
      recebeTed: true,
      valorTed: 0,
      nDepositosGratis: 999,
      aceitaDeposito: true,
      valorDeposito: 0,
      tipoDeposito: TipoDeposito.AMBOS,
      limiteBoleto: 0,
      emiteBoleto: false,
      valorBoleto: 0,
      ofereceCartaoCredito: true,
      ofereceCartaoDebito: true,
      aceitaDepositoImg: true,
      realizaInvestimento: true,
      ofereceCartaoVirtual: true,
      maquinaCartaoInclusa: false,
      ofereceFolhaPagamentos: false,
      urlSiteConta: 'https://www.bancointer.com.br',
      ativa: true,
      comercialmenteAtiva: true,
      observacao:
        'Conta completa com investimentos, cartão sem anuidade e cashback',
    },

    // C6 Bank - Pessoa Física
    {
      id: 3,
      nome: 'C6 Bank Conta PF',
      tipoPessoa: TipoPessoa.FISICA,
      nomeBanco: 'C6 Bank',
      logoBanco: 'c6bank',
      valorMensalidade: 0,
      nSaquesGratis: 10,
      realizaSaque: true,
      valorSaque: 9.9,
      nDocsGratis: 0,
      enviaDoc: false,
      recebeDoc: true,
      valorDoc: 0,
      nTedsGratis: 999,
      enviaTed: true,
      recebeTed: true,
      valorTed: 0,
      nDepositosGratis: 999,
      aceitaDeposito: true,
      valorDeposito: 0,
      tipoDeposito: TipoDeposito.DINHEIRO,
      limiteBoleto: 0,
      emiteBoleto: false,
      valorBoleto: 0,
      ofereceCartaoCredito: true,
      ofereceCartaoDebito: true,
      aceitaDepositoImg: false,
      realizaInvestimento: true,
      ofereceCartaoVirtual: true,
      maquinaCartaoInclusa: false,
      ofereceFolhaPagamentos: false,
      urlSiteConta: 'https://www.c6bank.com.br',
      ativa: true,
      comercialmenteAtiva: true,
      observacao: 'Conta global com cartão Mastercard Black sem anuidade',
    },

    // Neon - Pessoa Física
    {
      id: 4,
      nome: 'Neon Conta PF',
      tipoPessoa: TipoPessoa.FISICA,
      nomeBanco: 'Neon',
      logoBanco: 'neon',
      valorMensalidade: 0,
      nSaquesGratis: 3,
      realizaSaque: true,
      valorSaque: 6.5,
      nDocsGratis: 0,
      enviaDoc: false,
      recebeDoc: true,
      valorDoc: 0,
      nTedsGratis: 999,
      enviaTed: true,
      recebeTed: true,
      valorTed: 0,
      nDepositosGratis: 999,
      aceitaDeposito: true,
      valorDeposito: 0,
      tipoDeposito: TipoDeposito.DINHEIRO,
      limiteBoleto: 0,
      emiteBoleto: false,
      valorBoleto: 0,
      ofereceCartaoCredito: true,
      ofereceCartaoDebito: true,
      aceitaDepositoImg: false,
      realizaInvestimento: true,
      ofereceCartaoVirtual: true,
      maquinaCartaoInclusa: false,
      ofereceFolhaPagamentos: false,
      urlSiteConta: 'https://www.neon.com.br',
      ativa: true,
      comercialmenteAtiva: true,
      observacao: 'Conta digital com cartão de crédito sem anuidade e cashback',
    },

    // PicPay - Pessoa Física
    {
      id: 5,
      nome: 'PicPay Conta PF',
      tipoPessoa: TipoPessoa.FISICA,
      nomeBanco: 'PicPay',
      logoBanco: 'picpay',
      valorMensalidade: 0,
      nSaquesGratis: 2,
      realizaSaque: true,
      valorSaque: 7.5,
      nDocsGratis: 0,
      enviaDoc: false,
      recebeDoc: true,
      valorDoc: 0,
      nTedsGratis: 999,
      enviaTed: true,
      recebeTed: true,
      valorTed: 0,
      nDepositosGratis: 999,
      aceitaDeposito: true,
      valorDeposito: 0,
      tipoDeposito: TipoDeposito.DINHEIRO,
      limiteBoleto: 0,
      emiteBoleto: false,
      valorBoleto: 0,
      ofereceCartaoCredito: true,
      ofereceCartaoDebito: true,
      aceitaDepositoImg: false,
      realizaInvestimento: false,
      ofereceCartaoVirtual: true,
      maquinaCartaoInclusa: false,
      ofereceFolhaPagamentos: false,
      urlSiteConta: 'https://www.picpay.com',
      ativa: true,
      comercialmenteAtiva: true,
      observacao: 'Carteira digital com cashback e cartão sem anuidade',
    },

    // 99Pay - Pessoa Física
    {
      id: 6,
      nome: '99Pay Conta PF',
      tipoPessoa: TipoPessoa.FISICA,
      nomeBanco: '99Pay',
      logoBanco: '99pay',
      valorMensalidade: 0,
      nSaquesGratis: 4,
      realizaSaque: true,
      valorSaque: 6.0,
      nDocsGratis: 0,
      enviaDoc: false,
      recebeDoc: true,
      valorDoc: 0,
      nTedsGratis: 999,
      enviaTed: true,
      recebeTed: true,
      valorTed: 0,
      nDepositosGratis: 999,
      aceitaDeposito: true,
      valorDeposito: 0,
      tipoDeposito: TipoDeposito.DINHEIRO,
      limiteBoleto: 0,
      emiteBoleto: false,
      valorBoleto: 0,
      ofereceCartaoCredito: true,
      ofereceCartaoDebito: true,
      aceitaDepositoImg: false,
      realizaInvestimento: false,
      ofereceCartaoVirtual: true,
      maquinaCartaoInclusa: false,
      ofereceFolhaPagamentos: false,
      urlSiteConta: 'https://www.99.co',
      ativa: true,
      comercialmenteAtiva: true,
      observacao: 'Conta digital com benefícios para usuários do 99',
    },

    // Next - Pessoa Física
    {
      id: 7,
      nome: 'Next Conta PF',
      tipoPessoa: TipoPessoa.FISICA,
      nomeBanco: 'Next (Bradesco)',
      logoBanco: 'next',
      valorMensalidade: 0,
      nSaquesGratis: 2,
      realizaSaque: true,
      valorSaque: 8.5,
      nDocsGratis: 0,
      enviaDoc: false,
      recebeDoc: true,
      valorDoc: 0,
      nTedsGratis: 999,
      enviaTed: true,
      recebeTed: true,
      valorTed: 0,
      nDepositosGratis: 999,
      aceitaDeposito: true,
      valorDeposito: 0,
      tipoDeposito: TipoDeposito.AMBOS,
      limiteBoleto: 0,
      emiteBoleto: false,
      valorBoleto: 0,
      ofereceCartaoCredito: true,
      ofereceCartaoDebito: true,
      aceitaDepositoImg: true,
      realizaInvestimento: false,
      ofereceCartaoVirtual: true,
      maquinaCartaoInclusa: false,
      ofereceFolhaPagamentos: false,
      urlSiteConta: 'https://www.next.me',
      ativa: true,
      comercialmenteAtiva: true,
      observacao: 'Banco digital do Bradesco, totalmente gratuito',
    },

    // ==================== PESSOA JURÍDICA ====================

    // Nubank - Pessoa Jurídica
    {
      id: 101,
      nome: 'Nubank PJ',
      tipoPessoa: TipoPessoa.JURIDICA,
      nomeBanco: 'Nubank',
      logoBanco: 'nubank',
      valorMensalidade: 0,
      nSaquesGratis: 4,
      realizaSaque: true,
      valorSaque: 6.5,
      nDocsGratis: 0,
      enviaDoc: false,
      recebeDoc: true,
      valorDoc: 0,
      nTedsGratis: 999,
      enviaTed: true,
      recebeTed: true,
      valorTed: 0,
      nDepositosGratis: 999,
      aceitaDeposito: true,
      valorDeposito: 0,
      tipoDeposito: TipoDeposito.DINHEIRO,
      limiteBoleto: 999,
      emiteBoleto: true,
      valorBoleto: 0,
      ofereceCartaoCredito: true,
      ofereceCartaoDebito: true,
      aceitaDepositoImg: false,
      realizaInvestimento: true,
      ofereceCartaoVirtual: true,
      maquinaCartaoInclusa: false,
      ofereceFolhaPagamentos: false,
      urlSiteConta: 'https://nubank.com.br/pj',
      ativa: true,
      comercialmenteAtiva: true,
      observacao: 'Conta PJ sem tarifas mensais, boletos ilimitados',
    },

    // Inter - Pessoa Jurídica
    {
      id: 102,
      nome: 'Inter Empresas',
      tipoPessoa: TipoPessoa.JURIDICA,
      nomeBanco: 'Inter',
      logoBanco: 'inter',
      valorMensalidade: 0,
      nSaquesGratis: 8,
      realizaSaque: true,
      valorSaque: 6.9,
      nDocsGratis: 0,
      enviaDoc: false,
      recebeDoc: true,
      valorDoc: 0,
      nTedsGratis: 999,
      enviaTed: true,
      recebeTed: true,
      valorTed: 0,
      nDepositosGratis: 999,
      aceitaDeposito: true,
      valorDeposito: 0,
      tipoDeposito: TipoDeposito.AMBOS,
      limiteBoleto: 999,
      emiteBoleto: true,
      valorBoleto: 0,
      ofereceCartaoCredito: true,
      ofereceCartaoDebito: true,
      aceitaDepositoImg: true,
      realizaInvestimento: true,
      ofereceCartaoVirtual: true,
      maquinaCartaoInclusa: true,
      ofereceFolhaPagamentos: true,
      urlSiteConta: 'https://www.bancointer.com.br/pj',
      ativa: true,
      comercialmenteAtiva: true,
      observacao:
        'Conta PJ completa com maquininha grátis e folha de pagamento',
    },

    // C6 Bank - Pessoa Jurídica
    {
      id: 103,
      nome: 'C6 Bank Empresas',
      tipoPessoa: TipoPessoa.JURIDICA,
      nomeBanco: 'C6 Bank',
      logoBanco: 'c6bank',
      valorMensalidade: 0,
      nSaquesGratis: 10,
      realizaSaque: true,
      valorSaque: 9.9,
      nDocsGratis: 0,
      enviaDoc: false,
      recebeDoc: true,
      valorDoc: 0,
      nTedsGratis: 999,
      enviaTed: true,
      recebeTed: true,
      valorTed: 0,
      nDepositosGratis: 999,
      aceitaDeposito: true,
      valorDeposito: 0,
      tipoDeposito: TipoDeposito.DINHEIRO,
      limiteBoleto: 999,
      emiteBoleto: true,
      valorBoleto: 0,
      ofereceCartaoCredito: true,
      ofereceCartaoDebito: true,
      aceitaDepositoImg: false,
      realizaInvestimento: true,
      ofereceCartaoVirtual: true,
      maquinaCartaoInclusa: false,
      ofereceFolhaPagamentos: false,
      urlSiteConta: 'https://www.c6bank.com.br/pj',
      ativa: true,
      comercialmenteAtiva: true,
      observacao: 'Conta PJ global sem mensalidade com cartões corporativos',
    },

    // Neon - Pessoa Jurídica
    {
      id: 104,
      nome: 'Neon PJ',
      tipoPessoa: TipoPessoa.JURIDICA,
      nomeBanco: 'Neon',
      logoBanco: 'neon',
      valorMensalidade: 0,
      nSaquesGratis: 3,
      realizaSaque: true,
      valorSaque: 6.5,
      nDocsGratis: 0,
      enviaDoc: false,
      recebeDoc: true,
      valorDoc: 0,
      nTedsGratis: 999,
      enviaTed: true,
      recebeTed: true,
      valorTed: 0,
      nDepositosGratis: 999,
      aceitaDeposito: true,
      valorDeposito: 0,
      tipoDeposito: TipoDeposito.DINHEIRO,
      limiteBoleto: 999,
      emiteBoleto: true,
      valorBoleto: 0,
      ofereceCartaoCredito: true,
      ofereceCartaoDebito: true,
      aceitaDepositoImg: false,
      realizaInvestimento: false,
      ofereceCartaoVirtual: true,
      maquinaCartaoInclusa: false,
      ofereceFolhaPagamentos: false,
      urlSiteConta: 'https://www.neon.com.br/pj',
      ativa: true,
      comercialmenteAtiva: true,
      observacao: 'Conta PJ sem tarifas com boletos ilimitados',
    },

    // PicPay - Pessoa Jurídica
    {
      id: 105,
      nome: 'PicPay Pro',
      tipoPessoa: TipoPessoa.JURIDICA,
      nomeBanco: 'PicPay',
      logoBanco: 'picpay',
      valorMensalidade: 0,
      nSaquesGratis: 2,
      realizaSaque: true,
      valorSaque: 7.5,
      nDocsGratis: 0,
      enviaDoc: false,
      recebeDoc: true,
      valorDoc: 0,
      nTedsGratis: 999,
      enviaTed: true,
      recebeTed: true,
      valorTed: 0,
      nDepositosGratis: 999,
      aceitaDeposito: true,
      valorDeposito: 0,
      tipoDeposito: TipoDeposito.DINHEIRO,
      limiteBoleto: 999,
      emiteBoleto: true,
      valorBoleto: 0,
      ofereceCartaoCredito: true,
      ofereceCartaoDebito: true,
      aceitaDepositoImg: false,
      realizaInvestimento: false,
      ofereceCartaoVirtual: true,
      maquinaCartaoInclusa: true,
      ofereceFolhaPagamentos: false,
      urlSiteConta: 'https://www.picpay.com/pro',
      ativa: true,
      comercialmenteAtiva: true,
      observacao: 'Conta para empresas com maquininha PicPay incluída',
    },

    // Banco do Brasil - Pessoa Física (Exemplo de conta tradicional)
    {
      id: 8,
      nome: 'BB Conta Corrente PF',
      tipoPessoa: TipoPessoa.FISICA,
      nomeBanco: 'Banco do Brasil',
      logoBanco: 'bb',
      valorMensalidade: 29.9,
      nSaquesGratis: 4,
      realizaSaque: true,
      valorSaque: 6.5,
      nDocsGratis: 2,
      enviaDoc: true,
      recebeDoc: true,
      valorDoc: 8.5,
      nTedsGratis: 2,
      enviaTed: true,
      recebeTed: true,
      valorTed: 8.5,
      nDepositosGratis: 999,
      aceitaDeposito: true,
      valorDeposito: 0,
      tipoDeposito: TipoDeposito.AMBOS,
      limiteBoleto: 0,
      emiteBoleto: false,
      valorBoleto: 0,
      ofereceCartaoCredito: true,
      ofereceCartaoDebito: true,
      aceitaDepositoImg: true,
      realizaInvestimento: true,
      ofereceCartaoVirtual: true,
      maquinaCartaoInclusa: false,
      ofereceFolhaPagamentos: false,
      urlSiteConta: 'https://www.bb.com.br',
      ativa: true,
      comercialmenteAtiva: true,
      observacao: 'Conta tradicional com ampla rede de agências e caixas',
    },

    // Caixa - Pessoa Física (Exemplo de conta tradicional)
    {
      id: 9,
      nome: 'Caixa Fácil',
      tipoPessoa: TipoPessoa.FISICA,
      nomeBanco: 'Caixa Econômica Federal',
      logoBanco: 'caixa',
      valorMensalidade: 24.9,
      nSaquesGratis: 4,
      realizaSaque: true,
      valorSaque: 6.5,
      nDocsGratis: 2,
      enviaDoc: true,
      recebeDoc: true,
      valorDoc: 7.9,
      nTedsGratis: 2,
      enviaTed: true,
      recebeTed: true,
      valorTed: 7.9,
      nDepositosGratis: 999,
      aceitaDeposito: true,
      valorDeposito: 0,
      tipoDeposito: TipoDeposito.AMBOS,
      limiteBoleto: 0,
      emiteBoleto: false,
      valorBoleto: 0,
      ofereceCartaoCredito: true,
      ofereceCartaoDebito: true,
      aceitaDepositoImg: true,
      realizaInvestimento: true,
      ofereceCartaoVirtual: true,
      maquinaCartaoInclusa: false,
      ofereceFolhaPagamentos: false,
      urlSiteConta: 'https://www.caixa.gov.br',
      ativa: true,
      comercialmenteAtiva: true,
      observacao: 'Conta com tarifas acessíveis e ampla rede de lotéricas',
    },
  ];

  /**
   * Obtém todas as contas digitais
   */
  obterTodasContas(): ContaDigital[] {
    return this.contas;
  }

  /**
   * Obtém contas digitais filtradas por tipo de pessoa
   */
  obterContasPorTipo(tipoPessoa: TipoPessoa): ContaDigital[] {
    return this.contas.filter(
      (conta) =>
        conta.tipoPessoa === tipoPessoa &&
        conta.ativa &&
        conta.comercialmenteAtiva,
    );
  }

  /**
   * Obtém uma conta digital específica por ID
   */
  obterContaPorId(id: number): ContaDigital | undefined {
    return this.contas.find((conta) => conta.id === id);
  }
}
