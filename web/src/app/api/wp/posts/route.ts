import { NextResponse } from "next/server";
import { getPosts } from "@/lib/api/blog-service";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const perPage = Number(searchParams.get("perPage")) || 10;
    const page = Number(searchParams.get("page")) || 1;
    const search = searchParams.get("search") || undefined;
    const category = searchParams.get("category");

    try {
        const options: any = { perPage, page, search };
        if (category) {
            if (/^\d+$/.test(category)) {
                options.categoryId = Number(category);
            } else {
                options.categorySlug = category;
            }
        }

        const data = await getPosts(options);
        return NextResponse.json(data);
    } catch (err) {
        console.error("Internal error fetching posts:", err);
        return NextResponse.json({ message: "Erro interno" }, { status: 500 });
    }
}
