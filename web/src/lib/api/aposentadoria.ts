import { apiClient } from './client';
import type { SimularAposentadoriaInput, ResultadoAposentadoria } from '../schemas/aposentadoria.schema';

const BASE_PATH = '/simuladores/aposentadoria';

export const aposentadoriaApi = {
    /**
     * Simula planejamento de aposentadoria privada
     */
    simular: async (input: SimularAposentadoriaInput): Promise<ResultadoAposentadoria> => {
        try {
            const response = await apiClient.post<ResultadoAposentadoria>(
                `${BASE_PATH}/simular`,
                input
            );
            return response.data;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message ||
                               error.message ||
                               'Erro ao simular aposentadoria';
            throw new Error(errorMessage);
        }
    },
};
