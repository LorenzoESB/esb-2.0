import { TrendingUp } from "lucide-react";
import LatestArticles from "./LatestArticles";
import { WordpressPost } from "@/types/wordpress";

interface HeroProps {
    posts: WordpressPost[];
}

export default function Hero({ posts }: HeroProps) {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/10 py-20 lg:py-28">
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto text-center space-y-6">
                    <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium animate-in slide-in-from-bottom-4 duration-500">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Educação financeira de qualidade
                    </div>

                    <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight animate-in slide-in-from-bottom-8 duration-700">
                        Conteúdo{" "}
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            descomplicado
                        </span>{" "}
                        para suas{" "}
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            decisões financeiras
                        </span>
                    </h1>

                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-in slide-in-from-bottom-12 duration-1000">
                        Rankings detalhados, simuladores gratuitos e conteúdo especializado para você tomar as melhores
                        decisões financeiras com confiança.
                    </p>
                </div>

                <div className="mt-12">
                    <LatestArticles posts={posts} />
                </div>
            </div>
        </section>
    );
}
