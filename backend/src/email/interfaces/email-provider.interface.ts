export interface EmailProvider {
  sendEmail(to: string, subject: string, html: string): Promise<void>;
}

export const EMAIL_PROVIDER = 'EMAIL_PROVIDER';
