import { getPostBySlug, getFeaturedImage, getAuthor, getPostCategories } from "@/lib/wordpress";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
    stripHtmlTags,
    formatFullPostContent,
    calculateReadingTime,
    formatPostDate,
} from "@/utils/wordpress-formatter";
import { getAllAdGroups } from "@/lib/ads";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const post = await getPostBySlug((await params).slug);
    const adGroups = await getAllAdGroups();

    if (!post) {
        notFound();
    }

    const featuredImage = getFeaturedImage(post);
    const author = getAuthor(post);
    const categories = getPostCategories(post);

    const formattedTitle = stripHtmlTags(post.title.rendered);
    const formattedContent = formatFullPostContent(post.content.rendered);
    const readingTime = calculateReadingTime(post.content.rendered);
    const formattedDate = formatPostDate(post.date);

    const getCategoryColor = (categoryName: string) => {
        const colorMap: { [key: string]: string } = {
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
        return colorMap[categoryName] || colorMap.default;
    };

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
                    <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24 h-fit">
                        {/* Sponsor Space 1 */}
                        <Card className="financial-card">
                            <CardContent className="p-4">
                                <div className="text-center">
                                    <div className="w-full h-32 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center mb-3">
                                        <span className="text-muted-foreground text-sm">Espaço Publicitário</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">Anuncie aqui</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Newsletter */}
                        {/* <Card className="financial-card">
                            <CardContent className="p-4">
                                <h3 className="font-semibold mb-2">Newsletter</h3>
                                <p className="text-sm text-muted-foreground mb-3">Receba dicas financeiras semanais</p>
                                <div className="space-y-2">
                                    <input
                                        type="email"
                                        placeholder="Seu e-mail"
                                        className="w-full px-3 py-2 bg-background border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    />
                                    <Button size="sm" className="w-full">
                                        Inscrever-se
                                    </Button>
                                </div>
                            </CardContent>
                        </Card> */}

                        {/* Sponsor Space 2 */}
                        <Card className="financial-card">
                            <CardContent className="p-4">
                                <div className="text-center">
                                    <div className="w-full h-40 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-lg flex items-center justify-center mb-3">
                                        <span className="text-muted-foreground text-sm">Patrocinador Premium</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">Seja nosso parceiro</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Ferramentas Relacionadas */}
                        {/* <Card className="financial-card">
                            <CardContent className="p-4">
                                <h3 className="font-semibold mb-3">Ferramentas Relacionadas</h3>
                                <div className="space-y-2">
                                    <a
                                        href="/simulador-amortizacao"
                                        className="block p-2 bg-primary/5 hover:bg-primary/10 rounded-md transition-colors"
                                    >
                                        <span className="text-sm font-medium">Simulador de Amortização</span>
                                    </a>
                                    <a
                                        href="/simulador-financiamento"
                                        className="block p-2 bg-primary/5 hover:bg-primary/10 rounded-md transition-colors"
                                    >
                                        <span className="text-sm font-medium">Simulador de Financiamento</span>
                                    </a>
                                </div>
                            </CardContent>
                        </Card> */}

                        {/* Sponsor Space 3 - Banner */}
                        <Card className="financial-card">
                            <CardContent className="p-4">
                                <div className="text-center">
                                    <div className="w-full h-24 bg-gradient-to-r from-accent/10 to-accent/5 rounded-lg flex items-center justify-center mb-2">
                                        <span className="text-muted-foreground text-xs">Banner 300x120</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">Seu anúncio aqui</p>
                                </div>
                            </CardContent>
                        </Card>
                    </aside>
                </div>
            </article>
        </div>
    );
}
