"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericAdapter = exports.PageAdapter = exports.CategoryAdapter = exports.ArticleAdapter = void 0;
class ArticleAdapter {
    static toWordPress(item) {
        const { id, attributes } = item;
        const authorData = attributes.author?.data;
        const featuredImageData = attributes.featuredImage?.data;
        const categoriesData = attributes.categories?.data || [];
        const wpPost = {
            id: attributes.originalId || id,
            original_id: attributes.originalId,
            date: attributes.publishedAt || attributes.createdAt,
            slug: attributes.slug,
            type: 'post',
            link: attributes.originalLink || `/${attributes.slug}`,
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
                            description: '',
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
exports.ArticleAdapter = ArticleAdapter;
class CategoryAdapter {
    static toWordPress(item) {
        const { id, attributes } = item;
        return {
            id: attributes.originalId || id,
            count: 1,
            description: attributes.description || '',
            link: `/${attributes.slug}`,
            name: attributes.name,
            slug: attributes.slug,
            taxonomy: 'category',
            parent: attributes.parent?.data?.id || 0,
        };
    }
}
exports.CategoryAdapter = CategoryAdapter;
class PageAdapter {
    static toWordPress(item) {
        const { id, attributes } = item;
        return {
            id: attributes.originalId || id,
            date: attributes.publishedAt || attributes.createdAt,
            slug: attributes.slug,
            type: 'page',
            link: `/${attributes.slug}`,
            title: { rendered: attributes.title },
            excerpt: { rendered: '' },
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
exports.PageAdapter = PageAdapter;
class GenericAdapter {
    static toStandard(item) {
        return {
            id: item.id,
            ...item.attributes,
        };
    }
}
exports.GenericAdapter = GenericAdapter;
//# sourceMappingURL=content.adapter.js.map