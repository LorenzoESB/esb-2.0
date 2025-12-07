import { getPostBySlug, getFeaturedImage, getAuthor, getPostCategories } from "@/lib/api/wordpress";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
    stripHtmlTags,
    formatFullPostContent,
    calculateReadingTime,
    formatPostDate,
} from "@/utils/wordpress-formatter";

import { AdCard } from "@/components/ads/AdCard";
import { getRandomAds } from "@/lib/ads";

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const [post] = await Promise.all([getPostBySlug(slug)]);
    const [adPrimary, adSecondary] = getRandomAds(2);

    if (!post) {
        notFound();
    }

    const featuredImage = getFeaturedImage(post);
    const author = getAuthor(post);
    const categories = getPostCategories(post) ?? [];

    const rawTitle = post.title?.rendered ?? "";
    const rawContent = post.content?.rendered ?? "";
    const rawDate = post.date ?? "";

    const formattedTitle = stripHtmlTags(rawTitle);
    const formattedContent = formatFullPostContent(rawContent);
    const readingTime = calculateReadingTime(rawContent);
    const formattedDate = formatPostDate(rawDate);

    const CATEGORY_COLOR_MAP: Record<string, string> = {
        "Planejamento Financeiro": "bg-blue-500",
        "Empréstimos e Financiamentos": "bg-blue-600",
        "Finanças Pessoais": "bg-gray-700",
        Aposentadoria: "bg-blue-400",
        "Carro por Assinatura": "bg-blue-500",
        "Ferramentas e Serviços": "bg-blue-600",
        DET: "bg-orange-500",
        Crédito: "bg-green-500",
        Saúde: "bg-purple-500",
        default: "bg-blue-600",
    };

    const getCategoryColor = (categoryName: string) => CATEGORY_COLOR_MAP[categoryName] ?? CATEGORY_COLOR_MAP.default;

    return (
        <div>
            <article className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Navigation */}
                <Link href="/blog" className="text-blue-600 hover:underline mb-6 inline-flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Voltar ao Blog
                </Link>

                {/* Featured Image */}
                {featuredImage && (
                    <div className="relative mb-8 rounded-lg overflow-hidden">
                        <img
                            src={featuredImage.url}
                            alt={featuredImage.alt || formattedTitle}
                            className="w-full h-96 object-cover"
                        />
                    </div>
                )}

                {/* Article Header */}
                <header className="mb-8">
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        {formattedTitle}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
                        {/* Author */}
                        {author && (
                            <div className="flex items-center gap-3">
                                {author.avatar ? (
                                    <img
                                        src={author.avatar}
                                        alt={author.name}
                                        className="w-10 h-10 rounded-full border-2 border-gray-200"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                )}
                                <span className="font-medium text-gray-900">{author.name}</span>
                            </div>
                        )}

                        {/* Date and Reading Time */}
                        <div className="flex items-center gap-4 text-sm">
                            <span>{formattedDate}</span>
                            <span>•</span>
                            <span>{readingTime}</span>
                        </div>
                    </div>

                    {/* Categories */}
                    {categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                            {categories.map((category) => (
                                <span
                                    key={category.id}
                                    className={`${getCategoryColor(
                                        category.name
                                    )} text-white px-3 py-1 rounded-full text-sm font-medium`}
                                >
                                    {category.name}
                                </span>
                            ))}
                        </div>
                    )}
                </header>

                {/* Article Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Coluna do conteúdo */}
                    <div className="lg:col-span-8">
                        <div className="prose prose-lg prose-gray max-w-none">
                            <div className="formatted-content" dangerouslySetInnerHTML={{ __html: formattedContent }} />
                        </div>
                    </div>

                    {/* Sidebar à direita */}
                    <aside className="lg:col-span-4 grid grid-cols-1 gap-4 grid-flow-dense lg:sticky lg:top-24 h-fit">
                        {adPrimary && <AdCard ad={adPrimary} />}
                        {adSecondary && <AdCard ad={adSecondary} />}
                    </aside>
                </div>
            </article>
        </div>
    );
}
