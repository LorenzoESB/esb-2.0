const API_URL = process.env.WORDPRESS_API_URL;

export async function getAllPosts(
  maxPosts: number,
  search?: string,
  currentPage: number = 1,
  categoryId?: number,
) {
  if (!maxPosts || maxPosts <= 0) {
    maxPosts = 10;
  }

  const searchParam = search ? `&search=${encodeURIComponent(search)}` : "";
  const pageParam = `&page=${encodeURIComponent(currentPage)}`;
  const categoryParam =
    categoryId && categoryId > 0
      ? `&categories=${encodeURIComponent(categoryId)}`
      : "";

  const res = await fetch(
    `${API_URL}/posts?_embed&per_page=${maxPosts}${searchParam}${pageParam}${categoryParam}`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const totalPages = parseInt(res.headers.get("X-WP-TotalPages") || "1", 10);
  const totalPosts = parseInt(res.headers.get("X-WP-Total") || "0", 10);

  const posts = await res.json();

  return {
    posts,
    totalPages,
    totalPosts,
  };
}

export async function getPostBySlug(slug: string) {
  const res = await fetch(`${API_URL}/posts?slug=${slug}&_embed`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }
  const posts = await res.json();
  return posts[0];
}

export async function getPageBySlug(slug: string) {
  const res = await fetch(`${API_URL}/pages?slug=${slug}&_embed`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch page");
  }
  const pages = await res.json();
  return pages[0];
}

export async function getCategories() {
  const res = await fetch(`${API_URL}/categories`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  return res.json();
}

export async function getPostsByCategory(categoryId: number) {
  const res = await fetch(
    `${API_URL}/posts?categories=${categoryId}&_embed`,
    {
      next: { revalidate: 60 },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  return res.json();
}

export function getPostCategories(post: any) {
  const categories = post._embedded?.["wp:term"]?.[0];
  if (!categories || !Array.isArray(categories)) return [];

  return categories.map((category: any) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description,
    count: category.count,
    link: category.link,
  }));
}

export async function getMedia() {
  const res = await fetch(`${API_URL}/media`);
  if (!res.ok) {
    throw new Error("Failed to fetch media");
  }
  return res.json();
}

export function getFeaturedImage(post: any) {
  const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0];
  if (!featuredMedia) return null;

  return {
    url: featuredMedia.source_url,
    alt: featuredMedia.alt_text || post.title.rendered,
    width: featuredMedia.media_details?.width,
    height: featuredMedia.media_details?.height,
  };
}

export function getAuthor(post: any) {
  const author = post._embedded?.author?.[0];
  if (!author) return null;

  return {
    name: author.name,
    avatar: author.avatar_urls?.["96"],
    description: author.description,
  };
}
