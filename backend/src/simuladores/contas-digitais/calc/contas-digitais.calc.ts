import { ContaDigital, TipoPessoa } from '../data/contas-digitais.data';

/**
 * Interface para os dados de entrada da simulação (Pessoa Física)
 */
export interface DadosSimulacaoFisica {
  tipoPessoa: TipoPessoa.FISICA;
  temConta: boolean;
  tarifa: number;
  saques: number;
  nDocs: number;
  nTeds: number;
  nDepositos: number;
  credito: boolean;
  debito: boolean;
  investimentos: boolean;
  transferencias: boolean;
  depCheque: boolean;
}

/**
 * Interface para os dados de entrada da simulação (Pessoa Jurídica)
 */
export interface DadosSimulacaoJuridica {
  tipoPessoa: TipoPessoa.JURIDICA;
  temConta: boolean;
  tarifa: number;
  saques: number;
  nDocs: number;
  nTeds: number;
  boletos: number;
  maquininha: boolean;
  folhaPagamento: boolean;
  debito: boolean;
  cartaoVirtual: boolean;
}

/**
 * União dos tipos de dados de simulação
 */
export type DadosSimulacao = DadosSimulacaoFisica | DadosSimulacaoJuridica;

/**
 * Interface para o resultado da comparação de uma conta
 */
export interface ResultadoComparacao {
  contaId: number;
  nome: string;
  nomeBanco: string;
  logoBanco?: string;
  mensalidadeConta: number;
  tipoPessoa: TipoPessoa;
  tarifaTotal: number;
  economia: number;
  features: {
    enviaDoc: boolean;
    recebeDoc: boolean;
    enviaTed: boolean;
    recebeTed: boolean;
    cartaoDebito: boolean;
    cartaoCredito: boolean;
    realizaSaque: boolean;
    aceitaDeposito: boolean;
    aceitaDepositoImagem: boolean;
    realizaInvestimento: boolean;
    emiteBoleto: boolean;
    maquininhaInclusa: boolean;
    cartaoVirtual: boolean;
    folhaPagamento: boolean;
  };
  observacao?: string;
  ativa: boolean;
  urlSite?: string;
}

/**
 * Calcula a tarifa total mensal de uma conta com base no uso do cliente
 *
 * Algoritmo (portado do Python):
 * 1. Começa com o valor da mensalidade
 * 2. Calcula custos de saques (quantidade - grátis) * valor
 * 3. Calcula custos de DOCs (quantidade - grátis) * valor
 * 4. Calcula custos de TEDs (quantidade - grátis) * valor
 * 5. Adiciona apenas o MAIOR entre DOC e TED (não ambos)
 * 6. Calcula custos de depósitos (quantidade - grátis) * valor
 * 7. Calcula custos de boletos (quantidade - grátis) * valor (apenas PJ)
 *
 * @param conta - Conta digital a ser avaliada
 * @param dados - Dados de uso do cliente
 * @returns Tarifa total mensal ou null se a conta não atende aos requisitos
 */
export function calcularTarifaTotal(
  conta: ContaDigital,
  dados: DadosSimulacao,
): number | null {
  // Iniciar com a mensalidade
  let tarifaTotal = conta.valorMensalidade;

  // ===== SAQUES =====
  if (dados.saques > 0) {
    if (!conta.realizaSaque) {
      return null; // Conta não oferece saques, pular
    }

    const saquesEfetivos = Math.max(0, dados.saques - conta.nSaquesGratis);
    if (saquesEfetivos > 0) {
      tarifaTotal += saquesEfetivos * conta.valorSaque;
    }
  }

  // ===== DOCs =====
  let tarifaDocs = 0;
  if (dados.nDocs > 0) {
    if (!conta.enviaDoc) {
      // DOC não é mais tão crítico, mas se foi solicitado e não oferece, podemos pular
      // (na prática, a maioria usa PIX/TED agora)
      // Mas para manter compatibilidade com o legado, vamos tratar como requisito
      return null;
    }

    const docsEfetivos = Math.max(0, dados.nDocs - conta.nDocsGratis);
    if (docsEfetivos > 0) {
      tarifaDocs = docsEfetivos * conta.valorDoc;
    }
  }

  // ===== TEDs =====
  let tarifaTeds = 0;
  if (dados.nTeds > 0) {
    if (!conta.enviaTed) {
      return null; // Conta não oferece TEDs, pular
    }

    const tedsEfetivos = Math.max(0, dados.nTeds - conta.nTedsGratis);
    if (tedsEfetivos > 0) {
      tarifaTeds = tedsEfetivos * conta.valorTed;
    }
  }

  // ===== IMPORTANTE: Adicionar apenas o MAIOR entre DOC e TED =====
  // Isso reflete a lógica do sistema legado: cliente usa um OU outro, não ambos
  tarifaTotal += Math.max(tarifaDocs, tarifaTeds);

  // ===== DEPÓSITOS (apenas para Pessoa Física) =====
  if (dados.tipoPessoa === TipoPessoa.FISICA) {
    const dadosPF = dados;

    if (dadosPF.nDepositos > 0) {
      if (!conta.aceitaDeposito) {
        return null; // Conta não aceita depósitos, pular
      }

      const depositosEfetivos = Math.max(
        0,
        dadosPF.nDepositos - conta.nDepositosGratis,
      );
      if (depositosEfetivos > 0) {
        tarifaTotal += depositosEfetivos * conta.valorDeposito;
      }
    }
  }

  // ===== BOLETOS (apenas para PJ) =====
  if (dados.tipoPessoa === TipoPessoa.JURIDICA) {
    const dadosPJ = dados;

    if (dadosPJ.boletos > 0) {
      if (!conta.emiteBoleto) {
        return null; // Conta não emite boletos, pular
      }

      const boletosEfetivos = Math.max(0, dadosPJ.boletos - conta.limiteBoleto);
      if (boletosEfetivos > 0) {
        tarifaTotal += boletosEfetivos * conta.valorBoleto;
      }
    }
  }

  return tarifaTotal;
}

