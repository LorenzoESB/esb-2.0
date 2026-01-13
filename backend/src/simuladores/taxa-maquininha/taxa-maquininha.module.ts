import { Module } from '@nestjs/common';
import { TaxaMaquininhaController } from './taxa-maquininha.controller';
import { TaxaMaquininhaService } from './taxa-maquininha.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { EmailModule } from '../../email/email.module';

@Module({
  imports: [PrismaModule, EmailModule],
  controllers: [TaxaMaquininhaController],
  providers: [TaxaMaquininhaService],
  exports: [TaxaMaquininhaService],
})
export class TaxaMaquininhaModule {}
