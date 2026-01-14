import { ConfigService } from '@nestjs/config';
import { EmailProvider } from '../interfaces/email-provider.interface';
export declare class ResendProvider implements EmailProvider {
    private readonly configService;
    private readonly logger;
    private readonly resend;
    constructor(configService: ConfigService);
    sendEmail(to: string, subject: string, html: string): Promise<void>;
}
