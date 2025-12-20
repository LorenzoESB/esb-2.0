import { CAR_SUBSCRIPTION_CRITERIA } from '../data/criteria.data';
import { CarSubscriptionData } from '../interfaces/car-subscription.interface';

interface ScoredCarSubscription extends CarSubscriptionData {
  scoreBreakdown: {
    key: string;
    name: string;
    weight: number;
    raw_score: number;
    contribution: number;
    percentage: number;
  }[];
}

export class CarSubscriptionScoreCalculator {
  static rank(items: CarSubscriptionData[]): ScoredCarSubscription[] {
    const scored = items.map((item) => this.calculate(item));
    const sorted = scored.sort((a, b) => b.score - a.score);

    sorted.forEach((item, index) => {
      item.rank = index + 1;
      item.isBestOption = index === 0;
    });

    return sorted;
  }

  static calculate(item: CarSubscriptionData): ScoredCarSubscription {
    let totalWeight = 0;
    let weightedScore = 0;

    const breakdown = CAR_SUBSCRIPTION_CRITERIA.map((criterion) => {
      const raw = Number(item.raw_scores[criterion.key] ?? 0);
      const contribution = raw * criterion.weight;
      totalWeight += criterion.weight;
      weightedScore += contribution;

      return {
        key: criterion.key,
        name: criterion.name,
        weight: criterion.weight,
        raw_score: raw,
        contribution,
        percentage: 0,
      };
    });

    const score =
      totalWeight > 0 ? Number((weightedScore / totalWeight).toFixed(2)) : 0;

    const normalizedBreakdown = breakdown.map((entry) => ({
      ...entry,
      percentage:
        weightedScore > 0
          ? Number(((entry.contribution / weightedScore) * 100).toFixed(1))
          : 0,
    }));

    return {
      ...item,
      score,
      scoreBreakdown: normalizedBreakdown,
    };
  }
}
