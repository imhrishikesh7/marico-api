import { Controller, Get, Param } from '@nestjs/common';
import { RedirectUrlsService } from './redirect_urls.service';
import { RedirectUrl } from './entities/redirect_url.entity';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('redirect-urls')
export class RedirectUrlsController {
  constructor(private readonly redirectUrlsService: RedirectUrlsService) {}

  @ApiBearerAuth()
   @Get('')
   async getRedirecturl(
    @Param('url') url: string,
   ): Promise<RedirectUrl | null> {
     return await this.redirectUrlsService.getRedirectUrl(url);
   }

}
