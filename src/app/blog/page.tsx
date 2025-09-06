import PostCard from "@/components/Posts";
import { PaginationPosts } from "@/components/Pagination";
import { getAllPosts } from "@/lib/wordpress";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { search?: string; page?: string };
}) {
  const currentPage = parseInt(searchParams.page || "1", 10);
  const searchQuery = searchParams?.search || "";

  const data = await getAllPosts(8, searchQuery, currentPage);

  return (
    <main className="container mx-auto px-4 py-8 ">
      <h1 className="text-2xl font-bold mb-4">
        Resultados para: {searchQuery}
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.posts.map((post: any) => {
          return <PostCard key={post.id} post={post} />;
        })}
      </div>
      <PaginationPosts
        currentPage={currentPage}
        totalPages={data.totalPages}
        searchQuery={searchQuery}
      />
    </main>
  );
}
