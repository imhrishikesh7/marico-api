import { Module } from '@nestjs/common';
import { PageService } from './page.service';
import { PageController } from './page.controller';
import { Pages } from './entities/page.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from 'src/regions/entities/region.entity';
import { PageContent } from './entities/page_content.entity';
  
@Module({
  imports: [TypeOrmModule.forFeature([Pages, PageContent])],
  controllers: [PageController],
  providers: [PageService],
  exports: [PageService],
})
export class PageModule {}
