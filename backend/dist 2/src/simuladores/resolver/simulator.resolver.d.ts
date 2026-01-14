import { SimulatorMetadataService } from '../metadata/simulator-metadata.service';
import { SimulatorRegistry } from '../registry/simulator.registry';
export declare class SimulatorResolver {
    private readonly metadataService;
    private readonly registry;
    private readonly logger;
    constructor(metadataService: SimulatorMetadataService, registry: SimulatorRegistry);
    resolveAndExecute(slug: string, input: any): Promise<any>;
}
