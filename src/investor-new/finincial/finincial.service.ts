import { Injectable } from '@nestjs/common';
import { financial, Financial } from 'data/investor-new/finincial';

@Injectable()
export class FinincialService {
  findAll(): Financial[] {
    return financial;
  }
  findById(id: number): Financial[] {
    return financial.filter(data => data.id === id);
  }
}
