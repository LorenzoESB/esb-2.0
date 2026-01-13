import { Module } from '@nestjs/common';
import { CombustivelController } from './combustivel.controller';
import { CombustivelService } from './combustivel.service';
import { EmailModule } from '../../email/email.module';

@Module({
  imports: [EmailModule],
  controllers: [CombustivelController],
  providers: [CombustivelService],
  exports: [CombustivelService],
})
export class CombustivelModule {}
