import { Injectable } from '@nestjs/common';
import {
  stockExchangeDoc,
  StockExchangeDoc,
  StockExchangeMonth,
} from 'data/investor-new/stock-exchange';

@Injectable()
export class StockExchangeService {
  findAll(): StockExchangeDoc[] {
    return stockExchangeDoc;
  }
  findByYear(year: string): StockExchangeDoc[] {
    return stockExchangeDoc.filter(data => data.year === year);
  }

  findByYearAndMonth(year: string, month: string): StockExchangeMonth | undefined {
    const yearDoc = stockExchangeDoc.find(doc => doc.year === year);
    return yearDoc?.months.find(m => m.name === month);
  }
}
