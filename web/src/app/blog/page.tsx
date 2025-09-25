export const dynamic = "force-dynamic";

import PostCard from "@/components/Posts";
import { PaginationPosts } from "@/components/Pagination";
import { getAllPosts } from "@/lib/api/wordpress";
import { Card, CardContent } from "@/components/ui/card";
import FiltersBlog from "@/components/Filters";

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ search?: string; page?: string }>; }) {
    const searchParameter = await searchParams;

    const currentPage = Number.isNaN(parseInt(searchParameter?.page ?? "", 10))
        ? 1
        : parseInt(searchParameter?.page ?? "1", 10);

    const searchQuery = (searchParameter?.search ?? "").trim();

    const data = await getAllPosts(8, searchQuery, currentPage);

    return (
        <main className="container mx-auto px-32 py-8">
            <h1 className="text-2xl font-bold">{searchQuery ? `Resultados para: ${searchQuery}` : "Todos os posts"}</h1>
            <div className="grid grid-cols-5 gap-6">
                {/* Left Sidebar with Filters and Ads */}
                <div className="col-span-1 space-y-6">
                    <FiltersBlog />

                    {/* Ads Sidebar */}
                    <aside className="space-y-6 sticky top-24 h-fit">
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

                        {/* Sponsor Space 1 - Banner */}
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

                {/* Main Content Area */}
                <div className="col-span-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {data.posts.map((post: any) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                </div>
            </div>

            <PaginationPosts currentPage={currentPage} totalPages={data.totalPages || 1} searchQuery={searchQuery} />
        </main>
    );
}
