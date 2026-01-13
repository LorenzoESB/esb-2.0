import { fetchAllWP, createInStrapi, updateInStrapi, findInStrapi, logger } from './migration-utils';

async function findArticleByWpPostId(wpPostId: number) {
  const article = await findInStrapi('articles', wpPostId);
  return article?.id;
}

async function migrateComments() {
  logger.log('Starting comments migration...');

  try {
    const wpComments = await fetchAllWP<any>('/comments');
    logger.log(`Found ${wpComments.length} comments in WordPress.`);

    const idMapping: Record<number, string | number> = {};

    // First pass: Create comments and link to articles
    for (const wpComment of wpComments) {
      try {
        const existing = await findInStrapi('comments', wpComment.id);

        if (existing) {
          logger.log(`Comment ${wpComment.id} already exists (ID: ${existing.id}). Skipping creation.`);
          idMapping[wpComment.id] = existing.id;
          continue;
        }

        const strapiArticleId = await findArticleByWpPostId(wpComment.post);

        if (!strapiArticleId) {
          logger.warn(`Could not find Strapi article for WP Post ID ${wpComment.post}. Skipping comment ${wpComment.id}.`);
          continue;
        }

        const data = {
          content: wpComment.content.rendered.replace(/<[^>]*>?/gm, ''), // Strip HTML
          authorName: wpComment.author_name,
          authorEmail: wpComment.author_email,
          status: wpComment.status === 'approved' ? 'approved' : 'pending',
          article: strapiArticleId,
          originalId: wpComment.id,
          publishedAt: wpComment.date,
        };

        const created = await createInStrapi('comments', data);
        idMapping[wpComment.id] = created.id;
        if (created.id !== 'dry-run-id') {
          logger.log(`Created comment ${wpComment.id} for article ${strapiArticleId}`);
        }
      } catch (error: any) {
        logger.error(`Failed to migrate comment ${wpComment.id}: ${error.message}`);
      }
    }

    // Second pass: Update hierarchy (threads)
    logger.log('Updating comment hierarchy (threads)...');
    for (const wpComment of wpComments) {
      try {
        if (wpComment.parent === 0) continue;

        const strapiId = idMapping[wpComment.id];
        const strapiParentId = idMapping[wpComment.parent];

        if (strapiId && strapiParentId) {
          await updateInStrapi('comments', strapiId, {
            parent: strapiParentId,
          });
          logger.log(`Linked comment ${strapiId} to parent ${strapiParentId}`);
        }
      } catch (error: any) {
        logger.error(`Failed to link comment ${wpComment.id} to parent: ${error.message}`);
      }
    }

    logger.log('Comments migration finished successfully!');
  } catch (error) {
    logger.error('Comments migration failed:', error);
    process.exit(1);
  }
}

migrateComments();