/**
 * Verifica se uma conta atende aos requisitos de funcionalidades do cliente
 *
 * @param conta - Conta digital a ser avaliada
 * @param dados - Dados de requisitos do cliente
 * @returns true se atende todos os requisitos, false caso contrário
 */
export function verificarRequisitos(
  conta: ContaDigital,
  dados: DadosSimulacao,
): boolean {
  // Verificar requisitos de Pessoa Física
  if (dados.tipoPessoa === TipoPessoa.FISICA) {
    const dadosPF = dados;

    // Cartão de crédito
    if (dadosPF.credito && !conta.ofereceCartaoCredito) {
      return false;
    }

    // Cartão de débito
    if (dadosPF.debito && !conta.ofereceCartaoDebito) {
      return false;
    }

    // Investimentos
    if (dadosPF.investimentos && !conta.realizaInvestimento) {
      return false;
    }

    // Recebe transferências (TED/DOC)
    if (dadosPF.transferencias && !conta.recebeTed && !conta.recebeDoc) {
      return false;
    }

    // Depósito de cheque por imagem
    if (dadosPF.depCheque && !conta.aceitaDepositoImg) {
      return false;
    }
  }

  // Verificar requisitos de Pessoa Jurídica
  if (dados.tipoPessoa === TipoPessoa.JURIDICA) {
    const dadosPJ = dados;

    // Cartão de débito
    if (dadosPJ.debito && !conta.ofereceCartaoDebito) {
      return false;
    }

    // Cartão virtual
    if (dadosPJ.cartaoVirtual && !conta.ofereceCartaoVirtual) {
      return false;
    }

    // Maquininha de cartão
    if (dadosPJ.maquininha && !conta.maquinaCartaoInclusa) {
      return false;
    }

    // Folha de pagamento
    if (dadosPJ.folhaPagamento && !conta.ofereceFolhaPagamentos) {
      return false;
    }
  }

  return true;
}

/**
 * Calcula comparação de contas digitais
 *
 * Processo (portado do algoritmo Python):
 * 1. Filtrar contas por tipo de pessoa e status ativo
 * 2. Para cada conta:
 *    a. Verificar se atende aos requisitos de funcionalidades
 *    b. Calcular tarifa total mensal
 *    c. Se a conta não atender, pular para a próxima
 * 3. Calcular economia (se tem conta atual)
 * 4. Ordenar por tarifa total (menor para maior)
 *
 * @param contas - Lista de todas as contas digitais disponíveis
 * @param dados - Dados de uso e requisitos do cliente
 * @returns Lista de contas que atendem aos requisitos, ordenadas por custo
 */
export function calcularComparacaoContas(
  contas: ContaDigital[],
  dados: DadosSimulacao,
): ResultadoComparacao[] {
  const resultados: ResultadoComparacao[] = [];

  // Filtrar contas por tipo de pessoa e status
  const contasFiltradas = contas.filter(
    (conta) =>
      conta.tipoPessoa === dados.tipoPessoa &&
      conta.ativa &&
      conta.comercialmenteAtiva,
  );

  for (const conta of contasFiltradas) {
    // Verificar requisitos de funcionalidades
    if (!verificarRequisitos(conta, dados)) {
      continue; // Pular esta conta
    }

    // Calcular tarifa total
    const tarifaTotal = calcularTarifaTotal(conta, dados);

    if (tarifaTotal === null) {
      continue; // Pular esta conta (não atende aos requisitos de transações)
    }

    // Calcular economia
    // Só mostrar economia se o cliente já tem uma conta e informou a tarifa
    const economia =
      dados.temConta && dados.tarifa > 0 ? dados.tarifa - tarifaTotal : 0;

    // Criar resultado
    const resultado: ResultadoComparacao = {
      contaId: conta.id,
      nome: conta.nome,
      nomeBanco: conta.nomeBanco,
      logoBanco: conta.logoBanco,
      mensalidadeConta: conta.valorMensalidade,
      tipoPessoa: conta.tipoPessoa,
      tarifaTotal,
      economia,
      features: {
        enviaDoc: conta.enviaDoc,
        recebeDoc: conta.recebeDoc,
        enviaTed: conta.enviaTed,
        recebeTed: conta.recebeTed,
        cartaoDebito: conta.ofereceCartaoDebito,
        cartaoCredito: conta.ofereceCartaoCredito,
        realizaSaque: conta.realizaSaque,
        aceitaDeposito: conta.aceitaDeposito,
        aceitaDepositoImagem: conta.aceitaDepositoImg,
        realizaInvestimento: conta.realizaInvestimento,
        emiteBoleto: conta.emiteBoleto,
        maquininhaInclusa: conta.maquinaCartaoInclusa,
        cartaoVirtual: conta.ofereceCartaoVirtual,
        folhaPagamento: conta.ofereceFolhaPagamentos,
      },
      observacao: conta.observacao,
      ativa: conta.ativa,
      urlSite: conta.urlSiteConta,
    };

    resultados.push(resultado);
  }

  // Ordenar por tarifa total (menor para maior)
  resultados.sort((a, b) => a.tarifaTotal - b.tarifaTotal);

  return resultados;
}
