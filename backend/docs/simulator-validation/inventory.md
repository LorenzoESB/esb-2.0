# Inventário de Simuladores (ESB Backend ↔ Legado)

## Amortização
- Backend: [amortizacao.service.ts](file:///Users/lorenzogreiribeiro/Documents/repos/educando-seu-bolso/esb-2.0/backend/src/simuladores/amortizacao/amortizacao.service.ts)
- Legado: [amortizacao/calculos.py](file:///Users/lorenzogreiribeiro/Documents/repos/educando-seu-bolso/esb-bolsito-microservices/main/gerentesonhos/apps/amortizacao/calculos.py)
- Entradas:
  - valorFinanciamento (BRL), taxaJurosAnual (%), prazoMeses (meses), seguroMensal (BRL), taxaAdministracao (BRL), parcelaAtual (nº), amortizacoesExtraordinarias [{valor, mesOcorrencia}]
- Saídas:
  - novaPrestacao (BRL), prazoRestante (meses), saldoDevedor (BRL), novaAmortizacaoMensal (BRL), indicadores comparativos (quando aplicável)
- Regras de arredondamento:
  - Backend: Math.round em 2 casas
  - Legado: Decimal.quantize('0.01')
- Observações:
  - Conversão de taxa anual para mensal efetiva
  - TR estimada: Backend ~1.00116 em comparativo; Legado 1.002

## Aposentadoria
- Backend: [aposentadoria.calc.ts](file:///Users/lorenzogreiribeiro/Documents/repos/educando-seu-bolso/esb-2.0/backend/src/simuladores/aposentadoria/calc/aposentadoria.calc.ts), [aposentadoria.service.ts](file:///Users/lorenzogreiribeiro/Documents/repos/educando-seu-bolso/esb-2.0/backend/src/simuladores/aposentadoria/aposentadoria.service.ts)
- Legado: [aposentadoria/calculos.py](file:///Users/lorenzogreiribeiro/Documents/repos/educando-seu-bolso/esb-bolsito-microservices/aposentadoria/gerentesonhos/apps/aposentadoria/calculos.py)
- Entradas:
  - idadeAtual, idadeAposentadoria, valorJaAcumulado, rendaMensalDesejada ou contribuicaoMensal; taxaMensal configurável
- Saídas:
  - Acumulação (valor futuro reserva/contribuições, total acumulado), Usufruto (renda mensal, meses benefício), Sustentabilidade (cenários), Resumo
- Regras de arredondamento:
  - Backend: Decimal.toDecimalPlaces(2)
  - Legado: Decimal (precisão 15), quantize pontual

## Juros Compostos
- Backend: [juros-compostos.service.ts](file:///Users/lorenzogreiribeiro/Documents/repos/educando-seu-bolso/esb-2.0/backend/src/simuladores/juros-composts/juros-compostos.service.ts)
- Legado: não há módulo dedicado; usar referência externa e fórmulas equivalentes
- Entradas:
  - valorInicial (BRL), aporteMensal (BRL), tempoAplicacao (meses/anos), unidade, taxaJuros (anual %)
- Saídas:
  - Valor total final bruto, total investido, juros bruto, detalhes mensais
- Regras de arredondamento:
  - Backend: toFixed(2) em saída

## Empréstimo Pessoal
- Backend: [emprestimo.calc.ts](file:///Users/lorenzogreiribeiro/Documents/repos/educando-seu-bolso/esb-2.0/backend/src/simuladores/emprestimo/calc/emprestimo.calc.ts)
- Legado: [financiamento/calculos.py](file:///Users/lorenzogreiribeiro/Documents/repos/educando-seu-bolso/esb-bolsito-microservices/main/gerentesonhos/apps/financiamento/calculos.py)
- Entradas:
  - valor, prazo, renda, modalidade/flags (PF/PJ, negativado, garantias, etc.)
- Saídas:
  - parcela, valor total, comprometimento, taxa(s), metadados banco
- Regras de arredondamento:
  - Ambos: Decimal com precisão 15; quantize/ordenação

## Financiamento Imóvel
- Backend: [financiamento-imovel.calc.ts](file:///Users/lorenzogreiribeiro/Documents/repos/educando-seu-bolso/esb-2.0/backend/src/simuladores/financiamento-imovel/calc/financiamento-imovel.calc.ts)
- Legado: [financiamento/calculos.py](file:///Users/lorenzogreiribeiro/Documents/repos/educando-seu-bolso/esb-bolsito-microservices/main/gerentesonhos/apps/financiamento/calculos.py)
- Entradas:
  - valor, valor_entrada, prazo, renda
- Saídas:
  - parcela (SAC/PRICE conforme modalidade), valor total, comprometimento

## Financiamento Veículos
- Backend: [financiamento-veiculos.calc.ts](file:///Users/lorenzogreiribeiro/Documents/repos/educando-seu-bolso/esb-2.0/backend/src/simuladores/financiamento-veiculos/calc/financiamento-veiculos.calc.ts)
- Legado: [financiamento/calculos.py](file:///Users/lorenzogreiribeiro/Documents/repos/educando-seu-bolso/esb-bolsito-microservices/main/gerentesonhos/apps/financiamento/calculos.py)
- Entradas:
  - valor, entrada, prazo, renda, novo/usado, tipo, marca
- Saídas:
  - parcela (PRICE), valor total, comprometimento

## Maquininhas
- Backend: [taxa-maquininha.calc.ts](file:///Users/lorenzogreiribeiro/Documents/repos/educando-seu-bolso/esb-2.0/backend/src/simuladores/taxa-maquininha/calc/taxa-maquininha.calc.ts)
- Legado: [maquininhas/calculos.py](file:///Users/lorenzogreiribeiro/Documents/repos/educando-seu-bolso/esb-bolsito-microservices/main/gerentesonhos/apps/maquininhas/calculos.py)
- Entradas:
  - vendas débito/crédito/crédito parcelado, nº de parcelas, filtros
- Saídas:
  - custo mensal total, detalhes por máquina/plano
- Regras de arredondamento:
  - Backend: Decimal precision 19 + arredondamento final 2 casas; Legado: Decimal precision 19

## Renda Fixa
- Backend: [renda-fixa.calc.ts](file:///Users/lorenzogreiribeiro/Documents/repos/educando-seu-bolso/esb-2.0/backend/src/simuladores/renda-fixa/calc/renda-fixa.calc.ts)
- Legado: [renda_fixa/calculos.py](file:///Users/lorenzogreiribeiro/Documents/repos/educando-seu-bolso/esb-bolsito-microservices/main/gerentesonhos/apps/renda_fixa/calculos.py)
- Entradas:
  - investimento (BRL), prazo (meses/dias), finalPrazo
- Saídas:
  - retornos por título (POUP, SELIC, CDB, LCI), índices, melhor título
- Observações:
  - Dependência de APIs externas no legado; normalizar com fixtures

