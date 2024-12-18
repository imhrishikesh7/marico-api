import { Body, Controller, Post } from '@nestjs/common';
import { RedirectUrlsService } from './redirect_urls.service';
import { RedirectUrl } from './entities/redirect_url.entity';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@Controller('redirect-urls')
export class RedirectUrlsController {
  constructor(private readonly redirectUrlsService: RedirectUrlsService) {}

  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
        },
      },
    },
  })
   @Post('')
   async getRedirecturl(
    @Body('url') url: string,
   ): Promise<RedirectUrl | null> {
    console.log(url, 'urllllllll');
     return await this.redirectUrlsService.getRedirectUrl(url);
   }

}
