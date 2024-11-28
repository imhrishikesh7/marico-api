import { Module } from '@nestjs/common';
import { PageService } from './page.service';
import { PageController } from './page.controller';
import { Page } from './entities/page.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageContent } from './entities/page_content.entity';
import { AdminModule } from 'src/admin/admin.module';
import { Sitemap } from 'src/seo/entities/seo.entity';
import { SeoService } from 'src/seo/seo.service';
import { BrandsService } from 'src/brands/brands.service';
import { Brand } from 'src/brands/entities/brand.entity';
import { PrintAd } from 'src/brands/entities/print_ad.entity';
import { Tvc } from 'src/brands/entities/tvc.entity';
import { Region } from 'src/regions/entities/region.entity';
import { Contact } from 'src/seo/entities/contact.entity';
import { MediaService } from 'src/media/media.service';
import { Media } from 'src/media/entities/media.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Page,
      PageContent,
      Sitemap,
      Contact,
      Brand,
      Tvc,
      PrintAd,
      Region,
      Media,
    ]),
    AdminModule,
  ],
  controllers: [PageController],
  providers: [PageService, SeoService, BrandsService, MediaService],
  exports: [PageService, SeoService, BrandsService, MediaService],
})
export class PageModule {}
