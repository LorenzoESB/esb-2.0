import { Module } from '@nestjs/common';
import { EmprestimoController } from './emprestimo.controller';
import { EmprestimoService } from './emprestimo.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { SimulatorMetadataModule } from '../metadata/simulator-metadata.module';
import { SimulatorRegistryModule } from '../registry/simulator-registry.module';

@Module({
  imports: [PrismaModule, SimulatorMetadataModule, SimulatorRegistryModule],
  controllers: [EmprestimoController],
  providers: [EmprestimoService],
  exports: [EmprestimoService],
})
export class EmprestimoModule {}
