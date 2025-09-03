import PostCard from "@/components/Posts";
import { getAllPosts } from "@/lib/wordpress";

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ search?: string }> }) {
    const { search } = await searchParams;
    const searchQuery = search || "";
    const posts = await getAllPosts(8, searchQuery);
    return (
        <main className="container mx-auto px-4 py-8 ">
            <h1 className="text-2xl font-bold mb-4">Resultados para: {searchQuery}</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {posts.map((post: any, index: number) => {
                    return (
                        <PostCard
                            key={post.id}
                            post={post}
                            index={index}
                        />
                    );
                })}
            </div>
        </main>
    );
}
