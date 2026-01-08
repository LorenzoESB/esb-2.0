import Hero from "./Hero";
import Tools from "./Tools";
import { getAllPosts } from "@/lib/api/wordpress";
import { WordpressPost } from "@/types/wordpress";
import LatestArticles from "./LatestArticles";

export default async function Home() {
    const { posts: rawPosts } = await getAllPosts(4);
    const posts = (rawPosts as WordpressPost[]) ?? [];

    return (
        <div className="min-h-screen bg-background" id="blog">
            <Hero showLatest={false} />
            <Tools />
            <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-10">
                <LatestArticles posts={posts} />
            </div>
        </div>
    );
}
