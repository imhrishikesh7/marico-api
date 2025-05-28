import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { DownloadApprovalController } from './mail.controller'; // <-- Add this

@Module({
  providers: [MailService],
  controllers: [DownloadApprovalController], // <-- Register controller here
  exports: [MailService],
})
export default class MailModule {}
