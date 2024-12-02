import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { Media } from './entities/media.entity';

@Controller(':region/media')
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
  ): Promise<{ result: Media[]; seo: any }> {
    return await this.mediaService.getMediaByCategory(region, category, year);
  }
}
