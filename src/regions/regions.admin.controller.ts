import {
    Body,
    Controller,
    DefaultValuePipe,
    Get,
    Inject,
    Param,
    ParseIntPipe,
    Post,
    Query,
  } from '@nestjs/common';
  import { RegionsService } from './regions.service';
  import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
  import { Roles } from 'src/admin/roles.decorator';
  // import { AdminService } from 'src/admin/admin.service';
  import { AdminRequest } from 'src/interfaces/adminrequest.interface';
  import { REQUEST } from '@nestjs/core';
  import { AdminOnly } from 'src/admin/admin.decorator';
  import { Region } from './entities/region.entity';
  import { EmptystringPipe } from 'src/validations/emptystring/emptystring.pipe';
  import { ImagefileOrNullPipe } from 'src/validations/imagefile/imagefile.pipe';
  
  @Controller('admin/region')
  export class RegionAdminController {
    constructor(
      private readonly regionService: RegionsService,
      // private readonly adminService: AdminService,
      @Inject(REQUEST) private readonly request: AdminRequest,
    ) {}
  
    // get region list
    @AdminOnly()
    @ApiBearerAuth()
    @ApiQuery({
      name: 'search',
      type: 'string',
      required: false,
    })
    @Roles(['REGION'])
    @Get('')
    async getRegionList(
      @Query('search', new DefaultValuePipe('')) search: string,
    ): Promise<Region[]> {
      return await this.regionService.getRegionList(search);
    }
  
    //get region by id
    @AdminOnly()
    @ApiBearerAuth()
    @ApiParam({
      name: 'id',
      type: 'number',
      required: true,
    })
    @Roles(['REGION'])
    @Get(':id')
    async getRegionById(@Param('id', ParseIntPipe) id: number): Promise<{
      region: Region | null;
    }> {
      // return product and categories and types
      const toReturn = {
        region: await this.regionService.getRegionById(id),
      } as {
        region: Region | null;
      };
      return toReturn;
    }
  
    // add-update region
    @AdminOnly()
    @ApiBearerAuth()
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          alias: {
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
            },
          },
          is_active: {
            type: 'boolean',
          },
        },
      },
    })
    @Roles(['REGION'])
    @Post('add-update')
    async addUpdateRegion(
      @Body('id', new DefaultValuePipe(0), ParseIntPipe) id: number,
      @Body('name', EmptystringPipe) name: string,
      @Body('alias', EmptystringPipe) alias: string,
      @Body('thumbnail', ImagefileOrNullPipe)
      thumbnail: {
        url: string;
        alt: string;
        width: number;
        height: number;
      } | null,
      @Body('is_active', new DefaultValuePipe('')) is_active: boolean,
    ): Promise<Region> {
      // try catch block
      try {
        return await this.regionService.addUpdateRegion(
          id,
          name,
          alias,
          thumbnail,
          is_active,
        );
      } catch (e) {
        console.log(e);
        throw e;
      }
    }
  
  }
  