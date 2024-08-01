import { Controller, Get, Param, Query, DefaultValuePipe, ParseIntPipe, Post, Body } from '@nestjs/common';
import { PageService } from './page.service';
// import { AdminRequest } from 'src/interfaces/adminrequest.interface';
// import { REQUEST } from '@nestjs/core';
import { AdminOnly } from 'src/admin/admin.decorator';
import { ApiBearerAuth, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Roles } from 'src/admin/roles.decorator';
import { Page } from './entities/page.entity';
import { EmptystringPipe } from 'src/validations/emptystring/emptystring.pipe';
import { ImagefileOrNullPipe } from 'src/validations/imagefile/imagefile.pipe';
import { SwitchPipe } from 'src/validations/switch/switch.pipe';
import { PageContent } from './entities/page_content.entity';

@Controller('admin/pages')
export class PageAdminController {
  constructor(
    private readonly pageService: PageService,
    // private readonly adminService: AdminService,
    // @Inject(REQUEST) private readonly request: AdminRequest,
  ) {}

  @AdminOnly()
    @ApiBearerAuth()
    @ApiQuery({
      name: 'search',
      type: 'string',
      required: false,
    })
    @Roles(['PAGE'])
    @Get('page')
    async getPageList(
      @Query('search', new DefaultValuePipe('')) search: string,
    ): Promise<Page[]> {
      return await this.pageService.getPageList(search);
    }

    @Get('page/:id')
    async getPageById(@Param('id', ParseIntPipe) id: number): Promise<{
      page: Page | null;
    }> {
      const toReturn = {
        page: await this.pageService.getPageById(id),
      } as {
        page: Page | null;
      };
      return toReturn;
    }
    
     //add new agm
  @AdminOnly()
  @ApiBearerAuth()
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
        page_title: {
          type: 'string',
        },
        page_description: {
          type: 'string',
        },
        canonical_url: {
          type: 'string',
        },
        shareimage_json: {
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
            alt: {
              type: 'string',
            },
          },
        },
        indexable: {
          type: 'boolean',
        },
      },
    }, 
  })
  @Roles(['PAGE'])
  @Post('page/add-update')
  async addUpdatePage(
    @Body('id', ParseIntPipe) id: number,
    @Body('name', EmptystringPipe) name: string,
    @Body('url', EmptystringPipe) url: string,
    @Body('page_title', EmptystringPipe)
    page_title: string,
    @Body('page_description', EmptystringPipe)
    page_description: string,
    @Body('canonical_url', EmptystringPipe)
    canonical_url: string,
    @Body('shareimage_json', ImagefileOrNullPipe)
    shareimage_json: {
      url: string;
      alt: string;
      width: number;
      height: number;
    } | null,
    @Body('indexable', SwitchPipe) indexable: boolean,
  ): Promise<{ page: Page }> {
    const page = await this.pageService.addUpdatePage(
      id,
      name,
      url,
      page_title,
      page_description,
      canonical_url,
      shareimage_json,
      indexable,
    );
    return {
      page,
    };
  }

  @AdminOnly()
  @ApiBearerAuth()
  @ApiQuery({
    name: 'search',
    type: 'string',
    required: false,
  })
  @Roles(['PAGE'])
  @Get('content')
  async getPageContent(
    @Query('search', new DefaultValuePipe('')) search: string,
  ): Promise<PageContent[]> {
    return await this.pageService.getPageContent(search);
  }

  @Get('content/:page_ref_id')
  async getContentByPageId(@Param('page_ref_id', ParseIntPipe) page_ref_id : number): Promise<{
    content: PageContent | null;
  }> {
    const toReturn = {
      content: await this.pageService.getContentByPageId(page_ref_id),
    } as {
      content: PageContent | null;
    };
    return toReturn;
  }
 
}