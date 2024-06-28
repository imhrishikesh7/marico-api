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
import { InvestorsService } from './investors.service';
import { RegionsService } from 'src/regions/regions.service';
import { AdminService } from 'src/admin/admin.service';
import { AdminRequest } from 'src/interfaces/adminrequest.interface';
import { REQUEST } from '@nestjs/core';
import { AdminOnly } from 'src/admin/admin.decorator';
import { ApiBearerAuth, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Roles } from 'src/admin/roles.decorator';
import { Region } from 'src/regions/entities/region.entity';
import { InvestorShareHolder } from './entities/investor_shareholder.entity';
import { InvestorAGM } from './entities/investor_agm.entity';
import { EmptystringPipe } from 'src/validations/emptystring/emptystring.pipe';
import { ImagefileOrNullPipe } from 'src/validations/imagefile/imagefile.pipe';

@Controller('investors')
export class InvestorsAdminController {
  constructor(
    private readonly investorsService: InvestorsService,
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
  @Roles(['INVESTOR'])
  @Get('shi')
  async getSHI(
    @Query('search', new DefaultValuePipe('')) search: string,
  ): Promise<InvestorShareHolder[]> {
    return await this.investorsService.getSHI(search || undefined);
  }

  @Get('shi/:id')
  async getSHIById(@Param('id', ParseIntPipe) id: number): Promise<{
    shi: InvestorShareHolder | null;
    regions: Region[] | null;
  }> {
    const toReturn = {
      shi: await this.investorsService.getSHIById(id),
      regions: await this.regionService.getRegionList(),
    } as {
      shi: InvestorShareHolder | null;
      regions: Region[] | null;
    };
    return toReturn;
  }

  //add new shi
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
        investors_shi_title: {
          type: 'string',
        },
        investors_shi_pdf: {
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
        investors_shi_year: {
          type: 'string',
        },
        investors_shi_category: {
          type: 'string',
        },
        sort_order: {
          type: 'number',
        },
      },
    },
  })
  @Roles(['INVESTOR'])
  @Post('shi/add-update')
  async addUpdateSHI(
    @Body('id', ParseIntPipe) id: number,
    @Body('title', EmptystringPipe) title: string,
    @Body('url_title', EmptystringPipe) url_title: string,
    @Body('investors_shi_title', EmptystringPipe) investors_shi_title: string,
    @Body('investors_shi_pdf', ImagefileOrNullPipe)
    investors_shi_pdf: {
      url: string;
      alt: string;
      width: number;
      height: number;
    } | null,
    @Body('regions') regions: string[],
    @Body('investors_shi_year', EmptystringPipe) investors_shi_year: string,
    @Body('investors_shi_category', EmptystringPipe) investors_shi_category: string,
    @Body('sort_order', ParseIntPipe) sort_order: number,
  ): Promise<{ shi: InvestorShareHolder }> {
    const shi = await this.investorsService.addUpdateSHI(
      id,
      title,
      url_title,
      investors_shi_title,
      investors_shi_pdf,
      regions,
      investors_shi_year,
      investors_shi_category,
      sort_order,
    );
    return {
      shi,
    };
  }

  @AdminOnly()
  @ApiBearerAuth()
  @ApiQuery({
    name: 'search',
    type: 'string',
    required: false,
  })
  @Roles(['INVESTOR'])
  @Get('agm')
  async getAGM(
    @Query('search', new DefaultValuePipe('')) search: string,
  ): Promise<InvestorAGM[]> {
    return await this.investorsService.getAGM(search || undefined);
  }

  @Get('agm/:id')
  async getAGMById(@Param('id', ParseIntPipe) id: number): Promise<{
    shi: InvestorAGM | null;
    regions: Region[] | null;
  }> {
    const toReturn = {
      shi: await this.investorsService.getAGMById(id),
      regions: await this.regionService.getRegionList(),
    } as {
      shi: InvestorAGM | null;
      regions: Region[] | null;
    };
    return toReturn;
  }

   //add new shi
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
         agm_documentation_title: {
           type: 'string',
         },
         agm_documentation_pdf: {
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
         agm_regions: {
           type: 'array',
           items: {
             type: 'string',
             example: 'UK',
           },
         },
         investors_agm_category: {
           type: 'string',
         },
         sort_order: {
           type: 'number',
         },
       },
     },
   })
   @Roles(['INVESTOR'])
   @Post('agm/add-update')
   async addUpdateAGM(
     @Body('id', ParseIntPipe) id: number,
     @Body('title', EmptystringPipe) title: string,
     @Body('url_title', EmptystringPipe) url_title: string,
     @Body('agm_documentation_title', EmptystringPipe) agm_documentation_title: string,
     @Body('agm_documentation_pdf', ImagefileOrNullPipe)
     agm_documentation_pdf: {
       url: string;
       alt: string;
       width: number;
       height: number;
     } | null,
     @Body('agm_regions') agm_regions: string[],
     @Body('investors_agm_category', EmptystringPipe) investors_agm_category: string,
     @Body('sort_order', ParseIntPipe) sort_order: number,
   ): Promise<{ agm: InvestorAGM }> {
     const agm = await this.investorsService.addUpdateAGM(
       id,
       title,
       url_title,
       agm_documentation_title,
       agm_documentation_pdf,
       agm_regions,
       investors_agm_category,
       sort_order,
     );
     return {
       agm,
     };
   }
 
}

