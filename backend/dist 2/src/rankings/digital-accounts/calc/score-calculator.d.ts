import { DigitalAccountData } from '../interfaces/digital-account-ranking.interface';
interface ScoredAccount extends DigitalAccountData {
    scoreBreakdown: {
        key: string;
        name: string;
        weight: number;
        raw_score: number;
        contribution: number;
        percentage: number;
    }[];
}
export declare class DigitalAccountsScoreCalculator {
    static rankAccounts(accounts: DigitalAccountData[]): ScoredAccount[];
    static calculateScore(account: DigitalAccountData): ScoredAccount;
}
export {};
