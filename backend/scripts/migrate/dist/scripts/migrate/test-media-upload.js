"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const migration_utils_1 = require("./migration-utils");
async function testMedia() {
    migration_utils_1.logger.log('Testing Strapi Media Upload...');
    try {
        // Download a small test image
        const imageUrl = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png';
        migration_utils_1.logger.log(`Downloading test image: ${imageUrl}`);
        const response = await axios_1.default.get(imageUrl, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data);
        const formData = new FormData();
        const blob = new Blob([buffer], { type: 'image/png' });
        formData.append('files', blob, 'google-test-logo.png');
        formData.append('fileInfo', JSON.stringify({
            alternativeText: 'wp_id:999999',
            caption: 'Test Upload',
        }));
        migration_utils_1.logger.log('Uploading to Strapi...');
        const uploadResponse = await migration_utils_1.strapiApi.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        const uploadedFile = uploadResponse.data[0];
        migration_utils_1.logger.log(`SUCCESS: Media uploaded! ID: ${uploadedFile.id}, URL: ${uploadedFile.url}`);
    }
    catch (error) {
        migration_utils_1.logger.error('Media test failed:', error.response?.data || error.message);
    }
}
testMedia();
