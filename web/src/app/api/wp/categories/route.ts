import { NextResponse } from "next/server";

const API_URL = process.env.WORDPRESS_API_URL || "https://educandoseubolso.blog.br/wp-json/wp/v2";

export async function GET() {
  const url = `${API_URL}/categories?per_page=100`;

  const res = await fetch(url, {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    return NextResponse.json({ message: "Erro ao buscar categorias" }, { status: res.status });
  }

  const categories = await res.json();
  const banned = new Set([
    "teste_ad",
    "sem categoria",
    "sem-categoria",
    "uncategorized",
    "ads",
    "ad",
    "advertising",
    "anuncio",
  ]);
  const filtered = (categories || []).filter((c: any) => {
    const name = String(c?.name || "").toLowerCase().trim();
    const slug = String(c?.slug || "").toLowerCase().trim();
    const count = Number(c?.count || 0);
    if (count <= 0) return false;
    if (banned.has(name)) return false;
    if (banned.has(slug)) return false;
    return true;
  });
  return NextResponse.json(filtered);
}
