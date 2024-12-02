import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { Media } from './entities/media.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from 'src/regions/entities/region.entity';
import { Sitemap } from 'src/seo/entities/seo.entity';
import { Contact } from 'src/seo/entities/contact.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Media, Region, Sitemap, Contact])],
  controllers: [MediaController],
  providers: [MediaService],
  exports: [MediaService],
})
export class MediaModule {}
