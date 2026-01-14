import { MachineRawScores, MachineData } from '../interfaces/machine-ranking.interface';
export declare class CardMachineScoreCalculator {
    static calculateScore(rawScores: MachineRawScores): number;
    static verifyScore(machine: MachineData, tolerance?: number): boolean;
    static verifyAllScores(machines: MachineData[], tolerance?: number): Array<{
        machine: string;
        static_score: number;
        calculated_score: number;
        difference: number;
    }>;
    static rankMachines(machines: MachineData[]): MachineData[];
    static recalculateAndRank(machines: MachineData[]): MachineData[];
    static getCriteriaContributions(rawScores: MachineRawScores): Record<string, {
        raw_score: number;
        weight: number;
        contribution: number;
        percentage: number;
    }>;
}
