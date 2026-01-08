const { createStrapi } = require('@strapi/strapi');
const path = require('path');
const crypto = require('crypto');

async function main() {
  const strapi = createStrapi({ distDir: path.join(process.cwd(), 'dist') });
  await strapi.load();

  const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
      where: { type: { $eq: 'public' } }
  });
  
  if (!publicRole) {
      console.error('Public role not found');
      process.exit(1);
  }

  const permissionsToEnable = [
      "api::post.post.find",
      "api::post.post.findOne",
      "api::category.category.find",
      "api::category.category.findOne",
      "api::tag.tag.find",
      "api::tag.tag.findOne",
  ];

  for (const action of permissionsToEnable) {
      try {
          // 1. Get or Create Permission
          let perm = await strapi.db.connection('up_permissions').where({ action }).first();
          let permId;

          if (!perm) {
              const res = await strapi.db.connection('up_permissions').insert({
                  action,
                  document_id: crypto.randomUUID().replace(/-/g, '').toLowerCase().substring(0, 24),
                  created_at: new Date(),
                  updated_at: new Date(),
                  published_at: new Date(),
              });
              // Knex SQLite returns [id]
              permId = res[0]; 
          } else {
              permId = perm.id;
          }

          // 2. Link to Role
          const link = await strapi.db.connection('up_permissions_role_lnk')
              .where({ permission_id: permId, role_id: publicRole.id })
              .first();
          
          if (!link) {
              await strapi.db.connection('up_permissions_role_lnk').insert({
                  permission_id: permId,
                  role_id: publicRole.id,
              });
              console.log(`Enabled ${action}`);
          } else {
              console.log(`Already enabled ${action}`);
          }
      } catch (e) {
          console.error(`Error enabling ${action}:`, e.message);
      }
  }

  process.exit(0);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
