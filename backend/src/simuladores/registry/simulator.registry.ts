import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ISimulatorStrategy } from '../interfaces/simulator-strategy.interface';

@Injectable()
export class SimulatorRegistry implements OnModuleInit {
  private readonly logger = new Logger(SimulatorRegistry.name);
  private strategies: Map<string, ISimulatorStrategy> = new Map();

  constructor(private moduleRef: ModuleRef) {}

  onModuleInit() {
    // This will be populated manually or via discovery if we used decorators
    // For now, services will register themselves or we register them here
    this.logger.log('Initializing SimulatorRegistry...');
  }

  register(strategy: ISimulatorStrategy) {
    const type = strategy.getSimulatorType();
    if (this.strategies.has(type)) {
      this.logger.warn(`Overwriting strategy for simulator type: ${type}`);
    }
    this.strategies.set(type, strategy);
    this.logger.log(`Registered strategy for: ${type}`);
  }

  getStrategy(type: string): ISimulatorStrategy | undefined {
    return this.strategies.get(type);
  }

  getAvailableTypes(): string[] {
    return Array.from(this.strategies.keys());
  }
}
