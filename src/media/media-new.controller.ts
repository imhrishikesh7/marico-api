import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  ParseBoolPipe,
} from '@nestjs/common';
import { MediaNewService } from './media-new.service';
import { AdminOnly } from 'src/admin/admin.decorator';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/admin/roles.decorator';
import { PressRelease } from './entities/press-release.entity';
import { Spotlight } from './entities/spotlight.entity';
import { EmptystringPipe } from 'src/validations/emptystring/emptystring.pipe';
import { ParseDateTimePipe } from 'src/validations/parsedatetime/parsedatetime.pipe';
import { Sitemap } from 'src/seo/entities/seo.entity';

@ApiTags('Media New')
@Controller('admin/media-new')
export class MediaNewController {
  constructor(private readonly mediaNewService: MediaNewService) {}

  @AdminOnly()
  @ApiBearerAuth()
  @ApiQuery({
    name: 'search',
    type: 'string',
    required: false,
  })
  @Roles(['MEDIA'])
  @Get()
  async getAll(@Query('search', new DefaultValuePipe('')) search: string): Promise<{
    pressReleases: PressRelease[];
    spotlights: Spotlight[];
  }> {
    const [pressReleases, spotlights] = await Promise.all([
      this.mediaNewService.getPressReleases(search || undefined),
      this.mediaNewService.getSpotlights(search || undefined),
    ]);
    return { pressReleases, spotlights };
  }

  @AdminOnly()
  @ApiBearerAuth()
  @ApiQuery({
    name: 'search',
    type: 'string',
    required: false,
  })
  @Roles(['MEDIA'])
  @Get('press-releases')
  async getPressReleases(@Query('search', new DefaultValuePipe('')) search: string): Promise<PressRelease[]> {
    return await this.mediaNewService.getPressReleases(search || undefined);
  }

  @AdminOnly()
  @ApiBearerAuth()
  @ApiQuery({
    name: 'search',
    type: 'string',
    required: false,
  })
  @Roles(['MEDIA'])
  @Get('spotlights')
  async getSpotlights(@Query('search', new DefaultValuePipe('')) search: string): Promise<Spotlight[]> {
    return await this.mediaNewService.getSpotlights(search || undefined);
  }

  @AdminOnly()
  @ApiBearerAuth()
  @Roles(['MEDIA'])
  @Get('press-releases/:id')
  async getPressReleaseById(@Param('id', ParseIntPipe) id: number): Promise<PressRelease | null> {
    return await this.mediaNewService.getPressReleaseById(id);
  }

  @AdminOnly()
  @ApiBearerAuth()
  @Roles(['MEDIA'])
  @Get('spotlights/:id')
  async getSpotlightById(@Param('id', ParseIntPipe) id: number): Promise<Spotlight | null> {
    return await this.mediaNewService.getSpotlightById(id);
  }

  @AdminOnly()
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', nullable: true },
        media_title: { type: 'string' },
        author: { type: 'string' },
        publisher_logo: { type: 'string' },
        publisher_name: { type: 'string' },
        subtitle: { type: 'string' },
        media_regions: {
          type: 'array',
          items: { type: 'string' },
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
  // @Roles(['ADMIN', 'ADMIN_ROLES'])
  // @Post('press-release/add-update')
  // async addUpdatePressRelease(
  //   @Body('id', new DefaultValuePipe(null), ParseIntPipe) id: number | null,
  //   @Body('media_title', EmptystringPipe) media_title: string,
  //   @Body('subtitle', EmptystringPipe) subtitle?: string,
  //   @Body('subheading', EmptystringPipe) subheading?: string,
  //   @Body('paragraph', EmptystringPipe) paragraph?: string,
  //   @Body('list', EmptystringPipe) list?: string,
  //   @Body('quote', EmptystringPipe) quote?: string,
  //   @Body('media_regions') media_regions?: string[],
  //   @Body('release_date', ParseDateTimePipe) release_date?: Date,
  //   @Body('external_link') external_link?: string,
  //   @Body('kv_image')
  //   kv_image?: {
  //     url: string;
  //     width: number;
  //     height: number;
  //     alt: string;
  //   } | null,
  //   @Body('pressReleaseFile')
  //   pressReleaseFile?: {
  //     url: string;
  //   } | null,
  //   @Body('annexureFile')
  //   annexureFile?: {
  //     url: string;
  //   } | null,
  //   @Body('sort_order', ParseIntPipe) sort_order?: number,
  //   @Body('is_latest', ParseBoolPipe) is_latest?: boolean,
  // ): Promise<PressRelease> {
  //   console.log("i am being hit here add-update controller")
  //   return await this.mediaNewService.addUpdatePressRelease(
  //     id,
  //     media_title,
  //     author,
  //     publisher_logo ?? '',
  //     publisher_name ?? '',
  //     subtitle ?? '',
  //     media_regions ?? [],
  //     release_date ?? new Date(),
  //     external_link ?? '',
  //     kv_image ?? null,         
  //     pressReleaseFile ?? null, 
  //     annexureFile ?? null,     
  //     sort_order??1,
  //     is_latest??true,
  //   );
    
  // }

  @AdminOnly()
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', nullable: true },
        media_title: { type: 'string' },
        author: { type: 'string' },
        publisher_logo: { type: 'string' },
        publisher_name: { type: 'string' },
        subtitle: { type: 'string' },
        media_regions: {
          type: 'array',
          items: { type: 'string' },
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
        sort_order: { type: 'number' },
        is_latest: { type: 'boolean' },
      },
    },
  })
  @Roles(['MEDIA'])
  @Post('spotlights/add-update')
  async addUpdateSpotlight(
    @Body('id', new DefaultValuePipe(null), ParseIntPipe) id: number | null,
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
    @Body('sort_order', ParseIntPipe) sort_order: number,
    @Body('is_latest', ParseBoolPipe) is_latest: boolean,
  ): Promise<Spotlight> {
    return await this.mediaNewService.addUpdateSpotlight(
      id,
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
      sort_order,
      is_latest,
    );
  }

  @Get(':region/:type')
  async getMediaByRegion(
    @Param('region') region: string,
    @Param('type') type: 'press-release' | 'spotlight',
  ): Promise<{
    result: (PressRelease | Spotlight)[];
    seo: Sitemap | null;
  }> {
    return await this.mediaNewService.getMediaByRegion(region, type);
  }
} 