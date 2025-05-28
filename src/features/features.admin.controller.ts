import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { FeaturesService } from './features.service';
import { ApiBearerAuth, ApiBody, ApiQuery } from '@nestjs/swagger';
import { AdminOnly } from 'src/admin/admin.decorator';
import { Roles } from 'src/admin/roles.decorator';
import { TitleCategory } from './entities/feature.entity';
import { SwitchPipe } from 'src/validations/switch/switch.pipe';
import { EmptystringPipe } from 'src/validations/emptystring/emptystring.pipe';

@Controller('admin/features')
export class FeaturesAdminController {
  constructor(private readonly featuresService: FeaturesService) {}

  @AdminOnly()
  @ApiBearerAuth()
  @ApiQuery({
    name: 'search',
    type: 'string',
    required: false,
  })
  @Roles(['FEATURES'])
  @Get('category_title')
  async getTitleCategory(
    @Query('search', new DefaultValuePipe('')) search: string,
  ): Promise<TitleCategory[]> {
    return await this.featuresService.getTitleCategory(search || undefined);
  }

  @Get('category_title/:id')
  async getTitleCategoryById(@Param('id', ParseIntPipe) id: number): Promise<{
    head: TitleCategory | null;
  }> {
    const toReturn = {
      head: await this.featuresService.getTitleCategoryById(id),
    } as {
      head: TitleCategory | null;
    };
    return toReturn;
  }

  @AdminOnly()
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
        },
        menu: {
          type: 'string',
        },
        sub_menu: {
          type: 'string',
        },
        category_title: {
          type: 'string',
        },
        is_active: {
          type: 'boolean',
        },
        sort_order: {
          type: 'number',
        },
        qr_title: {
          type: 'string',
          nullable: true,
        },
        qr_code: {
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
          nullable: true,
        },
        qr_link: {
          type: 'string',
          nullable: true,
        },
      },
    },
  })
  @Roles(['FEATURES'])
  @Post('category_title/add-update')
  async addUpdateTitleCategory(
    @Body('id', ParseIntPipe) id: number,
    @Body('menu', EmptystringPipe) menu: string,
    @Body('sub_menu', EmptystringPipe) sub_menu: string,
    @Body('category_title', EmptystringPipe) category_title: string,
    @Body('is_active', SwitchPipe) is_active: boolean,
    @Body('sort_order') sort_order: number,
    @Body('qr_title') qr_title?: string,
    @Body('qr_code')
    qr_code?: {
      url: string;
      alt: string;
      width: number;
      height: number;
    } | null,
    @Body('qr_link') qr_link?: string,
  ): Promise<{ head: TitleCategory }> {
    const head = await this.featuresService.addUpdateTitleCategory(
      id,
      menu,
      sub_menu,
      category_title,
      is_active,
      sort_order,
      qr_title,
      qr_code,
      qr_link,
    );
    return {
      head,
    };
  }
}
