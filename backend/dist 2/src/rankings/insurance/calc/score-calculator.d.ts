import { InsuranceRawScores, InsuranceData } from '../interfaces/insurance-ranking.interface';
export declare class InsuranceScoreCalculator {
    static calculateScore(rawScores: InsuranceRawScores): number;
    static verifyScore(insurance: InsuranceData, tolerance?: number): boolean;
    static verifyAllScores(insurances: InsuranceData[], tolerance?: number): Array<{
        insurance: string;
        static_score: number;
        calculated_score: number;
        difference: number;
    }>;
    static rankInsurances(insurances: InsuranceData[]): InsuranceData[];
    static recalculateAndRank(insurances: InsuranceData[]): InsuranceData[];
    static getCriteriaContributions(rawScores: InsuranceRawScores): Record<string, {
        raw_score: number;
        weight: number;
        contribution: number;
        percentage: number;
    }>;
}
