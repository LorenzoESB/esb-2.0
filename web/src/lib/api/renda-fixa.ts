import {
  RendaFixaInput,
  RendaFixaOutput,
  RendaFixaOutputSchema,
} from '../schemas/renda-fixa.schema';
import { apiClient } from './client';

export const rendaFixaApi = {
  simular: async (data: RendaFixaInput): Promise<RendaFixaOutput> => {
    const response = await apiClient.post('/simuladores/renda-fixa/simular', data);
    return RendaFixaOutputSchema.parse(response.data);
  },
};
