import Link from "next/link";
import { getAllPosts, getFeaturedImage, getAuthor } from "@/lib/wordpress";

export default async function BlogPage() {
    const posts = await getAllPosts();

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">All Blog Posts</h1>

            <div className="space-y-8">
                {posts.map((post: any) => {
                    const featuredImage = getFeaturedImage(post);
                    const author = getAuthor(post);

                    return (
                        <article key={post.id} className="border-b pb-8 last:border-0">
                            <div className="md:flex gap-6">
                                {featuredImage && (
                                    <div className="md:w-1/3 mb-4 md:mb-0">
                                        <img
                                            src={featuredImage.url}
                                            alt={featuredImage.alt}
                                            className="w-full h-48 md:h-full object-cover rounded"
                                        />
                                    </div>
                                )}
                                <div className={featuredImage ? "md:w-2/3" : "w-full"}>
                                    <h2 className="text-2xl font-semibold mb-2">
                                        <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
                                            <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                                        </Link>
                                    </h2>
                                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                        {author && <span>By {author.name}</span>}
                                        <span>{new Date(post.date).toLocaleDateString()}</span>
                                    </div>
                                    <div
                                        className="text-gray-600 mb-4"
                                        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                                    />
                                    <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:underline">
                                        Read more →
                                    </Link>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </main>
    );
}
