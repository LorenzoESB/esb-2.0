import { StrapiService } from '../../integrations/strapi/strapi.service';
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
export declare class SimulatorMetadataService {
    private readonly strapiService;
    private readonly logger;
    constructor(strapiService: StrapiService);
    getMetadataBySlug(slug: string): Promise<SimulatorMetadata | null>;
    getMetadataByType(type: string): Promise<SimulatorMetadata[]>;
}
