import { Module } from '@nestjs/common';
import { PageService } from './page.service';
import { PageController } from './page.controller';
import { Page } from './entities/page.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from 'src/regions/entities/region.entity';
import { PageContent } from './entities/page_content.entity';
import { AdminModule } from 'src/admin/admin.module';
  
@Module({
  imports: [TypeOrmModule.forFeature([Page, PageContent]), AdminModule],
  controllers: [PageController],
  providers: [PageService],
  exports: [PageService],
})
export class PageModule {}
