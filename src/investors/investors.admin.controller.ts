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
import { InvestorDividends } from './entities/investor_dividend.entity';
import { InvestorQUMaster } from './entities/investor_qu_master.entity';
import { QuartelyUpdate } from './entities/investor_qu_update.entity';

@Controller('admin/investors')
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
    @Body('investors_shi_category', EmptystringPipe)
    investors_shi_category: string,
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
    @Body('agm_documentation_title', EmptystringPipe)
    agm_documentation_title: string,
    @Body('agm_documentation_pdf', ImagefileOrNullPipe)
    agm_documentation_pdf: {
      url: string;
      alt: string;
      width: number;
      height: number;
    } | null,
    @Body('agm_regions') agm_regions: string[],
    @Body('investors_agm_category', EmptystringPipe)
    investors_agm_category: string,
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

  @AdminOnly()
  @ApiBearerAuth()
  @ApiQuery({
    name: 'search',
    type: 'string',
    required: false,
  })
  @Roles(['INVESTOR'])
  @Get('dividends')
  async getDividends(
    @Query('search', new DefaultValuePipe('')) search: string,
  ): Promise<InvestorDividends[]> {
    return await this.investorsService.getDividends(search || undefined);
  }

  @Get('dividends/:id')
  async getDividendsById(@Param('id', ParseIntPipe) id: number): Promise<{
    dividends: InvestorDividends | null;
  }> {
    const toReturn = {
      dividends: await this.investorsService.getDividendsById(id),
    } as {
      dividends: InvestorDividends | null;
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
        title: {
          type: 'string',
        },
        url_title: {
          type: 'string',
        },
        dividend_history: {
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
        history_writeup: {
          type: 'string',
        },
        unclaimed_interim_dividends: {
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
        unclaimed_interim_dividends_writeup: {
          type: 'string',
        },
        unclaimed_interim_dividends_year: {
          type: 'string',
        },
        unclaimed_dividends: {
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
        unclaimed_dividends_writeup: {
          type: 'string',
        },
        unclaimed_dividends_year: {
          type: 'string',
        },
        transfer_shares_to_IEPF: {
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
        transfer_shares_to_IEPF_writeup: {
          type: 'string',
        },
        transfer_shares_to_IEPF_year: {
          type: 'string',
        },
        forms_pdf: {
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
      },
    },
  })
  @Roles(['INVESTOR'])
  @Post('dividends/add-update')
  async addUpdateDividends(
    @Body('id', ParseIntPipe) id: number,
    @Body('title', EmptystringPipe) title: string,
    @Body('url_title', EmptystringPipe) url_title: string,
    @Body('dividend_history', ImagefileOrNullPipe)
    dividend_history: {
      url: string;
      alt: string;
      width: number;
      height: number;
    } | null,
    @Body('history_writeup', EmptystringPipe)
    history_writeup: string,
    @Body('unclaimed_interim_dividends', ImagefileOrNullPipe)
    unclaimed_interim_dividends: {
      url: string;
      alt: string;
      width: number;
      height: number;
    } | null,
    @Body('unclaimed_interim_dividends_writeup', EmptystringPipe)
    unclaimed_interim_dividends_writeup: string,
    @Body('unclaimed_interim_dividends_year', EmptystringPipe)
    unclaimed_interim_dividends_year: string,
    @Body('unclaimed_dividends', ImagefileOrNullPipe)
    unclaimed_dividends: {
      url: string;
      alt: string;
      width: number;
      height: number;
    } | null,
    @Body('unclaimed_dividends_writeup', EmptystringPipe)
    unclaimed_dividends_writeup: string,
    @Body('unclaimed_dividends_year', EmptystringPipe)
    unclaimed_dividends_year: string,
    @Body('transfer_shares_to_IEPF', ImagefileOrNullPipe)
    transfer_shares_to_IEPF: {
      url: string;
      alt: string;
      width: number;
      height: number;
    } | null,
    @Body('transfer_shares_to_IEPF_writeup', EmptystringPipe)
    transfer_shares_to_IEPF_writeup: string,
    @Body('transfer_shares_to_IEPF_year', EmptystringPipe)
    transfer_shares_to_IEPF_year: string,
    @Body('forms_pdf', ImagefileOrNullPipe)
    forms_pdf: {
      url: string;
      alt: string;
      width: number;
      height: number;
    } | null,
  ): Promise<{ dividend: InvestorDividends }> {
    const dividend = await this.investorsService.addUpdateDividends(
      id,
      title,
      url_title,
      dividend_history,
      history_writeup,
      unclaimed_interim_dividends,
      unclaimed_interim_dividends_writeup,
      unclaimed_interim_dividends_year,
      unclaimed_dividends,
      unclaimed_dividends_writeup,
      unclaimed_dividends_year,
      transfer_shares_to_IEPF,
      transfer_shares_to_IEPF_writeup,
      transfer_shares_to_IEPF_year,
      forms_pdf,
    );
    return {
      dividend,
    };
  }

  @Roles(['INVESTOR'])
  @Get('quartely_update')
  async getQU(
    @Query('search', new DefaultValuePipe('')) search: string,
  ): Promise<InvestorQUMaster[]> {
    return await this.investorsService.getQU(search || undefined);
  }

  @Get('quartely_update/:id')
  async getQUById(@Param('id', ParseIntPipe) id: number): Promise<{
    qu: InvestorQUMaster | null;
  }> {
    const toReturn = {
      qu: await this.investorsService.getQUById(id),
    } as {
      qu: InvestorQUMaster | null;
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
        title: {
          type: 'string',
        },
        url_title: {
          type: 'string',
        },
        investor_qu_year: {
          type: 'string',
        },
        qu_year_sort: {
          type: 'number',
        },
      },
    },
  })
  @Roles(['INVESTOR'])
  @Post('quartely_update/add-update')
  async addUpdateQU(
    @Body('id', ParseIntPipe) id: number,
    @Body('title', EmptystringPipe) title: string,
    @Body('url_title', EmptystringPipe) url_title: string,
    @Body('investor_qu_year', EmptystringPipe)
    investor_qu_year: string,
    @Body('qu_year_sort', ParseIntPipe) qu_year_sort: number,
  ): Promise<{ qu: InvestorQUMaster }> {
    const qu = await this.investorsService.addUpdateQU(
      id,
      title,
      url_title,
      investor_qu_year,
      qu_year_sort,
    );
    return {
      qu,
    };
  }

  @Get('quartely_update/pdfs/:investor_qu_id')
  async getQUPDFById(
    @Param('investor_qu_id', ParseIntPipe) investor_qu_id: number,
  ): Promise<{
    qu_pdf: QuartelyUpdate[];
    qu: InvestorQUMaster | null;
  }> {
    const toReturn = {
      qu_pdf: await this.investorsService.getQUPDFById(investor_qu_id),
      qu: await this.investorsService.getQUById(investor_qu_id),
    } as {
      qu_pdf: QuartelyUpdate[];
      qu: InvestorQUMaster | null;
    };
    return toReturn;
  }

  // add-update product images
  @AdminOnly()
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        product_id: {
          type: 'number',
        },
        images: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              url: {
                type: 'string',
              },
              alt: {
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
        },
      },
    },
  })
  @Roles(['INVESTOR'])
  @Post('quartely_update/pdfs/add-update')
  async addUpdateQUPDFs(
    @Body('investor_qu_id', ParseIntPipe) investor_qu_id: number,
    @Body('contentText')
    contentText: {
    investor_qu: string,
    investor_qu_pdf: string,
    qu_pdf: {
      url: string;
      width: number;
      height: number;
      alt: string;
    },
  sort_order: number,
  }[]
  ): Promise<QuartelyUpdate[]> {
    return await this.investorsService.addUpdateQUPDFs(
      investor_qu_id,
      contentText,
    );
  }
}
