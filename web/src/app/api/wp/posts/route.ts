import { NextResponse } from "next/server";

const API_URL = process.env.WORDPRESS_API_URL || "https://educandoseubolso.blog.br/wp-json/wp/v2";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const perPage = Number(searchParams.get("perPage")) || 8;
    const page = Number(searchParams.get("page")) || 1;
    const search = searchParams.get("search");
    const category = searchParams.get("category");

    const searchParam = search ? `&search=${encodeURIComponent(search)}` : "";
    let categoryParam = "";
    if (category) {
        const isNumeric = /^\d+$/.test(category);
        if (isNumeric) {
            categoryParam = `&categories=${category}`;
        } else {
            const catRes = await fetch(`${API_URL}/categories?slug=${encodeURIComponent(category)}`);
            if (catRes.ok) {
                const catData = await catRes.json();
                const catId = Array.isArray(catData) && catData[0]?.id;
                if (catId) {
                    categoryParam = `&categories=${catId}`;
                }
            }
        }
    }

    const url = `${API_URL}/posts?_embed&per_page=${perPage}&page=${page}${searchParam}${categoryParam}`;

    const res = await fetch(url, {
        next: { revalidate: 60 },
    });

    if (!res.ok) {
        return NextResponse.json({ message: "Erro ao buscar posts" }, { status: res.status });
    }

    const totalPages = parseInt(res.headers.get("X-WP-TotalPages") || "1", 10);
    const totalPosts = parseInt(res.headers.get("X-WP-Total") || "0", 10);
    const posts = await res.json();

    return NextResponse.json({ posts, totalPages, totalPosts });
}
