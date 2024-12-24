import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  DefaultValuePipe,
  Query,
  ParseIntPipe,
  Inject,
} from '@nestjs/common';
import { SeoService } from './seo.service';
import { Sitemap } from './entities/seo.entity';
import { Roles } from 'src/admin/roles.decorator';
import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { AdminOnly } from 'src/admin/admin.decorator';
import { EmptystringPipe } from 'src/validations/emptystring/emptystring.pipe';
import { AdminService } from 'src/admin/admin.service';
import { AdminRequest } from 'src/interfaces/adminrequest.interface';
import { REQUEST } from '@nestjs/core';

@Controller('admin/seo')
export class SeoAdminController {
  constructor(
    private readonly seoService: SeoService,
    private readonly adminService: AdminService,
    @Inject(REQUEST) private readonly request: AdminRequest,
  ) {}

  // get seo list
  @AdminOnly()
  @ApiBearerAuth()
  @ApiQuery({
    name: 'search',
    type: 'string',
    required: false,
  })
  @Roles(['SEO'])
  @Get('')
  async getSEO(@Query('search', new DefaultValuePipe('')) search: string): Promise<Sitemap[]> {
    return await this.seoService.getSEO(search);
  }

  //get seo by id
  @AdminOnly()
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
  })
  @Roles(['SEO'])
  @Get(':id')
  async getSitemapById(@Param('id', ParseIntPipe) id: number): Promise<{
    sitemap: Sitemap | null;
  }> {
    // return product and categories and types
    const toReturn = {
      sitemap: await this.seoService.getSitemapById(id),
    } as {
      sitemap: Sitemap | null;
    };
    return toReturn;
  }

  // add-update seo
  @AdminOnly()
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        ref: {
          type: 'string',
        },
        ref_id: {
          type: 'number',
        },
        meta_title: {
          type: 'string',
        },
        meta_description: {
          type: 'string',
        },
        canonical_url: {
          type: 'string',
        },
        meta_image: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
            },
            width: {
              type: 'number',
            },
            height: {
              type: 'number',
            },
          },
        },
        indexed: {
          type: 'boolean',
        },
      },
    },
  })
  @Roles(['SEO'])
  @Post('add-update')
  async addUpdateSitemap(
    @Body('id', new DefaultValuePipe(0), ParseIntPipe) id: number,
    @Body('ref', EmptystringPipe) ref: string,
    @Body('ref_id', ParseIntPipe) ref_id: number,
    @Body('meta_title', EmptystringPipe) meta_title: string,
    @Body('meta_description', EmptystringPipe) meta_description: string,
    @Body('canonical_url', EmptystringPipe) canonical_url: string,
    @Body('meta_image')
    meta_image: {
      url: string;
      alt: string;
      width: number;
      height: number;
    } | null,
    @Body('indexed') indexed: boolean,
  ): Promise<Sitemap> {
    // try catch block
    try {
      let sitemap = await this.seoService.addUpdateSitemap(
        id,
        ref,
        ref_id,
        meta_title,
        meta_description,
        canonical_url,
        meta_image,
        indexed,
      );
      await this.adminService.addAdminActivity(
        this.request.admin,
        `Sitemap ${sitemap.meta_title}`,
        'created_sitemap',
        `${sitemap.id}`,
        {
          id,
          ref,
          ref_id,
          meta_title,
          meta_description,
          canonical_url,
          meta_image,
          indexed,
        },
      );
      return sitemap;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
