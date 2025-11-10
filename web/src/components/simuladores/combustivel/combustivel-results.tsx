import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CombustivelOutput } from "@/lib/schemas/combustivel.schema";

interface CombustivelResultsProps {
    data: CombustivelOutput
}

export function CombustivelResults({ data }: CombustivelResultsProps) {
    const { recomendacao, custos, economia } = data;

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Resultado da Simulação</CardTitle>
                    <CardDescription>
                        Análise de custo por km e recomendação de combustível
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500">Custo por Km - Gasolina</p>
                                <p className="text-2xl font-bold">{custos.gasolina.custoFormatado} / km</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Custo por Km - Etanol</p>
                                <p className="text-2xl font-bold">{custos.etanol.custoFormatado} / km</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="p-4 bg-green-50 rounded-lg">
                                <p className="text-sm text-green-700">Economia ao escolher {recomendacao}</p>
                                <p className="text-2xl font-bold text-green-700">
                                    {economia.valorFormatado} ({economia.percentual}%)
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Recomendação</p>
                                <p className="text-2xl font-bold">{recomendacao}</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Mensagem</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{data.mensagem}</p>
                </CardContent>
            </Card>
        </div>
    );
}