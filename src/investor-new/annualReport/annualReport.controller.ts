import { Controller, Get, Param, VERSION_NEUTRAL } from '@nestjs/common';
import { AnnualReportService } from './annualReport.service';
import { AnnualReport } from 'data/investor-new/annual-report';

@Controller({
  version: VERSION_NEUTRAL,
  path: 'annualReport',
})
export class AnnualReportController {
  constructor(private readonly report: AnnualReportService) {}

  @Get()
  getAllReports(): AnnualReport[] {
    return this.report.findAll();
  }

  @Get(':year')
  getReportsByYear(@Param('year') year: string): AnnualReport[] {
    return this.report.findByYear(year);
  }
}
