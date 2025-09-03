import { getAllPosts } from "@/lib/wordpress";
import Link from "next/dist/client/link";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import PostCard from "./Posts";

export default async function Home() {
    const posts = await getAllPosts(4);
    return (
        <section className="py-20 bg-background" id="blog">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                        Veja os <span className="gradient-text">artigos mais recentes</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Conteúdo especializado para você ficar por dentro das tendências e novidades do mercado
                        financeiro
                    </p>
                </div>

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
            </div>

            <div className="text-center mt-12">
                <Button variant="outline" size="lg" className="group" asChild>
                    <Link href="/blog">
                        Ver todos os artigos
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                </Button>
            </div>
        </section>
    );
}
