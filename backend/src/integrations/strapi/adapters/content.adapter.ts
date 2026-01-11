
import { StrapiArticle, StrapiCategory, StrapiComment, StrapiPage, StrapiPodcast, StrapiRanking, StrapiSimulator, StrapiVideo } from '../strapi.types';

export interface WordPressPost {
  id: number;
  date: string;
  slug: string;
  type: string;
  link: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  author: number;
  featured_media: number;
  categories: number[];
  _embedded?: {
    author?: Array<{ id: number; name: string; description?: string; link?: string }>;
    'wp:featuredmedia'?: Array<{
      id: number;
      source_url: string;
      alt_text?: string;
      media_details?: {
        width: number;
        height: number;
        sizes: Record<string, { source_url: string; width: number; height: number }>;
      };
    }>;
    'wp:term'?: Array<Array<{ id: number; name: string; slug: string; taxonomy: string }>>;
  };
  // Custom fields for Strapi compatibility
  original_id?: number;
  aeo_blocks?: any[];
  seo?: any;
}

export interface WordPressCategory {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: 'category';
  parent: number;
}

export class ArticleAdapter {
  static toWordPress(item: { id: number; attributes: StrapiArticle }): WordPressPost {
    const { id, attributes } = item;
    const authorData = attributes.author?.data;
    const featuredImageData = attributes.featuredImage?.data;
    const categoriesData = attributes.categories?.data || [];

    const wpPost: WordPressPost = {
      id: attributes.originalId || id,
      original_id: attributes.originalId,
      date: attributes.publishedAt || attributes.createdAt,
      slug: attributes.slug,
      type: 'post',
      link: attributes.originalLink || `/${attributes.slug}`, // Fallback link
      title: { rendered: attributes.title },
      excerpt: { rendered: attributes.excerpt || '' },
      content: { rendered: attributes.content || '' },
      author: authorData?.id || 0,
      featured_media: featuredImageData?.id || 0,
      categories: categoriesData.map((c) => c.attributes.originalId || c.id),
      _embedded: {
        author: authorData
          ? [
              {
                id: authorData.id,
                name: authorData.attributes.name,
                description: '', // Strapi author schema needs checking for description
              },
            ]
          : [],
        'wp:featuredmedia': featuredImageData
          ? [
              {
                id: featuredImageData.id,
                source_url: featuredImageData.attributes.url,
                alt_text: featuredImageData.attributes.alternativeText || '',
                media_details: {
                  width: featuredImageData.attributes.width,
                  height: featuredImageData.attributes.height,
                  sizes: {
                    full: {
                      source_url: featuredImageData.attributes.url,
                      width: featuredImageData.attributes.width,
                      height: featuredImageData.attributes.height,
                    },
                  },
                },
              },
            ]
          : [],
        'wp:term': [
          categoriesData.map((c) => ({
            id: c.attributes.originalId || c.id,
            name: c.attributes.name,
            slug: c.attributes.slug,
            taxonomy: 'category',
          })),
        ],
      },
      aeo_blocks: attributes.aeoBlocks,
      seo: attributes.seo,
    };

    return wpPost;
  }
}

export class CategoryAdapter {
  static toWordPress(item: { id: number; attributes: StrapiCategory }): WordPressCategory {
    const { id, attributes } = item;
    return {
      id: attributes.originalId || id,
      count: 1, // Default to 1 to ensure visibility in frontend filters, as Strapi doesn't easily provide count without aggregation
      description: attributes.description || '',
      link: `/${attributes.slug}`,
      name: attributes.name,
      slug: attributes.slug,
      taxonomy: 'category',
      parent: attributes.parent?.data?.id || 0,
    };
  }
}

export class PageAdapter {
  static toWordPress(item: { id: number; attributes: StrapiPage }): WordPressPost {
    const { id, attributes } = item;
    
    // Pages structure is similar to posts in WP
    return {
      id: attributes.originalId || id,
      date: attributes.publishedAt || attributes.createdAt,
      slug: attributes.slug,
      type: 'page',
      link: `/${attributes.slug}`,
      title: { rendered: attributes.title },
      excerpt: { rendered: '' }, // Pages usually don't have excerpts
      content: { rendered: attributes.content || '' },
      author: 0,
      featured_media: 0,
      categories: [],
      _embedded: {
          author: [],
          'wp:featuredmedia': [],
          'wp:term': []
      },
      aeo_blocks: attributes.aeoBlocks,
      seo: attributes.seo,
    };
  }
}

// Other adapters for new entities (Video, Podcast, etc.) can be simple transformations or specialized DTOs
// Since the frontend might not consume these as "WordPress Posts", we can return cleaner objects for them if new endpoints are created,
// but for now the task asks to "Normalize JSON".

export class GenericAdapter {
    static toStandard(item: { id: number; attributes: any }) {
        return {
            id: item.id,
            ...item.attributes,
        };
    }
}
