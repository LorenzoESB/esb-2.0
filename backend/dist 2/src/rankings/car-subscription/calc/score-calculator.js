"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarSubscriptionScoreCalculator = void 0;
const criteria_data_1 = require("../data/criteria.data");
class CarSubscriptionScoreCalculator {
    static rank(items) {
        const scored = items.map((item) => this.calculate(item));
        const sorted = scored.sort((a, b) => b.score - a.score);
        sorted.forEach((item, index) => {
            item.rank = index + 1;
            item.isBestOption = index === 0;
        });
        return sorted;
    }
    static calculate(item) {
        let totalWeight = 0;
        let weightedScore = 0;
        const breakdown = criteria_data_1.CAR_SUBSCRIPTION_CRITERIA.map((criterion) => {
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
        const score = totalWeight > 0 ? Number((weightedScore / totalWeight).toFixed(2)) : 0;
        const normalizedBreakdown = breakdown.map((entry) => ({
            ...entry,
            percentage: weightedScore > 0
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
exports.CarSubscriptionScoreCalculator = CarSubscriptionScoreCalculator;
//# sourceMappingURL=score-calculator.js.map