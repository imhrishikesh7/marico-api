import { Injectable } from '@nestjs/common';
import { unclaimedDoc, UnclaimedDoc } from 'data/investor-new/unclaimed-dividend';

@Injectable()
export class UnclaimedDividendService {
  findAll(): UnclaimedDoc[] {
    return unclaimedDoc;
  }
  findByYear(year: string): UnclaimedDoc[] {
    return unclaimedDoc.filter(data => data.year === year);
  }
}
