# Esquema de Entradas Normalizadas por Simulador

## Convenções Globais
- Moeda: BRL com 2 casas decimais
- Taxas:
  - Anual (%): converter para mensal efetiva via (1 + anual/100)^(1/12) − 1
  - Mensal (decimal): 0.005 representa 0,5% ao mês
- Prazo: meses inteiros
- Encargos: valores mensais (BRL)

## Amortização
- valorFinanciamento: number (BRL)
- taxaJurosAnual: number (%)
- prazoMeses: number (meses)
- seguroMensal: number (BRL)
- taxaAdministracao: number (BRL)
- parcelaAtual: number (0..prazoMeses)
- amortizacoesExtraordinarias: [{ valor: number (BRL), mesOcorrencia: number (1..prazoMeses) }]

## Aposentadoria
- idadeAtual: number (anos)
- idadeAposentadoria: number (anos)
- valorJaAcumulado: number (BRL)
- contribuicaoMensal: number (BRL) ou rendaMensalDesejada: number (BRL)
- taxaMensal: number (decimal), configurável
- incluirCenariosSaque: boolean

## Juros Compostos
- valorInicial: number (BRL)
- aporteMensal: number (BRL)
- tempoAplicacao: number
- tempoAplicacaoUnidade: 'meses' | 'anos'
- taxaJuros: number (% anual)

## Empréstimo Pessoal
- tipoPessoa: 'PF' | 'PJ'
- valorDesejado: number (BRL)
- prazoMeses: number
- renda: number (BRL, opcional)
- flags de cenário: negativado, garantias, consignado etc. conforme modalidade

## Financiamento Imóvel
- valor: number (BRL)
- valor_entrada: number (BRL)
- prazo: number (meses)
- renda: number (BRL)

## Financiamento Veículos
- valor: number (BRL)
- valor_entrada: number (BRL)
- prazo: number (meses)
- renda: number (BRL)
- novo: boolean
- tipo_veiculo: enum (carro, moto, pesados)
- marca: string/opcional

## Maquininhas
- val_debito: number (BRL/mês)
- val_credito: number (BRL/mês)
- val_credito_p: number (BRL/mês)
- num_parcelas: number (1..12+)
- filtros: estrutura de capabilities (mensalidade, tarja, PF/PJ, wifi, etc.)

## Renda Fixa
- investimento: number (BRL)
- prazo: number (meses)
- finalPrazo: boolean (se true, usar prazo; se false, 31 dias)
