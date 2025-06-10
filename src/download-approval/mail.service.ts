// mail.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Initialize the transporter with your email service
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  // Add the createApprovalRequest method here
  async createApprovalRequest(
    name: string,
    email: string,
    phone: string,
    company: string,
    purpose: string
  ): Promise<void> {
    const message = `
      <h3>Download Approval Request</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Purpose:</strong> ${purpose}</p>
    `;

    // Send email using the transporter
    await this.transporter.sendMail({
      from: `"My App" <${process.env.EMAIL_USER}>`,
      to: email, // Send to the user's email
      subject: 'Download Approval Request',
      html: message,
    });

    console.log('Approval request sent to:', email);
  }
}
