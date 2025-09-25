import { AmortizacaoSacInput, AmortizacaoSacOutput, AmortizacaoSacOutputSchema } from '../schemas/amortizacao.schema';
import { apiClient } from './client';


export const amortizacaoSacApi = {
    simular: async (data: AmortizacaoSacInput): Promise<AmortizacaoSacOutput> => {
        const response = await apiClient.post('/simulators/amortizacao-sac/simular', data);
        return AmortizacaoSacOutputSchema.parse(response.data);
    },
};