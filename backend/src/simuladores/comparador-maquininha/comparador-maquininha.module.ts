import { Module } from '@nestjs/common';
import { ComparadorMaquininhaController } from './comparador-maquininha.controller';
import { ComparadorMaquininhaService } from './comparador-maquininha.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ComparadorMaquininhaController],
  providers: [ComparadorMaquininhaService],
  exports: [ComparadorMaquininhaService],
})
export class ComparadorMaquininhaModule {}
