import { JurosCompostosInput, JurosCompostosOutput, JurosCompostosOutputSchema } from '../schemas/juros-compostos.schema';
import { apiClient } from './client';


export const jurosCompostosApi = {
    calcular: async (data: JurosCompostosInput): Promise<JurosCompostosOutput> => {
        const response = await apiClient.post('/simulators/juros-compostos', data);
        return JurosCompostosOutputSchema.parse(response.data.data);
    },
};