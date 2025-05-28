import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  ParseBoolPipe,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { RegionsService } from 'src/regions/regions.service';
import { AdminRequest } from 'src/interfaces/adminrequest.interface';
import { REQUEST } from '@nestjs/core';
import { AdminOnly } from 'src/admin/admin.decorator';
import { ApiBearerAuth, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Roles } from 'src/admin/roles.decorator';
import { MediaNew as Media  } from './entities/medianew.entity';
import { Region } from 'src/regions/entities/region.entity';
import { EmptystringPipe } from 'src/validations/emptystring/emptystring.pipe';
import { ParseDateTimePipe } from 'src/validations/parsedatetime/parsedatetime.pipe';

@Controller('admin/media-new')
export class MediaAdminController {
  constructor(
    private readonly mediaService: MediaService,
    private readonly regionService: RegionsService,
    @Inject(REQUEST) private readonly request: AdminRequest,
  ) {}

  @AdminOnly()
  @ApiBearerAuth()
  @ApiQuery({
    name: 'search',
    type: 'string',
    required: false,
  })
  @Roles(['MEDIA'])
  @Get('/')
  async getMedia(@Query('search', new DefaultValuePipe('')) search: string): Promise<Media[]> {
    return await this.mediaService.getMedia(search || undefined);
  }

  @Get('/:id')
  async getMediaById(@Param('id', ParseIntPipe) id: number): Promise<{
    media: Media | null;
    medias: Media[];
    regions: Region[] | null;
  }> {
    const toReturn = {
      media: await this.mediaService.getMediaById(id),
      medias: await this.mediaService.getMedia(),
      regions: await this.regionService.getRegionList(),
    } as {
      media: Media | null;
      medias: Media[];
      regions: Region[] | null;
    };
    return toReturn;
  }

  //add new media
  @AdminOnly()
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        category: { type: 'string' },
        media_title: { type: 'string' },
        author: { type: 'string' },
        publisher_logo: { type: 'string' },
        publisher_name: { type: 'string' },
        subtitle: { type: 'string' },
        media_regions: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        release_date: {
          type: 'string',
          format: 'date-time',
        },
        external_link: { type: 'string' },
        kv_image: {
          type: 'object',
          properties: {
            url: { type: 'string' },
            width: { type: 'number' },
            height: { type: 'number' },
            alt: { type: 'string' },
          },
          nullable: true,
        },
        video: {
          type: 'object',
          properties: {
            url: { type: 'string' },
          },
          nullable: true,
        },
        pressReleaseFile: {
          type: 'object',
          properties: {
            url: { type: 'string' },
          },
          nullable: true,
        },
        annexureFile: {
          type: 'object',
          properties: {
            url: { type: 'string' },
          },
          nullable: true,
        },
        sort_order: { type: 'number' },
        is_latest: { type: 'boolean' },
      },
    },
  })
  @Roles(['MEDIA','ADMIN'])
  @Post('add-update')
  async addUpdateMedia(
    @Body('id', ParseIntPipe) id: number,
    @Body('category', EmptystringPipe) category: string,
    @Body('media_title', EmptystringPipe) media_title: string,
    @Body('author', EmptystringPipe) author: string,
    @Body('publisher_logo', EmptystringPipe) publisher_logo: string,
    @Body('publisher_name', EmptystringPipe) publisher_name: string,
    @Body('subtitle', EmptystringPipe) subtitle: string,
    @Body('media_regions') media_regions: string[],
    @Body('release_date', ParseDateTimePipe) release_date: Date,
    @Body('external_link') external_link: string,
    @Body('kv_image')
    kv_image: {
      url: string;
      width: number;
      height: number;
      alt: string;
    } | null,
    @Body('video')
    video: {
      url: string;
    } | null,
    @Body('pressReleaseFile')
    pressReleaseFile: {
      url: string;
    } | null,
    @Body('annexureFile')
    annexureFile: {
      url: string;
    } | null,
    @Body('sort_order', ParseIntPipe) sort_order: number,
    @Body('is_latest', ParseBoolPipe) is_latest: boolean,
  ): Promise<{ media: Media }> {
    const media = await this.mediaService.addUpdateMedia(
      id,
      category,
      media_title,
      author,
      publisher_logo,
      publisher_name,
      subtitle,
      media_regions,
      release_date,
      external_link,
      kv_image,
      video,
      pressReleaseFile,
      annexureFile,
      sort_order,
      is_latest,
    );
    return { media };
  }
}
