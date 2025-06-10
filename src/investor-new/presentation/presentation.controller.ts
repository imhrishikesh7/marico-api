import { Controller, Get, Param, VERSION_NEUTRAL } from '@nestjs/common';
import { PresentationService } from './presentation.service';
import { Presentation } from 'data/investor-new/presentation';

@Controller({
  version: VERSION_NEUTRAL,
  path: 'presentation',
})
export class PresentationController {
  constructor(private readonly investorService: PresentationService) {}

  @Get()
  getAllReports(): Presentation[] {
    return this.investorService.findAll();
  }

  @Get(':year')
  getReportsByYear(@Param('year') year: string): Presentation[] {
    return this.investorService.findByYear(year);
  }

  @Get(':year/:quarter')
  getReportByQuarter(
    @Param('year') year: string,
    @Param('quarter') quarter: string,
  ): Presentation | undefined {
    return this.investorService.findByQuarter(year);
  }
}
