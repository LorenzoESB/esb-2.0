import { Module } from '@nestjs/common';
import { InsuranceRankingController } from './insurance-ranking.controller';
import { InsuranceRankingService } from './insurance-ranking.service';

/**
 * Insurance Ranking Module
 *
 * Provides ranking functionality for insurance companies based on
 * weighted criteria (cobertura, preço, reputação, etc.)
 */
@Module({
  controllers: [InsuranceRankingController],
  providers: [InsuranceRankingService],
  exports: [InsuranceRankingService],
})
export class InsuranceRankingModule {}
