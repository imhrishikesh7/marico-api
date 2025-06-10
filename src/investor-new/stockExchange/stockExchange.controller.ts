import { Controller, Get, Param, VERSION_NEUTRAL } from '@nestjs/common';
import { StockExchangeDoc, StockExchangeMonth } from 'data/investor-new/stock-exchange';
import { StockExchangeService } from './stockExchange.service';

@Controller({
  version: VERSION_NEUTRAL,
  path: 'stockExchange',
})
export class StockExchangeController {
  constructor(private readonly stock: StockExchangeService) {}
  @Get()
  getAllReports(): StockExchangeDoc[] {
    return this.stock.findAll();
  }

  @Get(':year')
  getByYear(@Param('year') year: string): StockExchangeDoc[] {
    return this.stock.findByYear(year);
  }

  @Get(':year/:month')
  getByYearAndMonth(
    @Param('year') year: string,
    @Param('month') month: string,
  ): StockExchangeMonth | undefined {
    return this.stock.findByYearAndMonth(year, month);
  }
}
