import { Module } from '@nestjs/common';
import { CarSubscriptionRankingService } from './car-subscription-ranking.service';
import { CarSubscriptionRankingController } from './car-subscription-ranking.controller';
import { LegacyPrismaModule } from '../../prisma/legacy-prisma.module';

@Module({
  imports: [LegacyPrismaModule],
  controllers: [CarSubscriptionRankingController],
  providers: [CarSubscriptionRankingService],
  exports: [CarSubscriptionRankingService],
})
export class CarSubscriptionRankingModule {}
