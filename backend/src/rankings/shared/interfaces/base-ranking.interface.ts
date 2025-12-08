/**
 * Base interfaces for all ranking modules
 *
 * These interfaces provide a common structure for all ranking features,
 * ensuring consistency across different ranking types (card machines,
 * insurance, toll tags, digital accounts, car subscription)
 */

/**
 * Base interface for any item that can be ranked
 *
 * All ranking items (machines, insurance companies, banks, etc.)
 * must extend this interface
 */
export interface BaseRankingItem {
  /**
   * Unique identifier for the ranking item
   */
  id: number;

  /**
   * Display name of the item being ranked
   */
  name: string;

  /**
   * Calculated score (0-10 scale)
   * Hidden from UI response, used internally for ranking
   */
  score: number;

  /**
   * Position in the ranking (1 = best)
   */
  rank: number;

  /**
   * Whether this is marked as the best option
   * Only one item should have this as true
   */
  isBestOption?: boolean;
}

/**
 * Defines a single criterion used for ranking calculation
 */
export interface RankingCriterion {
  /**
   * Unique key for the criterion (e.g., 'competitive_rates')
   */
  key: string;

  /**
   * Display name for the criterion
   */
  name: string;

  /**
   * Weight of this criterion in the overall score calculation
   * Higher weights have more impact on the final score
   */
  weight: number;

  /**
   * Type of criterion value
   */
  type: 'boolean' | 'numeric' | 'scale';

  /**
   * Optional description explaining what this criterion measures
   */
  description?: string;
}

/**
 * Generic base response structure for all ranking endpoints
 *
 * @template T - Type of ranking item (extends BaseRankingItem)
 */
export interface BaseRankingResponse<T extends BaseRankingItem> {
  /**
   * Array of ranked items, sorted by rank (best first)
   */
  items: T[];

  /**
   * Total number of items in the ranking
   */
  total: number;

  /**
   * The best option (item with rank 1)
   */
  bestOption: T;

  /**
   * Criteria used for ranking calculation
   */
  criteria: RankingCriterion[];

  /**
   * When the ranking data was last updated
   */
  lastUpdated: Date;
}

/**
 * Raw scores for each criterion before normalization
 * Used internally for score calculation
 */
export interface RawScores {
  [criterionKey: string]: number;
}
