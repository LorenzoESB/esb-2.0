"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const migration_utils_1 = require("./migration-utils");
async function migrateCategories() {
    migration_utils_1.logger.log('Starting categories migration...');
    try {
        const wpCategories = await (0, migration_utils_1.fetchAllWP)('/categories');
        migration_utils_1.logger.log(`Found ${wpCategories.length} categories in WordPress.`);
        const idMapping = {};
        // First pass: Create categories without hierarchy
        for (const wpCat of wpCategories) {
            try {
                let existing = await (0, migration_utils_1.findInStrapi)('categories', wpCat.id);
                if (!existing && wpCat.slug) {
                    existing = await (0, migration_utils_1.findInStrapiBySlug)('categories', wpCat.slug);
                    if (existing) {
                        migration_utils_1.logger.warn(`Category "${wpCat.name}" found by slug "${wpCat.slug}" but missing originalId. Mapping it anyway.`);
                    }
                }
                if (existing) {
                    migration_utils_1.logger.log(`Category "${wpCat.name}" already exists (ID: ${existing.id}). Skipping creation.`);
                    idMapping[wpCat.id] = existing.id;
                    continue;
                }
                const data = {
                    name: wpCat.name,
                    slug: wpCat.slug,
                    description: wpCat.description,
                    originalId: wpCat.id,
                };
                const created = await (0, migration_utils_1.createInStrapi)('categories', data);
                idMapping[wpCat.id] = created.id;
                if (created.id !== 'dry-run-id') {
                    migration_utils_1.logger.log(`Created category: ${wpCat.name}`);
                }
            }
            catch (error) {
                migration_utils_1.logger.error(`Failed to migrate category "${wpCat.name}" (ID: ${wpCat.id}): ${error.message}`);
            }
        }
        // Second pass: Update hierarchy
        migration_utils_1.logger.log('Updating category hierarchy...');
        for (const wpCat of wpCategories) {
            try {
                if (wpCat.parent === 0)
                    continue;
                const strapiId = idMapping[wpCat.id];
                const strapiParentId = idMapping[wpCat.parent];
                if (strapiId && strapiParentId) {
                    await (0, migration_utils_1.updateInStrapi)('categories', strapiId, {
                        parent: strapiParentId,
                    });
                    migration_utils_1.logger.log(`Linked category "${wpCat.name}" to parent ID ${strapiParentId}`);
                }
                else {
                    migration_utils_1.logger.warn(`Could not link category "${wpCat.name}" (ID: ${strapiId}) to parent (Original Parent ID: ${wpCat.parent})`);
                }
            }
            catch (error) {
                migration_utils_1.logger.error(`Failed to link category "${wpCat.name}" to parent: ${error.message}`);
            }
        }
        migration_utils_1.logger.log('Categories migration finished successfully!');
    }
    catch (error) {
        migration_utils_1.logger.error('Categories migration failed:', error);
        process.exit(1);
    }
}
migrateCategories();
