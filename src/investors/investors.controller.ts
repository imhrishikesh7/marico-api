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
    return await this.investorsService.getAGMDetail(region);
  }

  @ApiBearerAuth()
  @Get('documentation/dividend')
  async getDevidendsDetail(
    @Param('region') region: string,
  ): Promise<InvestorDividends[]> {
    return await this.investorsService.getDevidendsDetail(region);
  }

}

