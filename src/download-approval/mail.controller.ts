import { Body, Controller, Post } from "@nestjs/common";
import { MailService } from "./mail.service";

@Controller('download/approval')
export class DownloadApprovalController {
  constructor(private readonly mailService: MailService) {} // Correct dependency injection

  @Post()
  async createApprovalRequest(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('company') company: string,
    @Body('phone') phone: string,
    @Body('purpose') purpose: string
  ) {
    // Pass the data to the MailService method for processing
    await this.mailService.createApprovalRequest(name, email, phone, company, purpose);
    return { message: "Success" }; // Return response with status
  }
}
