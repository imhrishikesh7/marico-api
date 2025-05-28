import { Body, Query, Controller, Get, Post, VERSION_NEUTRAL } from "@nestjs/common";
import { MailService } from "./mail.service";

@Controller({
  version: VERSION_NEUTRAL,
  path: "download",
})
export class DownloadApprovalController {
  constructor(private readonly mailService: MailService) {} // Correct dependency injection

  @Post()
  async createApprovalRequest(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('company') company: string,
    @Body('phone') phone: string,
    @Body('purpose') purpose: string,
    @Body('fileName') fileName: string
  ) {
    await this.mailService.createApprovalRequest(name, email, phone, company, purpose, fileName);
    return { message: "Success" };
  }
  
  @Get('approve')
  async approveDownload(@Query('email') email: string, @Query('file') file: string) {
    // Generate the download link (you can modify this to match your actual download URL logic)
    const downloadLink = `https://yourdomain.com/downloads/${file}`;
 
    try {
      // Send approval email to the requester
      await this.mailService.sendApprovalEmail(email, file, downloadLink);
      return { message: `Approved download request for ${email} - file: ${file}`, success: true };
    } catch (error) {
      console.error('Error sending approval email:', error);
      return { message: 'Error sending approval email', success: false };
    }
  }
  
  @Get('decline')
  async declineDownload(@Query('email') email: string, @Query('file') file: string) {
    try {
      // Send decline email to the requester
      await this.mailService.sendDeclineEmail(email, file);
      return { message: `Declined download request for ${email} - file: ${file}`, success: true };
    } catch (error) {
      console.error('Error sending decline email:', error);
      return { message: 'Error sending decline email', success: false };
    }
  }
}
  
