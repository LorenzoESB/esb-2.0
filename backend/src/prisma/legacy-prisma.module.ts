import { Module } from '@nestjs/common';
import { LegacyPrismaService } from './legacy-prisma.service';

@Module({
  providers: [LegacyPrismaService],
  exports: [LegacyPrismaService],
})
export class LegacyPrismaModule {}
