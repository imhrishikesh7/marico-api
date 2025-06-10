import { Controller, Get, Param, VERSION_NEUTRAL } from '@nestjs/common';

import { Subsidiaries } from 'data/investor-new/subsidiaries';
import { SubsidiariesService } from './subsidiaries.service';

@Controller({
  version: VERSION_NEUTRAL,
  path: 'subsidiaries',
})
export class SubsidiariesController {
  constructor(private readonly report: SubsidiariesService) {}

  @Get()
  getAllReports(): Subsidiaries[] {
    return this.report.findAll();
  }

  @Get(':year')
  getReportsByYear(@Param('year') year: string): Subsidiaries[] {
    return this.report.findByYear(year);
  }
}
