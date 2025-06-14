import {
  Controller,
  Get,
  Param,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  Post,
  Body,
  Inject,
} from '@nestjs/common';
import { PageService } from './page.service';
import { AdminRequest } from 'src/interfaces/adminrequest.interface';
import { REQUEST } from '@nestjs/core';
import { AdminOnly } from 'src/admin/admin.decorator';
import { ApiBearerAuth, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Roles } from 'src/admin/roles.decorator';
import { Page } from './entities/page.entity';
import { EmptystringPipe } from 'src/validations/emptystring/emptystring.pipe';
import { SwitchPipe } from 'src/validations/switch/switch.pipe';
import { ParseDateTimePipe } from 'src/validations/parsedatetime/parsedatetime.pipe';
import { AdminService } from 'src/admin/admin.service';
import { RegionsService } from 'src/regions/regions.service';
import { Region } from 'src/regions/entities/region.entity';
import { Sitemap } from 'src/seo/entities/seo.entity';
import { SeoService } from 'src/seo/seo.service';

@Controller('admin/pages')
export class PageAdminController {
  constructor(
    private readonly pageService: PageService,
    private readonly seoService: SeoService,
    private readonly regionService: RegionsService,
    private readonly adminService: AdminService,
    @Inject(REQUEST) private readonly request: AdminRequest,
  ) {}

  @AdminOnly()
  @ApiBearerAuth()
  @ApiQuery({
    name: 'is_active',
    type: 'number',
    required: false,
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
  })
  @ApiQuery({
    name: 'search',
    type: 'string',
    required: false,
  })
  @Roles(['PAGE'])
  @Get('all')
  async findAll(
    @Query('is_active', new DefaultValuePipe(2), ParseIntPipe)
    is_active: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
    @Query('search', new DefaultValuePipe('')) search: string,
  ): Promise<{
    pages: Page[];
    total: number;
    total_pages: number;
    page: number;
    per_page: number;
  }> {
    const pagesAndCount = await this.pageService.findAll(is_active, page, limit, search);
    const total = pagesAndCount.count;
    const total_pages = Math.ceil(total / limit);
    return {
      pages: pagesAndCount.pages,
      total: total,
      total_pages: total_pages,
      page: page,
      per_page: limit,
    };
  }

  @ApiBearerAuth()
  @AdminOnly()
  @Roles(['PAGES'])
  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<{
    page: Page | null;
    seo: Sitemap | null;
    regions: Region[];
  }> {
    return {
      page: await this.pageService.findOne(id),
      seo: await this.seoService.findOne(id, 'page'),
      regions: await this.regionService.getRegionList(),
    };
  }
  //add new agm
  //add or update page
  @ApiBearerAuth()
  @AdminOnly()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
        },
        name: {
          type: 'string',
        },
        url: {
          type: 'string',
        },
        published_at: {
          type: 'string',
        },
        is_active: {
          type: 'string',
        },
        page_contents: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: {
                type: 'number',
              },
              component_type: {
                type: 'string',
              },
              content: {
                type: 'object',
              },
              reference_name: {
                type: 'string',
              },
              page_id: {
                type: 'number',
              },
              title: {
                type: 'string',
              },
              link: {
                type: 'string',
              },
              short_description: {
                type: 'string',
              },
              description: {
                type: 'string',
              },
              region: {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
              order: {
                type: 'number',
              },
              is_active: {
                type: 'string',
              },
              add_choice: {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
              download_link: {
                type: 'string',
              },
            },
          },
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
            url: { type: 'string' },
            alt: { type: 'string' },
            width: { type: 'number' },
            height: { type: 'number' },
          },
        },
        indexed: {
          type: 'boolean',
        },
      },
    },
  })
  @Roles(['PAGE'])
  @Post('add-update')
  async createOrUpdatePage(
    @Body('id', ParseIntPipe) id: number,
    @Body('name', EmptystringPipe) name: string,
    @Body('url', EmptystringPipe) url: string,
    // @Body("indexed", SwitchPipe) indexed: boolean,
    // @Body("meta_title", EmptystringPipe) meta_title: string,
    // @Body("meta_description", EmptystringPipe) meta_description: string,
    // @Body("meta_image", ImagefileOrNullPipe)
    // meta_image: { url: string; width: number; height: number } | null,
    // @Body("canonical_override", new DefaultValuePipe(""), SlugPipeOptional)
    // canonical_override: string,
    @Body('published_at', ParseDateTimePipe) published_at: Date,
    @Body('is_active', SwitchPipe) is_active: boolean,
    @Body('page_contents')
    page_contents: {
      id: number;
      component_type: string;
      reference_name: string;
      content: [];
      page_id: number;
      title: string;
      link: string;
      short_description: string;
      description: string;
      region: string[];
      order: number;
      is_active: boolean;
      add_choice: string[];
      download_link: string;
    }[],
    @Body('meta_title') meta_title: string,
    @Body('meta_description') meta_description: string,
    @Body('canonical_url') canonical_url: string,
    @Body('meta_image')
    meta_image: {
      url: string;
      width: number;
      height: number;
    } | null,
    @Body('indexed') indexed: boolean,
  ): Promise<boolean> {
    const updatedRecord = await this.pageService.createOrUpdatePage(
      id,
      name,
      url,
      // indexed,
      // meta_title,
      // meta_description,
      // meta_image,
      // canonical_override,
      published_at,
      is_active,
      page_contents.map((page_content, index) => {
        return {
          id: page_content.id,
          reference_name: page_content.reference_name,
          component_type: page_content.component_type,
          content: page_content.content,
          page_id: page_content.page_id,
          title: page_content.title,
          link: page_content.link,
          short_description: page_content.short_description,
          description: page_content.description,
          region: page_content.region,
          order: index,
          is_active: page_content.is_active,
          add_choice: page_content.add_choice,
          download_link: page_content.download_link,
        };
      }),
      meta_title,
      meta_description,
      canonical_url,
      meta_image,
      indexed,
    );
    await this.adminService.addAdminActivity(
      this.request.admin,
      `Page ${name} added/updated`,
      'pages',
      `${updatedRecord.id}`,
      {
        id,
        name,
        url,
        // indexed,
        // meta_title,
        // meta_description,
        // meta_image,
        // canonical_override,
        published_at,
        is_active,
        page_contents,
        meta_title,
        meta_description,
        canonical_url,
        meta_image,
        indexed,
      },
    );
    return true;
  }
}
