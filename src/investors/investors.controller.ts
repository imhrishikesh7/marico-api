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

@Controller(':region/investors')
export class InvestorsController {
  constructor(private readonly investorsService: InvestorsService) {}

  @ApiBearerAuth()
  @Get('qu')
  async getQU(): Promise<InvestorQUMaster[]> {
    return await this.investorsService.getQU();
  }

  @ApiBearerAuth()
  @Get('documentation/shareholder-info')
  async getSHIDetail(
    @Param('region') region: string,
  ): Promise<InvestorShareHolder[]> {
    return await this.investorsService.getSHIDetail(region);
  }

  @ApiBearerAuth()
  @Get('documentation/agm')
  async getAGMDetail(@Param('region') region: string): Promise<InvestorAGM[]> {
    const agm = await this.investorsService.getAGMDetail(region);

    const groupedByCategory = agm.reduce((acc: any, item: InvestorAGM) => {
      const category = item.investors_agm_category;

      if (!acc[category]) {
        acc[category] = {
          category: category,
          pdfs: [],
        };
      }

      acc[category].pdfs.push({
        pdf_title: item.agm_documentation_title,
        pdf: item.agm_documentation_pdf,
        id: item.id,
        title: item.title,
        url_title: item.url_title,
        region: item.agm_regions,
        sort_order: item.sort_order,
        created_at: item.created_at,
        updated_at: item.updated_at,
      });

      return acc;
    }, {});

    return Object.values(groupedByCategory);
  }

  @ApiBearerAuth()
  @Get('documentation/dividend')
  async getDevidendsDetail(
    @Param('region') region: string,
  ): Promise<InvestorDividends[]> {
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
  ): Promise<CorporateGovernance[]> {
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

    return Object.values(groupedByCategory);
  }

  @ApiBearerAuth()
  @Get('documentation/latest-update')
  async getIUDetail(
    @Param('region') region: string,
  ): Promise<InformationUpdate[]> {
    return await this.investorsService.getIUDetail(region);
  }

  @ApiBearerAuth()
  @Get('documentation/schedule-of-investors')
  async getScheduleDetail(
    @Param('region') region: string,
  ): Promise<InvestorSchedule[]> {
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

    return Object.values(groupedByCategory);
  }

  @ApiBearerAuth()
  @Get('documentation/placement-document')
  async getPDDetail(
    @Param('region') region: string,
  ): Promise<InvestorPlacement[]> {
    return await this.investorsService.getPDDetail(region);
  }

  @ApiBearerAuth()
  @Get('documentation/quarterly-updates')
  async getQUDetail(@Param('region') region: string): Promise<any[]> {
    return await this.investorsService.getQUALL();
  }

  @ApiBearerAuth()
  @Get('documentation/investor-contact')
  async getICDetail(
    @Param('region') region: string,
  ): Promise<InvestorContact[]> {
    return await this.investorsService.getICDetail();
  }

  @ApiBearerAuth()
  @Get('documentation/price-sensitive-information')
  async getPSIDetail(@Param('region') region: string): Promise<InvestorPSI[]> {
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

    return Object.values(groupedByCategory);
  }

  @ApiBearerAuth()
  @Get('documentation/annual-reports')
  async getARDetail(
    @Param('region') region: string,
  ): Promise<InvestorAR[]> {
    return await this.investorsService.getARDetail(region);
  }

  @ApiBearerAuth()
  @Get('documentation/latest-director-report')
  async getDRDetail(
    @Param('region') region: string,
  ): Promise<InvestorDR[]> {
    return await this.investorsService.getDRDetail(region);
  }

  @ApiBearerAuth()
  @Get('documentation/investor-principles-disclosure')
  async getMIDetail(
    @Param('region') region: string,
  ): Promise<InvestorMI[]> {
    return await this.investorsService.getMIDetail(region);
  }

}
