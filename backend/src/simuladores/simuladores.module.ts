import { Module } from '@nestjs/common';
import { JurosCompostosModule } from './juros-composts/juros-compostos.module';

@Module({
  imports: [JurosCompostosModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class SimuladoresModule {}
