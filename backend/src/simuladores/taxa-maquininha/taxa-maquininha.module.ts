import { Module } from '@nestjs/common';
import { TaxaMaquininhaController } from './taxa-maquininha.controller';
import { TaxaMaquininhaService } from './taxa-maquininha.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TaxaMaquininhaController],
  providers: [TaxaMaquininhaService],
  exports: [TaxaMaquininhaService],
})
export class TaxaMaquininhaModule {}
