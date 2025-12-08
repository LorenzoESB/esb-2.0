import Hero from "./Hero";
import Tools from "./Tools";
import { getAllPosts } from "@/lib/api/wordpress";
import { WordpressPost } from "@/types/wordpress";

export default async function Home() {
    const { posts: rawPosts } = await getAllPosts(4);
    const posts = (rawPosts as WordpressPost[]) ?? [];

    return (
        <div className="min-h-screen bg-background" id="blog">
            <Hero posts={posts} />
            <Tools />
        </div>
    );
}
