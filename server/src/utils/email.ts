import nodemailer, { Transporter } from 'nodemailer';
import pug from 'pug';
import { convert } from 'html-to-text';

type EmailUser = {
  email: string;
  name: string;
};

type EmailConfig = {
  readonly host: string;
  readonly port: number;
  readonly auth: {
    readonly user: string;
    readonly pass: string;
  };
};

class Email {
  private readonly to: string;
  private readonly firstName: string;
  private readonly url: string;
  private readonly from: string;

  constructor(user: EmailUser, url: string) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Natours <${process.env.EMAIL_FROM}>`;
  }

  private newTransport(): Transporter {
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV === 'production') {
      // Brevo SMTP Configuration
      console.log('🔧 Brevo Config:');
      console.log('  Host:', process.env.BREVO_HOST);
      console.log('  Port:', process.env.BREVO_PORT);
      console.log('  Login:', process.env.BREVO_LOGIN);
      console.log(
        '  Password:',
        process.env.BREVO_PASSWORD ? '***SET***' : 'MISSING',
      );

      const config: EmailConfig = {
        host: process.env.BREVO_HOST!,
        port: Number(process.env.BREVO_PORT),
        auth: {
          user: process.env.BREVO_LOGIN!,
          pass: process.env.BREVO_PASSWORD!,
        },
      };
      return nodemailer.createTransport(config);
    }
    const config: EmailConfig = {
      host: process.env.DEV_EMAIL_HOST!,
      port: Number(process.env.DEV_EMAIL_PORT),
      auth: {
        user: process.env.DEV_EMAIL_USERNAME!,
        pass: process.env.DEV_EMAIL_PASSWORD!,
      },
    };
    return nodemailer.createTransport(config);
  }

  private async send(template: string, subject: string): Promise<void> {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });

    // 2) Define email options
    const mailOptions = {
      from: 'obadagh014@gmail.com',
      to: this.to,
      subject,
      html,
      text: convert(html),
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome(): Promise<void> {
    await this.send('welcome', 'Welcome to the Natours Family!');
  }

  async sendPasswordReset(): Promise<void> {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 minutes)',
    );
  }
}

export default Email;
