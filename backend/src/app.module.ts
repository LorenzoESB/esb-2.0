import { Module } from '@nestjs/common';
import { JurosCompostosModule } from './simuladores/juros-composts/juros-compostos.module';
import { ConfigModule } from '@nestjs/config';
import { AmortizacaoModule } from './simuladores/amortizacao/amortizacao.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    JurosCompostosModule,
    AmortizacaoModule,
  ],
})
export class AppModule {}
