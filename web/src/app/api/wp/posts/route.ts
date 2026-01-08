import { NextResponse } from "next/server";

const STRAPI_API_URL = process.env.STRAPI_API_URL || "http://localhost:1337/api";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const perPage = Number(searchParams.get("perPage")) || 10;
    const page = Number(searchParams.get("page")) || 1;
    const search = searchParams.get("search");
    const category = searchParams.get("category");

    const params = new URLSearchParams();
    params.set("pagination[pageSize]", perPage.toString());
    params.set("pagination[page]", page.toString());
    params.set("populate", "*"); 

    if (search) {
        params.set("filters[title][$containsi]", search);
    }

    if (category) {
        const isNumeric = /^\d+$/.test(category);
        if (isNumeric) {
            // Assuming the ID passed is a Strapi ID (from updated categories route)
            // But Strapi 5 uses documentId which is string.
            // If it's numeric, it might be the SQL ID.
            // Let's try filtering by ID.
            params.set("filters[categories][id][$eq]", category);
        } else {
            params.set("filters[categories][slug][$eq]", category);
        }
    }

    // Sort by date desc
    params.set("sort[0]", "publishedAt:desc");

    const url = `${STRAPI_API_URL}/posts?${params.toString()}`;

    try {
        const res = await fetch(url);
        
        if (!res.ok) {
            console.error("Strapi fetch error:", res.status, res.statusText);
            return NextResponse.json({ message: "Erro ao buscar posts" }, { status: res.status });
        }

        const data = await res.json();
        const strapiPosts = data.data || [];
        const pagination = data.meta?.pagination || { pageCount: 1, total: 0 };

        const posts = strapiPosts.map((post: any) => ({
            id: post.documentId, // Use documentId as ID
            slug: post.slug,
            title: { rendered: post.title },
            excerpt: { rendered: post.excerpt || "" },
            content: { rendered: post.content || "" },
            date: post.publishedAt,
            _embedded: {
                "wp:featuredmedia": post.cover_image ? [{
                    source_url: post.cover_image.url.startsWith('http') ? post.cover_image.url : `http://localhost:1337${post.cover_image.url}`
                }] : []
            },
            categories: post.categories?.map((c: any) => c.id) || [], // Map to IDs
            tags: post.tags?.map((t: any) => t.id) || [],
        }));

        return NextResponse.json({ posts, totalPages: pagination.pageCount, totalPosts: pagination.total });
    } catch (err) {
        console.error("Internal error fetching posts:", err);
        return NextResponse.json({ message: "Erro interno" }, { status: 500 });
    }
}
