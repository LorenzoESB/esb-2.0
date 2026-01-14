import { EmailProvider } from './interfaces/email-provider.interface';
import { SimulationEmailPayload } from './dto/simulation-email-payload.dto';
export declare class EmailService {
    private readonly emailProvider;
    private readonly logger;
    constructor(emailProvider: EmailProvider);
    sendSimulationResult(payload: SimulationEmailPayload): Promise<void>;
}
