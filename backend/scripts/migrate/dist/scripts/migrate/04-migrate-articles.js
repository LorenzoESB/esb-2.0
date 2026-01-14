"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const migration_utils_1 = require("./migration-utils");
async function findAuthorByWpId(wpId) {
    const author = await (0, migration_utils_1.findInStrapi)('authors', wpId);
    return author?.id;
}
async function findCategoryByWpId(wpId) {
    const category = await (0, migration_utils_1.findInStrapi)('categories', wpId);
    return category?.id;
}
async function findMediaByWpId(wpId) {
    try {
        const response = await migration_utils_1.strapiApi.get('/upload/files', {
            params: {
                filters: {
                    alternativeText: {
                        $eq: `wp_id:${wpId}`,
                    },
                },
            },
        });
        return response.data?.[0]?.id;
    }
    catch (error) {
        return null;
    }
}
async function migrateArticles() {
    migration_utils_1.logger.log('Starting articles migration...');
    try {
        const wpPosts = await (0, migration_utils_1.fetchAllWP)('/posts');
        migration_utils_1.logger.log(`Found ${wpPosts.length} posts in WordPress.`);
        let successCount = 0;
        let failCount = 0;
        for (const wpPost of wpPosts) {
            try {
                let existing = await (0, migration_utils_1.findInStrapi)('articles', wpPost.id);
                if (!existing && wpPost.slug) {
                    existing = await (0, migration_utils_1.findInStrapiBySlug)('articles', wpPost.slug);
                    if (existing) {
                        migration_utils_1.logger.warn(`Article "${wpPost.title.rendered}" found by slug "${wpPost.slug}" but missing originalId. Mapping it anyway.`);
                    }
                }
                if (existing) {
                    migration_utils_1.logger.log(`Article "${wpPost.title.rendered}" already exists (ID: ${existing.id}). Skipping.`);
                    successCount++;
                    continue;
                }
                // Map author
                const authorId = await findAuthorByWpId(wpPost.author);
                // Map categories
                const categoryIds = [];
                for (const wpCatId of wpPost.categories) {
                    const strapiCatId = await findCategoryByWpId(wpCatId);
                    if (strapiCatId)
                        categoryIds.push(strapiCatId);
                }
                // Map featured image
                let featuredImageId = null;
                if (wpPost.featured_media) {
                    featuredImageId = await findMediaByWpId(wpPost.featured_media);
                }
                const data = {
                    title: wpPost.title.rendered,
                    slug: wpPost.slug,
                    excerpt: wpPost.excerpt.rendered.replace(/<[^>]*>?/gm, ''), // Strip HTML for excerpt
                    content: wpPost.content.rendered,
                    author: authorId,
                    categories: categoryIds,
                    featuredImage: featuredImageId,
                    originalId: wpPost.id,
                    originalLink: wpPost.link,
                    publishedAt: wpPost.status === 'publish' ? wpPost.date : null,
                };
                const created = await (0, migration_utils_1.createInStrapi)('articles', data);
                if (created.id !== 'dry-run-id') {
                    migration_utils_1.logger.log(`Created article: ${wpPost.title.rendered}`);
                }
                successCount++;
            }
            catch (error) {
                failCount++;
                migration_utils_1.logger.error(`Failed to migrate article "${wpPost.title.rendered}" (ID: ${wpPost.id}): ${error.message}`);
                // Continue to next article
            }
        }
        migration_utils_1.logger.log(`Articles migration finished! Success: ${successCount}, Failed: ${failCount}`);
    }
    catch (error) {
        migration_utils_1.logger.error('Articles migration failed:', error);
        process.exit(1);
    }
}
migrateArticles();
