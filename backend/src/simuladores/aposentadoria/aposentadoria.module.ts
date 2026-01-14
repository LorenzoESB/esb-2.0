import { Module } from '@nestjs/common';
import { AposentadoriaController } from './aposentadoria.controller';
import { AposentadoriaService } from './aposentadoria.service';
import { EmailModule } from '../../email/email.module';

@Module({
  imports: [EmailModule],
  controllers: [AposentadoriaController],
  providers: [AposentadoriaService],
  exports: [AposentadoriaService],
})
export class AposentadoriaModule {}
