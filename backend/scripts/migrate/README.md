# WordPress to Strapi Migration Scripts

This folder contains a set of scripts to migrate data from WordPress to Strapi CMS.

## Prerequisites

1. **Environment Variables**: Ensure the following variables are set in your `.env` file in the `backend` directory:
   ```env
   WORDPRESS_API_URL=https://educandoseubolso.blog.br/wp-json/wp/v2
   STRAPI_API_URL=http://localhost:1337/api
   STRAPI_API_TOKEN=your_strapi_admin_token
   DRY_RUN=false
   ```
   - `DRY_RUN=true`: Logs actions without performing any writes to Strapi.
   - `STRAPI_API_TOKEN`: Needs to be a "Full Access" or custom token with permissions for the target content types.

2. **Dependencies**: The scripts use `axios`, `dotenv`, and `ts-node`, which are already in the backend's `package.json`.

## Execution Order

The scripts must be run in the following order to respect data relationships:

1. `01-migrate-categories.ts`
2. `02-migrate-authors.ts`
3. `03-migrate-media.ts`
4. `04-migrate-articles.ts`
5. `05-migrate-comments.ts`

## How to Run

Because of potential Node.js version incompatibilities with `ts-node`, it is recommended to compile the scripts first and then run them with `node`.

From the `backend` directory:

### 1. Compile all migration scripts
```bash
npm run migrate:compile
```

### 2. Run in DRY-RUN mode (Safety First)
This will log everything that *would* happen without writing anything to the Strapi database. **If you see "Created..." logs here, it is just a simulation.**
```bash
DRY_RUN=true npm run migrate:run
```

### 3. Perform Actual Migration
To actually save data to Strapi, you **MUST** set `DRY_RUN=false`.
```bash
DRY_RUN=false npm run migrate:run
```

## Migration Details

- **Idempotency**: All scripts check if a record already exists in Strapi using the `originalId` (WordPress ID) before creating a new one.
- **Hierarchy**: Categories and Comments maintain their parent/child relationships through a two-pass migration process.
- **Media**: WordPress media items are downloaded and uploaded to the Strapi Media Library. The WordPress ID is stored in the `alternativeText` field for tracking.
- **Slugs**: Slugs are preserved from WordPress to maintain SEO consistency.
- **Draft/Publish**: 
  - **Authors** and **Categories** are created as **Drafts** by default. You will need to publish them in the Strapi Admin panel.
  - **Articles** are published automatically if their WordPress status was "publish".

## Troubleshooting

- **Data not appearing?**: Ensure you ran with `DRY_RUN=false`. If you used `DRY_RUN=true`, the logs will simulate creation but nothing will be saved.
- **Check Drafts**: Authors and Categories might be in "Draft" state in the Strapi Admin.
- **Logs**: Detailed error logs will appear in the terminal if a request fails.
