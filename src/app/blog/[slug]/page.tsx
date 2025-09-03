import { getPostBySlug, getAllPosts, getFeaturedImage, getAuthor } from "@/lib/wordpress";
import { notFound } from "next/navigation";
import Link from "next/link";

// Generate static params for all posts
export async function generateStaticParams() {
    const posts = await getAllPosts();
    return posts.map((post: any) => ({
        slug: post.slug,
    }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const post = await getPostBySlug((await params).slug);

    if (!post) {
        return {
            title: "Post Not Found",
        };
    }

    return {
        title: post.title.rendered.replace(/<[^>]*>/g, ""), // Strip HTML
        description: post.excerpt.rendered.replace(/<[^>]*>/g, "").substring(0, 160),
    };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const post = await getPostBySlug((await params).slug);

    if (!post) {
        notFound();
    }

    const featuredImage = getFeaturedImage(post);
    const author = getAuthor(post);
    const categories = post._embedded?.["wp:term"]?.[0] || [];

    return (
        <article className="container mx-auto px-4 py-8 max-w-4xl">
            <Link href="/blog" className="text-blue-600 hover:underline mb-4 inline-block">
                ← Back to Blog
            </Link>

            {featuredImage && (
                <img
                    src={featuredImage.url}
                    alt={featuredImage.alt}
                    className="w-full h-96 object-cover rounded-lg mb-8"
                />
            )}

            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />

                <div className="flex flex-wrap items-center gap-4 text-gray-600">
                    {author && (
                        <div className="flex items-center gap-2">
                            {author.avatar && (
                                <img src={author.avatar} alt={author.name} className="w-10 h-10 rounded-full" />
                            )}
                            <span>By {author.name}</span>
                        </div>
                    )}
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    {categories.length > 0 && (
                        <div className="flex gap-2">
                            {categories.map((cat: any) => (
                                <span key={cat.id} className="bg-gray-200 px-2 py-1 rounded text-sm">
                                    {cat.name}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </header>

            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        </article>
    );
}
