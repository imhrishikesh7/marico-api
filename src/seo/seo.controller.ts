import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SeoService } from './seo.service';
import { Contact } from './entities/contact.entity';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { Sitemap } from './entities/seo.entity';

@Controller('seo')
export class SeoController {
  constructor(private readonly seoService: SeoService) {}

  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        email: {
          type: 'string',
        },
        phone: {
          type: 'string',
        },
        address: {
          type: 'string',
        },
        query_type: {
          type: 'string',
        },
        query: {
          type: 'string',
        },
      },
    },
  })
  @Post('contact-us')
  async addContactUS(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('phone') phone: string,
    @Body('address') address: string,
    @Body('query_type') query_type: string,
    @Body('query') query: string,
  ): Promise<Contact> {
    return await this.seoService.addContactUS(name, email, phone, address, query_type, query);
  }

  @Get('search')
  async getSearchDetail(@Query('query') query: string): Promise<Sitemap[]> {
    return await this.seoService.getSearchDetail(query);
  }

  @Get('sitemap')
  async getSitemapDetail(): Promise<Sitemap[]> {
    return await this.seoService.getSitemapDetail();
  }
}
