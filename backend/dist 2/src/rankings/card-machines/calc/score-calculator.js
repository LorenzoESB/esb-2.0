"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardMachineScoreCalculator = void 0;
const criteria_data_1 = require("../data/criteria.data");
class CardMachineScoreCalculator {
    static calculateScore(rawScores) {
        let weightedSum = 0;
        for (const criterion of criteria_data_1.CARD_MACHINE_CRITERIA) {
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
    static verifyScore(machine, tolerance = 0.1) {
        const calculated = this.calculateScore(machine.raw_scores);
        const difference = Math.abs(calculated - machine.static_score);
        return difference <= tolerance;
    }
    static verifyAllScores(machines, tolerance = 0.1) {
        const mismatches = [];
        for (const machine of machines) {
            const calculated = this.calculateScore(machine.raw_scores);
            const difference = Math.abs(calculated - machine.static_score);
            if (difference > tolerance) {
                mismatches.push({
                    machine: machine.nome,
                    static_score: machine.static_score,
                    calculated_score: calculated,
                    difference,
                });
            }
        }
        return mismatches;
    }
    static rankMachines(machines) {
        const sorted = [...machines].sort((a, b) => b.static_score - a.static_score);
        sorted.forEach((machine, index) => {
            machine.rank = index + 1;
            machine.isBestOption = index === 0;
        });
        return sorted;
    }
    static recalculateAndRank(machines) {
        const recalculated = machines.map((machine) => ({
            ...machine,
            static_score: this.calculateScore(machine.raw_scores),
        }));
        return this.rankMachines(recalculated);
    }
    static getCriteriaContributions(rawScores) {
        const contributions = {};
        const totalScore = this.calculateScore(rawScores);
        for (const criterion of criteria_data_1.CARD_MACHINE_CRITERIA) {
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
exports.CardMachineScoreCalculator = CardMachineScoreCalculator;
//# sourceMappingURL=score-calculator.js.map