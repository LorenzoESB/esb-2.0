import { Module } from '@nestjs/common';
import { JurosCompostosController } from './juros-compostos.controller';
import { JurosCompostosService } from './juros-compostos.service';

@Module({
  controllers: [JurosCompostosController],
  providers: [JurosCompostosService],
  exports: [JurosCompostosService],
})
export class JurosCompostosModule {}
