import { Injectable } from '@nestjs/common';
import { Presentation, presentation } from 'data/investor-new/presentation';

@Injectable()
export class PresentationService {
  findAll(): Presentation[] {
    return presentation;
  }

  findByYear(year: string): Presentation[] {
    return presentation.filter(report => report.year === year);
  }

  findByQuarter(year: string): Presentation | undefined {
    return presentation.find(report => report.year === year);
  }
}
