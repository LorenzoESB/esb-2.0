// import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }/*: { strapi: Core.Strapi } */) {
    /*
    try {
      const publicRole = await strapi
        .plugin("users-permissions")
        .service("role")
        .findOne({ type: "public" });

      if (publicRole) {
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
            await strapi.db.query('plugin::users-permissions.permission').create({
              data: {
                role: publicRole.id,
                action: action,
                enabled: true
              }
            });
            strapi.log.info(`Enabled public permission: ${action}`);
          } catch (err) {
            // Ignore if already exists
          }
        }
      }
    } catch (e) {
      strapi.log.error(`Error setting public permissions: ${e.message}`);
    }
    */
  },
};
