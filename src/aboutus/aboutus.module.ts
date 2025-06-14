import { Module } from '@nestjs/common';
import { AboutusService } from './aboutus.service';
import { AboutusController } from './aboutus.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutusMember } from './entities/aboutus_member.entity';
import { Region } from 'src/regions/entities/region.entity';
import { Recognition } from './entities/aboutus_recognition.entity';
import { History } from './entities/aboutus_history.entity';
import { Sitemap } from 'src/seo/entities/seo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AboutusMember, Recognition, History, Region, Sitemap])],
  controllers: [AboutusController],
  providers: [AboutusService],
  exports: [AboutusService],
})
export class AboutusModule {}
