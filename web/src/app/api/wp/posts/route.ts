import { NextResponse } from "next/server";

const API_URL = process.env.WORDPRESS_API_URL;

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const perPage = Number(searchParams.get("perPage")) || 8;
    const page = Number(searchParams.get("page")) || 1;
    const search = searchParams.get("search");
    const category = searchParams.get("category");

    const searchParam = search ? `&search=${encodeURIComponent(search)}` : "";
    const categoryParam = category ? `&categories=${encodeURIComponent(category)}` : "";

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
