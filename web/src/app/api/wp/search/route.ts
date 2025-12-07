import { NextResponse } from "next/server";

const API_URL = process.env.WORDPRESS_API_URL;

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    const perPage = Number(searchParams.get("perPage")) || 8;

    const url = `${API_URL}/posts?_embed&search=${encodeURIComponent(query)}&per_page=${perPage}`;

    const res = await fetch(url, { next: { revalidate: 60 } });

    if (!res.ok) {
        return NextResponse.json({ message: "Erro ao buscar posts" }, { status: res.status });
    }

    const posts = await res.json();
    return NextResponse.json({ posts });
}
