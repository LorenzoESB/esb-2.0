import { DIGITAL_ACCOUNT_CRITERIA } from '../data/criteria.data';
import { DigitalAccountData } from '../interfaces/digital-account-ranking.interface';

interface ScoredAccount extends DigitalAccountData {
  scoreBreakdown: {
    key: string;
    name: string;
    weight: number;
    raw_score: number;
    contribution: number;
    percentage: number;
  }[];
}

/**
 * Converte notas brutas (0-5) em score ponderado e ordena os itens.
 * A lógica replica o comportamento do legado, onde a nota geral (0-5)
 * era derivada dos critérios cadastrados no admin.
 */
export class DigitalAccountsScoreCalculator {
  static rankAccounts(accounts: DigitalAccountData[]): ScoredAccount[] {
    const scored = accounts.map((account) => this.calculateScore(account));

    // Ordena por score decrescente e marca melhor opção
    const sorted = scored.sort((a, b) => b.score - a.score);
    sorted.forEach((account, index) => {
      account.rank = index + 1;
      account.isBestOption = index === 0;
    });

    return sorted;
  }

  static calculateScore(account: DigitalAccountData): ScoredAccount {
    let totalWeight = 0;
    let weightedScore = 0;

    const breakdown = DIGITAL_ACCOUNT_CRITERIA.map((criterion) => {
      const raw = Number(account.raw_scores[criterion.key] ?? 0);
      const contribution = raw * criterion.weight;

      weightedScore += contribution;
      totalWeight += criterion.weight;

      return {
        key: criterion.key,
        name: criterion.name,
        weight: criterion.weight,
        raw_score: raw,
        contribution,
        percentage: 0, // será normalizado depois
      };
    });

    const score =
      totalWeight > 0 ? Number((weightedScore / totalWeight).toFixed(2)) : 0;

    const normalizedBreakdown = breakdown.map((item) => ({
      ...item,
      percentage:
        weightedScore > 0
          ? Number(((item.contribution / weightedScore) * 100).toFixed(1))
          : 0,
    }));

    return {
      ...account,
      score,
      scoreBreakdown: normalizedBreakdown,
    };
  }
}
