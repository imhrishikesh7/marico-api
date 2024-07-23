import { Controller, Get, Param, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { PageService } from './page.service';
// import { AdminRequest } from 'src/interfaces/adminrequest.interface';
// import { REQUEST } from '@nestjs/core';
import { AdminOnly } from 'src/admin/admin.decorator';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { Roles } from 'src/admin/roles.decorator';
import { Page } from './entities/page.entity';

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
    
}
