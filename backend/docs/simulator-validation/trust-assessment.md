# Matriz de Avaliação de Confiança

Classificação:
- Forte: fórmulas canônicas, precisão adequada, arredondamento consistente
- Moderada: correta em essência, dependências externas ou arredondamento a revisar
- Atenção: simplificações relevantes ou potenciais divergências maiores

## Aposentadoria — Forte
- Fórmulas FV/PV/PMT corretas: [aposentadoria.calc.ts](file:///Users/lorenzogreiribeiro/Documents/repos/educando-seu-bolso/esb-2.0/backend/src/simuladores/aposentadoria/calc/aposentadoria.calc.ts)
- Precisão Decimal e arredondamento a 2 casas: [aposentadoria.service.ts](file:///Users/lorenzogreiribeiro/Documents/repos/educando-seu-bolso/esb-2.0/backend/src/simuladores/aposentadoria/aposentadoria.service.ts#L382-L384)
- Legado alinhado: [calculos.py](file:///Users/lorenzogreiribeiro/Documents/repos/educando-seu-bolso/esb-bolsito-microservices/aposentadoria/gerentesonhos/apps/aposentadoria/calculos.py)

## Empréstimos/Financiamentos — Forte
- PRICE/SAC coerentes: [financiamento/calculos.py](file:///Users/lorenzogreiribeiro/Documents/repos/educando-seu-bolso/esb-bolsito-microservices/main/gerentesonhos/apps/financiamento/calculos.py#L159-L221)
- Precisão Decimal, ordenação por menor parcela, filtros aplicados

## Maquininhas — Forte
- Antecipação simples/composta, precisão 19: [maquininhas/calculos.py](file:///Users/lorenzogreiribeiro/Documents/repos/educando-seu-bolso/esb-bolsito-microservices/main/gerentesonhos/apps/maquininhas/calculos.py#L13-L41)
- Backend com Decimal e arredondamento final consistente

## Renda Fixa — Moderada
- Cálculos corretos, porém dependência de APIs externas no legado: [renda_fixa/calculos.py](file:///Users/lorenzogreiribeiro/Documents/repos/educando-seu-bolso/esb-bolsito-microservices/main/gerentesonhos/apps/renda_fixa/calculos.py)
- Requer fixtures para validação determinística

## Juros Compostos — Moderada
- Backend mês a mês com taxa efetiva mensal e IR; arredondamento via toFixed(2)
- Comparação com referência externa necessária

## Amortização (simplificada) — Atenção
- Backend simplifica a prestação: juros do mês + saldo/prazo
- Legado usa TR estimada 1.002 e quantizações: [amortizacao/calculos.py](file:///Users/lorenzogreiribeiro/Documents/repos/educando-seu-bolso/esb-bolsito-microservices/main/gerentesonhos/apps/amortizacao/calculos.py#L69-L107)
- Pode divergir em cenários de amortização extraordinária; validar empiricamente
