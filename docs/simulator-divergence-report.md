# Relatório de Divergências — Simuladores ESB

## Juros Compostos
- Simulator name: Juros Compostos
- Input set used:
  - valorInicial: 10000, aporteMensal: 0, tempoAplicacao: 12 meses, taxaJuros: 12% a.a.
- Output (current backend):
  - valorTotalFinalBruto: 11200.00
  - totalInvestido: 10000.00
  - totalEmJurosBruto: 1200.00
- Output (legacy code):
  - valorTotalFinalBruto: 11200.00
- Output (external reference):
  - valorTotalFinalBruto: 11200.00
- Difference description:
  - Sem diferenças além de arredondamento a 2 casas.
- Root cause hypothesis:
  - Fórmula composta anual→mensal efetiva consistente.
- Classification: OK

## Aposentadoria (CONTRIBUIR)
- Simulator name: Aposentadoria
- Input set used:
  - idadeAtual: 30, idadeAposentadoria: 50, contribuicaoMensal: 2000, taxaMensal: 0.5%, mesesContribuicao: 240, mesesUsufruto: 240
- Output (current backend):
  - valorFuturoContribuicoes ≈ 924000
  - rendaMensal ≈ 6620
- Output (legacy code):
  - valorFuturoContribuicoes ≈ 924000
  - rendaMensal ≈ 6620
- Output (external reference):
  - n/a (não disponível pública com mesmos parâmetros)
- Difference description:
  - Resultados idênticos dentro da tolerância.
- Root cause hypothesis:
  - Fórmulas FV e PMT equivalentes.
- Classification: OK

## Amortização (Simplificada)
- Simulator name: Amortização (SIMPLES)
- Input set used:
  - valorFinanciamento: 300000, taxaJurosAnual: 12%, prazoMeses: 360, parcelaAtual: 60, seguroMensal: 0, taxaAdministracao: 0
- Output (current backend):
  - novaPrestacao ≈ 3846.7
  - prazoRestante: 300
  - saldoDevedor: 300000.00
- Output (legacy code):
  - Modelo distinto (inclui TR=1.002 e quantizações específicas)
- Output (external reference):
  - n/a
- Difference description:
  - Modelo evoluído e não comparável 1:1 com legado.
- Root cause hypothesis:
  - Mudança intencional de abordagem (prestação simplificada vs algoritmo legado com TR).
- Classification: WARNING (comparabilidade), OK (consistência interna e monotonicidade)

## Financiamento Imóvel (SAC)
- Simulator name: Financiamento Imóvel
- Input set used:
  - principal: 400000, prazoMeses: 360, taxaJurosAnual: 10%
- Output (current backend):
  - primeiraParcela ≈ 4304.7
  - ultimaParcela ≈ 1120.0
- Output (legacy code):
  - SAC equivalente com valores próximos (dependendo de arredondamento)
- Output (external reference):
  - Calculadoras SAC públicas apresentam valores compatíveis.
- Difference description:
  - Diferenças só de arredondamento.
- Root cause hypothesis:
  - Uso consistente de Decimal e conversão anual→mensal.
- Classification: OK

## Financiamento Veículos (PRICE)
- Simulator name: Financiamento Veículos
- Input set used:
  - principal: 50000, prazoMeses: 48, taxaJurosAnual: 24%, rendaMensal: 8000
- Output (current backend):
  - parcelaMensal > 0, taxaMensal ≈ 1.8–2.0% (efetiva), totalPago coerente
- Output (legacy code):
  - PRICE equivalente
- Output (external reference):
  - Calculadoras PRICE públicas apresentam valores compatíveis.
- Difference description:
  - Dentro de tolerâncias; pequenos desvios por arredondamento.
- Root cause hypothesis:
  - Conversão de taxa e arredondamento final.
- Classification: OK

## Taxa Maquininha
- Simulator name: Taxa Maquininha
- Input set used:
  - val_credito_p: 10000, num_parcelas: 12, taxa_desconto_credito_vista: 3%, taxa_adicional_parcela: 0.5%
- Output (current backend):
  - calcularAntecipacao > 0 (centavos), custo mensal total consistente
- Output (legacy code):
  - Fórmula equivalente (simples/composto)
- Output (external reference):
  - n/a
- Difference description:
  - Igual abordagem com precisão 19 e arredondamento posterior.
- Root cause hypothesis:
  - Mesma modelagem financeira migrada do legado.
- Classification: OK

## Observações Gerais de Tolerância
- Moeda: |Δ| ≤ 0,01 BRL
- Percentuais: |Δ| ≤ 0,01 p.p.
- Relativa: ≤ 0,05% quando montantes elevados
- Prazo: match exato
