import { Injectable } from '@nestjs/common';
import { subsidiaries, Subsidiaries } from 'data/investor-new/subsidiaries';

@Injectable()
export class SubsidiariesService {
  findAll(): Subsidiaries[] {
    return subsidiaries;
  }
  findByYear(year: string): Subsidiaries[] {
    return subsidiaries.filter(data => data.year === year);
  }
}
