"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DigitalAccountsScoreCalculator = void 0;
const criteria_data_1 = require("../data/criteria.data");
class DigitalAccountsScoreCalculator {
    static rankAccounts(accounts) {
        const scored = accounts.map((account) => this.calculateScore(account));
        const sorted = scored.sort((a, b) => b.score - a.score);
        sorted.forEach((account, index) => {
            account.rank = index + 1;
            account.isBestOption = index === 0;
        });
        return sorted;
    }
    static calculateScore(account) {
        let totalWeight = 0;
        let weightedScore = 0;
        const breakdown = criteria_data_1.DIGITAL_ACCOUNT_CRITERIA.map((criterion) => {
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
                percentage: 0,
            };
        });
        const score = totalWeight > 0 ? Number((weightedScore / totalWeight).toFixed(2)) : 0;
        const normalizedBreakdown = breakdown.map((item) => ({
            ...item,
            percentage: weightedScore > 0
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
exports.DigitalAccountsScoreCalculator = DigitalAccountsScoreCalculator;
//# sourceMappingURL=score-calculator.js.map