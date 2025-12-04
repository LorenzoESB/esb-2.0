# Simulador de Financiamento Imobiliário

Sistema de simulação de financiamento imobiliário usando o sistema SAC (Sistema de Amortização Constante) com taxas indexadas à TR (Taxa Referencial).

## Características

- **Sistema SAC**: Amortização constante com parcelas decrescentes
- **Taxas TR-indexed**: Obtidas em tempo real do Banco Central do Brasil
- **Múltiplas ofertas**: Compara diferentes instituições financeiras
- **Cálculo de comprometimento de renda**: Análise do impacto na renda mensal

## Arquitetura

Segue rigorosamente Clean Architecture do ESB-2.0:

```
financiamento-imovel/
├── dto/                                          # Data Transfer Objects
│   ├── simular-financiamento-imovel.dto.ts      # Input DTO com validações
│   └── resultado-financiamento-imovel.dto.ts    # Output DTO
├── calc/                                         # Domain Logic (Pure Functions)
│   └── financiamento-imovel.calc.ts             # Cálculos SAC usando Decimal.js
├── data/                                         # Data Layer
│   └── taxas-financiamento.data.ts              # Cliente BCB API
├── financiamento-imovel.controller.ts           # Thin Controller
├── financiamento-imovel.service.ts              # Orchestration Service
├── financiamento-imovel.module.ts               # Module Definition
└── README.md                                     # Documentação
```

## Sistema SAC (Sistema de Amortização Constante)

### Características do SAC

1. **Amortização constante**: O valor principal é dividido igualmente por todas as parcelas
2. **Juros decrescentes**: Calculados sobre o saldo devedor, que diminui a cada mês
3. **Parcelas decrescentes**: A primeira parcela é a maior, a última é a menor
4. **Ideal para longo prazo**: Paga-se menos juros totais comparado ao PRICE

### Fórmulas Implementadas

#### Primeira Parcela (Maior)
```
Primeira Parcela = (Principal / n) + (Principal × i)
```

#### Última Parcela (Menor)
```
Última Parcela = (Principal / n) × (1 + i)
```

#### Total Pago
```
Total = Principal + [(Principal × i × (n + 1)) / 2]
```

Onde:
- **Principal**: Valor financiado (valor do imóvel - entrada)
- **n**: Número de parcelas (meses)
- **i**: Taxa de juros mensal (decimal)

## API Endpoint

### POST `/simuladores/financiamento-imovel/simular`

Simula financiamento imobiliário retornando ofertas ordenadas pela menor primeira parcela.

#### Request Body

```json
{
  "valorImovel": 500000,
  "valorEntrada": 100000,
  "prazoMeses": 360,
  "rendaMensal": 10000,
  "nome": "Maria Silva",
  "email": "maria@example.com"
}
```

#### Response

```json
[
  {
    "nomeBanco": "Banco do Brasil",
    "modalidade": "Financiamento imobiliário com taxas de mercado - Pós-fixado referenciado em TR",
    "parcelaInicial": 3360.00,
    "parcelaFinal": 1122.22,
    "valorTotal": 751200.00,
    "taxaJurosAnual": 10.50,
    "taxaJurosMensal": 0.84,
    "comprometimentoRenda": 33.60,
    "logo": null
  },
  {
    "nomeBanco": "Caixa Econômica Federal",
    "modalidade": "Financiamento imobiliário com taxas de mercado - Pós-fixado referenciado em TR",
    "parcelaInicial": 3476.67,
    "parcelaFinal": 1122.22,
    "valorTotal": 774800.00,
    "taxaJurosAnual": 10.95,
    "taxaJurosMensal": 0.87,
    "comprometimentoRenda": 34.77
  }
]
```

## Integração com Banco Central

### API do Banco Central

Endpoint: `https://olinda.bcb.gov.br/olinda/servico/taxaJuros/versao/v2/odata/TaxasJurosMensalPorMes`

Filtros aplicados:
- **Modalidade**: "Financiamento imobiliário com taxas de mercado - Pós-fixado referenciado em TR"
- **Período**: Mês atual (AAAAMM)
- **Ordenação**: Taxa anual crescente

### Timeout e Fallback

- **Timeout**: 5 segundos
- **Fallback**: Se a API falhar, usa taxas médias históricas de mercado

### Taxas de Fallback

Instituição | Taxa Mensal | Taxa Anual
------------|-------------|------------
Banco do Brasil | 0.84% | 10.50%
Caixa Econômica Federal | 0.87% | 10.95%
Itaú Unibanco | 0.91% | 11.45%
Bradesco | 0.93% | 11.75%
Santander | 0.96% | 12.15%
Banco Safra | 0.98% | 12.45%
Banco Inter | 0.89% | 11.20%

