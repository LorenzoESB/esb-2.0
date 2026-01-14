# Template de Relatório de Divergências

Campos:
- Simulator name
- Input set used
- Output (current backend)
- Output (legacy code)
- Output (external reference)
- Difference description
- Classification: OK / WARNING / ERROR

Exemplo (Markdown):
```
## Amortização
Input:
- valorFinanciamento: 128000
- taxaJurosAnual: 9
- prazoMeses: 360
- parcelaAtual: 28
- seguroMensal: 40
- taxaAdministracao: 25
- amortizacoesExtraordinarias: [{ valor: 22000, mesOcorrencia: 28 }]

Outputs:
- Backend: { novaPrestacao: ..., prazoRestante: ..., saldoDevedor: ... }
- Legado:  { valor: ..., prazo: ..., saldo: ... }
- Externo (EM): { ... }

Diferença:
- Descrever campos, valores e origem provável (p.ex. TR, arredondamento)

Classificação:
- WARNING
```
