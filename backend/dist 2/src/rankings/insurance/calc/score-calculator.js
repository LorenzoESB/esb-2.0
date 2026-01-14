"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsuranceScoreCalculator = void 0;
const criteria_data_1 = require("../data/criteria.data");
class InsuranceScoreCalculator {
    static calculateScore(rawScores) {
        let weightedSum = 0;
        for (const criterion of criteria_data_1.INSURANCE_CRITERIA) {
            const rawScore = rawScores[criterion.key];
            if (rawScore === undefined) {
                throw new Error(`Missing raw score for criterion: ${criterion.key}`);
            }
            if (rawScore < 0 || rawScore > 10) {
                throw new Error(`Raw score for ${criterion.key} must be between 0 and 10, got ${rawScore}`);
            }
            weightedSum += rawScore * criterion.weight;
        }
        const finalScore = weightedSum / criteria_data_1.TOTAL_CRITERIA_WEIGHT;
        return Math.round(finalScore * 100) / 100;
    }
    static verifyScore(insurance, tolerance = 0.1) {
        const calculated = this.calculateScore(insurance.raw_scores);
        const difference = Math.abs(calculated - insurance.static_score);
        return difference <= tolerance;
    }
    static verifyAllScores(insurances, tolerance = 0.1) {
        const mismatches = [];
        for (const insurance of insurances) {
            const calculated = this.calculateScore(insurance.raw_scores);
            const difference = Math.abs(calculated - insurance.static_score);
            if (difference > tolerance) {
                mismatches.push({
                    insurance: insurance.nome,
                    static_score: insurance.static_score,
                    calculated_score: calculated,
                    difference,
                });
            }
        }
        return mismatches;
    }
    static rankInsurances(insurances) {
        const sorted = [...insurances].sort((a, b) => b.static_score - a.static_score);
        sorted.forEach((insurance, index) => {
            insurance.rank = index + 1;
            insurance.isBestOption = index === 0;
        });
        return sorted;
    }
    static recalculateAndRank(insurances) {
        const recalculated = insurances.map((insurance) => ({
            ...insurance,
            static_score: this.calculateScore(insurance.raw_scores),
        }));
        return this.rankInsurances(recalculated);
    }
    static getCriteriaContributions(rawScores) {
        const contributions = {};
        const totalScore = this.calculateScore(rawScores);
        for (const criterion of criteria_data_1.INSURANCE_CRITERIA) {
            const rawScore = rawScores[criterion.key];
            const contribution = (rawScore * criterion.weight) / criteria_data_1.TOTAL_CRITERIA_WEIGHT;
            const percentage = (contribution / totalScore) * 100;
            contributions[criterion.key] = {
                raw_score: rawScore,
                weight: criterion.weight,
                contribution: Math.round(contribution * 100) / 100,
                percentage: Math.round(percentage * 100) / 100,
            };
        }
        return contributions;
    }
}
exports.InsuranceScoreCalculator = InsuranceScoreCalculator;
//# sourceMappingURL=score-calculator.js.map