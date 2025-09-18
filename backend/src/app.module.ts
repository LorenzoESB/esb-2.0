import { Module } from '@nestjs/common';
import { JurosCompostosModule } from './simuladores/juros-composts/juros-compostos.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JurosCompostosModule,
  ],
})
export class AppModule {}
