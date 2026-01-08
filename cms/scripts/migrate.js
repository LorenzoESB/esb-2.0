const { createStrapi } = require('@strapi/strapi');
const path = require('path');
const fs = require('fs');

const WP_API_URL = 'https://educandoseubolso.blog.br/wp-json/wp/v2';

async function downloadImage(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}`);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const name = path.basename(url.split('?')[0]);
    return { buffer, name, mime: response.headers.get('content-type') || 'image/jpeg' };
  } catch (e) {
    console.error(`Error downloading image ${url}:`, e.message);
    return null;
  }
}

async function fetchAll(endpoint) {
  let allData = [];
  let page = 1;
  while (true) {
    console.log(`Fetching ${endpoint} page ${page}...`);
    try {
      const res = await fetch(`${WP_API_URL}/${endpoint}?per_page=100&page=${page}`);
      if (!res.ok) {
        if (res.status === 400) break; // End of pages
        console.error(`Error fetching ${endpoint}: ${res.statusText}`);
        break;
      }
      const data = await res.json();
      if (data.length === 0) break;
      allData = allData.concat(data);
      page++;
      if (page > 50) break; // Safety
    } catch (e) {
      console.error(`Exception fetching ${endpoint}:`, e);
      break;
    }
  }
  return allData;
}

async function main() {
  const strapi = createStrapi({
    distDir: path.join(process.cwd(), 'dist'),
  });
  await strapi.load();

  console.log('Starting migration...');

  // 1. Categories
  console.log('Migrating Categories...');
  const categories = await fetchAll('categories');
  const catMap = {}; // wp_id -> strapi_documentId
  
  for (const cat of categories) {
    try {
      const existing = await strapi.documents('api::category.category').findMany({
        filters: { slug: cat.slug }
      });
      
      if (existing.length > 0) {
        catMap[cat.id] = existing[0].documentId;
      } else {
        const created = await strapi.documents('api::category.category').create({
          data: {
            name: cat.name,
            slug: cat.slug,
          },
          status: 'published'
        });
        catMap[cat.id] = created.documentId;
        console.log(`Created category ${cat.name}`);
      }
    } catch (e) {
      console.error(`Error processing category ${cat.name}:`, e.message);
    }
  }

  // 2. Tags
  console.log('Migrating Tags...');
  const tags = await fetchAll('tags');
  const tagMap = {};
  
  for (const tag of tags) {
    try {
      const existing = await strapi.documents('api::tag.tag').findMany({
          filters: { slug: tag.slug }
      });

      if (existing.length > 0) {
          tagMap[tag.id] = existing[0].documentId;
      } else {
          const created = await strapi.documents('api::tag.tag').create({
              data: {
                  name: tag.name,
                  slug: tag.slug,
              },
              status: 'published'
          });
          tagMap[tag.id] = created.documentId;
          console.log(`Created tag ${tag.name}`);
      }
    } catch (e) {
      console.error(`Error processing tag ${tag.name}:`, e.message);
    }
  }

  // 3. Posts
  console.log('Migrating Posts...');
  let page = 1;
  while(true) {
      console.log(`Fetching posts page ${page}...`);
      try {
        const res = await fetch(`${WP_API_URL}/posts?_embed&per_page=20&page=${page}`);
        if (!res.ok) {
            if (res.status === 400) break;
            console.error(`Error fetching posts: ${res.statusText}`);
            break;
        }
        const posts = await res.json();
        if (posts.length === 0) break;
        
        for (const post of posts) {
            try {
              const existing = await strapi.documents('api::post.post').findMany({
                  filters: { slug: post.slug }
              });
              
              if (existing.length > 0) {
                  console.log(`Post ${post.slug} exists. Skipping.`);
                  continue;
              }

              // Handle Image
              let coverImageId = null;
              if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
                  const media = post._embedded['wp:featuredmedia'][0];
                  const imageUrl = media.source_url;
                  if (imageUrl) {
                      const image = await downloadImage(imageUrl);
                      if (image) {
                        try {
                          const uploadedFiles = await strapi.plugin('upload').service('upload').upload({
                              files: {
                                  name: image.name,
                                  type: image.mime,
                                  size: image.buffer.length,
                                  buffer: image.buffer,
                              },
                              data: {},
                          });
                          if (uploadedFiles && uploadedFiles.length > 0) {
                              coverImageId = uploadedFiles[0].id;
                          }
                        } catch (uploadErr) {
                          console.error(`Failed to upload image for ${post.slug}:`, uploadErr.message);
                        }
                      }
                  }
              }

              // Map Categories and Tags
              const postCats = post.categories ? post.categories.map(id => catMap[id]).filter(Boolean) : [];
              const postTags = post.tags ? post.tags.map(id => tagMap[id]).filter(Boolean) : [];

              await strapi.documents('api::post.post').create({
                  data: {
                      title: post.title.rendered,
                      slug: post.slug,
                      content: post.content.rendered,
                      excerpt: post.excerpt.rendered,
                      published_at: post.date,
                      seo_title: post.yoast_head_json ? post.yoast_head_json.title : post.title.rendered,
                      seo_description: post.yoast_head_json ? post.yoast_head_json.description : "",
                      cover_image: coverImageId,
                      categories: postCats,
                      tags: postTags,
                  },
                  status: 'published',
              });
              console.log(`Created post ${post.slug}`);
            } catch (e) {
              console.error(`Error processing post ${post.slug}:`, e.message);
            }
        }
        page++;
        if (page > 5) break; // Limit to 100 posts for initial run to be fast
      } catch (e) {
        console.error('Exception in post loop:', e);
        break;
      }
  }

  console.log('Migration complete.');
  process.exit(0);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
