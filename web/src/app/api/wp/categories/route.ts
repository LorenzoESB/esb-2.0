import { NextResponse } from "next/server";
import { getCategories } from "@/lib/api/blog-service";

export async function GET() {
  try {
    const filtered = await getCategories();
    return NextResponse.json(filtered);
  } catch (err) {
    console.error("Internal error fetching categories:", err);
    return NextResponse.json({ message: "Erro interno" }, { status: 500 });
  }
}
