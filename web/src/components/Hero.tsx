import { TrendingUp } from "lucide-react";
import { WordpressPost } from "@/types/wordpress";
import LatestArticles from "./LatestArticles";
import HeroCarousel from "./HeroCarousel";

interface HeroProps {
    posts?: WordpressPost[];
    showLatest?: boolean;
}

export default function Hero({ posts = [], showLatest = true }: HeroProps) {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-background via-accent/10 to-accent/5 py-8 md:py-10 lg:py-12">
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="text-center md:text-left space-y-4">

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight animate-in slide-in-from-bottom-8 duration-700">
                            Conteúdo{" "}
                            <span className="bg-gradient-to-r from-accent to-accent bg-clip-text text-transparent">
                                claro e descomplicado
                            </span>{" "}
                            para escolher bem
                        </h1>

                        <p className="text-base md:text-lg text-muted-foreground md:max-w-md mx-auto md:mx-0 animate-in slide-in-from-bottom-12 duration-1000">
                            Rankings, simuladores e análises práticas para orientar suas escolhas financeiras com confiança.
                        </p>
                    </div>

                    <div className="md:pl-2">
                        {showLatest && <HeroCarousel posts={posts} />}
                    </div>
                </div>

                {/* Removido bloco inferior de “Veja os artigos mais recentes”
                    Convertido para carrossel no topo ao lado do texto */}
            </div>
        </section>
    );
}
