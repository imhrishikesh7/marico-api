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
import { InformationUpdate } from './entities/investor_iu.entity';
import { InvestorPlacement } from './entities/investor_placement.entity';
import { InvestorContact } from './entities/investor_contact.entity';
import { InvestorPSI } from './entities/investor_psi.entity';
import { CorporateGovernance } from './entities/investor_cogevernance.entity';
import { InvestorAR } from './entities/investor_ar.entity';
import { TitleCategory } from 'src/features/entities/feature.entity';
import { InvestorDR } from './entities/investor_dr.entity';
import { InvestorMI } from './entities/investor_mi.entity';
import { Sitemap } from 'src/seo/entities/seo.entity';

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
      CorporateGovernance,
      InformationUpdate,
      InvestorPlacement,
      InvestorContact,
      InvestorPSI,
      InvestorAR,
      Region,
      TitleCategory,
      InvestorDR,
      InvestorMI,
      Sitemap,
    ]),
  ],
  controllers: [InvestorsController],
  providers: [InvestorsService],
  exports: [InvestorsService],
})
export class InvestorsModule {}
