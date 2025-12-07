import { Module } from '@nestjs/common';
import { CardMachinesRankingModule } from './card-machines/card-machines-ranking.module';
import { InsuranceRankingModule } from './insurance/insurance-ranking.module';

/**
 * Rankings Module
 *
 * Root module for all ranking features.
 *
 * Currently includes:
 * - Card Machines Ranking
 *
 * Future rankings to be added:
 * - Insurance Ranking
 * - Toll Tags Ranking
 * - Digital Accounts Ranking
 * - Car Subscription Ranking
 *
 * Note: Rankings are SEPARATE from Simulators.
 * - Simulators: Calculate based on user input
 * - Rankings: Show pre-calculated rankings with optional filters
 */
@Module({
  imports: [CardMachinesRankingModule, InsuranceRankingModule],
  exports: [CardMachinesRankingModule, InsuranceRankingModule],
})
export class RankingsModule {}
