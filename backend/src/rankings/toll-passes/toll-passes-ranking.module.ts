import { Module } from '@nestjs/common';
import { TollPassesRankingService } from './toll-passes-ranking.service';
import { TollPassesRankingController } from './toll-passes-ranking.controller';
import { LegacyPrismaModule } from '../../prisma/legacy-prisma.module';

@Module({
  imports: [LegacyPrismaModule],
  controllers: [TollPassesRankingController],
  providers: [TollPassesRankingService],
  exports: [TollPassesRankingService],
})
export class TollPassesRankingModule {}
