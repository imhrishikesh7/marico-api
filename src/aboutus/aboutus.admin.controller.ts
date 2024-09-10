import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { AboutusService } from './aboutus.service';
import { REQUEST } from '@nestjs/core';
import { AdminService } from 'src/admin/admin.service';
import { AdminRequest } from 'src/interfaces/adminrequest.interface';
import { AdminOnly } from 'src/admin/admin.decorator';
import { ApiBearerAuth, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Roles } from 'src/admin/roles.decorator';
import { AboutusMember } from './entities/aboutus_member.entity';
import { EmptystringPipe } from 'src/validations/emptystring/emptystring.pipe';
import { SwitchPipe } from 'src/validations/switch/switch.pipe';
import { ImagefileOrNullPipe } from 'src/validations/imagefile/imagefile.pipe';
import { Region } from 'src/regions/entities/region.entity';
import { Recognition } from './entities/aboutus_recognition.entity';
import { RegionsService } from 'src/regions/regions.service';
import { History } from './entities/aboutus_history.entity';

@Controller('admin/about_us')
export class AboutusAdminController {
  constructor(
    private readonly aboutusService: AboutusService,
    private readonly regionService: RegionsService,
    private readonly adminService: AdminService,
    @Inject(REQUEST) private readonly request: AdminRequest,
  ) {}

  @AdminOnly()
  @ApiBearerAuth()
  @ApiQuery({
    name: 'search',
    type: 'string',
    required: false,
  })
  @Roles(['ABOUT_US'])
  @Get('member_lists')
  async getMemberList(
    @Query('search', new DefaultValuePipe('')) search: string,
  ): Promise<AboutusMember[]> {
    return await this.aboutusService.getMemberList(search || undefined);
  }

