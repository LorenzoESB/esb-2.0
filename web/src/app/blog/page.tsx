import { getAllPosts, getCategories } from "@/lib/api/wordpress";
import { BlogContent } from "@/components/blog/BlogContent";
import { WordpressPost } from "@/types/wordpress";

export const revalidate = 60;

export default async function BlogPage({
    searchParams,
}: {
    searchParams: { search?: string; page?: string; category?: string; q?: string };
}) {
    const rawQuery = searchParams?.q ?? searchParams?.search ?? "";
    const searchQuery = (rawQuery ?? "").trim();
    const currentPage = Number.isNaN(parseInt(searchParams?.page ?? "", 10))
        ? 1
        : parseInt(searchParams?.page ?? "1", 10);

    const categories = await getCategories();
    const categorySlug = searchParams?.category ?? "";
    const matchedCategory = categories.find((cat: any) => cat.slug === categorySlug);
    const categoryId = matchedCategory?.id;

    const data = await getAllPosts(8, searchQuery, currentPage, categoryId);
    const posts = (data.posts as WordpressPost[]) ?? [];

    return (
        <main className="container mx-auto px-4 sm:px-6 lg:px-12 py-10 space-y-10">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">Blog</h1>
                <p className="text-muted-foreground">
                    Conteúdo especializado para você ficar por dentro das tendências do mercado financeiro.
                </p>
            </div>

            <BlogContent
                categories={categories}
                initialPosts={posts}
                totalPages={data.totalPages || 1}
                totalPosts={data.totalPosts || data.posts.length}
                initialPage={currentPage}
                searchQuery={searchQuery}
                initialCategory={categorySlug || undefined}
            />
        </main>
    );
}
