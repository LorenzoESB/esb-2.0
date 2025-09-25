// app/simuladores/page.tsx
import Link from "next/link";
import {
    Calculator,
    Home,
    Car,
    TrendingUp,
    CreditCard,
    Building2,
    Users,
    Banknote,
    Fuel,
    DollarSign,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/Footer";

const simulators = [
    {
        title: "Calculadora de Juros Compostos",
        description: "Calcule os juros compostos de forma gratuita",
        icon: TrendingUp,
        href: "/simuladores/juros-compostos",
        status: "Disponível",
        color: "bg-green-50 text-green-600 border-green-200",
        features: ["Aporte Mensal", "Evolução", "Gráficos", "Projeções"],
    },
    {
        title: "Simulador de Máquinas de Cartão",
        description: "Descubra a maquininha ideal para o seu negócio",
        icon: CreditCard,
        href: "/simuladores/taxa-maquininha",
        status: "Disponível",
        color: "bg-green-50 text-green-600 border-green-200",
        features: ["Taxas", "Volume", "Recebimento", "Economia"],
    },
    {
        title: "Simulador de Amortização",
        description: "É melhor amortizar por prazo ou parcela",
        icon: Calculator,
        href: "/simuladores/amortizacao",
        status: "Disponível",
        color: "bg-green-50 text-green-600 border-green-200",
        features: ["Prazo vs Parcela", "Economia", "Comparativo", "Recomendação"],
    },
    {
        title: "Simulador de Contas Digitais",
        description: "Descubra a conta digital ideal para a sua necessidade",
        icon: Building2,
        href: "/simuladores/conta-digital",
        status: "Disponível",
        color: "bg-green-50 text-green-600 border-green-200",
        features: ["Gratuidade", "Benefícios", "Reviews", "Pontuação"],
    },
    {
        title: "Comparador de Maquininha de Cartão",
        description: "Compare as várias máquinas do mercado",
        icon: CreditCard,
        href: "/simuladores/comparador-maquininha",
        status: "Disponível",
        color: "bg-green-50 text-green-600 border-green-200",
        features: ["Comparativo", "Taxas", "Funcionalidades", "Custo"],
    },
    {
        title: "Simulador de Aposentadoria Privada",
        description: "Veja quanto precisa poupar para ter tranquilidade",
        icon: Users,
        href: "/simuladores/aposentadoria-privada",
        status: "Disponível",
        color: "bg-green-50 text-green-600 border-green-200",
        features: ["Previdência", "Expectativa", "Meta de Renda", "Projeções"],
    },
    {
        title: "Simulador de Empréstimo",
        description: "Descubra a melhor opção de empréstimo para você",
        icon: DollarSign,
        href: "/simuladores/emprestimo",
        status: "Disponível",
        color: "bg-green-50 text-green-600 border-green-200",
        features: ["Múltiplas Modalidades", "Comparativo", "Cronograma", "Economia"],
    },
    {
        title: "Simulador de Investimentos",
        description: "Simule investimentos em renda fixa",
        icon: TrendingUp,
        href: "/simuladores/investimentos",
        status: "Disponível",
        color: "bg-green-50 text-green-600 border-green-200",
        features: ["Renda Fixa", "Tributação", "Comparativo", "Rentabilidade"],
    },
    {
        title: "Simulador de Financiamento Imobiliário",
        description: "Veja quanto vai pagar pela sua casa própria",
        icon: Home,
        href: "/simuladores/financiamento-imobiliario",
        status: "Disponível",
        color: "bg-green-50 text-green-600 border-green-200",
        features: ["SAC vs PRICE", "Amortização", "Gráficos", "Planilha"],
    },
    {
        title: "Simulador de Financiamento de Veículos",
        description: "Descubra quanto vai pagar pelo seu carro",
        icon: Car,
        href: "/simuladores/financiamento-veiculo",
        status: "Disponível",
        color: "bg-green-50 text-green-600 border-green-200",
        features: ["Novo/Usado", "Amortização", "Taxas", "Entrada"],
    },
    {
        title: "Simulador de Combustível",
        description: "Gasolina ou etanol?",
        icon: Fuel,
        href: "/simuladores/combustivel",
        status: "Disponível",
        color: "bg-green-50 text-green-600 border-green-200",
        features: ["Flex", "Economia", "Consumo", "Comparativo"],
    },
    {
        title: "Comparador de Carros por Assinatura",
        description: "Descubra qual a melhor opção entre comprar ou alugar um veículo",
        icon: Car,
        href: "/simuladores/carros-assinatura",
        status: "Disponível",
        color: "bg-green-50 text-green-600 border-green-200",
        features: ["Custo Total", "Break-even", "Assinatura", "Recomendação"],
    },
];

export default function SimuladoresHub() {
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <section className="bg-muted/30 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="flex items-center justify-center mb-6">
                        <h1 className="text-2xl sm:text-4xl font-bold text-foreground">Simuladores Financeiros</h1>
                    </div>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Ferramentas gratuitas para ajudar você a tomar as melhores decisões financeiras.
                    </p>
                </div>
            </section>

            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        <div className="lg:col-span-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {simulators.map((simulator, index) => {
                                    const Icon = simulator.icon;
                                    const isAvailable = simulator.status === "Disponível";

                                    return (
                                        <Card
                                            key={simulator.title}
                                            className={`group transition-all duration-300 ${isAvailable
                                                ? "hover:scale-105 hover:shadow-lg cursor-pointer"
                                                : "opacity-75"
                                                }`}
                                            style={{
                                                animationDelay: `${index * 0.1}s`,
                                                animation: "fadeInUp 0.6s ease-out forwards",
                                            }}
                                        >
                                            {isAvailable ? (
                                                <Link href={simulator.href} className="block p-6 h-full">
                                                    <div className="flex items-start justify-between mb-4">
                                                        <div
                                                            className={`w-12 h-12 rounded-lg ${simulator.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}
                                                        >
                                                            <Icon className="w-6 h-6" />
                                                        </div>
                                                        <Badge className="bg-green-100 text-green-700 border-green-200 hover:bg-green-100">
                                                            {simulator.status}
                                                        </Badge>
                                                    </div>

                                                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                                                        {simulator.title}
                                                    </h3>

                                                    <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                                                        {simulator.description}
                                                    </p>
                                                </Link>
                                            ) : (
                                                <div className="p-6 h-full">
                                                    <div className="flex items-start justify-between mb-4">
                                                        <div
                                                            className={`w-12 h-12 rounded-lg ${simulator.color} flex items-center justify-center`}
                                                        >
                                                            <Icon className="w-6 h-6" />
                                                        </div>
                                                        <Badge variant="outline" className="bg-muted/50">
                                                            {simulator.status}
                                                        </Badge>
                                                    </div>

                                                    <h3 className="text-xl font-semibold mb-3">{simulator.title}</h3>

                                                    <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                                                        {simulator.description}
                                                    </p>
                                                </div>
                                            )}
                                        </Card>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Ads */}
                        <aside className="lg:col-span-1 space-y-6 lg:sticky lg:top-24 h-fit">
                            <Card className="border-border">
                                <div className="p-4">
                                    <div className="text-center">
                                        <div className="w-full h-32 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center mb-3">
                                            <span className="text-muted-foreground text-sm">Espaço Publicitário</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">Anuncie aqui</p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="border-border">
                                <div className="p-4">
                                    <div className="text-center">
                                        <div className="w-full h-40 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-lg flex items-center justify-center mb-3">
                                            <span className="text-muted-foreground text-sm">Patrocinador Premium</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">Seja nosso parceiro</p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="border-border">
                                <div className="p-4">
                                    <div className="text-center">
                                        <div className="w-full h-24 bg-gradient-to-r from-accent/10 to-accent/5 rounded-lg flex items-center justify-center mb-2">
                                            <span className="text-muted-foreground text-xs">Banner 300x120</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">Seu anúncio aqui</p>
                                    </div>
                                </div>
                            </Card>
                        </aside>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
