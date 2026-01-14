"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const migration_utils_1 = require("./migration-utils");
async function testStrapi() {
    migration_utils_1.logger.log('Testing Strapi connection and write...');
    const testId = 999999;
    const testSlug = 'test-author-migration-' + Date.now();
    try {
        // 1. Try to find non-existent
        migration_utils_1.logger.log(`Checking if test author ${testId} exists...`);
        const existing = await (0, migration_utils_1.findInStrapi)('authors', testId);
        if (existing) {
            migration_utils_1.logger.warn(`Test author ${testId} already exists? ID: ${existing.id}`);
        }
        else {
            migration_utils_1.logger.log('Test author does not exist. Good.');
        }
        // 2. Try to create
        migration_utils_1.logger.log('Creating test author...');
        const data = {
            name: 'Test Author',
            slug: testSlug,
            bio: 'Test Bio',
            originalId: testId,
        };
        // Force DRY_RUN to false for this test if it's set in env
        process.env.DRY_RUN = 'false';
        const created = await (0, migration_utils_1.createInStrapi)('authors', data);
        migration_utils_1.logger.log(`Created test author with ID: ${created.id}`);
        // 3. Try to find it back
        migration_utils_1.logger.log('Verifying creation...');
        const verified = await (0, migration_utils_1.findInStrapi)('authors', testId);
        if (verified && verified.id === created.id) {
            migration_utils_1.logger.log('SUCCESS: Author created and verified!');
        }
        else {
            migration_utils_1.logger.error('FAILED: Could not verify created author.');
            migration_utils_1.logger.error('Verified result:', JSON.stringify(verified));
        }
        // 4. Cleanup (optional, but let's keep it for now to see it in admin)
        // logger.log('Deleting test author...');
        // await strapiApi.delete(`/authors/${created.id}`);
    }
    catch (error) {
        migration_utils_1.logger.error('Test failed:', error.response?.data || error.message);
    }
}
testStrapi();
