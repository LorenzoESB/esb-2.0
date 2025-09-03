import Link from "next/link";
import { getAllPosts, getFeaturedImage, getAuthor } from "@/lib/wordpress";

export default async function HomePage() {
    const posts = await getAllPosts();

    // Get only the latest 6 posts for the homepage
    const latestPosts = posts.slice(0, 6);

    return (
        <main className="container mx-auto px-4 py-8">
            <section className="mb-12">
                <h1 className="text-4xl font-bold mb-4">Welcome to Our Blog</h1>
                <p className="text-lg text-gray-600">Latest posts from our WordPress backend</p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-6">Latest Posts</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {latestPosts.map((post: any) => {
                        const featuredImage = getFeaturedImage(post);
                        const author = getAuthor(post);

                        return (
                            <article
                                key={post.id}
                                className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                            >
                                {featuredImage && (
                                    <img
                                        src={featuredImage.url}
                                        alt={featuredImage.alt}
                                        className="w-full h-48 object-cover"
                                    />
                                )}
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">
                                        <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
                                            <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                                        </Link>
                                    </h3>
                                    <div
                                        className="text-gray-600 mb-4 line-clamp-3"
                                        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                                    />
                                    {author && (
                                        <p className="text-sm text-gray-500">
                                            By {author.name} • {new Date(post.date).toLocaleDateString()}
                                        </p>
                                    )}
                                </div>
                            </article>
                        );
                    })}
                </div>
                <div className="mt-8 text-center">
                    <Link
                        href="/blog"
                        className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
                    >
                        View All Posts
                    </Link>
                </div>
            </section>
        </main>
    );
}
