import type { Request, Response } from "express";
import calculaJurosCompostos from "../../services/juros-compostos/juros-compostos.service";

export async function calculaJurosCompostosAPI(req: Request, res: Response) {
    try {
        const { valorInicial, aporteMensal, tempoAplicacao, taxaJuros } = req.body;

        if (!valorInicial || !aporteMensal || !tempoAplicacao || !taxaJuros) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const jurosCompostosInput = await calculaJurosCompostos({
            valorInicial: Number(valorInicial),
            aporteMensal: Number(aporteMensal),
            tempoAplicacao: Number(tempoAplicacao),
            taxaJuros: Number(taxaJuros),
        });

        res.json({ message: "Compound interest calculation received", data: jurosCompostosInput });
    } catch (error) {
        console.error("Error calculating compound interest:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
