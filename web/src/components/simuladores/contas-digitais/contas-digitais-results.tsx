'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Trophy,
  DollarSign,
  TrendingDown,
  ExternalLink,
  CreditCard,
  PiggyBank,
  Receipt,
  Smartphone,
  Users,
  Building2,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import type { ContasDigitaisOutput } from '@/lib/schemas/contas-digitais.schema';
import { FEATURES_LABELS } from '@/lib/schemas/contas-digitais.schema';

interface ContasDigitaisResultsProps {
  resultado: ContasDigitaisOutput;
}

export function ContasDigitaisResults({
  resultado,
}: ContasDigitaisResultsProps) {
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  if (resultado.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Nenhuma conta encontrada</CardTitle>
          <CardDescription>
            Não encontramos contas digitais que atendam aos seus requisitos.
            Tente ajustar os filtros.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const melhorConta = resultado[0];

  return (
    <div className="space-y-6">
      {/* Melhor Conta - Card Principal */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-yellow-500" />
              Melhor Opção Encontrada
            </CardTitle>
            <Badge variant="default" className="text-lg px-3 py-1">
              {resultado.length}{' '}
              {resultado.length === 1 ? 'conta encontrada' : 'contas encontradas'}
            </Badge>
          </div>
          <CardDescription className="text-base">
            {melhorConta.nomeBanco} - {melhorConta.nome}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <DollarSign className="h-4 w-4" />
                Custo Mensal Total
              </div>
              <p className="text-2xl font-bold text-green-700">
                {formatCurrency(melhorConta.tarifaTotal)}
              </p>
              <p className="text-xs text-gray-500">
                Mensalidade: {formatCurrency(melhorConta.mensalidadeConta)}
              </p>
            </div>

            {melhorConta.economia > 0 && (
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <TrendingDown className="h-4 w-4" />
                  Economia Mensal
                </div>
                <p className="text-2xl font-bold text-blue-700">
                  {formatCurrency(melhorConta.economia)}
                </p>
                <p className="text-xs text-gray-500">
                  {formatCurrency(melhorConta.economia * 12)}/ano
                </p>
              </div>
            )}

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Building2 className="h-4 w-4" />
                Banco
              </div>
              <p className="text-xl font-bold text-gray-700">
                {melhorConta.nomeBanco}
              </p>
              {melhorConta.urlSite && (
                <Button
                  variant="link"
                  className="h-auto p-0 text-xs"
                  onClick={() => window.open(melhorConta.urlSite, '_blank')}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Visitar site
                </Button>
              )}
            </div>
          </div>

          {/* Funcionalidades da melhor conta */}
          <div className="mt-6 pt-6 border-t border-green-200">
            <h4 className="text-sm font-semibold mb-3">Funcionalidades:</h4>
            <div className="flex flex-wrap gap-2">
              {melhorConta.features.cartaoCredito && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <CreditCard className="h-3 w-3" />
                  Cartão de Crédito
                </Badge>
              )}
              {melhorConta.features.cartaoDebito && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <CreditCard className="h-3 w-3" />
                  Cartão de Débito
                </Badge>
              )}
              {melhorConta.features.realizaInvestimento && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <PiggyBank className="h-3 w-3" />
                  Investimentos
                </Badge>
              )}
              {melhorConta.features.emiteBoleto && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Receipt className="h-3 w-3" />
                  Emite Boletos
                </Badge>
              )}
              {melhorConta.features.maquininhaInclusa && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Receipt className="h-3 w-3" />
                  Maquininha Inclusa
                </Badge>
              )}
              {melhorConta.features.aceitaDepositoImagem && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Smartphone className="h-3 w-3" />
                  Depósito por Imagem
                </Badge>
              )}
              {melhorConta.features.folhaPagamento && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  Folha de Pagamento
                </Badge>
              )}
            </div>

            {melhorConta.observacao && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-700">{melhorConta.observacao}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tabela Comparativa */}
      <Card>
        <CardHeader>
          <CardTitle>Comparação de Todas as Contas</CardTitle>
          <CardDescription>
            Todas as contas que atendem aos seus requisitos, ordenadas por menor
            custo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">#</TableHead>
                  <TableHead>Banco / Conta</TableHead>
                  <TableHead className="text-right">Mensalidade</TableHead>
                  <TableHead className="text-right">Custo Total</TableHead>
                  {resultado.some((c) => c.economia > 0) && (
                    <TableHead className="text-right">Economia</TableHead>
                  )}
                  <TableHead>Principais Features</TableHead>
                  <TableHead className="text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {resultado.map((conta, index) => (
                  <TableRow
                    key={conta.contaId}
                    className={index === 0 ? 'bg-green-50' : ''}
                  >
                    <TableCell>
                      {index === 0 ? (
                        <Trophy className="h-5 w-5 text-yellow-500" />
                      ) : (
                        <span className="text-gray-500">{index + 1}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-semibold">{conta.nomeBanco}</p>
                        <p className="text-sm text-gray-500">{conta.nome}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(conta.mensalidadeConta)}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatCurrency(conta.tarifaTotal)}
                    </TableCell>
                    {resultado.some((c) => c.economia > 0) && (
                      <TableCell className="text-right">
                        {conta.economia > 0 ? (
                          <span className="text-green-600 font-semibold">
                            {formatCurrency(conta.economia)}
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                    )}
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {conta.features.cartaoCredito && (
                          <Badge variant="outline" className="text-xs">
                            <CheckCircle2 className="h-3 w-3 mr-1 text-green-600" />
                            Crédito
                          </Badge>
                        )}
                        {conta.features.realizaInvestimento && (
                          <Badge variant="outline" className="text-xs">
                            <CheckCircle2 className="h-3 w-3 mr-1 text-green-600" />
                            Invest.
                          </Badge>
                        )}
                        {conta.features.emiteBoleto && (
                          <Badge variant="outline" className="text-xs">
                            <CheckCircle2 className="h-3 w-3 mr-1 text-green-600" />
                            Boletos
                          </Badge>
                        )}
                        {conta.features.maquininhaInclusa && (
                          <Badge variant="outline" className="text-xs">
                            <CheckCircle2 className="h-3 w-3 mr-1 text-green-600" />
                            Maq.
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {conta.urlSite && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(conta.urlSite, '_blank')}
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Visitar
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
