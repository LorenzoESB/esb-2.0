import { CombustivelInput, CombustivelOutput, CombustivelOutputSchema } from "../schemas/combustivel.schema";
import { apiClient } from "./client";

export const combustivelApi = {
    calcular: async (data: CombustivelInput): Promise<CombustivelOutput> => {
        const response = await apiClient.post('/simuladores/combustivel', data);
        return CombustivelOutputSchema.parse(response.data.data);
    }
}