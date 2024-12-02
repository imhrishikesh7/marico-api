import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InvestorsService } from './investors.service';
import { InvestorQUMaster } from './entities/investor_qu_master.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { InvestorShareHolder } from './entities/investor_shareholder.entity';
import { InvestorAGM } from './entities/investor_agm.entity';
import { InvestorDividends } from './entities/investor_dividend.entity';
import { Sustainability } from './entities/investor_sustainability.entity';
import { CorporateGovernance } from './entities/investor_cogevernance.entity';
import { InformationUpdate } from './entities/investor_iu.entity';
import { InvestorSchedule } from './entities/investor_schedule.entity';
import { InvestorPlacement } from './entities/investor_placement.entity';
import { InvestorContact } from './entities/investor_contact.entity';
import { InvestorPSI } from './entities/investor_psi.entity';
import { InvestorAR } from './entities/investor_ar.entity';
import { InvestorMI } from './entities/investor_mi.entity';
import { InvestorDR } from './entities/investor_dr.entity';
import { SeoService } from 'src/seo/seo.service';

@Controller(':region/investors')
export class InvestorsController {
  constructor(
    private readonly investorsService: InvestorsService,
    private readonly seoService: SeoService,
  ) {}

  @ApiBearerAuth()
  @Get('qu')
  async getQU(): Promise<InvestorQUMaster[]> {
    return await this.investorsService.getQU();
  }

  @ApiBearerAuth()
  @Get('documentation/shareholder-info')
  async getSHIDetail(
    @Param('region') region: string,
  ): Promise<{ result: InvestorShareHolder[]; seo: any }> {
    return await this.investorsService.getSHIDetail(region);
  }

  @ApiBearerAuth()
  @Get('documentation/agm')
  async getAGMDetail(
    @Param('region') region: string,
  ): Promise<{ result: InvestorAGM[]; seo: any }> {
    return await this.investorsService.getAGMDetail(region);
  }

  @ApiBearerAuth()
  @Get('documentation/dividend')
  async getDevidendsDetail(
    @Param('region') region: string,
  ): Promise<{ result: InvestorDividends[]; seo: any }> {
    return await this.investorsService.getDividendsDetail(region);
  }

  @ApiBearerAuth()
  @Get('documentation/sustainability')
  async getSustainabilityDetail(
    @Param('region') region: string,
  ): Promise<Sustainability[]> {
    return await this.investorsService.getSustainabilityDetail(region);
  }

  @ApiBearerAuth()
  @Get('documentation/cg')
  async getCGDetail(
    @Param('region') region: string,
  ): Promise<{ result: CorporateGovernance[]; seo: any }> {
    const cg = await this.investorsService.getCGDetail(region);

    const groupedByCategory = cg.reduce(
      (acc: any, item: CorporateGovernance) => {
        const category = item.documentation_cg_category;

        if (!acc[category]) {
          acc[category] = {
            category: category,
            pdfs: [],
          };
        }

        acc[category].pdfs.push({
          pdf_title: item.documentation_cg_title,
          pdf: item.documentation_cg_pdf,
          id: item.id,
          title: item.title,
          url_title: item.url_title,
          regions: item.cg_regions,
          sort_order: item.sort_order,
          created_at: item.created_at,
          updated_at: item.updated_at,
        });

        return acc;
      },
      {},
    );

    const result: any[] = Object.values(groupedByCategory);

    const seoRecord = await this.seoService.findOne(0, 'cg');

    return {
      result,
      seo: seoRecord,
    };
  }

  @ApiBearerAuth()
  @Get('documentation/latest-update')
  async getIUDetail(
    @Param('region') region: string,
  ): Promise<{ result: InformationUpdate[]; seo: any }> {
    return await this.investorsService.getIUDetail(region);
  }

  @ApiBearerAuth()
  @Get('documentation/schedule-of-investors')
  async getScheduleDetail(
    @Param('region') region: string,
  ): Promise<{ result: InvestorSchedule[]; seo: any }> {
    const schedule = await this.investorsService.getScheduleDetail();
    const groupedByCategory = schedule.reduce(
      (acc: any, item: InvestorSchedule) => {
        const category = item.schedule_analyst_meet_year;

        if (!acc[category]) {
          acc[category] = {
            category: category,
            pdfs: [],
          };
        }

        acc[category].pdfs.push({
          pdf_title: item.title,
          pdf: item.schedule_analyst_meet_pdf,
          id: item.id,
          url_title: item.url_title,
          created_at: item.created_at,
          updated_at: item.updated_at,
        });

        return acc;
      },
      {},
    );

    const result: any[] = Object.values(groupedByCategory);

    const seoRecord = await this.seoService.findOne(0, 'schedule-of-investors');

    return {
      result,
      seo: seoRecord,
    };
  }

  @ApiBearerAuth()
  @Get('documentation/placement-document')
  async getPDDetail(
    @Param('region') region: string,
  ): Promise<{ result: InvestorPlacement[]; seo: any }> {
    return await this.investorsService.getPDDetail(region);
  }

  @ApiBearerAuth()
  @Get('documentation/quarterly-updates')
  async getQUDetail(
    @Param('region') region: string,
  ): Promise<{ result: any[]; seo: any }> {
    return await this.investorsService.getQUALL(region);
  }

  @ApiBearerAuth()
  @Get('documentation/investor-contact')
  async getICDetail(
    @Param('region') region: string,
  ): Promise<{ result: InvestorContact[]; seo: any }> {
    return await this.investorsService.getICDetail();
  }

  @ApiBearerAuth()
  @Get('documentation/price-sensitive-information')
  async getPSIDetail(
    @Param('region') region: string,
  ): Promise<{ result: InvestorPSI[]; seo: any }> {
    const psi = await this.investorsService.getPSIDetail();
    const groupedByCategory = psi.reduce((acc: any, item: InvestorPSI) => {
      const category = item.psi_category;

      if (!acc[category]) {
        acc[category] = {
          category: category,
          pdfs: [],
        };
      }

      acc[category].pdfs.push({
        pdf_title: item.documentation_psi_title,
        pdf: item.psi_documentation_pdf,
        id: item.id,
        title: item.title,
        url_title: item.url_title,
        sort_order: item.sort_order,
        created_at: item.created_at,
        updated_at: item.updated_at,
      });

      return acc;
    }, {});

    const result: any[] = Object.values(groupedByCategory);

    const seoRecord = await this.seoService.findOne(
      0,
      'price-sensitive-information',
    );

    return {
      result,
      seo: seoRecord,
    };
  }

  @ApiBearerAuth()
  @Get('documentation/annual-reports')
  async getARDetail(
    @Param('region') region: string,
  ): Promise<{ result: InvestorAR[]; seo: any }> {
    return await this.investorsService.getARDetail(region);
  }

  @ApiBearerAuth()
  @Get('documentation/latest-director-report')
  async getDRDetail(
    @Param('region') region: string,
  ): Promise<{ result: InvestorDR[]; seo: any }> {
    return await this.investorsService.getDRDetail(region);
  }

  @ApiBearerAuth()
  @Get('documentation/investor-principles-disclosure')
  async getMIDetail(
    @Param('region') region: string,
  ): Promise<{ result: InvestorMI[]; seo: any }> {
    return await this.investorsService.getMIDetail(region);
  }
}
