import { Injectable } from '@nestjs/common';
import { annualUnclaimedDoc, AnnualUnclaimedDoc } from 'data/investor-new/annual-unclaimed-divident';


@Injectable()
export class AnnualUnclaimedDividentService {
  findAll(): AnnualUnclaimedDoc[] {
    return annualUnclaimedDoc;
  }
  findByYear(year: string): AnnualUnclaimedDoc[] {
    return annualUnclaimedDoc.filter(data => data.year === year);
  }
}
