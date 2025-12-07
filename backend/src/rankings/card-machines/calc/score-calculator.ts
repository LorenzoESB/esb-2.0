import {
  MachineRawScores,
  MachineData,
  MachineRankingItem,
} from '../interfaces/machine-ranking.interface';
import {
  CARD_MACHINE_CRITERIA,
  TOTAL_CRITERIA_WEIGHT,
} from '../data/criteria.data';

/**
 * Card Machine Score Calculator
 *
 * Implements weighted score calculation for card machine ranking.
 *
 * Formula:
 * Final Score = Σ(criterion_score × weight) / Σ(weights)
 *
 * Where:
 * - criterion_score: Raw score for each criterion (0-10 scale)
 * - weight: Importance weight of the criterion
 * - Σ(weights): Sum of all weights (normalization factor)
 *
 * Example:
 * If competitive_rates = 9.5 (weight 3.0)
 * and transparency = 10 (weight 2.0)
 * and features = 8.0 (weight 1.5)
 * ... etc
 *
 * Final = (9.5×3.0 + 10×2.0 + 8.0×1.5 + ...) / total_weights
 */
export class CardMachineScoreCalculator {
  /**
   * Calculate final score from raw criterion scores
   *
   * @param rawScores - Raw scores for each criterion (0-10 scale)
   * @returns Calculated score (0-10 scale, rounded to 2 decimals)
   */
  static calculateScore(rawScores: MachineRawScores): number {
    let weightedSum = 0;

    // Calculate weighted sum
    for (const criterion of CARD_MACHINE_CRITERIA) {
      const rawScore = rawScores[criterion.key];

      if (rawScore === undefined) {
        throw new Error(
          `Missing raw score for criterion: ${criterion.key}`,
        );
      }

      // Validate raw score is in 0-10 range
      if (rawScore < 0 || rawScore > 10) {
        throw new Error(
          `Raw score for ${criterion.key} must be between 0 and 10, got ${rawScore}`,
        );
      }

      weightedSum += rawScore * criterion.weight;
    }

    // Normalize by total weight
    const finalScore = weightedSum / TOTAL_CRITERIA_WEIGHT;

    // Round to 2 decimal places
    return Math.round(finalScore * 100) / 100;
  }

  /**
   * Verify that static score matches calculated score
   *
   * Used in tests to ensure data integrity
   *
   * @param machine - Machine data with static_score and raw_scores
   * @param tolerance - Acceptable difference (default 0.1)
   * @returns true if scores match within tolerance
   */
  static verifyScore(machine: MachineData, tolerance = 0.1): boolean {
    const calculated = this.calculateScore(machine.raw_scores);
    const difference = Math.abs(calculated - machine.static_score);

    return difference <= tolerance;
  }

  /**
   * Verify all machines have valid static scores
   *
   * @param machines - Array of machine data
   * @param tolerance - Acceptable difference (default 0.1)
   * @returns Array of machines with score mismatches (empty if all valid)
   */
  static verifyAllScores(
    machines: MachineData[],
    tolerance = 0.1,
  ): Array<{
    machine: string;
    static_score: number;
    calculated_score: number;
    difference: number;
  }> {
    const mismatches: Array<{
      machine: string;
      static_score: number;
      calculated_score: number;
      difference: number;
    }> = [];

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

  /**
   * Rank machines based on their static scores
   *
   * Assigns rank position (1 = best) based on score
   * Marks the top machine as best option
   *
   * @param machines - Array of machine data
   * @returns Array of machines sorted and ranked
   */
  static rankMachines(machines: MachineData[]): MachineData[] {
    // Sort by static_score descending (highest first)
    const sorted = [...machines].sort((a, b) => b.static_score - a.static_score);

    // Assign ranks
    sorted.forEach((machine, index) => {
      (machine as any).rank = index + 1;
      (machine as any).isBestOption = index === 0;
    });

    return sorted;
  }

  /**
   * Calculate and assign fresh scores to machines (recalculation)
   *
   * Useful if criteria weights change or for verification
   *
   * @param machines - Array of machine data
   * @returns Array of machines with recalculated scores and ranks
   */
  static recalculateAndRank(machines: MachineData[]): MachineData[] {
    // Recalculate all scores
    const recalculated = machines.map((machine) => ({
      ...machine,
      static_score: this.calculateScore(machine.raw_scores),
    }));

    // Rank based on new scores
    return this.rankMachines(recalculated);
  }

  /**
   * Get criterion contribution to final score
   *
   * Shows how much each criterion contributes to the final score
   *
   * @param rawScores - Raw scores for each criterion
   * @returns Object with contribution per criterion
   */
  static getCriteriaContributions(rawScores: MachineRawScores): Record<
    string,
    {
      raw_score: number;
      weight: number;
      contribution: number;
      percentage: number;
    }
  > {
    const contributions: Record<
      string,
      {
        raw_score: number;
        weight: number;
        contribution: number;
        percentage: number;
      }
    > = {};

    const totalScore = this.calculateScore(rawScores);

    for (const criterion of CARD_MACHINE_CRITERIA) {
      const rawScore = rawScores[criterion.key];
      const contribution = (rawScore * criterion.weight) / TOTAL_CRITERIA_WEIGHT;
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
