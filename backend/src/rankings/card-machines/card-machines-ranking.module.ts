import { Module } from '@nestjs/common';
import { CardMachinesRankingController } from './card-machines-ranking.controller';
import { CardMachinesRankingService } from './card-machines-ranking.service';

/**
 * Card Machines Ranking Module
 *
 * Provides ranking functionality for card machines based on
 * weighted criteria (rates, transparency, features, etc.)
 *
 * Endpoints:
 * - GET /rankings/card-machines - Get ranking with optional filters
 * - GET /rankings/card-machines/criteria - Get criteria details
 */
@Module({
  controllers: [CardMachinesRankingController],
  providers: [CardMachinesRankingService],
  exports: [CardMachinesRankingService],
})
export class CardMachinesRankingModule {}