## Cálculos com Decimal.js

Todos os cálculos financeiros usam **Decimal.js** para evitar erros de arredondamento de ponto flutuante.

```typescript
import Decimal from 'decimal.js';

// Configuração
Decimal.set({ precision: 15, rounding: Decimal.ROUND_HALF_UP });

// Exemplo
const primeiraParcela = calcularPrimeiraParcelaSAC(
  400000,  // R$ 400.000 financiados
  360,     // 360 meses (30 anos)
  0.84     // 0.84% ao mês
);
```

## Validações

### Regras de Negócio

1. **Valor da entrada** < Valor do imóvel
2. **Valor financiado** > 0
3. **Renda mensal** > 0
4. **Prazo**: 1 a 420 meses (máximo 35 anos)

### Class Validators

Todas as validações usam decorators do `class-validator`:

```typescript
@IsNumber()
@Min(0)
@Type(() => Number)
valorImovel: number;
```

## Salvamento em Banco de Dados

Cada simulação é salva no banco usando Prisma:

```typescript
await this.prisma.simulation.create({
  data: {
    simulatorType: SimulatorType.FINANCIAMENTO_IMOVEL,
    nome: dto.nome,
    email: dto.email,
    inputData: { ... },
    outputData: { ... }
  }
});
```

## Comprometimento de Renda

Calcula o percentual da renda comprometido com a **primeira parcela** (maior no SAC):

```
Comprometimento = (Primeira Parcela / Renda Mensal) × 100
```

### Interpretação

- **< 30%**: Comprometimento saudável
- **30-35%**: Comprometimento moderado
- **> 35%**: Comprometimento alto (pode dificultar aprovação)

## Testes

### Testes Unitários (Jest)

```bash
pnpm test financiamento-imovel
```

Cobertura:
- Cálculos SAC (primeira parcela, última parcela, total)
- Conversão de taxas (anual → mensal)
- Comprometimento de renda
- Validações de entrada

### Testes E2E (Playwright)

```bash
pnpm test:e2e financiamento-imovel
```

Cenários:
- Simulação completa com sucesso
- Validação de entrada inválida
- Comportamento em caso de falha da API BCB
- Salvamento em banco de dados

## Diferenças vs Sistema PRICE

Característica | SAC | PRICE
---------------|-----|-------
Amortização | Constante | Variável (crescente)
Juros | Decrescentes | Constantes sobre saldo
Parcelas | Decrescentes | Fixas
Total de Juros | **Menor** | Maior
Parcela Inicial | **Maior** | Menor
Ideal para | Longo prazo | Curto/médio prazo

## Limitações Conhecidas

1. **Sem MIP/DFI**: Não calcula Morte e Invalidez Permanente (MIP) ou Danos Físicos ao Imóvel (DFI)
2. **Sem TR dinâmica**: Usa taxas já indexadas à TR do BCB (não busca TR separadamente)
3. **Sem análise de crédito**: Não verifica se o solicitante será aprovado
4. **Sem taxas administrativas**: Não inclui custos de abertura de crédito, seguros, etc.

## Melhorias Futuras

- [ ] Adicionar cálculo de MIP e DFI
- [ ] Incluir custos administrativos e taxas
- [ ] Implementar análise de crédito simulada
- [ ] Cache de taxas BCB (evitar chamadas repetidas)
- [ ] Comparação lado-a-lado SAC vs PRICE
- [ ] Exportar amortização detalhada (parcela a parcela)
- [ ] Suporte a TR dinâmica (buscar TR atual separadamente)

## Exemplo de Uso Completo

```bash
curl -X POST http://localhost:3000/simuladores/financiamento-imovel/simular \
  -H "Content-Type: application/json" \
  -d '{
    "valorImovel": 500000,
    "valorEntrada": 100000,
    "prazoMeses": 360,
    "rendaMensal": 10000,
    "nome": "Maria Silva",
    "email": "maria@example.com"
  }'
```

## Referências

- [Banco Central do Brasil - Taxas de Juros](https://www.bcb.gov.br/estabilidadefinanceira/taxasjuros)
- [Sistema SAC - Wikipedia](https://pt.wikipedia.org/wiki/Sistema_de_amortiza%C3%A7%C3%A3o_constante)
- [Decimal.js Documentation](https://mikemcl.github.io/decimal.js/)
- [NestJS Documentation](https://docs.nestjs.com/)
