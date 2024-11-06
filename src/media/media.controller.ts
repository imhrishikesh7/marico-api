import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Media } from './entities/media.entity';

@Controller(':region/media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @ApiBearerAuth()
  @Get(':category')
  async getMediaByCategory(
    @Param('region') region: string,
    @Param('category') category: string,
    @Param('year') year: string,
  ): Promise<Media[]> {
    return await this.mediaService.getMediaByCategory(region, category, year);
  }
}
