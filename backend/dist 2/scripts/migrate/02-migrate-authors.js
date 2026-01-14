"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const migration_utils_1 = require("./migration-utils");
async function migrateAuthors() {
    migration_utils_1.logger.log('Starting authors migration...');
    try {
        const wpUsers = await (0, migration_utils_1.fetchAllWP)('/users');
        migration_utils_1.logger.log(`Found ${wpUsers.length} users in WordPress.`);
        for (const wpUser of wpUsers) {
            try {
                let existing = await (0, migration_utils_1.findInStrapi)('authors', wpUser.id);
                if (!existing && wpUser.slug) {
                    existing = await (0, migration_utils_1.findInStrapiBySlug)('authors', wpUser.slug);
                    if (existing) {
                        migration_utils_1.logger.warn(`Author "${wpUser.name}" found by slug "${wpUser.slug}" but missing originalId. Mapping it anyway.`);
                    }
                }
                if (existing) {
                    migration_utils_1.logger.log(`Author "${wpUser.name}" already exists (ID: ${existing.id}). Skipping.`);
                    continue;
                }
                const data = {
                    name: wpUser.name,
                    slug: wpUser.slug,
                    bio: wpUser.description,
                    originalId: wpUser.id,
                };
                const created = await (0, migration_utils_1.createInStrapi)('authors', data);
                if (created.id !== 'dry-run-id') {
                    migration_utils_1.logger.log(`Created author: ${wpUser.name}`);
                }
            }
            catch (error) {
                migration_utils_1.logger.error(`Failed to migrate author "${wpUser.name}" (ID: ${wpUser.id}): ${error.message}`);
            }
        }
        migration_utils_1.logger.log('Authors migration finished successfully!');
    }
    catch (error) {
        migration_utils_1.logger.error('Authors migration failed:', error);
        process.exit(1);
    }
}
migrateAuthors();
//# sourceMappingURL=02-migrate-authors.js.map