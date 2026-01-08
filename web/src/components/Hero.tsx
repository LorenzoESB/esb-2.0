import { TrendingUp } from "lucide-react";
import { WordpressPost } from "@/types/wordpress";
import LatestArticles from "./LatestArticles";

interface HeroProps {
    posts?: WordpressPost[];
    showLatest?: boolean;
}

export default function Hero({ posts = [], showLatest = true }: HeroProps) {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-background via-accent/10 to-accent/5 py-10 md:py-14 lg:py-20">
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto text-center space-y-4">

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight animate-in slide-in-from-bottom-8 duration-700">
                        Conteúdo{" "}
                        <span className="bg-gradient-to-r from-accent to-accent bg-clip-text text-transparent">
                            claro e descomplicado
                        </span>{" "}
                        para escolher bem
                    </h1>

                    <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto animate-in slide-in-from-bottom-12 duration-1000">
                        Rankings, simuladores e análises práticas para orientar suas escolhas financeiras com confiança.
                    </p>
                </div>

                {showLatest && (
                    <div className="mt-12">
                        <LatestArticles posts={posts} />
                    </div>
                )}
            </div>
        </section>
    );
}
