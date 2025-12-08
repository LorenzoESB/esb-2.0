import { Module } from '@nestjs/common';
import { CombustivelController } from './combustivel.controller';
import { CombustivelService } from './combustivel.service';

@Module({
  controllers: [CombustivelController],
  providers: [CombustivelService],
  exports: [CombustivelService],
})
export class CombustivelModule {}
