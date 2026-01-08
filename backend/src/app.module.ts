import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { SimuladoresModule } from './simuladores/simuladores.module';
import { RankingsModule } from './rankings/rankings.module';
import { BlogModule } from './blog/blog.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    SimuladoresModule,
    RankingsModule,
    BlogModule,
    AdminModule,
  ],
})
export class AppModule {}
