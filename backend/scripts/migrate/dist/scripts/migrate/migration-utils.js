"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.DRY_RUN = exports.strapiApi = exports.wpApi = void 0;
exports.findInStrapi = findInStrapi;
exports.findInStrapiBySlug = findInStrapiBySlug;
exports.createInStrapi = createInStrapi;
exports.updateInStrapi = updateInStrapi;
exports.fetchAllWP = fetchAllWP;
const axios_1 = __importDefault(require("axios"));
const dotenv = __importStar(require("dotenv"));
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
                    success = true; // Mark as "success" to move to the next page
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
