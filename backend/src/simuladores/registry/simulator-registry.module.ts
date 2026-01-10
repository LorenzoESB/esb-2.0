import { Module, Global } from '@nestjs/common';
import { SimulatorRegistry } from './simulator.registry';

@Global()
@Module({
  providers: [SimulatorRegistry],
  exports: [SimulatorRegistry],
})
export class SimulatorRegistryModule {}
