import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  ParseBoolPipe,
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
import { Sustainability } from './entities/investor_sustainability.entity';
import { InvestorSchedule } from './entities/investor_schedule.entity';
import { CorporateGovernance } from './entities/investor_cogevernance.entity';
import { InformationUpdate } from './entities/investor_iu.entity';
import { InvestorPlacement } from './entities/investor_placement.entity';
import { InvestorContact } from './entities/investor_contact.entity';
import { InvestorPSI } from './entities/investor_psi.entity';
import { InvestorAR } from './entities/investor_ar.entity';
import { FeaturesService } from 'src/features/features.service';
import { TitleCategory } from 'src/features/entities/feature.entity';
import { InvestorDR } from './entities/investor_dr.entity';
import { InvestorMI } from './entities/investor_mi.entity';
import { InvestorFAQ } from './entities/investor_faq.entity';

@Controller('admin/investors')
export class InvestorsAdminController {
  constructor(
    private readonly investorsService: InvestorsService,
    private readonly featuresService: FeaturesService,
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
    categoryMenu: TitleCategory[] | null;
  }> {
    const toReturn = {
      shi: await this.investorsService.getSHIById(id),
      regions: await this.regionService.getRegionList(),
      categoryMenu: await this.featuresService.getTitleCategoryDropdownBySubmenu('shi'),
    } as {
      shi: InvestorShareHolder | null;
      regions: Region[] | null;
      categoryMenu: TitleCategory[] | null;
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
          type: 'string',
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
        is_actve: {
          type: 'boolean',
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
    @Body('investors_shi_pdf', EmptystringPipe) investors_shi_pdf: string,
    @Body('regions') regions: string[],
    @Body('investors_shi_year') investors_shi_year: string,
    @Body('investors_shi_category', EmptystringPipe)
    investors_shi_category: string,
    @Body('sort_order', ParseIntPipe) sort_order: number,
    @Body('is_active', ParseBoolPipe)
    is_active: boolean,
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
      is_active,
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
  async getAGM(@Query('search', new DefaultValuePipe('')) search: string): Promise<InvestorAGM[]> {
    return await this.investorsService.getAGM(search || undefined);
  }

  @Get('agm/:id')
  async getAGMById(@Param('id', ParseIntPipe) id: number): Promise<{
    agm: InvestorAGM | null;
    regions: Region[] | null;
    categoryMenu: TitleCategory[] | null;
  }> {
    const toReturn = {
      agm: await this.investorsService.getAGMById(id),
      regions: await this.regionService.getRegionList(),
      categoryMenu: await this.featuresService.getTitleCategoryDropdownBySubmenu('agm'),
    } as {
      agm: InvestorAGM | null;
      regions: Region[] | null;
      categoryMenu: TitleCategory[] | null;
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
          type: 'string',
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
        is_actve: {
          type: 'boolean',
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
    @Body('agm_documentation_pdf', EmptystringPipe)
    agm_documentation_pdf: string,
    @Body('agm_regions') agm_regions: string[],
    @Body('investors_agm_category', EmptystringPipe)
    investors_agm_category: string,
    @Body('sort_order', ParseIntPipe) sort_order: number,
    @Body('is_active', ParseBoolPipe) is_active: boolean,
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
      is_active,
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
    dividend: InvestorDividends | null;
    dividends: InvestorDividends[] | null;
    regions: Region[] | null;
  }> {
    const toReturn = {
      dividend: await this.investorsService.getDividendsById(id),
      dividends: await this.investorsService.getDividends(),
      regions: await this.regionService.getRegionList(),
    } as {
      dividend: InvestorDividends | null;
      dividends: InvestorDividends[] | null;
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
        investors_dividend_category: {
          type: 'string',
        },
        investors_dividend_subcategory: {
          type: 'string',
        },
        pdf_title: {
          type: 'string',
        },
        url_title: {
          type: 'string',
        },
        pdf: {
          type: 'string',
        },
        writeup: {
          type: 'string',
        },
        dividends_year: {
          type: 'string',
        },
        dividend_regions: {
          type: 'array',
          items: {
            type: 'string',
            example: 'UK',
          },
        },
        sort_order: {
          type: 'number',
        },
        is_active: {
          type: 'boolean',
        },
      },
    },
  })
  @Roles(['INVESTOR'])
  @Post('dividends/add-update')
  async addUpdateDividends(
    @Body('id', ParseIntPipe) id: number,
    @Body('investors_dividend_category', EmptystringPipe)
    investors_dividend_category: string,
    @Body('investors_dividend_subcategory')
    investors_dividend_subcategory: string,
    @Body('pdf_title', EmptystringPipe) pdf_title: string,
    @Body('url_title', EmptystringPipe) url_title: string,
    @Body('pdf', EmptystringPipe) pdf: string,
    @Body('writeup') writeup: string,
    @Body('dividends_year') dividends_year: string,
    @Body('dividend_regions') dividend_regions: string[],
    @Body('sort_order', ParseIntPipe) sort_order: number,
    @Body('is_active', ParseBoolPipe) is_active: boolean,
  ): Promise<{ dividend: InvestorDividends }> {
    const dividend = await this.investorsService.addUpdateDividends(
      id,
      investors_dividend_category,
      investors_dividend_subcategory,
      pdf_title,
      url_title,
      pdf,
      writeup,
      dividends_year,
      dividend_regions,
      sort_order,
      is_active,
    );
    return {
      dividend,
    };
  }

  @Roles(['INVESTOR'])
  @Get('qu')
  async getQU(
    @Query('search', new DefaultValuePipe('')) search: string,
  ): Promise<InvestorQUMaster[]> {
    return await this.investorsService.getQU(search || undefined);
  }

  @Get('qu/:id')
  async getQUById(@Param('id', ParseIntPipe) id: number): Promise<{
    qu: InvestorQUMaster | null;
    regions: Region[] | null;
  }> {
    const toReturn = {
      qu: await this.investorsService.getQUById(id),
      regions: await this.regionService.getRegionList(),
    } as {
      qu: InvestorQUMaster | null;
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
  @Post('qu/add-update')
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

  @Get('qu/pdfs/:investor_qu_id')
  async getQUPDFById(@Param('investor_qu_id', ParseIntPipe) investor_qu_id: number): Promise<{
    qu_pdf: QuartelyUpdate[];
    qu: InvestorQUMaster | null;
    regions: Region[] | null;
  }> {
    const toReturn = {
      qu_pdf: await this.investorsService.getQUPDFById(investor_qu_id),
      qu: await this.investorsService.getQUById(investor_qu_id),
      regions: await this.regionService.getRegionList(),
    } as {
      qu_pdf: QuartelyUpdate[];
      qu: InvestorQUMaster | null;
      regions: Region[] | null;
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
        investor_qu_id: {
          type: 'integer',
        },
        contentText: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              investor_qu: {
                type: 'string',
              },
              investor_qu_pdf: {
                type: 'string',
              },
              title: {
                type: 'string',
              },
              qu_pdf: {
                type: 'string',
              },
              qu_region: {
                type: 'array',
                items: {
                  type: 'string',
                  example: 'UK',
                },
              },
              sort_order: {
                type: 'integer',
              },
              is_actve: {
                type: 'boolean',
              },
            },
          },
        },
      },
    },
  })
  @Roles(['INVESTOR'])
  @Post('qu/pdfs/add-update')
  async addUpdateQUPDFs(
    @Body('investor_qu_id', ParseIntPipe) investor_qu_id: number,
    @Body('contentText')
    contentText: {
      investor_qu: string;
      investor_qu_pdf: string;
      title: string;
      qu_pdf: string;
      qu_region: string[];
      sort_order: number;
      is_active: boolean;
    }[],
  ): Promise<QuartelyUpdate[]> {
    return await this.investorsService.addUpdateQUPDFs(investor_qu_id, contentText);
  }

