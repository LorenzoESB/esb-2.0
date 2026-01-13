"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const migration_utils_1 = require("./migration-utils");
async function uploadToStrapi(fileBuffer, fileName, mimeType, wpId) {
    if (migration_utils_1.DRY_RUN) {
        migration_utils_1.logger.log(`[DRY RUN] Would upload media: ${fileName} (WP ID: ${wpId})`);
        return { id: 'dry-run-media-id' };
    }
    const formData = new FormData();
    const blob = new Blob([fileBuffer], { type: mimeType });
    formData.append('files', blob, fileName);
    // Store WP ID in alternativeText for idempotency
    formData.append('fileInfo', JSON.stringify({
        alternativeText: `wp_id:${wpId}`,
        caption: `Migrated from WordPress ID: ${wpId}`,
    }));
    try {
        const response = await migration_utils_1.strapiApi.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data[0];
    }
    catch (error) {
        migration_utils_1.logger.error(`Error uploading media ${fileName}: ${error.response?.data?.error?.message || error.message}`);
        throw error;
    }
}
async function findMediaByWpId(wpId) {
    let retries = 3;
    while (retries > 0) {
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
            return response.data?.[0];
        }
        catch (error) {
            retries--;
            if (retries > 0 && (error.response?.status >= 500 || error.code === 'ECONNRESET')) {
                const delay = (4 - retries) * 1000;
                migration_utils_1.logger.warn(`Strapi error ${error.response?.status || error.code} finding media (WP ID: ${wpId}). Retrying in ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
                continue;
            }
            return null;
        }
    }
    return null;
}
async function migrateMedia() {
    migration_utils_1.logger.log('Starting media migration...');
    try {
        const wpMedia = await (0, migration_utils_1.fetchAllWP)('/media');
        migration_utils_1.logger.log(`Found ${wpMedia.length} media items in WordPress.`);
        for (const item of wpMedia) {
            const existing = await findMediaByWpId(item.id);
            if (existing) {
                migration_utils_1.logger.log(`Media "${item.title.rendered}" already exists (ID: ${existing.id}). Skipping.`);
                continue;
            }
            migration_utils_1.logger.log(`Downloading media: ${item.source_url}`);
            try {
                const response = await axios_1.default.get(item.source_url, { responseType: 'arraybuffer' });
                const buffer = Buffer.from(response.data);
                const fileName = item.source_url.split('/').pop() || `media-${item.id}`;
                const mimeType = item.mime_type;
                const uploaded = await uploadToStrapi(buffer, fileName, mimeType, item.id);
                if (uploaded.id !== 'dry-run-media-id') {
                    migration_utils_1.logger.log(`Uploaded media: ${fileName}`);
                }
            }
            catch (downloadError) {
                migration_utils_1.logger.error(`Failed to download/upload media ${item.source_url}: ${downloadError.message}`);
                // Continue with next media
            }
        }
        migration_utils_1.logger.log('Media migration finished successfully!');
    }
    catch (error) {
        migration_utils_1.logger.error('Media migration failed:', error);
        process.exit(1);
    }
}
migrateMedia();
