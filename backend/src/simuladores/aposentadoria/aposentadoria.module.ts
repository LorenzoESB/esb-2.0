import { Module } from '@nestjs/common';
import { AposentadoriaController } from './aposentadoria.controller';
import { AposentadoriaService } from './aposentadoria.service';

@Module({
  controllers: [AposentadoriaController],
  providers: [AposentadoriaService],
  exports: [AposentadoriaService],
})
export class AposentadoriaModule {}
