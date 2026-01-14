import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailService } from './email.service';
import { ResendProvider } from './providers/resend.provider';
import { EMAIL_PROVIDER } from './interfaces/email-provider.interface';

@Module({
  imports: [ConfigModule],
  providers: [
    EmailService,
    {
      provide: EMAIL_PROVIDER,
      useClass: ResendProvider,
    },
  ],
  exports: [EmailService],
})
export class EmailModule {}
