import { CarSubscriptionData } from '../interfaces/car-subscription.interface';
interface ScoredCarSubscription extends CarSubscriptionData {
    scoreBreakdown: {
        key: string;
        name: string;
        weight: number;
        raw_score: number;
        contribution: number;
        percentage: number;
    }[];
}
export declare class CarSubscriptionScoreCalculator {
    static rank(items: CarSubscriptionData[]): ScoredCarSubscription[];
    static calculate(item: CarSubscriptionData): ScoredCarSubscription;
}
export {};
