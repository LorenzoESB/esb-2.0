import { RankingCriterion } from '../../shared/interfaces/base-ranking.interface';
export declare const CARD_MACHINE_CRITERIA: RankingCriterion[];
export declare const TOTAL_CRITERIA_WEIGHT: number;
export declare function getCriterionByKey(key: string): RankingCriterion | undefined;
export declare function validateRawScores(rawScores: Record<string, number>): boolean;
