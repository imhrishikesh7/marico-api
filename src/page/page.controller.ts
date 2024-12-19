import { BadRequestException, Controller, Get, Param, Query } from '@nestjs/common';

import { ApiQuery } from '@nestjs/swagger';
import { Page } from './entities/page.entity';
import { EmptystringPipe } from '../validations/emptystring/emptystring.pipe';
import { Public } from '../public/public.decorator';
import { PageService } from './page.service';
import { BrandsService } from 'src/brands/brands.service';
import { Brand } from 'src/brands/entities/brand.entity';
import { Media } from 'src/media/entities/media.entity';
import { MediaService } from 'src/media/media.service';
import { Sitemap } from 'src/seo/entities/seo.entity';
import { SeoService } from 'src/seo/seo.service';

@Controller(':region/page')
export class PageController {
  constructor(
    private readonly pageService: PageService,
    private readonly brandService: BrandsService,
    private readonly mediaService: MediaService,
    private readonly seoService: SeoService,
  ) {}

  //public get page by url
  @ApiQuery({
    name: 'url',
    type: 'string',
    required: true,
  })
  @Public()
  @Get('details')
  async findOneByUrl(
    @Query('url', EmptystringPipe) url: string,
    @Param('region') region: string,
  ): Promise<{
    page: Page;
    brand_slider: Brand[];
    news: Media | null;
    seo: Sitemap|null;
  }> {
    const page = await this.pageService.findOneByUrl(url, true, true, region);
    let brand_slider: Brand[] = [];
    let news = null;
    let seo = null;

    if (page) {
      for (const content of page.page_contents) {
        if (content.component_type === 'Brands Collection') {
          brand_slider = await this.brandService.getFrontBrandDetail(region);
        }
        if (content.component_type === 'News Collection') {
          news = await this.mediaService.getFrontNewsDetail(region);
        }
      }
      seo = await this.seoService.findOne(page.id, url);
    }
    if (!page) {
      throw new BadRequestException('Page not found');
    }
    return {
      page,
      brand_slider,
      news,
      seo,
    };
  }
}
