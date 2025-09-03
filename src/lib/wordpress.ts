const API_URL = process.env.WORDPRESS_API_URL;

// Fetch all posts
export async function getAllPosts(maxPosts: number) {
  const res = await fetch(`${API_URL}/posts?_embed&per_page=${maxPosts}`);
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  return res.json();
}

// Fetch a single post by slug
export async function getPostBySlug(slug: string) {
  const res = await fetch(`${API_URL}/posts?slug=${slug}&_embed`);
  if (!res.ok) {
    throw new Error('Failed to fetch post');
  }
  const posts = await res.json();
  return posts[0];
}

// Fetch all pages
// export async function getAllPages() {
//   const res = await fetch(`${API_URL}/pages?_embed&per_page=15`);
//   if (!res.ok) {
//     throw new Error('Failed to fetch pages');
//   }
//   return res.json();
// }

// Fetch a single page by slug
export async function getPageBySlug(slug: string) {
  const res = await fetch(`${API_URL}/pages?slug=${slug}&_embed`);
  if (!res.ok) {
    throw new Error('Failed to fetch page');
  }
  const pages = await res.json();
  return pages[0];
}

// Fetch categories
export async function getCategories() {
  const res = await fetch(`${API_URL}/categories`);
  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }
  return res.json();
}

// Fetch posts by category
export async function getPostsByCategory(categoryId: number) {
  const res = await fetch(`${API_URL}/posts?categories=${categoryId}&_embed`);
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  return res.json();
}

export function getPostCategories(post: any) {
  const categories = post._embedded?.['wp:term']?.[0];
  if (!categories || !Array.isArray(categories)) return [];
  
  return categories.map((category: any) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description,
    count: category.count,
    link: category.link
  }));
}

// Fetch media
export async function getMedia() {
  const res = await fetch(`${API_URL}/media`);
  if (!res.ok) {
    throw new Error('Failed to fetch media');
  }
  return res.json();
}

// Helper function to extract featured image
export function getFeaturedImage(post: any) {
  const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
  if (!featuredMedia) return null;
  
  return {
    url: featuredMedia.source_url,
    alt: featuredMedia.alt_text || post.title.rendered,
    width: featuredMedia.media_details?.width,
    height: featuredMedia.media_details?.height
  };
}

// Helper function to extract author
export function getAuthor(post: any) {
  const author = post._embedded?.author?.[0];
  if (!author) return null;
  
  return {
    name: author.name,
    avatar: author.avatar_urls?.['96'],
    description: author.description
  };
}