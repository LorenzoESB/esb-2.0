const API_URL = process.env.NEXT_PUBLIC_API_URL;

function requireApiUrl() {
  if (!API_URL) {
    throw new Error(
      "NEXT_PUBLIC_API_URL is not set. Define it in the environment so the blog can fetch posts."
    );
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
    maxPosts = 10;
  }

  const searchParam = search ? `&search=${encodeURIComponent(search)}` : "";
  const pageParam = `&page=${encodeURIComponent(currentPage)}`;
  const categoryParam =
    categoryId && categoryId > 0
      ? `&categoryId=${encodeURIComponent(categoryId)}`
      : "";

  try {
    const res = await fetch(
      `${baseUrl}/blog/posts?perPage=${maxPosts}${searchParam}${pageParam}${categoryParam}`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      throw new Error(
        `Failed to fetch posts: ${res.status} ${res.statusText || ""}`.trim()
      );
    }

    return res.json();
  } catch (error) {
    // Graceful fallback so static build doesn't fail if backend isn't reachable.
    console.error(`getAllPosts: ${(error as Error).message}`);
    return { posts: [], totalPages: 1, totalPosts: 0 };
  }
}

export async function getPostBySlug(slug: string) {
  const baseUrl = requireApiUrl();
  const res = await fetch(`${baseUrl}/blog/posts/${slug}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }
  return res.json();
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
    const res = await fetch(`${baseUrl}/blog/categories`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      throw new Error(
        `Failed to fetch categories: ${res.status} ${res.statusText || ""}`.trim()
      );
    }
    return res.json();
  } catch (error) {
    console.error(`getCategories: ${(error as Error).message}`);
    return [];
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
