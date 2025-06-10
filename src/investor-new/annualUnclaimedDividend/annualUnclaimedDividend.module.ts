import { Module } from '@nestjs/common';
import { AnnualUnclaimedDividendController } from './annualUnclaimedDividend.controller';
import { AnnualUnclaimedDividentService } from './annualUnclaimedDividend.service';

@Module({
  controllers: [AnnualUnclaimedDividendController],
  providers: [AnnualUnclaimedDividentService],
})
export class AnnualUnclaimedDividendModule {}
