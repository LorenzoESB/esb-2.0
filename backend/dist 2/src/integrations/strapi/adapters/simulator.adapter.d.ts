import { StrapiSimulator } from '../strapi.types';
export declare class SimulatorAdapter {
    static toDomain(item: {
        id: number;
        attributes: StrapiSimulator;
    }): {
        id: number;
        title: string;
        slug: string;
        description: string;
        type: "loan" | "investment" | "financing" | "other";
        parameters: any;
        seo: any;
        aeoBlocks: any[];
    };
}
