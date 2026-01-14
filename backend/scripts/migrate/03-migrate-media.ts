import axios from 'axios';
import { fetchAllWP, strapiApi, logger, DRY_RUN } from './migration-utils';

async function uploadToStrapi(fileBuffer: Buffer, fileName: string, mimeType: string, wpId: number) {
  if (DRY_RUN) {
    logger.log(`[DRY RUN] Would upload media: ${fileName} (WP ID: ${wpId})`);
    return { id: 'dry-run-media-id' };
  }

  const formData = new FormData();
  const blob = new Blob([fileBuffer as any], { type: mimeType });
  formData.append('files', blob, fileName);
  
  // Store WP ID in alternativeText for idempotency
  formData.append('fileInfo', JSON.stringify({
    alternativeText: `wp_id:${wpId}`,
    caption: `Migrated from WordPress ID: ${wpId}`,
  }));

  try {
    const response = await strapiApi.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data[0];
  } catch (error: any) {
    logger.error(`Error uploading media ${fileName}: ${error.response?.data?.error?.message || error.message}`);
    throw error;
  }
}

async function findMediaByWpId(wpId: number) {
  let retries = 3;
  while (retries > 0) {
    try {
      const response = await strapiApi.get('/upload/files', {
        params: {
          filters: {
            alternativeText: {
              $eq: `wp_id:${wpId}`,
            },
          },
        },
      });
      return response.data?.[0];
    } catch (error: any) {
      retries--;
      if (retries > 0 && (error.response?.status >= 500 || error.code === 'ECONNRESET')) {
        const delay = (4 - retries) * 1000;
        logger.warn(`Strapi error ${error.response?.status || error.code} finding media (WP ID: ${wpId}). Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      return null;
    }
  }
  return null;
}

async function migrateMedia() {
  logger.log('Starting media migration...');

  try {
    const wpMedia = await fetchAllWP<any>('/media');
    logger.log(`Found ${wpMedia.length} media items in WordPress.`);

    for (const item of wpMedia) {
      const existing = await findMediaByWpId(item.id);

      if (existing) {
        logger.log(`Media "${item.title.rendered}" already exists (ID: ${existing.id}). Skipping.`);
        continue;
      }

      logger.log(`Downloading media: ${item.source_url}`);
      try {
        const response = await axios.get(item.source_url, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data);
        const fileName = item.source_url.split('/').pop() || `media-${item.id}`;
        const mimeType = item.mime_type;

        const uploaded = await uploadToStrapi(buffer, fileName, mimeType, item.id);
        if (uploaded.id !== 'dry-run-media-id') {
          logger.log(`Uploaded media: ${fileName}`);
        }
      } catch (downloadError: any) {
        logger.error(`Failed to download/upload media ${item.source_url}: ${downloadError.message}`);
        // Continue with next media
      }
    }

    logger.log('Media migration finished successfully!');
  } catch (error) {
    logger.error('Media migration failed:', error);
    process.exit(1);
  }
}

migrateMedia();
