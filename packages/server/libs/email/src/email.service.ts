import { Inject, Injectable } from '@nestjs/common'
import { Transporter, createTransport } from 'nodemailer'

const email = '3581541620@qq.com'

@Injectable()
export class EmailService {
  private transporter: Transporter

  constructor() {
    this.transporter = createTransport({
      host: 'smtp.qq.com',
      port: 587,
      secure: false,
      auth: {
        user: email,
        pass: 'sydvvzmcysnpcjfe',
      },
    })
  }

  async sendEmail(to: string, subject: string, html: string) {
    await this.transporter.sendMail({
      from: {
        name: '考试系统',
        address: email,
      },
      to: email,
      subject,
      html,
    })
  }
}

export const InjectEmailService = Inject(EmailService)
