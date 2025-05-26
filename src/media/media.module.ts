import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from './entities/media.entity';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { MediaAdminController } from './media.admin.controller';
import { Region } from 'src/regions/entities/region.entity';
import { Sitemap } from 'src/seo/entities/seo.entity';
import { PressRelease } from './entities/press-release.entity';
import { Spotlight } from './entities/spotlight.entity';
import { MediaNewService } from './media-new.service';
import { MediaNewController } from './media-new.controller';
import { RegionsModule } from 'src/regions/regions.module';
import { MediaNew } from './entities/medianew.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ MediaNew,Media, Region, Sitemap, PressRelease, Spotlight]),
    RegionsModule,
  ],
  controllers: [MediaController, MediaAdminController, MediaNewController],
  providers: [MediaService, MediaNewService],
  exports: [MediaService, MediaNewService],
})
export class MediaModule {}
