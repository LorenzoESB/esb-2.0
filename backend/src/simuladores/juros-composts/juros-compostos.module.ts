import { Module } from '@nestjs/common';
import { JurosCompostosController } from './juros-compostos.controller';
import { JurosCompostosService } from './juros-compostos.service';
import { EmailModule } from '../../email/email.module';

@Module({
  imports: [EmailModule],
  controllers: [JurosCompostosController],
  providers: [JurosCompostosService],
  exports: [JurosCompostosService],
})
export class JurosCompostosModule {}
