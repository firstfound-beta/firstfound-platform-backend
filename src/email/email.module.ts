import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from './email.service';
import { EmailEventListener } from './email.event-listener';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      },
      defaults: {
        from: `"Placement Cell" <${process.env.EMAIL_USER}>`,
      },
    }),
  ],
  providers: [EmailService, EmailEventListener],
  exports: [EmailService],
})
export class EmailModule {}
