import {
  InsuranceRawScores,
  InsuranceData,
} from '../interfaces/insurance-ranking.interface';
import {
  INSURANCE_CRITERIA,
  TOTAL_CRITERIA_WEIGHT,
} from '../data/criteria.data';

/**
 * Insurance Score Calculator
 *
 * Implements weighted score calculation for insurance ranking.
 *
 * Formula:
 * Final Score = Σ(criterion_score × weight) / Σ(weights)
 *
 * Where:
 * - criterion_score: Raw score for each criterion (0-10 scale)
 * - weight: Importance weight of the criterion
 * - Σ(weights): Sum of all weights (normalization factor)
 */
export class InsuranceScoreCalculator {
  /**
   * Calculate final score from raw criterion scores
   *
   * @param rawScores - Raw scores for each criterion (0-10 scale)
   * @returns Calculated score (0-10 scale, rounded to 2 decimals)
   */
  static calculateScore(rawScores: InsuranceRawScores): number {
    let weightedSum = 0;

    // Calculate weighted sum
    for (const criterion of INSURANCE_CRITERIA) {
      const rawScore = rawScores[criterion.key];

      if (rawScore === undefined) {
        throw new Error(`Missing raw score for criterion: ${criterion.key}`);
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
   * @param insurance - Insurance data with static_score and raw_scores
   * @param tolerance - Acceptable difference (default 0.1)
   * @returns true if scores match within tolerance
   */
  static verifyScore(insurance: InsuranceData, tolerance = 0.1): boolean {
    const calculated = this.calculateScore(insurance.raw_scores);
    const difference = Math.abs(calculated - insurance.static_score);

    return difference <= tolerance;
  }

  /**
   * Verify all insurance companies have valid static scores
   *
   * @param insurances - Array of insurance data
   * @param tolerance - Acceptable difference (default 0.1)
   * @returns Array of insurances with score mismatches (empty if all valid)
   */
  static verifyAllScores(
    insurances: InsuranceData[],
    tolerance = 0.1,
  ): Array<{
    insurance: string;
    static_score: number;
    calculated_score: number;
    difference: number;
  }> {
    const mismatches: Array<{
      insurance: string;
      static_score: number;
      calculated_score: number;
      difference: number;
    }> = [];

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

  /**
   * Rank insurance companies based on their static scores
   *
   * Assigns rank position (1 = best) based on score
   * Marks the top insurance as best option
   *
   * @param insurances - Array of insurance data
   * @returns Array of insurances sorted and ranked
   */
  static rankInsurances(insurances: InsuranceData[]): InsuranceData[] {
    // Sort by static_score descending (highest first)
    const sorted = [...insurances].sort(
      (a, b) => b.static_score - a.static_score,
    );

    // Assign ranks
    sorted.forEach((insurance, index) => {
      (insurance as any).rank = index + 1;
      (insurance as any).isBestOption = index === 0;
    });

    return sorted;
  }

  /**
   * Calculate and assign fresh scores to insurances (recalculation)
   *
   * Useful if criteria weights change or for verification
   *
   * @param insurances - Array of insurance data
   * @returns Array of insurances with recalculated scores and ranks
   */
  static recalculateAndRank(insurances: InsuranceData[]): InsuranceData[] {
    // Recalculate all scores
    const recalculated = insurances.map((insurance) => ({
      ...insurance,
      static_score: this.calculateScore(insurance.raw_scores),
    }));

    // Rank based on new scores
    return this.rankInsurances(recalculated);
  }

  /**
   * Get criterion contribution to final score
   *
   * Shows how much each criterion contributes to the final score
   *
   * @param rawScores - Raw scores for each criterion
   * @returns Object with contribution per criterion
   */
  static getCriteriaContributions(rawScores: InsuranceRawScores): Record<
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

    for (const criterion of INSURANCE_CRITERIA) {
      const rawScore = rawScores[criterion.key];
      const contribution =
        (rawScore * criterion.weight) / TOTAL_CRITERIA_WEIGHT;
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
