import { TollPassData } from '../interfaces/toll-pass-ranking.interface';
interface ScoredTollPass extends TollPassData {
    scoreBreakdown: {
        key: string;
        name: string;
        weight: number;
        raw_score: number;
        contribution: number;
        percentage: number;
    }[];
}
export declare class TollPassScoreCalculator {
    static rank(items: TollPassData[]): ScoredTollPass[];
    static calculate(item: TollPassData): ScoredTollPass;
}
export {};
