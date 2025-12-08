import Link from "next/link";
import {
    Calculator,
    Home,
    Car,
    TrendingUp,
    CreditCard,
    Building2,
    Users,
    Fuel,
    DollarSign,
    ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getRandomAds } from "@/lib/ads";
import { AdCard } from "@/components/ads/AdCard";
import { Badge } from "@/components/ui/badge";

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
        title: "Simulador de Investimentos em Renda Fixa",
        description: "Simule investimentos em renda fixa",
        icon: TrendingUp,
        href: "/simuladores/renda-fixa",
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
        href: "/simuladores/financiamento-veiculos",
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
        href: "/simuladores/comparador-assinatura",
        status: "Disponível",
        color: "bg-green-50 text-green-600 border-green-200",
        features: ["Custo Total", "Break-even", "Assinatura", "Recomendação"],
    },
];

export default function SimuladoresHub() {
    const ad = getRandomAds(1)[0];
    return (
        <div className="min-h-screen bg-background">
            <section className="bg-muted/30 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
                    <h1 className="text-2xl sm:text-4xl font-bold text-foreground">Simuladores Financeiros</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Ferramentas gratuitas para ajudar você a tomar as melhores decisões financeiras.
                    </p>
                </div>
            </section>

            <section className="py-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {simulators.map((simulator) => {
                            const Icon = simulator.icon;
                            const isAvailable = simulator.status === "Disponível";
                            return (
                                <Card
                                    key={simulator.title}
                                    className="flex flex-col h-full shadow-sm hover:shadow-md transition-all hover:border-primary"
                                >
                                    <CardHeader className="flex flex-row items-start gap-3 pb-3">
                                        <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div className="space-y-1">
                                            <CardTitle className="text-lg font-semibold">
                                                {simulator.title}
                                            </CardTitle>
                                            <CardDescription className="text-sm text-muted-foreground">
                                                {simulator.description}
                                            </CardDescription>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex flex-col gap-3 flex-1 pt-0">
                                        <div className="flex flex-wrap gap-2">
                                            {simulator.features.map((feature) => (
                                                <Badge key={feature} variant="secondary" className="text-xs">
                                                    {feature}
                                                </Badge>
                                            ))}
                                        </div>
                                        <div className="mt-auto">
                                            <Button
                                                className="w-full flex items-center justify-center gap-2"
                                                variant="default"
                                                asChild={isAvailable}
                                                disabled={!isAvailable}
                                            >
                                                {isAvailable ? (
                                                    <Link href={simulator.href}>
                                                        Ver simulador
                                                        <ArrowRight className="h-4 w-4" />
                                                    </Link>
                                                ) : (
                                                    <>
                                                        Em breve
                                                        <ArrowRight className="h-4 w-4" />
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}