  @Get('member_lists/:id')
  async getMemberById(@Param('id', ParseIntPipe) id: number): Promise<{
    member: AboutusMember | null;
    regions: Region[] | null;
    members: AboutusMember[] | null;
  }> {
    const toReturn = {
      member: await this.aboutusService.getMemberById(id),
      regions: await this.regionService.getRegionList(),
      members: await this.aboutusService.getMemberList(),
    } as {
      member: AboutusMember | null;
      regions: Region[] | null;
      members: AboutusMember[] | null;
    };
    return toReturn;
  }
  //add new member
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
        position: {
          type: 'string',
        },
        type: {
          type: 'array',
          items: {
            type: 'string',
            example: 'UK',
          },
        },
        description: {
          type: 'string',
        },
        thumbnail: {
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
        regions: {
          type: 'array',
          items: {
            type: 'string',
            example: 'UK',
          },
        },
        is_active: {
          type: 'boolean',
        },
      },
    },
  })
  @Roles(['ABOUT_US'])
  @Post('member_lists/add-update')
  async addUpdateMember(
    @Body('id', ParseIntPipe) id: number,
    @Body('name', EmptystringPipe) name: string,
    @Body('position', EmptystringPipe) position: string,
    @Body('type') type: string[],
    @Body('description', EmptystringPipe) description: string,
    @Body('thumbnail', ImagefileOrNullPipe)
    thumbnail: {
      url: string;
      alt: string;
      width: number;
      height: number;
    } | null,
    @Body('regions') regions: string[],
    @Body('is_active', SwitchPipe) is_active: boolean,
  ): Promise<{ member: AboutusMember }> {
    const member = await this.aboutusService.addUpdateMember(
      id,
      name,
      position,
      type,
      description,
      thumbnail,
      regions,
      is_active,
    );

    await this.adminService.addAdminActivity(
      this.request.admin,
      `Created member ${member.name}`,
      'created_member',
      `${member.id}`,
      {
        name,
        is_active,
      },
    );

    return {
      member,
    };
  }

  @AdminOnly()
  @ApiBearerAuth()
  @ApiQuery({
    name: 'search',
    type: 'string',
    required: false,
  })
  @Roles(['ABOUT_US'])
  @Get('recognition')
  async getAwardList(
    @Query('search', new DefaultValuePipe('')) search: string,
  ): Promise<Recognition[]> {
    return await this.aboutusService.getAwardList(search || undefined);
  }

  @Get('recognition/:id')
  async getAwardById(@Param('id', ParseIntPipe) id: number): Promise<{
    recognition: Recognition | null;
    regions: Region[] | null;
  }> {
    const toReturn = {
      recognition: await this.aboutusService.getAwardById(id),
      regions: await this.regionService.getRegionList(),
    } as {
      recognition: Recognition | null;
      regions: Region[] | null;
    };
    return toReturn;
  }
  //add new recognition
  @AdminOnly()
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
        },
        url_title: {
          type: 'string',
        },
        thumbnail: {
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
        award_title: {
          type: 'string',
        },
        year: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        category: {
          type: 'string',
        },
        is_featured: {
          type: 'boolean',
        },
        regions: {
          type: 'array',
          items: {
            type: 'string',
            example: 'UK',
          },
        },
      },
    },
  })
  @Roles(['ABOUT_US'])
  @Post('recognition/add-update')
  async addUpdateAward(
    @Body('id', ParseIntPipe) id: number,
    @Body('url_title', EmptystringPipe) url_title: string,
    @Body('thumbnail', ImagefileOrNullPipe)
    thumbnail: {
      url: string;
      alt: string;
      width: number;
      height: number;
    } | null,
    @Body('award_title', EmptystringPipe) award_title: string,
    @Body('year', EmptystringPipe) year: string,
    @Body('description', EmptystringPipe) description: string,
    @Body('category', EmptystringPipe) category: string,
    @Body('is_featured', SwitchPipe) is_featured: boolean,
    @Body('regions') regions: string[],
  ): Promise<{ recognition: Recognition }> {
    const recognition = await this.aboutusService.addUpdateAward(
      id,
      url_title,
      thumbnail,
      award_title,
      year,
      description,
      category,
      is_featured,
      regions,
    );

    await this.adminService.addAdminActivity(
      this.request.admin,
      `Created award ${recognition.award_title}`,
      'created_award',
      `${recognition.id}`,
      {
        id,
        url_title,
        thumbnail,
        award_title,
        year,
        description,
        category,
        is_featured,
        regions,
      },
    );
    return {
      recognition,
    };
  }

  @AdminOnly()
  @ApiBearerAuth()
  @ApiQuery({
    name: 'search',
    type: 'string',
    required: false,
  })
  @Roles(['ABOUT_US'])
  @Get('history')
  async getHistory(
    @Query('search', new DefaultValuePipe('')) search: string,
  ): Promise<History[]> {
    return await this.aboutusService.getHistory(search || undefined);
  }

  @Get('history/:id')
  async getHistoryById(@Param('id', ParseIntPipe) id: number): Promise<{
    history: History | null;
    regions: Region[] | null;
  }> {
    const toReturn = {
      history: await this.aboutusService.getHistoryById(id),
      regions: await this.regionService.getRegionList(),
    } as {
      history: History | null;
      regions: Region[] | null;
    };
    return toReturn;
  }

  //add new history
  @AdminOnly()
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
        },
        title: {
          type: 'string',
        },
        url_title: {
          type: 'string',
        },
        thumbnail: {
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
        history_title: {
          type: 'string',
        },
        year: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        regions: {
          type: 'array',
          items: {
            type: 'string',
            example: 'UK',
          },
        },
        sort_order: {
          type: 'number',
        },
      },
    },
  })
  @Roles(['ABOUT_US'])
  @Post('history/add-update')
  async addUpdateHistory(
    @Body('id', ParseIntPipe) id: number,
    @Body('title', EmptystringPipe) title: string,
    @Body('url_title', EmptystringPipe) url_title: string,
    @Body('thumbnail', ImagefileOrNullPipe)
    thumbnail: {
      url: string;
      alt: string;
      width: number;
      height: number;
    } | null,
    @Body('history_title', EmptystringPipe) history_title: string,
    @Body('year', EmptystringPipe) year: string,
    @Body('description', EmptystringPipe) description: string,
    @Body('regions') regions: string[],
    @Body('sort_order', ParseIntPipe) sort_order: number,
  ): Promise<{ history: History }> {
    const history = await this.aboutusService.addUpdateHistory(
      id,
      title,
      url_title,
      thumbnail,
      history_title,
      year,
      description,
      regions,
      sort_order,
    );
    return {
      history,
    };
  }
}
