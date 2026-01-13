import { fetchAllWP, createInStrapi, findInStrapi, findInStrapiBySlug, logger } from './migration-utils';

async function migrateAuthors() {
  logger.log('Starting authors migration...');

  try {
    // WordPress users endpoint
    const wpUsers = await fetchAllWP<any>('/users');
    logger.log(`Found ${wpUsers.length} users in WordPress.`);

    for (const wpUser of wpUsers) {
      try {
        let existing = await findInStrapi('authors', wpUser.id);

        if (!existing && wpUser.slug) {
          existing = await findInStrapiBySlug('authors', wpUser.slug);
          if (existing) {
            logger.warn(`Author "${wpUser.name}" found by slug "${wpUser.slug}" but missing originalId. Mapping it anyway.`);
          }
        }

        if (existing) {
          logger.log(`Author "${wpUser.name}" already exists (ID: ${existing.id}). Skipping.`);
          continue;
        }

        const data = {
          name: wpUser.name,
          slug: wpUser.slug,
          bio: wpUser.description,
          originalId: wpUser.id,
        };

        const created = await createInStrapi('authors', data);
        if (created.id !== 'dry-run-id') {
          logger.log(`Created author: ${wpUser.name}`);
        }
      } catch (error: any) {
        logger.error(`Failed to migrate author "${wpUser.name}" (ID: ${wpUser.id}): ${error.message}`);
      }
    }

    logger.log('Authors migration finished successfully!');
  } catch (error) {
    logger.error('Authors migration failed:', error);
    process.exit(1);
  }
}

migrateAuthors();
