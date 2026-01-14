import { OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ISimulatorStrategy } from '../interfaces/simulator-strategy.interface';
export declare class SimulatorRegistry implements OnModuleInit {
    private moduleRef;
    private readonly logger;
    private strategies;
    constructor(moduleRef: ModuleRef);
    onModuleInit(): void;
    register(strategy: ISimulatorStrategy): void;
    getStrategy(type: string): ISimulatorStrategy | undefined;
    getAvailableTypes(): string[];
}
