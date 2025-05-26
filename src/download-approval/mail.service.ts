// mail.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      secure: false, // false since Mailtrap doesn't use SSL
      auth: {
        user: "b4dbfe8500303c",
        pass: "4c1d05a3058652",
      },
    });
  }

  // Function to send approval request to the admin
  async createApprovalRequest(
    name: string,
    email: string,
    phone: string,
    company: string,
    purpose: string,
    fileName: string
  ): Promise<void> {
    const approveUrl = `http://localhost:3000/download/approve?email=${encodeURIComponent(email)}&file=${encodeURIComponent(fileName)}`;
    const declineUrl = `http://localhost:3000/download/decline?email=${encodeURIComponent(email)}&file=${encodeURIComponent(fileName)}`;

    const message = `
      <h3>Download Approval Request</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Purpose:</strong> ${purpose}</p>
      <p><strong>File Requested:</strong> ${fileName}</p>
      <br/>
      <a href="${approveUrl}" style="padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Approve</a>
      &nbsp;
      <a href="${declineUrl}" style="padding: 10px 20px; background-color: #f44336; color: white; text-decoration: none; border-radius: 5px;">Decline</a>
    `;

    try {
      await this.transporter.sendMail({
        from: `"Marico" <${process.env.EMAIL_USER}>`,
        to: 'admin@domain.com', // Send to admin or approval address
        subject: 'Download Approval Request',
        html: message,
      });
      console.log('Email sent regarding file:', fileName);
    } catch (error) {
      console.error('Email sending failed:', error);
    }
  }

  // Function to send approval email to the requester
  async sendApprovalEmail(
    requesterEmail: string,
    fileName: string,
    downloadLink: string
  ): Promise<void> {
    const message = `
      <h3>Your Download Request has been Approved</h3>
      <p>Your request for the file <strong>${fileName}</strong> has been approved.</p>
      <p>You can download the file by clicking the link below:</p>
      <a href="${downloadLink}" style="padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Download File</a>
    `;

    try {
      await this.transporter.sendMail({
        from: `"Marico" <${process.env.EMAIL_USER}>`,
        to: requesterEmail,
        subject: 'Your Download Request has been Approved',
        html: message,
      });
      console.log('Approval email sent to:', requesterEmail);
    } catch (error) {
      console.error('Approval email sending failed:', error);
    }
  }

  // Function to send decline email to the requester
  async sendDeclineEmail(
    requesterEmail: string,
    fileName: string
  ): Promise<void> {
    const message = `
      <h3>Your Download Request has been Declined</h3>
      <p>Unfortunately, your request for the file <strong>${fileName}</strong> has been declined.</p>
      <p>If you need further assistance, please contact the support team.</p>
    `;

    try {
      await this.transporter.sendMail({
        from: `"Marico" <${process.env.EMAIL_USER}>`,
        to: requesterEmail,
        subject: 'Your Download Request has been Declined',
        html: message,
      });
      console.log('Decline email sent to:', requesterEmail);
    } catch (error) {
      console.error('Decline email sending failed:', error);
    }
  }
}
