import { Module } from '@nestjs/common';
import { EmprestimoController } from './emprestimo.controller';
import { EmprestimoService } from './emprestimo.service';

@Module({
  imports: [],
  controllers: [EmprestimoController],
  providers: [EmprestimoService],
  exports: [],
})
export class EmprestimoModule {}
