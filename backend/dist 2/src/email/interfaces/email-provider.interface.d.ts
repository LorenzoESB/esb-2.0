export interface EmailProvider {
    sendEmail(to: string, subject: string, html: string): Promise<void>;
}
export declare const EMAIL_PROVIDER = "EMAIL_PROVIDER";
