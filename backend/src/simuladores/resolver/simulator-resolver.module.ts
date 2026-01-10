import { Module } from '@nestjs/common';
import { SimulatorResolver } from './simulator.resolver';
import { SimulatorMetadataModule } from '../metadata/simulator-metadata.module';
import { SimulatorRegistryModule } from '../registry/simulator-registry.module';

@Module({
  imports: [SimulatorMetadataModule, SimulatorRegistryModule],
  providers: [SimulatorResolver],
  exports: [SimulatorResolver],
})
export class SimulatorResolverModule {}