  @AdminOnly()
  @ApiBearerAuth()
  @ApiQuery({
    name: 'search',
    type: 'string',
    required: false,
  })
  @Roles(['INVESTOR'])
  @Get('sustainability')
  async getSustainability(
    @Query('search', new DefaultValuePipe('')) search: string,
  ): Promise<Sustainability[]> {
    return await this.investorsService.getSustainability(search || undefined);
  }

  @Get('sustainability/:id')
  async getSustainabilityById(@Param('id', ParseIntPipe) id: number): Promise<{
    sustainability: Sustainability | null;
    regions: Region[] | null;
  }> {
    const toReturn = {
      sustainability: await this.investorsService.getSustainabilityById(id),
      regions: await this.regionService.getRegionList(),
    } as {
      sustainability: Sustainability | null;
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
        sustainability_title: {
          type: 'string',
        },
        sustain_documentation_pdf: {
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
        sustain_regions: {
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
  @Roles(['INVESTOR'])
  @Post('sustainability/add-update')
  async addUpdateSustainability(
    @Body('id', ParseIntPipe) id: number,
    @Body('title', EmptystringPipe) title: string,
    @Body('url_title', EmptystringPipe) url_title: string,
    @Body('sustainability_title', EmptystringPipe)
    sustainability_title: string,
    @Body('sustain_documentation_pdf', ImagefileOrNullPipe)
    sustain_documentation_pdf: {
      url: string;
      alt: string;
      width: number;
      height: number;
    } | null,
    @Body('sustain_regions') sustain_regions: string[],
    @Body('sort_order', ParseIntPipe) sort_order: number,
  ): Promise<{ sustainability: Sustainability }> {
    const sustainability = await this.investorsService.addUpdateSustainability(
      id,
      title,
      url_title,
      sustainability_title,
      sustain_documentation_pdf,
      sustain_regions,
      sort_order,
    );
    return {
      sustainability,
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
  @Get('cg')
  async getCG(
    @Query('search', new DefaultValuePipe('')) search: string,
  ): Promise<CorporateGovernance[]> {
    return await this.investorsService.getCG(search || undefined);
  }

  @Get('cg/:id')
  async getCGyById(@Param('id', ParseIntPipe) id: number): Promise<{
    cg: CorporateGovernance | null;
    regions: Region[] | null;
  }> {
    const toReturn = {
      cg: await this.investorsService.getCGById(id),
      regions: await this.regionService.getRegionList(),
    } as {
      cg: CorporateGovernance | null;
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
        documentation_cg_title: {
          type: 'string',
        },
        documentation_cg_pdf: {
          type: 'string',
        },
        documentation_cg_category: {
          type: 'string',
        },
        cg_regions: {
          type: 'array',
          items: {
            type: 'string',
            example: 'UK',
          },
        },
        sort_order: {
          type: 'number',
        },
        is_active: {
          type: 'boolean',
        },
      },
    },
  })
  @Roles(['INVESTOR'])
  @Post('cg/add-update')
  async addUpdateCG(
    @Body('id', ParseIntPipe) id: number,
    @Body('title', EmptystringPipe) title: string,
    @Body('url_title', EmptystringPipe) url_title: string,
    @Body('documentation_cg_title', EmptystringPipe)
    documentation_cg_title: string,
    @Body('documentation_cg_pdf', EmptystringPipe)
    documentation_cg_pdf: string,
    @Body('documentation_cg_category', EmptystringPipe)
    documentation_cg_category: string,
    @Body('cg_regions') cg_regions: string[],
    @Body('sort_order', ParseIntPipe) sort_order: number,
    @Body('is_active', ParseBoolPipe) is_active: boolean,
  ): Promise<{ cg: CorporateGovernance }> {
    const cg = await this.investorsService.addUpdateCG(
      id,
      title,
      url_title,
      documentation_cg_title,
      documentation_cg_pdf,
      documentation_cg_category,
      cg_regions,
      sort_order,
      is_active,
    );
    return {
      cg,
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
  @Get('schedule')
  async getSchedule(
    @Query('search', new DefaultValuePipe('')) search: string,
  ): Promise<InvestorSchedule[]> {
    return await this.investorsService.getSchedule(search || undefined);
  }

  @Get('schedule/:id')
  async getScheduleById(@Param('id', ParseIntPipe) id: number): Promise<{
    schedule: InvestorSchedule | null;
    regions: Region[] | null;
  }> {
    const toReturn = {
      schedule: await this.investorsService.getScheduleById(id),
      regions: await this.regionService.getRegionList(),
    } as {
      schedule: InvestorSchedule | null;
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
        schedule_analyst_meet_pdf: {
          type: 'string',
        },
        schedule_analyst_meet_year: {
          type: 'string',
        },
        region: {
          type: 'array',
          items: {
            type: 'string',
            example: 'UK',
          },
        },
        is_actve: {
          type: 'boolean',
        },
      },
    },
  })
  @Roles(['INVESTOR'])
  @Post('schedule/add-update')
  async addUpdateSchedule(
    @Body('id', ParseIntPipe) id: number,
    @Body('title', EmptystringPipe) title: string,
    @Body('url_title', EmptystringPipe) url_title: string,
    @Body('schedule_analyst_meet_pdf', EmptystringPipe)
    schedule_analyst_meet_pdf: string,
    @Body('schedule_analyst_meet_year') schedule_analyst_meet_year: string,
    @Body('region') region: string[],
  ): Promise<{ schedule: InvestorSchedule }> {
    const schedule = await this.investorsService.addUpdateSchedule(
      id,
      title,
      url_title,
      schedule_analyst_meet_pdf,
      schedule_analyst_meet_year,
      region,
    );
    return {
      schedule,
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
  @Get('iu')
  async getIU(
    @Query('search', new DefaultValuePipe('')) search: string,
  ): Promise<InformationUpdate[]> {
    return await this.investorsService.getIU(search || undefined);
  }

  @Get('iu/:id')
  async getIUyById(@Param('id', ParseIntPipe) id: number): Promise<{
    iu: InformationUpdate | null;
    regions: Region[] | null;
  }> {
    const toReturn = {
      iu: await this.investorsService.getIUById(id),
      regions: await this.regionService.getRegionList(),
    } as {
      iu: InformationUpdate | null;
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
        documentation_iu_title: {
          type: 'string',
        },
        iu_documentation_pdf: {
          type: 'string',
        },
        iu_regions: {
          type: 'array',
          items: {
            type: 'string',
            example: 'UK',
          },
        },
        sort_order: {
          type: 'number',
        },
        is_actve: {
          type: 'boolean',
        },
      },
    },
  })
  @Roles(['INVESTOR'])
  @Post('iu/add-update')
  async addUpdateIU(
    @Body('id', ParseIntPipe) id: number,
    @Body('title', EmptystringPipe) title: string,
    @Body('url_title', EmptystringPipe) url_title: string,
    @Body('documentation_iu_title', EmptystringPipe)
    documentation_iu_title: string,
    @Body('iu_documentation_pdf', EmptystringPipe)
    iu_documentation_pdf: string,
    @Body('iu_regions') iu_regions: string[],
    @Body('sort_order', ParseIntPipe) sort_order: number,
    @Body('is_active', ParseBoolPipe)
    is_active: boolean,
  ): Promise<{ iu: InformationUpdate }> {
    const iu = await this.investorsService.addUpdateIU(
      id,
      title,
      url_title,
      documentation_iu_title,
      iu_documentation_pdf,
      iu_regions,
      sort_order,
      is_active,
    );
    return {
      iu,
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
  @Get('placement')
  async getPD(
    @Query('search', new DefaultValuePipe('')) search: string,
  ): Promise<InvestorPlacement[]> {
    return await this.investorsService.getPD(search || undefined);
  }

  @Get('placement/:id')
  async getPDById(@Param('id', ParseIntPipe) id: number): Promise<{
    pd: InvestorPlacement | null;
    pds: InvestorPlacement[];
    regions: Region[] | null;
  }> {
    const toReturn = {
      pd: await this.investorsService.getPDById(id),
      pds: await this.investorsService.getPD(),
      regions: await this.regionService.getRegionList(),
    } as {
      pd: InvestorPlacement | null;
      pds: InvestorPlacement[];
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
        documentation_pd_title: {
          type: 'string',
        },
        pd_documentation_pdf: {
          type: 'string',
        },
        pd_regions: {
          type: 'array',
          items: {
            type: 'string',
            example: 'UK',
          },
        },
        sort_order: {
          type: 'number',
        },
        is_actve: {
          type: 'boolean',
        },
      },
    },
  })
  @Roles(['INVESTOR'])
  @Post('placement/add-update')
  async addUpdatePD(
    @Body('id', ParseIntPipe) id: number,
    @Body('title', EmptystringPipe) title: string,
    @Body('url_title', EmptystringPipe) url_title: string,
    @Body('documentation_pd_title', EmptystringPipe)
    documentation_pd_title: string,
    @Body('pd_documentation_pdf', EmptystringPipe)
    pd_documentation_pdf: string,
    @Body('pd_regions') pd_regions: string[],
    @Body('sort_order', ParseIntPipe) sort_order: number,
    @Body('is_active', ParseBoolPipe)
    is_active: boolean,
  ): Promise<{ pd: InvestorPlacement }> {
    const pd = await this.investorsService.addUpdatePD(
      id,
      title,
      url_title,
      documentation_pd_title,
      pd_documentation_pdf,
      pd_regions,
      sort_order,
      is_active,
    );
    return {
      pd,
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
  @Get('contact')
  async getIC(
    @Query('search', new DefaultValuePipe('')) search: string,
  ): Promise<InvestorContact[]> {
    return await this.investorsService.getIC(search || undefined);
  }

  @Get('contact/:id')
  async getICById(@Param('id', ParseIntPipe) id: number): Promise<{
    ic: InvestorContact | null;
    regions: Region[] | null;
  }> {
    const toReturn = {
      ic: await this.investorsService.getICById(id),
      regions: await this.regionService.getRegionList(),
    } as {
      ic: InvestorContact | null;
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
        ic_contact_info: {
          type: 'string',
        },
        ic_regions: {
          type: 'array',
          items: {
            type: 'string',
            example: 'UK',
          },
        },
        sort_order: {
          type: 'number',
        },
        is_actve: {
          type: 'boolean',
        },
      },
    },
  })
  @Roles(['INVESTOR'])
  @Post('contact/add-update')
  async addUpdateIC(
    @Body('id', ParseIntPipe) id: number,
    @Body('title', EmptystringPipe) title: string,
    @Body('url_title', EmptystringPipe) url_title: string,
    @Body('ic_contact_info', EmptystringPipe)
    ic_contact_info: string,
    @Body('ic_regions') ic_regions: string[],
    @Body('sort_order', ParseIntPipe) sort_order: number,
    @Body('is_active', ParseBoolPipe) is_active: boolean,
  ): Promise<{ ic: InvestorContact }> {
    const ic = await this.investorsService.addUpdateIC(
      id,
      title,
      url_title,
      ic_contact_info,
      ic_regions,
      sort_order,
      is_active,
    );
    return {
      ic,
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
  @Get('psi')
  async getPSI(@Query('search', new DefaultValuePipe('')) search: string): Promise<InvestorPSI[]> {
    return await this.investorsService.getPSI(search || undefined);
  }

  @Get('psi/:id')
  async getPSIById(@Param('id', ParseIntPipe) id: number): Promise<{
    psi: InvestorPSI | null;
    regions: Region[] | null;
  }> {
    const toReturn = {
      psi: await this.investorsService.getPSIById(id),
      regions: await this.regionService.getRegionList(),
    } as {
      psi: InvestorPSI | null;
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
        documentation_psi_title: {
          type: 'string',
        },
        psi_documentation_pdf: {
          type: 'string',
        },
        psi_regions: {
          type: 'array',
          items: {
            type: 'string',
            example: 'UK',
          },
        },
        psi_category: {
          type: 'string',
        },
        sort_order: {
          type: 'number',
        },
        is_actve: {
          type: 'boolean',
        },
      },
    },
  })
  @Roles(['INVESTOR'])
  @Post('psi/add-update')
  async addUpdatePSI(
    @Body('id', ParseIntPipe) id: number,
    @Body('title', EmptystringPipe) title: string,
    @Body('url_title', EmptystringPipe) url_title: string,
    @Body('documentation_psi_title', EmptystringPipe)
    documentation_psi_title: string,
    @Body('psi_documentation_pdf', EmptystringPipe)
    psi_documentation_pdf: string,
    @Body('psi_regions') psi_regions: string[],
    @Body('psi_category', EmptystringPipe)
    psi_category: string,
    @Body('sort_order', ParseIntPipe) sort_order: number,
    @Body('is_active', ParseBoolPipe)
    is_active: boolean,
  ): Promise<{ psi: InvestorPSI }> {
    const psi = await this.investorsService.addUpdatePSI(
      id,
      title,
      url_title,
      documentation_psi_title,
      psi_documentation_pdf,
      psi_regions,
      psi_category,
      sort_order,
      is_active,
    );
    return {
      psi,
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
  @Get('ar')
  async getAR(@Query('search', new DefaultValuePipe('')) search: string): Promise<InvestorAR[]> {
    return await this.investorsService.getAR(search || undefined);
  }

  @Get('ar/:id')
  async getARById(@Param('id', ParseIntPipe) id: number): Promise<{
    annual_report: InvestorAR | null;
    annual_reports: InvestorAR[] | null;
    regions: Region[] | null;
    categoryMenu: TitleCategory[] | null;
  }> {
    const toReturn = {
      annual_report: await this.investorsService.getARById(id),
      annual_reports: await this.investorsService.getAR(),
      regions: await this.regionService.getRegionList(),
      categoryMenu: await this.featuresService.getTitleCategoryDropdownBySubmenu('ar'),
    } as {
      annual_report: InvestorAR | null;
      annual_reports: InvestorAR[] | null;
      regions: Region[] | null;
      categoryMenu: TitleCategory[] | null;
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
        ar_documentation_year: {
          type: 'string',
        },
        ar_documentation_title: {
          type: 'string',
        },
        url_title: {
          type: 'string',
        },
        ar_documentation_pdf: {
          type: 'string',
        },
        ar_regions: {
          type: 'array',
          items: {
            type: 'string',
            example: 'UK',
          },
        },
        investors_ar_category: {
          type: 'string',
        },
        sort_order: {
          type: 'number',
        },
        is_active: {
          type: 'boolean',
        },
      },
    },
  })
  @Roles(['INVESTOR'])
  @Post('ar/add-update')
  async addUpdateAR(
    @Body('id', ParseIntPipe) id: number,
    @Body('ar_documentation_year') ar_documentation_year: string,
    @Body('ar_documentation_title')
    ar_documentation_title: string,
    @Body('url_title', EmptystringPipe) url_title: string,
    @Body('ar_documentation_pdf', EmptystringPipe)
    ar_documentation_pdf: string,
    @Body('ar_regions') ar_regions: string[],
    @Body('investors_ar_category', EmptystringPipe)
    investors_ar_category: string,
    @Body('sort_order', ParseIntPipe) sort_order: number,
    @Body('is_active', ParseBoolPipe) is_active: boolean,
  ): Promise<{ annual_report: InvestorAR }> {
    const annual_report = await this.investorsService.addUpdateAR(
      id,
      ar_documentation_year,
      ar_documentation_title,
      url_title,
      ar_documentation_pdf,
      ar_regions,
      investors_ar_category,
      sort_order,
      is_active,
    );
    return {
      annual_report,
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
  @Get('dr')
  async getDR(@Query('search', new DefaultValuePipe('')) search: string): Promise<InvestorDR[]> {
    return await this.investorsService.getDR(search || undefined);
  }

  @Get('dr/:id')
  async getDRById(@Param('id', ParseIntPipe) id: number): Promise<{
    director_report: InvestorDR | null;
    director_reports: InvestorDR[] | null;
    regions: Region[] | null;
  }> {
    const toReturn = {
      director_report: await this.investorsService.getDRById(id),
      director_reports: await this.investorsService.getDR(),
      regions: await this.regionService.getRegionList(),
    } as {
      director_report: InvestorDR | null;
      director_reports: InvestorDR[] | null;
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
        dr_documentation_year: {
          type: 'string',
        },
        dr_documentation_title: {
          type: 'string',
        },
        url_title: {
          type: 'string',
        },
        dr_documentation_pdf: {
          type: 'string',
        },
        dr_regions: {
          type: 'array',
          items: {
            type: 'string',
            example: 'UK',
          },
        },
        sort_order: {
          type: 'number',
        },
        is_actve: {
          type: 'boolean',
        },
      },
    },
  })
  @Roles(['INVESTOR'])
  @Post('dr/add-update')
  async addUpdateDR(
    @Body('id', ParseIntPipe) id: number,
    @Body('dr_documentation_year') dr_documentation_year: string,
    @Body('dr_documentation_title')
    dr_documentation_title: string,
    @Body('url_title', EmptystringPipe) url_title: string,
    @Body('dr_documentation_pdf', EmptystringPipe)
    dr_documentation_pdf: string,
    @Body('dr_regions') dr_regions: string[],
    @Body('sort_order', ParseIntPipe) sort_order: number,
    @Body('is_active', ParseBoolPipe)
    is_active: boolean,
  ): Promise<{ director_report: InvestorDR }> {
    const director_report = await this.investorsService.addUpdateDR(
      id,
      dr_documentation_year,
      dr_documentation_title,
      url_title,
      dr_documentation_pdf,
      dr_regions,
      sort_order,
      is_active,
    );
    return {
      director_report,
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
  @Get('principles_disclosure')
  async getMI(@Query('search', new DefaultValuePipe('')) search: string): Promise<InvestorMI[]> {
    return await this.investorsService.getMI(search || undefined);
  }

  @Get('principles_disclosure/:id')
  async getMIById(@Param('id', ParseIntPipe) id: number): Promise<{
    disclosure: InvestorMI | null;
    disclosures: InvestorMI[] | null;
    regions: Region[] | null;
  }> {
    const toReturn = {
      disclosure: await this.investorsService.getMIById(id),
      disclosures: await this.investorsService.getMI(),
      regions: await this.regionService.getRegionList(),
    } as {
      disclosure: InvestorMI | null;
      disclosures: InvestorMI[] | null;
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
        mi_documentation_title: {
          type: 'string',
        },
        url_title: {
          type: 'string',
        },
        mi_documentation_pdf: {
          type: 'string',
        },
        mi_regions: {
          type: 'array',
          items: {
            type: 'string',
            example: 'UK',
          },
        },
        sort_order: {
          type: 'number',
        },
        is_actve: {
          type: 'boolean',
        },
      },
    },
  })
  @Roles(['INVESTOR'])
  @Post('principles_disclosure/add-update')
  async addUpdateMI(
    @Body('id', ParseIntPipe) id: number,
    @Body('mi_documentation_title')
    mi_documentation_title: string,
    @Body('url_title', EmptystringPipe) url_title: string,
    @Body('mi_documentation_pdf', EmptystringPipe)
    mi_documentation_pdf: string,
    @Body('mi_regions') mi_regions: string[],
    @Body('sort_order', ParseIntPipe) sort_order: number,
    @Body('is_active', ParseBoolPipe)
    is_active: boolean,
  ): Promise<{ disclosure: InvestorMI }> {
    const disclosure = await this.investorsService.addUpdateMI(
      id,
      mi_documentation_title,
      url_title,
      mi_documentation_pdf,
      mi_regions,
      sort_order,
      is_active,
    );
    return {
      disclosure,
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
  @Get('faq')
  async getFAQ(@Query('search', new DefaultValuePipe('')) search: string): Promise<InvestorFAQ[]> {
    return await this.investorsService.getFAQ(search || undefined);
  }

  @Get('faq/:id')
  async getFAQById(@Param('id', ParseIntPipe) id: number): Promise<{
    faq: InvestorFAQ | null;
    faqs: InvestorFAQ[] | null;
    regions: Region[] | null;
  }> {
    const toReturn = {
      faq: await this.investorsService.getFAQById(id),
      faqs: await this.investorsService.getFAQ(),
      regions: await this.regionService.getRegionList(),
    } as {
      faq: InvestorFAQ | null;
      faqs: InvestorFAQ[] | null;
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
        question: {
          type: 'string',
        },
        answer: {
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
        is_active: {
          type: 'boolean',
        },
      },
    },
  })
  @Roles(['INVESTOR'])
  @Post('faq/add-update')
  async addUpdateFAQ(
    @Body('id', ParseIntPipe) id: number,
    @Body('question')
    question: string,
    @Body('answer', EmptystringPipe) answer: string,
    @Body('regions') regions: string[],
    @Body('sort_order', ParseIntPipe) sort_order: number,
    @Body('is_active', ParseBoolPipe)
    is_active: boolean,
  ): Promise<{ faq: InvestorFAQ }> {
    const faq = await this.investorsService.addUpdateFAQ(
      id,
      question,
      answer,
      regions,
      sort_order,
      is_active,
    );
    return {
      faq,
    };
  }
}
