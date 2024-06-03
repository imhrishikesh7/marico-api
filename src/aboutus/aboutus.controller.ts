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

@Controller('about_us')
export class AboutusController {
  constructor(
    private readonly aboutusService: AboutusService,
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
  @Get('member_list')
  async getMemberList(
    @Query('search', new DefaultValuePipe('')) search: string,
  ): Promise<AboutusMember[]> {
    return await this.aboutusService.getMemberList(search || undefined);
  }

  @Get('member_list/:id')
  async getMemberById(@Param('id', ParseIntPipe) id: number): Promise<{
    member: AboutusMember | null;
  }> {
    const toReturn = {
      member: await this.aboutusService.getMemberById(id),
    } as {
      member: AboutusMember | null;
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
        is_active: {
          type: 'boolean',
        },
      },
    },
  })
  @Roles(['ABOUT_US'])
  @Post('member_list/add')
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
    @Body('is_active', SwitchPipe) is_active: boolean,
  ): Promise<{ member: AboutusMember }> {
    const member = await this.aboutusService.addUpdateMember(
      id,
      name,
      position,
      type,
      description,
      thumbnail,
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
}
