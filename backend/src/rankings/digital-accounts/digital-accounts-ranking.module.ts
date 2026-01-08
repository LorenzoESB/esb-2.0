import { Module } from '@nestjs/common';
import { DigitalAccountsRankingService } from './digital-accounts-ranking.service';
import { DigitalAccountsRankingController } from './digital-accounts-ranking.controller';
import { LegacyPrismaModule } from '../../prisma/legacy-prisma.module';

@Module({
  imports: [LegacyPrismaModule],
  controllers: [DigitalAccountsRankingController],
  providers: [DigitalAccountsRankingService],
  exports: [DigitalAccountsRankingService],
})
export class DigitalAccountsRankingModule {}
