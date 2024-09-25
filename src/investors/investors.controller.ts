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
    const shi =  await this.investorsService.getSHIDetail(region);

    const groupedByCategory = shi.reduce((acc: any, item: InvestorShareHolder) => {
      const category = item.investors_shi_category;
    
      // Check if the category already exists in the accumulator
      if (!acc[category]) {
        acc[category] = {
          investors_shi_category: category,
          pdfs: [],
        };
      }
    
      // Push the PDF details into the correct category
      acc[category].pdfs.push({
        investors_shi_title: item.investors_shi_title,
        investors_shi_pdf: item.investors_shi_pdf,
        id: item.id,
        title: item.title,
        url_title: item.url_title,
        sort_order: item.sort_order,
        created_at: item.created_at,
        updated_at: item.updated_at,
      });
    
      return acc;
    }, {});
    
    // Convert the object back into an array
    return Object.values(groupedByCategory);
  }

  @ApiBearerAuth()
  @Get('documentation/agm')
  async getAGMDetail(@Param('region') region: string): Promise<InvestorAGM[]> {
    return await this.investorsService.getAGMDetail(region);
  }

  @ApiBearerAuth()
  @Get('documentation/dividend')
  async getDevidendsDetail(
    @Param('region') region: string,
  ): Promise<InvestorDividends[]> {
    return await this.investorsService.getDividends();
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
    return await this.investorsService.getCGDetail(region);
  }

  @ApiBearerAuth()
  @Get('documentation/iu')
  async getIUDetail(
    @Param('region') region: string,
  ): Promise<InformationUpdate[]> {
    return await this.investorsService.getIUDetail(region);
  }
}
