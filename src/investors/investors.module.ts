import { Module } from '@nestjs/common';
import { InvestorsService } from './investors.service';
import { InvestorsController } from './investors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from 'src/regions/entities/region.entity';
import { InvestorAGM } from './entities/investor_agm.entity';
import { InvestorShareHolder } from './entities/investor_shareholder.entity';
import { InvestorDividends } from './entities/investor_dividend.entity';
import { InvestorQUMaster } from './entities/investor_qu_master.entity';
import { QuartelyUpdate } from './entities/investor_qu_update.entity';
import { Sustainability } from './entities/investor_sustainability.entity';
import { InvestorSchedule } from './entities/investor_schedule.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      InvestorAGM,
      InvestorShareHolder,
      InvestorDividends,
      InvestorQUMaster,
      QuartelyUpdate,
      Sustainability,
      InvestorSchedule,
      Region,
    ]),
  ],
  controllers: [InvestorsController],
  providers: [InvestorsService],
  exports: [InvestorsService],
})
export class InvestorsModule {}
