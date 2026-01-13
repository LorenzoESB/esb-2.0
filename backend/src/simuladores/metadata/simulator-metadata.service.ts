
import { Injectable, Logger } from '@nestjs/common';
import { StrapiService } from '../../integrations/strapi/strapi.service';
import { SimulatorAdapter } from '../../integrations/strapi/adapters/simulator.adapter';

export interface SimulatorMetadata {
  id: number;
  title: string;
  slug: string;
  description: string;
  type: string;
  parameters: any;
  seo: any;
  aeoBlocks: any[];
}

@Injectable()
export class SimulatorMetadataService {
  private readonly logger = new Logger(SimulatorMetadataService.name);

  constructor(
    private readonly strapiService: StrapiService,
  ) {}

  async getMetadataBySlug(slug: string): Promise<SimulatorMetadata | null> {
    try {
      const metadata = await this.strapiService.getSimulatorMetadata(slug);
      return metadata;
    } catch (error) {
      this.logger.error(`Error fetching metadata for simulator ${slug}`, error);
      return null;
    }
  }

  // StrapiService doesn't have getSimulatorMetadataByType yet, implementing basic call via client if needed
  // or extending StrapiService. But for now, let's assume we can fetch by type using getSimulatorMetadata logic if we modify it
  // or just return empty if not critical. 
  // However, the original service had it. Let's add it to StrapiService?
  // Or just keep it simple. The task didn't explicitly ask for "getMetadataByType".
  // But to not break things, I should probably implement it.
  
  async getMetadataByType(type: string): Promise<SimulatorMetadata[]> {
      try {
          return await this.strapiService.getSimulatorsByType(type);
      } catch (error) {
          this.logger.error(`Error fetching metadata for type ${type}`, error);
          return [];
      }
  }
}
