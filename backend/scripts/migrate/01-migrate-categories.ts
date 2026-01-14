import { fetchAllWP, createInStrapi, updateInStrapi, findInStrapi, findInStrapiBySlug, logger } from './migration-utils';

async function migrateCategories() {
  logger.log('Starting categories migration...');

  try {
    const wpCategories = await fetchAllWP<any>('/categories');
    logger.log(`Found ${wpCategories.length} categories in WordPress.`);

    const idMapping: Record<number, string | number> = {};

    // First pass: Create categories without hierarchy
    for (const wpCat of wpCategories) {
      try {
        let existing = await findInStrapi('categories', wpCat.id);

        if (!existing && wpCat.slug) {
          existing = await findInStrapiBySlug('categories', wpCat.slug);
          if (existing) {
            logger.warn(`Category "${wpCat.name}" found by slug "${wpCat.slug}" but missing originalId. Mapping it anyway.`);
          }
        }

        if (existing) {
          logger.log(`Category "${wpCat.name}" already exists (ID: ${existing.id}). Skipping creation.`);
          idMapping[wpCat.id] = existing.id;
          continue;
        }

        const data = {
          name: wpCat.name,
          slug: wpCat.slug,
          description: wpCat.description,
          originalId: wpCat.id,
        };

        const created = await createInStrapi('categories', data);
        idMapping[wpCat.id] = created.id;
        if (created.id !== 'dry-run-id') {
          logger.log(`Created category: ${wpCat.name}`);
        }
      } catch (error: any) {
        logger.error(`Failed to migrate category "${wpCat.name}" (ID: ${wpCat.id}): ${error.message}`);
      }
    }

    // Second pass: Update hierarchy
    logger.log('Updating category hierarchy...');
    for (const wpCat of wpCategories) {
      try {
        if (wpCat.parent === 0) continue;

        const strapiId = idMapping[wpCat.id];
        const strapiParentId = idMapping[wpCat.parent];

        if (strapiId && strapiParentId) {
          await updateInStrapi('categories', strapiId, {
            parent: strapiParentId,
          });
          logger.log(`Linked category "${wpCat.name}" to parent ID ${strapiParentId}`);
        } else {
          logger.warn(`Could not link category "${wpCat.name}" (ID: ${strapiId}) to parent (Original Parent ID: ${wpCat.parent})`);
        }
      } catch (error: any) {
        logger.error(`Failed to link category "${wpCat.name}" to parent: ${error.message}`);
      }
    }

    logger.log('Categories migration finished successfully!');
  } catch (error) {
    logger.error('Categories migration failed:', error);
    process.exit(1);
  }
}

migrateCategories();
