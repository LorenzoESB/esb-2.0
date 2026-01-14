"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const migration_utils_1 = require("./migration-utils");
async function findArticleByWpPostId(wpPostId) {
    const article = await (0, migration_utils_1.findInStrapi)('articles', wpPostId);
    return article?.id;
}
async function migrateComments() {
    migration_utils_1.logger.log('Starting comments migration...');
    try {
        const wpComments = await (0, migration_utils_1.fetchAllWP)('/comments');
        migration_utils_1.logger.log(`Found ${wpComments.length} comments in WordPress.`);
        const idMapping = {};
        for (const wpComment of wpComments) {
            try {
                const existing = await (0, migration_utils_1.findInStrapi)('comments', wpComment.id);
                if (existing) {
                    migration_utils_1.logger.log(`Comment ${wpComment.id} already exists (ID: ${existing.id}). Skipping creation.`);
                    idMapping[wpComment.id] = existing.id;
                    continue;
                }
                const strapiArticleId = await findArticleByWpPostId(wpComment.post);
                if (!strapiArticleId) {
                    migration_utils_1.logger.warn(`Could not find Strapi article for WP Post ID ${wpComment.post}. Skipping comment ${wpComment.id}.`);
                    continue;
                }
                const data = {
                    content: wpComment.content.rendered.replace(/<[^>]*>?/gm, ''),
                    authorName: wpComment.author_name,
                    authorEmail: wpComment.author_email,
                    status: wpComment.status === 'approved' ? 'approved' : 'pending',
                    article: strapiArticleId,
                    originalId: wpComment.id,
                    publishedAt: wpComment.date,
                };
                const created = await (0, migration_utils_1.createInStrapi)('comments', data);
                idMapping[wpComment.id] = created.id;
                if (created.id !== 'dry-run-id') {
                    migration_utils_1.logger.log(`Created comment ${wpComment.id} for article ${strapiArticleId}`);
                }
            }
            catch (error) {
                migration_utils_1.logger.error(`Failed to migrate comment ${wpComment.id}: ${error.message}`);
            }
        }
        migration_utils_1.logger.log('Updating comment hierarchy (threads)...');
        for (const wpComment of wpComments) {
            try {
                if (wpComment.parent === 0)
                    continue;
                const strapiId = idMapping[wpComment.id];
                const strapiParentId = idMapping[wpComment.parent];
                if (strapiId && strapiParentId) {
                    await (0, migration_utils_1.updateInStrapi)('comments', strapiId, {
                        parent: strapiParentId,
                    });
                    migration_utils_1.logger.log(`Linked comment ${strapiId} to parent ${strapiParentId}`);
                }
            }
            catch (error) {
                migration_utils_1.logger.error(`Failed to link comment ${wpComment.id} to parent: ${error.message}`);
            }
        }
        migration_utils_1.logger.log('Comments migration finished successfully!');
    }
    catch (error) {
        migration_utils_1.logger.error('Comments migration failed:', error);
        process.exit(1);
    }
}
migrateComments();
//# sourceMappingURL=05-migrate-comments.js.map