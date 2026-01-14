import { NextResponse } from "next/server";
import { getPosts } from "@/lib/api/blog-service";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    const perPage = Number(searchParams.get("perPage")) || 8;

    try {
        const data = await getPosts({ search: query, perPage });
        return NextResponse.json(data);
    } catch (err) {
        console.error("Internal error searching posts:", err);
        return NextResponse.json({ message: "Erro interno" }, { status: 500 });
    }
}
