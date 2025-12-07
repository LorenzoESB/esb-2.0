'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Check,
  X,
  Building2,
  CreditCard,
  DollarSign,
  Wifi,
  Star,
  ExternalLink,
  Tag,
  Calendar,
  Gift,
  Smartphone,
  Printer,
  Zap,
  TrendingUp,
  Users,
  ShoppingCart,
} from 'lucide-react';
import type {
  ResultadoComparacao,
  CaracteristicasMaquininha,
} from '@/lib/schemas/comparador-maquininha.schema';

interface ComparadorResultsProps {
  resultado: ResultadoComparacao;
}

export function ComparadorResults({ resultado }: ComparadorResultsProps) {
  const { maquininhas, total } = resultado;

  return (
    <div className="space-y-6">
      {/* Summary Header */}
      <Card className="border-primary/50 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Comparação de {total} Maquininha{total > 1 ? 's' : ''}
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Comparison Grid - Desktop */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="sticky left-0 bg-background p-4 text-left font-semibold border-b-2">
                Característica
              </th>
              {maquininhas.map((maq) => (
                <th
                  key={maq.id}
                  className="p-4 text-center border-b-2 min-w-[200px]"
                >
                  <div className="space-y-2">
                    <div className="font-bold text-lg">{maq.nome}</div>
                    <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                      <Building2 className="h-3 w-3" />
                      {maq.empresa}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Pricing Section */}
            <ComparisonSection title="Preços" icon={<DollarSign />}>
              <ComparisonRow
                label="Preço da Maquininha"
                values={maquininhas.map((m) => (
                  <div key={m.id}>
                    <div className="font-semibold">
                      {formatCurrency(m.preco)}
                    </div>
                    {m.preco_promocional && (
                      <div className="text-sm text-green-600">
                        Promo: {formatCurrency(m.preco_promocional)}
                      </div>
                    )}
                  </div>
                ))}
              />
              <ComparisonRow
                label="Mensalidade"
                values={maquininhas.map((m) =>
                  m.mensalidade === 0 ? (
                    <Badge key={m.id} variant="outline" className="bg-green-50">
                      Grátis
                    </Badge>
                  ) : (
                    <div key={m.id}>{formatCurrency(m.mensalidade)}/mês</div>
                  ),
                )}
              />
              <ComparisonRow
                label="Garantia"
                values={maquininhas.map((m) =>
                  m.garantia ? (
                    <div key={m.id}>{m.garantia} meses</div>
                  ) : (
                    <span key={m.id} className="text-gray-400">
                      N/A
                    </span>
                  ),
                )}
              />
            </ComparisonSection>

            {/* Features Section */}
            <ComparisonSection title="Recursos" icon={<Zap />}>
              <ComparisonRow
                label="Chip Integrado"
                icon={<Wifi />}
                values={maquininhas.map((m) => (
                  <BooleanIcon key={m.id} value={m.chip} />
                ))}
              />
              <ComparisonRow
                label="Aceita Cartão de Tarja"
                values={maquininhas.map((m) => (
                  <BooleanIcon key={m.id} value={m.tarja} />
                ))}
              />
              <ComparisonRow
                label="NFC (Aproximação)"
                values={maquininhas.map((m) => (
                  <BooleanIcon key={m.id} value={m.nfc} />
                ))}
              />
              <ComparisonRow
                label="Versão com Fio"
                values={maquininhas.map((m) => (
                  <BooleanIcon key={m.id} value={m.com_fio} />
                ))}
              />
              <ComparisonRow
                label="Imprime Recibo"
                icon={<Printer />}
                values={maquininhas.map((m) => (
                  <BooleanIcon key={m.id} value={m.imprime_recibo} />
                ))}
              />
              <ComparisonRow
                label="Precisa de Smartphone"
                icon={<Smartphone />}
                values={maquininhas.map((m) => (
                  <BooleanIcon key={m.id} value={m.precisa_smartphone} />
                ))}
              />
              <ComparisonRow
                label="Permite Antecipação"
                icon={<TrendingUp />}
                values={maquininhas.map((m) => (
                  <BooleanIcon key={m.id} value={m.permite_antecipacao} />
                ))}
              />
            </ComparisonSection>

            {/* Business Type Section */}
            <ComparisonSection title="Atendimento" icon={<Users />}>
              <ComparisonRow
                label="Atende Pessoa Física"
                values={maquininhas.map((m) => (
                  <BooleanIcon key={m.id} value={m.atende_pf} />
                ))}
              />
              <ComparisonRow
                label="Atende Pessoa Jurídica"
                values={maquininhas.map((m) => (
                  <BooleanIcon key={m.id} value={m.atende_pj} />
                ))}
              />
              <ComparisonRow
                label="Vale Refeição/Alimentação"
                values={maquininhas.map((m) => (
                  <BooleanIcon key={m.id} value={m.vale_refeicao} />
                ))}
              />
              <ComparisonRow
                label="E-commerce"
                icon={<ShoppingCart />}
                values={maquininhas.map((m) => (
                  <BooleanIcon key={m.id} value={m.ecommerce} />
                ))}
              />
            </ComparisonSection>

            {/* Payment Details Section */}
            <ComparisonSection title="Detalhes de Pagamento" icon={<CreditCard />}>
              <ComparisonRow
                label="Máximo de Parcelas"
                values={maquininhas.map((m) => (
                  <div key={m.id} className="font-semibold">
                    {m.max_parcelas}x
                  </div>
                ))}
              />
              <ComparisonRow
                label="Tipos de Conexão"
                values={maquininhas.map((m) => (
                  <div key={m.id} className="space-y-1">
                    {m.tipos_conexao.map((tipo) => (
                      <Badge key={tipo} variant="outline" className="text-xs">
                        {tipo}
                      </Badge>
                    ))}
                  </div>
                ))}
              />
              <ComparisonRow
                label="Bandeiras Aceitas"
                values={maquininhas.map((m) => (
                  <div key={m.id} className="text-xs">
                    {m.bandeiras.join(', ')}
                  </div>
                ))}
              />
              <ComparisonRow
                label="Formas de Recebimento"
                values={maquininhas.map((m) => (
                  <div key={m.id} className="space-y-1">
                    {m.formas_recebimento.map((forma) => (
                      <Badge key={forma} variant="secondary" className="text-xs">
                        {forma}
                      </Badge>
                    ))}
                  </div>
                ))}
              />
            </ComparisonSection>

            {/* Rating Section */}
            <ComparisonSection title="Avaliações" icon={<Star />}>
              <ComparisonRow
                label="Transparência"
                values={maquininhas.map((m) =>
                  m.transparencia ? (
                    <div key={m.id} className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{m.transparencia}/10</span>
                    </div>
                  ) : (
                    <span key={m.id} className="text-gray-400">
                      N/A
                    </span>
                  ),
                )}
              />
            </ComparisonSection>

            {/* Additional Info Section */}
            <ComparisonSection title="Informações Adicionais" icon={<Calendar />}>
              <ComparisonRow
                label="Cupom de Desconto"
                values={maquininhas.map((m) =>
                  m.cupom ? (
                    <Badge key={m.id} variant="default" className="gap-1">
                      <Gift className="h-3 w-3" />
                      {m.cupom}
                    </Badge>
                  ) : (
                    <span key={m.id} className="text-gray-400">
                      Sem cupom
                    </span>
                  ),
                )}
              />
              <ComparisonRow
                label="Última Atualização"
                values={maquininhas.map((m) => (
                  <div key={m.id} className="text-xs text-gray-600">
                    {new Date(m.data_atualizacao).toLocaleDateString('pt-BR')}
                  </div>
                ))}
              />
            </ComparisonSection>
          </tbody>
        </table>
      </div>

      {/* Mobile View - Cards */}
      <div className="lg:hidden space-y-4">
        {maquininhas.map((maq) => (
          <MaquininhaCard key={maq.id} maquininha={maq} />
        ))}
      </div>

      {/* Plans Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Planos e Taxas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {maquininhas.map((maq) => (
              <Card key={maq.id} className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg">{maq.nome}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {maq.planos.map((plano) => (
                    <div
                      key={plano.id}
                      className="p-4 border rounded-lg space-y-2"
                    >
                      <div className="font-semibold flex items-center justify-between">
                        <span>{plano.nome}</span>
                        <div className="flex items-center gap-1 text-yellow-500">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="text-sm">{plano.avaliacao}</span>
                        </div>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Débito:</span>
                          <span className="font-medium">{plano.taxa_debito}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Crédito à vista:</span>
                          <span className="font-medium">
                            {plano.taxa_credito_vista}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Crédito parcelado:
                          </span>
                          <span className="font-medium">
                            a partir de {plano.taxa_credito_parcelado_min}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Repasse débito:</span>
                          <span className="font-medium">
                            {plano.dias_repasse_debito} dia
                            {plano.dias_repasse_debito > 1 ? 's' : ''}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Repasse crédito:
                          </span>
                          <span className="font-medium">
                            {plano.dias_repasse_credito} dia
                            {plano.dias_repasse_credito > 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {maquininhas.map((maq) => (
          <Card key={maq.id}>
            <CardContent className="pt-6 space-y-4">
              <div className="text-center">
                <div className="font-bold text-lg">{maq.nome}</div>
                <div className="text-sm text-gray-600">{maq.empresa}</div>
              </div>
              <div className="space-y-2">
                <Button
                  asChild
                  className="w-full"
                  size="lg"
                >
                  <a
                    href={maq.url_contratacao}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Contratar Agora
                  </a>
                </Button>
                {maq.url_avaliacao && (
                  <Button
                    asChild
                    variant="outline"
                    className="w-full"
                  >
                    <a
                      href={maq.url_avaliacao}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Star className="mr-2 h-4 w-4" />
                      Ver Avaliação Completa
                    </a>
                  </Button>
                )}
              </div>
              {maq.cupom && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
                  <div className="text-xs text-gray-600 mb-1">
                    Cupom de Desconto
                  </div>
                  <div className="font-mono font-bold text-green-700">
                    {maq.cupom}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Observations */}
      {maquininhas.some((m) => m.observacoes) && (
        <Card>
          <CardHeader>
            <CardTitle>Observações Importantes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {maquininhas
              .filter((m) => m.observacoes)
              .map((maq) => (
                <div key={maq.id}>
                  <div className="font-semibold mb-1">{maq.nome}:</div>
                  <p className="text-sm text-gray-600">{maq.observacoes}</p>
                </div>
              ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Helper Components

interface ComparisonSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function ComparisonSection({ title, icon, children }: ComparisonSectionProps) {
  return (
    <>
      <tr className="bg-gray-50">
        <td colSpan={100} className="p-3 font-semibold text-sm">
          <div className="flex items-center gap-2">
            {icon}
            {title}
          </div>
        </td>
      </tr>
      {children}
    </>
  );
}

interface ComparisonRowProps {
  label: string;
  icon?: React.ReactNode;
  values: React.ReactNode[];
}

function ComparisonRow({ label, icon, values }: ComparisonRowProps) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="sticky left-0 bg-background p-4 font-medium text-sm">
        <div className="flex items-center gap-2">
          {icon}
          {label}
        </div>
      </td>
      {values.map((value, index) => (
        <td key={index} className="p-4 text-center">
          {value}
        </td>
      ))}
    </tr>
  );
}

function BooleanIcon({ value }: { value: boolean }) {
  return value ? (
    <Check className="h-5 w-5 text-green-600 mx-auto" />
  ) : (
    <X className="h-5 w-5 text-gray-300 mx-auto" />
  );
}

function MaquininhaCard({ maquininha }: { maquininha: CaracteristicasMaquininha }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {maquininha.nome}
        </CardTitle>
        <div className="text-sm text-gray-600 flex items-center gap-1">
          <Building2 className="h-4 w-4" />
          {maquininha.empresa}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Preços
          </h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Maquininha:</span>
              <span className="font-medium">{formatCurrency(maquininha.preco)}</span>
            </div>
            {maquininha.preco_promocional && (
              <div className="flex justify-between text-green-600">
                <span>Promocional:</span>
                <span className="font-medium">
                  {formatCurrency(maquininha.preco_promocional)}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Mensalidade:</span>
              <span className="font-medium">
                {maquininha.mensalidade === 0
                  ? 'Grátis'
                  : formatCurrency(maquininha.mensalidade)}
              </span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Recursos</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <FeatureItem label="Chip" value={maquininha.chip} />
            <FeatureItem label="Tarja" value={maquininha.tarja} />
            <FeatureItem label="NFC" value={maquininha.nfc} />
            <FeatureItem label="Imprime" value={maquininha.imprime_recibo} />
            <FeatureItem label="Antecipação" value={maquininha.permite_antecipacao} />
            <FeatureItem label="E-commerce" value={maquininha.ecommerce} />
          </div>
        </div>

        <Button asChild className="w-full">
          <a
            href={maquininha.url_contratacao}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Contratar
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}

function FeatureItem({ label, value }: { label: string; value: boolean }) {
  return (
    <div className="flex items-center gap-1">
      {value ? (
        <Check className="h-4 w-4 text-green-600" />
      ) : (
        <X className="h-4 w-4 text-gray-300" />
      )}
      <span className={value ? '' : 'text-gray-400'}>{label}</span>
    </div>
  );
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}
