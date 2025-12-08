import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  CreditCard,
  Shield,
  Ticket,
  Building2,
  Car,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { getRandomAds } from '@/lib/ads';
import { AdCard } from '@/components/ads/AdCard';


export default function RankingsHubPage() {
  const rankingAd = getRandomAds(1)[0];
  const rankings = [
    {
      id: 'maquinas-cartao',
      title: 'Maquininhas de Cartão',
      description: 'As melhores maquininhas classificadas por taxas, transparência e funcionalidades',
      icon: CreditCard,
      href: '/rankings/maquinas-cartao',
      status: 'available',
      count: 10,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
    },
    {
      id: 'seguros',
      title: 'Seguros de Automóvel',
      description: 'Ranking das seguradoras por preço, cobertura e atendimento',
      icon: Shield,
      href: '/rankings/seguros',
      status: 'available',
      count: 10,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950',
    },
    {
      id: 'pedagios',
      title: 'Tags de Pedágio',
      description: 'Comparação de operadoras de pedágio por taxas e conveniência',
      icon: Ticket,
      href: '/rankings/pedagios',
      status: 'available',
      count: 6,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950',
    },
    {
      id: 'contas-digitais',
      title: 'Contas Digitais',
      description: 'Bancos digitais classificados por serviços, tarifas e benefícios',
      icon: Building2,
      href: '/rankings/contas-digitais',
      status: 'available',
      count: 10,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-950',
    },
    {
      id: 'assinatura-carro',
      title: 'Assinatura de Carro',
      description: 'Serviços de assinatura de veículos por custo-benefício',
      icon: Car,
      href: '/rankings/assinatura-carro',
      status: 'available',
      count: 10,
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-950',
    },
  ];

  return (
    <div className="container mx-auto py-4 px-4 max-w-7xl">
      {/* Header */}
      <div className="mb-8 space-y-2">
        <div className="flex items-center gap-3">
          <TrendingUp className="h-8 w-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold">
            Rankings
          </h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Compare e escolha as melhores opções do mercado com nossos rankings baseados em critérios objetivos
        </p>
      </div>

      {/* Rankings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 grid-flow-dense">
        {rankings.map((ranking) => {
          const Icon = ranking.icon;

          return (
            <Card
              key={ranking.id}
              className="transition-all hover:shadow-lg hover:border-primary cursor-pointer flex flex-col"
            >
              <CardHeader className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div className={`p-3 rounded-lg ${ranking.bgColor}`}>
                    <Icon className={`h-6 w-6 ${ranking.color}`} />
                  </div>
                  <Badge className="bg-green-600">Disponível</Badge>
                </div>
                <CardTitle className="text-xl">{ranking.title}</CardTitle>
                <CardDescription className="min-h-[48px]">
                  {ranking.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 flex flex-col h-full">
                <div className="text-sm text-muted-foreground mb-4">
                  {ranking.count} opções ranqueadas
                </div>
                <div className="mt-auto">
                  <Button className="w-full" asChild>
                    <Link href={ranking.href}>
                      Ver Ranking
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Methodology Section */}
      <div className="mt-12 bg-muted p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Como funcionam os rankings?</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Nossos rankings são baseados em critérios objetivos e ponderados, considerando múltiplos aspectos de cada produto ou serviço:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Critérios financeiros:</strong> Taxas, preços, mensalidades e custos totais</li>
            <li><strong>Transparência:</strong> Clareza nas informações e ausência de custos ocultos</li>
            <li><strong>Funcionalidades:</strong> Recursos oferecidos e tecnologia disponível</li>
            <li><strong>Reputação:</strong> Avaliações de usuários e presença no mercado</li>
            <li><strong>Atendimento:</strong> Qualidade do suporte ao cliente</li>
          </ul>
          <p className="pt-2">
            Cada ranking possui pesos específicos para seus critérios, priorizando os aspectos mais importantes para cada categoria.
          </p>
        </div>
      </div>
    </div>
  );
}
