// app/blog/page.tsx
export const dynamic = "force-dynamic"; // ou: export const revalidate = 0;

import PostCard from "@/components/Posts";
import { PaginationPosts } from "@/components/Pagination";
import { getAllPosts } from "@/lib/wordpress";
import FiltersBlog from "@/components/Filters";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { search?: string; page?: string };
}) {
  const currentPage = Number.isNaN(parseInt(searchParams?.page ?? "", 10))
    ? 1
    : parseInt(searchParams?.page ?? "1", 10);

  const searchQuery = (searchParams?.search ?? "").trim();

  const data = await getAllPosts(8, searchQuery, currentPage);

  return (
    <main className="container mx-auto px-32 py-8">
      <h1 className="text-2xl font-bold mb-4">
        {searchQuery ? `Resultados para: ${searchQuery}` : "Todos os posts"}
      </h1>

      <div className="grid grid-cols-5 gap-6 ">
        <FiltersBlog />
        <div className="col-span-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.posts.map((post: any) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>

      <PaginationPosts
        currentPage={currentPage}
        totalPages={data.totalPages || 1}
        searchQuery={searchQuery}
      />
    </main>
  );
}
