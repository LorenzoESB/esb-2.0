import { Module } from '@nestjs/common';
import { JurosCompostosModule } from './simuladores/juros-composts/juros-compostos.module';
import { ConfigModule } from '@nestjs/config';
import { AmortizacaoModule } from './simuladores/amortizacao/amortizacao.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JurosCompostosModule,
    AmortizacaoModule,
  ],
})
export class AppModule {}
