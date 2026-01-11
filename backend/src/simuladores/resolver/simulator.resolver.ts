import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { SimulatorMetadataService } from '../metadata/simulator-metadata.service';
import { SimulatorRegistry } from '../registry/simulator.registry';

@Injectable()
export class SimulatorResolver {
  private readonly logger = new Logger(SimulatorResolver.name);

  constructor(
    private readonly metadataService: SimulatorMetadataService,
    private readonly registry: SimulatorRegistry,
  ) {}

  /**
   * Orchestrates the simulation process:
   * 1. Fetches metadata from Strapi using the slug.
   * 2. Identifies the simulator type from metadata.
   * 3. Finds the corresponding strategy in the registry.
   * 4. Executes the strategy with input and metadata.
   */
  async resolveAndExecute(slug: string, input: any) {
    this.logger.log(`Resolving simulator execution for slug: ${slug}`);

    // 1. Fetch Metadata
    const metadata = await this.metadataService.getMetadataBySlug(slug);
    if (!metadata) {
      this.logger.error(`Metadata not found for slug: ${slug}`);
      throw new NotFoundException(`Simulator not found: ${slug}`);
    }

    const type = metadata.attributes.type;
    this.logger.debug(`Simulator type identified: ${type}`);

    // 2. Find Strategy
    const strategy = this.registry.getStrategy(type);
    if (!strategy) {
      this.logger.error(`No strategy registered for type: ${type}`);
      throw new NotFoundException(`Simulator strategy not implemented for type: ${type}`);
    }

    // 3. Execute Strategy
    this.logger.log(`Executing strategy ${type} for ${slug}`);
    return strategy.execute(input, metadata.attributes.parameters);
  }
}
