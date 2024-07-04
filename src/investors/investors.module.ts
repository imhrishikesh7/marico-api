import { Module } from '@nestjs/common';
import { InvestorsService } from './investors.service';
import { InvestorsController } from './investors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from 'src/regions/entities/region.entity';
import { InvestorAGM } from './entities/investor_agm.entity';
import { InvestorShareHolder } from './entities/investor_shareholder.entity';
import { InvestorDividends } from './entities/investor_dividend.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      InvestorAGM,
      InvestorShareHolder,
      InvestorDividends,
      Region,
    ]),
  ],
  controllers: [InvestorsController],
  providers: [InvestorsService],
  exports: [InvestorsService],
})
export class InvestorsModule {}
