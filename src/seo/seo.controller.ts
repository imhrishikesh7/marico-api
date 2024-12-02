import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SeoService } from './seo.service';
import { Contact } from './entities/contact.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { get } from 'http';
import { Sitemap } from './entities/seo.entity';

@Controller('seo')
export class SeoController {
  constructor(private readonly seoService: SeoService) {}

  @ApiBearerAuth()
  @Get('contact-us')
  async getSHIDetail(
    @Param('name') name: string,
    @Param('email') email: string,
    @Param('phone') phone: string,
    @Param('address') address: string,
    @Param('query_type') query_type: string,
    @Param('query') query: string,
  ): Promise<Contact> {
    return await this.seoService.addContactUS(
      name,
      email,
      phone,
      address,
      query_type,
      query,
    );
  }

  @Get('')
  async getSEODetail(
    @Param('page_id') page_id: number,
  ): Promise<Sitemap | null> {
    return await this.seoService.getSEODetail(page_id);
  }
}
