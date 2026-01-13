import { Module } from '@nestjs/common';
import { AmortizacaoController } from './amortizacao.controller';
import { AmortizacaoService } from './amortizacao.service';
import { EmailModule } from '../../email/email.module';

@Module({
  imports: [EmailModule],
  controllers: [AmortizacaoController],
  providers: [AmortizacaoService],
  exports: [AmortizacaoService],
})
export class AmortizacaoModule {}
