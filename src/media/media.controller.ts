import { Controller, Get, Param, Query } from '@nestjs/common';
import { MediaService } from './media.service';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { MediaNew as Media } from './entities/medianew.entity';
import { Sitemap } from '../seo/entities/seo.entity';

@Controller(':region/media-new')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @ApiBearerAuth()
  @Get(':category')
  @ApiQuery({
    name: 'year',
    required: false,
    description: 'An optional parameter',
  })
  async getMediaByCategory(
    @Param('region') region: string,
    @Param('category') category: string,
    @Query('year') year?: string,
  ): Promise<{ result: Media[]; seo: Sitemap | null }> {
    return await this.mediaService.getMediaByCategory(region, category);
  }
}
