import { Injectable, Inject, Logger } from '@nestjs/common';
import { EMAIL_PROVIDER, EmailProvider } from './interfaces/email-provider.interface';
import { SimulationEmailPayload } from './dto/simulation-email-payload.dto';
import { generateSimulationEmail } from './templates/simulation-result.template';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(
    @Inject(EMAIL_PROVIDER)
    private readonly emailProvider: EmailProvider,
  ) {}

  async sendSimulationResult(payload: SimulationEmailPayload): Promise<void> {
    const maskedEmail = payload.userEmail.replace(/(.{1,2})(.*)(@.*)/, '$1***$3');
    this.logger.log(`Preparing to send simulation result email to ${maskedEmail}`);

    try {
      const html = generateSimulationEmail(payload);
      const subject = `Seu resultado: ${payload.simulationType.replace(/_/g, ' ')}`;

      await this.emailProvider.sendEmail(payload.userEmail, subject, html);
      
      this.logger.log(`Simulation result email sent successfully to ${maskedEmail}`);
    } catch (error) {
      this.logger.error(`Failed to send simulation result email to ${maskedEmail}`, error.stack);
      // We do not throw here to avoid disrupting the user experience if email fails
    }
  }
}
