const API_URL = process.env.NEXT_PUBLIC_API_URL;

function requireApiUrl() {
  if (!API_URL) {
    return null;
  }
  return API_URL;
}

export async function getAllPosts(
  maxPosts: number,
  search?: string,
  currentPage: number = 1,
  categoryId?: number,
) {
  const baseUrl = requireApiUrl();

  if (!maxPosts || maxPosts <= 0) {
    maxPosts = 9;
  }

  const searchParam = search ? `&search=${encodeURIComponent(search)}` : "";
  const pageParam = `&page=${encodeURIComponent(currentPage)}`;
  const categoryParam =
    categoryId && categoryId > 0
      ? `&categoryId=${encodeURIComponent(categoryId)}`
      : "";

  try {
    if (baseUrl) {
      const res = await fetch(
        `${baseUrl}/blog/posts?perPage=${maxPosts}${searchParam}${pageParam}${categoryParam}`,
        { next: { revalidate: 60 } }
      );
      if (res.ok) {
        return res.json();
      }
      throw new Error(
        `Failed to fetch posts: ${res.status} ${res.statusText || ""}`.trim()
      );
    }
    throw new Error("NEXT_PUBLIC_API_URL not configured");
  } catch (error) {
    try {
      const WP = process.env.WORDPRESS_API_URL || "https://educandoseubolso.blog.br/wp-json/wp/v2";
      const wpSearch = search ? `&search=${encodeURIComponent(search)}` : "";
      const wpCategory = categoryId && categoryId > 0 ? `&categories=${encodeURIComponent(categoryId)}` : "";
      const res = await fetch(
        `${WP}/posts?_embed&per_page=${maxPosts}&page=${currentPage}${wpSearch}${wpCategory}`,
        { next: { revalidate: 60 } }
      );
      if (!res.ok) {
        throw new Error(
          `Failed to fetch posts via WP: ${res.status} ${res.statusText || ""}`.trim()
        );
      }
      const totalPages = parseInt(res.headers.get("X-WP-TotalPages") || "1", 10);
      const totalPosts = parseInt(res.headers.get("X-WP-Total") || "0", 10);
      const posts = await res.json();
      return { posts, totalPages, totalPosts };
    } catch (routeError) {
      console.error(`getAllPosts: ${(routeError as Error).message}`);
      return { posts: [], totalPages: 1, totalPosts: 0 };
    }
  }
}

export async function getPostBySlug(slug: string) {
  const baseUrl = requireApiUrl();
  try {
    if (baseUrl) {
      const res = await fetch(`${baseUrl}/blog/posts/${slug}`, {
        next: { revalidate: 60 },
      });
      if (res.ok) {
        return res.json();
      }
    }
    throw new Error("Backend unavailable");
  } catch {
    try {
      const WP = process.env.WORDPRESS_API_URL || "https://educandoseubolso.blog.br/wp-json/wp/v2";
      const res = await fetch(`${WP}/posts?slug=${encodeURIComponent(slug)}&_embed=true`, {
        next: { revalidate: 60 },
      });
      if (!res.ok) return null;
      const arr = await res.json();
      const post = Array.isArray(arr) ? arr[0] : null;
      return post || null;
    } catch {
      return null;
    }
  }
}

export async function getPageBySlug(slug: string) {
  const baseUrl = requireApiUrl();
  const res = await fetch(`${baseUrl}/blog/pages/${slug}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch page");
  }
  return res.json();
}

export async function getCategories() {
  const baseUrl = requireApiUrl();
  try {
    if (baseUrl) {
      const res = await fetch(`${baseUrl}/blog/categories`, {
        next: { revalidate: 60 },
      });
      if (!res.ok) {
        throw new Error(
          `Failed to fetch categories: ${res.status} ${res.statusText || ""}`.trim()
        );
      }
      return res.json();
    }
    throw new Error("NEXT_PUBLIC_API_URL not configured");
  } catch (error) {
    try {
      const WP = process.env.WORDPRESS_API_URL || "https://educandoseubolso.blog.br/wp-json/wp/v2";
      const res = await fetch(`${WP}/categories?per_page=100`, {
        next: { revalidate: 300 },
      });
      if (!res.ok) {
        throw new Error(
          `Failed to fetch categories via WP: ${res.status} ${res.statusText || ""}`.trim()
        );
      }
      return res.json();
    } catch (routeError) {
      console.error(`getCategories: ${(routeError as Error).message}`);
      return [];
    }
  }
}

export async function getPostsByCategory(categoryId: number) {
  const baseUrl = requireApiUrl();
  const res = await fetch(
    `${baseUrl}/blog/posts?categoryId=${categoryId}`,
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
  const baseUrl = requireApiUrl();
  const res = await fetch(`${baseUrl}/blog/media`);
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
