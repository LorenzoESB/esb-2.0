import { Module } from '@nestjs/common';
import { CombustivelController } from './combustivel.controller';
import { CombustivelService } from './combustivel.service';


@Module({
  imports: [],
  controllers: [CombustivelController,],
  providers: [CombustivelService,],
  exports: []
})
export class CombustivelModule { }
