export interface BaseRankingItem {
    id: number;
    name: string;
    score: number;
    rank: number;
    isBestOption?: boolean;
}
export interface RankingCriterion {
    key: string;
    name: string;
    weight: number;
    type: 'boolean' | 'numeric' | 'scale';
    description?: string;
}
export interface BaseRankingResponse<T extends BaseRankingItem> {
    items: T[];
    total: number;
    bestOption: T;
    criteria: RankingCriterion[];
    lastUpdated: Date;
}
export interface RawScores {
    [criterionKey: string]: number;
}
