import { Module } from '@nestjs/common';
import { EmprestimoController } from './emprestimo.controller';
import { EmprestimoService } from './emprestimo.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EmprestimoController],
  providers: [EmprestimoService],
  exports: [EmprestimoService],
})
export class EmprestimoModule {}
