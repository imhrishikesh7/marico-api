import { Controller, Get, Param, VERSION_NEUTRAL } from '@nestjs/common';
import { ShareHoldingPatternService } from './shareHoldingPattern.service';
import { Shareholding } from 'data/investor-new/shareholding-pattern';

@Controller({
  version: VERSION_NEUTRAL,
  path: 'shareholdingpattern',
})
export class ShareHoldingPatternController {
  constructor(private readonly data: ShareHoldingPatternService) {}

  @Get()
  getAllReports(): Shareholding[] {
    return this.data.findAll();
  }

  @Get(':year')
  getReportsByYear(@Param('year') year: string): Shareholding[] {
    return this.data.findByYear(year);
  }
}
