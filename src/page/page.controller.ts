import {
  BadRequestException,
  Controller,
  DefaultValuePipe,
  Get,
  Inject,
  Param,
  Query,
} from '@nestjs/common';

import { ApiQuery } from '@nestjs/swagger';
import { Page } from './entities/page.entity';
import { EmptystringPipe } from '../validations/emptystring/emptystring.pipe';
import { Public } from '../public/public.decorator';
import { PageService } from './page.service';
import { Region } from 'src/regions/entities/region.entity';
import { BrandsService } from 'src/brands/brands.service';
import { Brand } from 'src/brands/entities/brand.entity';

@Controller(':region/page')
export class PageController {
  constructor(
    private readonly pageService: PageService,
    private readonly brandService: BrandsService,
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
  }> {
    const page = await this.pageService.findOneByUrl(url, true, true, region);
    let brand_slider: Brand[] = [];
    if (page) {
      page.page_contents.forEach(async (content) => {
        if (content.component_type == 'Brands Collection') {
          brand_slider = await this.brandService.getFrontBrandDetail(region);
        }
      });
    }
    if (!page) {
      throw new BadRequestException('Page not found');
    }
    return {
      page: page,
      brand_slider: brand_slider,
    };
  }
}
