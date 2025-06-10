import { Controller, Get, Param, VERSION_NEUTRAL } from '@nestjs/common';
import { QuarterlyService } from './Quaterly.service';
import { QuarterlyReport } from 'data/investor-new/investor-new';

@Controller({
  version: VERSION_NEUTRAL,
  path: 'quarterly',
})
export class QuarterlyController {
  constructor(private readonly investorService: QuarterlyService) {}

  @Get()
  getAllReports(): QuarterlyReport[] {
    return this.investorService.findAll();
  }

  @Get(':year')
  getReportsByYear(@Param('year') year: string): QuarterlyReport[] {
    return this.investorService.findByYear(year);
  }

  @Get(':year/:quarter')
  getReportByQuarter(
    @Param('year') year: string,
    @Param('quarter') quarter: string,
  ): QuarterlyReport | undefined {
    return this.investorService.findByQuarter(year, Number(quarter));
  }
}
