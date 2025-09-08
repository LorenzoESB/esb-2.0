import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp, Shield, ArrowRight } from "lucide-react";
import heroImage from "../../public/hero-finance.png";

export default async function Hero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/10 py-20 lg:py-32">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <div className="text-center lg:text-left">
                        <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-in slide-in-from-bottom-4 duration-500">
                            <TrendingUp className="w-4 h-4 mr-2" />
                            Educação financeira de qualidade
                        </div>

                        <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight animate-in slide-in-from-bottom-8 duration-700">
                            Conteúdo{" "}
                            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                descomplicado
                            </span>{" "}
                            para suas{" "}
                            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                decisões financeiras
                            </span>
                        </h1>

                        <p className="text-xl text-muted-foreground mb-8 max-w-2xl animate-in slide-in-from-bottom-12 duration-1000">
                            Rankings detalhados, simuladores gratuitos e conteúdo especializado para você tomar as
                            melhores decisões financeiras com confiança.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-in slide-in-from-bottom-16 duration-1200">
                            <Button
                                size="lg"
                                className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg"
                            >
                                Explorar ferramentas
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                            </Button>
                            <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
                                Ver rankings
                            </Button>
                        </div>

                        {/* Stats */}
                        {/* <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-border/30 animate-in fade-in duration-1500">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary mb-1">50+</div>
                                <div className="text-sm text-muted-foreground">Rankings</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-secondary mb-1">100k+</div>
                                <div className="text-sm text-muted-foreground">Usuários</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-accent mb-1">500+</div>
                                <div className="text-sm text-muted-foreground">Artigos</div>
                            </div>
                        </div> */}
                    </div>

                    {/* Image */}
                    <div className="relative animate-in slide-in-from-right-12 duration-1000">
                        <div className="relative z-10 animate-[float_3s_ease-in-out_infinite]">
                            <Image
                                src={heroImage}
                                alt="Educação financeira moderna"
                                width={600}
                                height={400}
                                className="w-full rounded-2xl shadow-2xl"
                                priority
                            />
                        </div>

                        {/* Floating elements */}
                        <div className="absolute -top-4 -left-4 bg-green-500 text-white p-3 rounded-xl shadow-lg animate-[float_3s_ease-in-out_infinite] [animation-delay:0.5s]">
                            <Calculator className="w-6 h-6" />
                        </div>
                        <div className="absolute -bottom-4 -right-4 bg-blue-500 text-white p-3 rounded-xl shadow-lg animate-[float_3s_ease-in-out_infinite] [animation-delay:1s]">
                            <Shield className="w-6 h-6" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
