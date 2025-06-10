import { Injectable } from '@nestjs/common';
import { QuarterlyReport, quarterlyReports } from 'data/investor-new/investor-new';

@Injectable()
export class QuarterlyService {
  findAll(): QuarterlyReport[] {
    return quarterlyReports;
  }

  findByYear(year: string): QuarterlyReport[] {
    return quarterlyReports.filter(report => report.year === year);
  }

  findByQuarter(year: string, quarter: number): QuarterlyReport | undefined {
    return quarterlyReports.find(report => report.year === year && report.quater === quarter);
  }
}
