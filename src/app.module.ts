import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppLogger } from './app.logger';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import config from '../datasource.config';
import { APP_GUARD } from '@nestjs/core';
import { AdminModule } from './admin/admin.module';
import { AdminGuard } from './admin/admin.guard';
import { RolesGuard } from './admin/roles.guard';
import { RegionsModule } from './regions/regions.module';
import { AboutusModule } from './aboutus/aboutus.module';
import { BrandsModule } from './brands/brands.module';
import { RegionAdminController } from './regions/regions.admin.controller';
import { AboutusAdminController } from './aboutus/aboutus.admin.controller';
import { BrandsAdminController } from './brands/brands.admin.controller';
import { InvestorsModule } from './investors/investors.module';
import { InvestorsAdminController } from './investors/investors.admin.controller';
import { PageModule } from './page/page.module';
import { PageAdminController } from './page/page.admin.controller';
import { MediaModule } from './media/media.module';
import { MediaAdminController } from './media/media.admin.controller';
import { FeaturesModule } from './features/features.module';
import { FeaturesAdminController } from './features/features.admin.controller';
import { SeoModule } from './seo/seo.module';
import { SeoAdminController } from './seo/seo.admin.controller';
import { RedirectUrlsModule } from './redirect_urls/redirect_urls.module';
import { PressReleasesModule } from './press-releases/press-releases.module';
import MailModule from './download-approval/mail.module';
import { QuarterlyModule } from './investor-new/Quaterly/Quaterly.module';
import { PresentationModule } from './investor-new/presentation/presentation.module';
import { FinincialModule } from './investor-new/finincial/finincial.module';
import { AnnualReportModule } from './investor-new/annualReport/annualReport.module';
import { AnnualReportDocModule } from './investor-new/annualReportDoc/annualReportDoc.module';
import { SubsidiariesModule } from './investor-new/subsidiaries/subsidiaries.module';
import { StockExchangeModule } from './investor-new/stockExchange/stockExchange.module';
import { GeneralMeetingModule } from './investor-new/generalMeeting/generalMeeting.module';
import { ShareHoldingPatternModule } from './investor-new/shareHoldingPattern/shareHoldingPattern.module';
import { DisclosureModule } from './investor-new/disclosure/disclosure.module';
import { ArchivesMoudle } from './investor-new/archives/archives.module';
import { UnclaimedDividendModule } from './investor-new/unclaimedDividend/unclaimedDividend.module';
import { TransferSharesModule } from './investor-new/transferShares/transferShares.module';
import { AnnualUnclaimedDividendModule } from './investor-new/annualUnclaimedDividend/annualUnclaimedDividend.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config as TypeOrmModuleOptions),
    AdminModule,
    RegionsModule,
    AboutusModule,
    BrandsModule,
    InvestorsModule,
    PageModule,
    MediaModule,
    FeaturesModule,
    SeoModule,
    RedirectUrlsModule,
    PressReleasesModule,
    MailModule,
    QuarterlyModule,
    PresentationModule,
    FinincialModule,
    AnnualReportModule,
    AnnualReportDocModule,
    SubsidiariesModule,
    StockExchangeModule,
    GeneralMeetingModule,
    ShareHoldingPatternModule,
    DisclosureModule,
    ArchivesMoudle,
    UnclaimedDividendModule,
    TransferSharesModule,
    AnnualUnclaimedDividendModule
  ],
  controllers: [
    AppController,
    RegionAdminController,
    AboutusAdminController,
    BrandsAdminController,
    InvestorsAdminController,
    PageAdminController,
    MediaAdminController,
    FeaturesAdminController,
    SeoAdminController,

  ],
  providers: [
    { provide: APP_GUARD, useClass: AdminGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    AppService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLogger).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
