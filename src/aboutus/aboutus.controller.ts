import { Controller, Get, Param, Query } from '@nestjs/common';
import { AboutusService } from './aboutus.service';
import { AboutusMember } from './entities/aboutus_member.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { History } from './entities/aboutus_history.entity';
import { Recognition } from './entities/aboutus_recognition.entity';
import { PageService } from 'src/page/page.service';

@Controller(':region/about-us')
export class AboutusController {
  constructor(
    private readonly aboutusService: AboutusService,
    private readonly pageService: PageService,
  ) {}

  @ApiBearerAuth()
  @Get('leadership')
  async getLeadership(
    @Param('region') region: string,
  ): Promise<AboutusMember[]> {
    return await this.aboutusService.getMembers(region, 'leadership');
  }

  @ApiBearerAuth()
  @Get('board-of-directors')
  async getDirectors(
    @Param('region') region: string,
  ): Promise<{ bod: AboutusMember[]; pdfs: any[] }> {
    const bod = await this.aboutusService.getMembers(
      region,
      'board-of-directors',
    );

    const pdfs = await this.pageService.findOneByUrl(
      'about-us/board-of-directors',
      true,
      true,
      region,
    );

    return {
      bod,
      pdfs: pdfs ? [pdfs] : [],
    };
  }

  @ApiBearerAuth()
  @Get('history')
  async getHistory(@Param('region') region: string): Promise<History[]> {
    return await this.aboutusService.getHistories(region);
  }

  @ApiBearerAuth()
  @Get('marico-recognition/:category')
  async getRecognition(
    @Param('region') region: string,
    @Param('category') category: string,
  ): Promise<Recognition[]> {
    return await this.aboutusService.getRecognition(region, category);
  }
}
