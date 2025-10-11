// src/email/email-event.listener.ts
import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EmailService } from './email.service';

@Injectable()
export class EmailEventListener {
  private readonly logger = new Logger(EmailEventListener.name);

  constructor(private readonly emailService: EmailService) {}

  // 📬 When a founder submits their application
  @OnEvent('user.application.received')
  async handleApplicationReceived(payload: { email: string; name: string }) {
    this.logger.log(`Sending application confirmation to ${payload.email}`);

    const html = `
      <h2>We've Received Your Application!</h2>
      <p>Hello Founder,</p>
      <p>Thank you for your interest in joining <strong>Originn</strong>.</p>
      <p>This email is to confirm that we have successfully received your application. Our team is currently reviewing your submission.</p>
      <p>We will notify you with a confirmation email as soon as your application has been approved.</p>
      <br/>
      <p>Best regards,<br/>The Originn Team</p>
    `;

    await this.emailService.sendMail(
      payload.email,
      "📬 We've Received Your Application!",
      html,
    );
  }

  // (Optional) If you have approval events
  @OnEvent('user.application.approved')
  async handleApplicationApproved(payload: { email: string; name: string }) {
    this.logger.log(`Sending approval email to ${payload.email}`);

    const html = `
      <h2>Welcome to Originn! Your Startup Application is Approved.</h2>

      <p>Hello Founder,</p>

      <p>Congratulations! We are excited to inform you that your startup <strong>${payload.name}</strong> 
      has successfully passed our onboarding process and has been approved to join the Originn ecosystem.</p>

      <p>You are now part of a curated showcase designed to bring high-potential Indian ventures to light.</p>

      <h3>What's Next?</h3>
      <p>
        You can now access your <strong>Startup Dashboard</strong> to build out your profile.
        A complete and compelling profile is the first step toward being discovered by our dedicated community
        of early adopters and backers.
      </p>

      <p><strong>You can log in using:</strong> your founder's email and the password you created during sign-up.</p>

      <p>Once logged in, please take the time to update your profile thoroughly.
      This will make your startup visible on our discovery platform, allowing users to find and explore your innovation.</p>

      <p>We are thrilled to have you on board and look forward to helping you on your journey.</p>

      <br/>
      <p>Welcome to Originn,<br/><strong>The Originn Team</strong></p>
    `;

    await this.emailService.sendMail(
      payload.email,
      '🎉 Welcome to Originn! Your Startup Application is Approved.',
      html,
    );
  }

  @OnEvent('user.application.rejected')
  async handleApplicationRejected(payload: { email: string; name: string }) {
    this.logger.log(`Sending rejection email to ${payload.email}`);

    const html = `
      <h2>An Update on Your Originn Application</h2>

      <p>Hello Founder,</p>

      <p>Thank you for your interest in Originn and for taking the time to submit your application. 
      We sincerely appreciate the opportunity to learn about your venture <strong>${payload.name}</strong>.</p>

      <p>
        As part of our commitment to creating a trusted ecosystem, every application undergoes a rigorous review process. 
        After careful consideration, we have determined that we cannot move forward with your application at this time.
      </p>

      <p>
        This decision was made because the information provided was not sufficient for our Due Diligence team 
        to conduct a full and proper evaluation of your startup against our criteria.
      </p>

      <p>
        We understand that you are in the early stages and things are constantly evolving. 
        We encourage you to refine your materials and welcome you to re-apply in the future.
      </p>

      <br/>
      <p>Thank you,<br/><strong>The Originn Team</strong></p>
    `;

    await this.emailService.sendMail(
      payload.email,
      '❗ An Update on Your Originn Application',
      html,
    );
  }
}
