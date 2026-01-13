import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { SimuladoresModule } from './simuladores/simuladores.module';
import { RankingsModule } from './rankings/rankings.module';
import { BlogModule } from './blog/blog.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    SimuladoresModule,
    RankingsModule,
    BlogModule,
    EmailModule,
  ],
})
export class AppModule {}
