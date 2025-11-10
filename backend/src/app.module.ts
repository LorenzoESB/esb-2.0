import { Module } from '@nestjs/common';
import { JurosCompostosModule } from './simuladores/juros-composts/juros-compostos.module';
import { ConfigModule } from '@nestjs/config';
import { AmortizacaoModule } from './simuladores/amortizacao/amortizacao.module';
import { PrismaModule } from './prisma/prisma.module';
import { SimuladoresModule } from './simuladores/simuladores.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    SimuladoresModule
  ],
})
export class AppModule {}
