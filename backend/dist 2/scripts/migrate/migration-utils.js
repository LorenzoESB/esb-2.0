"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.DRY_RUN = exports.strapiApi = exports.wpApi = void 0;
exports.findInStrapi = findInStrapi;
exports.findInStrapiBySlug = findInStrapiBySlug;
exports.createInStrapi = createInStrapi;
exports.updateInStrapi = updateInStrapi;
exports.fetchAllWP = fetchAllWP;
const axios_1 = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const logger = {
    log: (msg) => console.log(`[LOG] ${msg}`),
    error: (msg, err) => console.error(`[ERROR] ${msg}`, err || ''),
    warn: (msg) => console.warn(`[WARN] ${msg}`),
};
exports.logger = logger;
exports.wpApi = axios_1.default.create({
    baseURL: process.env.WORDPRESS_API_URL || 'https://educandoseubolso.blog.br/wp-json/wp/v2',
});
exports.strapiApi = axios_1.default.create({
    baseURL: process.env.STRAPI_API_URL || 'http://localhost:1337/api',
    headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
});
exports.DRY_RUN = process.env.DRY_RUN !== 'false';
async function findInStrapi(collection, originalId) {
    let retries = 3;
    while (retries > 0) {
        try {
            const response = await exports.strapiApi.get(`/${collection}`, {
                params: {
                    filters: {
                        originalId: {
                            $eq: originalId,
                        },
                    },
                },
            });
            const item = response.data.data?.[0];
            if (item) {
                const id = item.documentId || item.id;
                if (!item.documentId) {
                    logger.warn(`Record in ${collection} found but missing documentId. Using numerical id: ${item.id}`);
                }
                return {
                    ...item,
                    id,
                };
            }
            return null;
        }
        catch (error) {
            if (error.response?.status === 404)
                return null;
            retries--;
            if (retries > 0 && (error.response?.status >= 500 || error.code === 'ECONNRESET')) {
                const delay = (4 - retries) * 1000;
                logger.warn(`Strapi error ${error.response?.status || error.code} finding ${collection} (ID: ${originalId}). Retrying in ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
                continue;
            }
            logger.error(`Error finding ${collection} with originalId ${originalId}: ${error.response?.status || error.message}`);
            throw error;
        }
    }
    return null;
}
async function findInStrapiBySlug(collection, slug) {
    let retries = 3;
    while (retries > 0) {
        try {
            const response = await exports.strapiApi.get(`/${collection}`, {
                params: {
                    filters: {
                        slug: {
                            $eq: slug,
                        },
                    },
                },
            });
            const item = response.data.data?.[0];
            if (item) {
                const id = item.documentId || item.id;
                if (!item.documentId) {
                    logger.warn(`Record in ${collection} with slug ${slug} found but missing documentId. Using numerical id: ${item.id}`);
                }
                return {
                    ...item,
                    id,
                };
            }
            return null;
        }
        catch (error) {
            if (error.response?.status === 404)
                return null;
            retries--;
            if (retries > 0 && (error.response?.status >= 500 || error.code === 'ECONNRESET')) {
                const delay = (4 - retries) * 1000;
                logger.warn(`Strapi error ${error.response?.status || error.code} finding ${collection} (Slug: ${slug}). Retrying in ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
                continue;
            }
            logger.error(`Error finding ${collection} with slug ${slug}: ${error.response?.status || error.message}`);
            throw error;
        }
    }
    return null;
}
async function createInStrapi(collection, data) {
    if (exports.DRY_RUN) {
        logger.log(`[DRY RUN] Would create in ${collection}: ${JSON.stringify(data.slug || data.name || data.title)}`);
        return { id: 'dry-run-id', attributes: data };
    }
    let retries = 3;
    while (retries > 0) {
        try {
            const response = await exports.strapiApi.post(`/${collection}`, { data });
            const item = response.data.data;
            const id = item.documentId || item.id;
            return {
                ...item,
                id,
            };
        }
        catch (error) {
            retries--;
            if (retries > 0 && (error.response?.status >= 500 || error.code === 'ECONNRESET')) {
                const delay = (4 - retries) * 1000;
                logger.warn(`Strapi error ${error.response?.status || error.code} creating in ${collection}. Retrying in ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
                continue;
            }
            logger.error(`Error creating in ${collection}: ${error.response?.data?.error?.message || error.message}`);
            if (error.response?.data?.error?.details?.errors) {
                logger.error('Details:', JSON.stringify(error.response.data.error.details.errors));
            }
            throw error;
        }
    }
    throw new Error(`Failed to create in ${collection} after retries`);
}
async function updateInStrapi(collection, id, data) {
    if (exports.DRY_RUN) {
        logger.log(`[DRY RUN] Would update ${collection} ${id}: ${JSON.stringify(data.slug || data.name || data.title)}`);
        return { id, attributes: data };
    }
    let retries = 3;
    while (retries > 0) {
        try {
            const response = await exports.strapiApi.put(`/${collection}/${id}`, { data });
            return response.data.data;
        }
        catch (error) {
            retries--;
            if (retries > 0 && (error.response?.status >= 500 || error.code === 'ECONNRESET')) {
                const delay = (4 - retries) * 1000;
                logger.warn(`Strapi error ${error.response?.status || error.code} updating ${collection} ${id}. Retrying in ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
                continue;
            }
            logger.error(`Error updating ${collection} ${id}: ${error.response?.data?.error?.message || error.message}`);
            throw error;
        }
    }
    throw new Error(`Failed to update ${collection} ${id} after retries`);
}
async function fetchAllWP(endpoint) {
    let all = [];
    let page = 1;
    let totalPages = 1;
    const perPage = 10;
    const skippedPages = [];
    do {
        let retries = 5;
        let success = false;
        while (retries > 0 && !success) {
            try {
                logger.log(`Fetching ${endpoint} - Page ${page}...`);
                const response = await exports.wpApi.get(endpoint, {
                    params: {
                        page,
                        per_page: perPage,
                        _fields: 'id,title,slug,excerpt,content,author,categories,featured_media,link,status,date',
                    },
                });
                all = all.concat(response.data);
                totalPages = parseInt(response.headers['x-wp-totalpages'] || '1', 10);
                success = true;
                await new Promise(resolve => setTimeout(resolve, 300));
            }
            catch (error) {
                if (error.response?.status === 400 && error.response?.data?.code === 'rest_post_invalid_page_number') {
                    success = true;
                    break;
                }
                retries--;
                if (retries > 0) {
                    const delay = (6 - retries) * 3000;
                    logger.warn(`Failed to fetch ${endpoint} page ${page} (Status: ${error.response?.status}). Retrying in ${delay}ms... (${retries} retries left)`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
                else {
                    logger.error(`Failed to fetch ${endpoint} page ${page} after all retries. Skipping this page to continue migration.`);
                    skippedPages.push(page);
                    success = true;
                }
            }
        }
        page++;
    } while (page <= totalPages);
    if (skippedPages.length > 0) {
        logger.warn(`Migration continued but the following pages were skipped due to errors: ${skippedPages.join(', ')}`);
    }
    return all;
}
//# sourceMappingURL=migration-utils.js.map