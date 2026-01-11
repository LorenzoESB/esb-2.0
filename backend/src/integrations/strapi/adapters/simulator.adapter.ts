
import { StrapiSimulator } from '../strapi.types';

export class SimulatorAdapter {
  static toDomain(item: { id: number; attributes: StrapiSimulator }) {
    const { id, attributes } = item;
    return {
      id,
      title: attributes.title,
      slug: attributes.slug,
      description: attributes.description,
      type: attributes.type,
      parameters: attributes.parameters,
      seo: attributes.seo,
      aeoBlocks: attributes.aeoBlocks,
    };
  }
}
