import { Controller, Get, Param, Query } from '@nestjs/common';
import { AboutusService } from './aboutus.service';
import { AboutusMember } from './entities/aboutus_member.entity';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { History } from './entities/aboutus_history.entity';
import { Recognition } from './entities/aboutus_recognition.entity';
import { Sitemap } from 'src/seo/entities/seo.entity';

@Controller(':region/about-us')
export class AboutusController {
  constructor(private readonly aboutusService: AboutusService) {}

  @ApiBearerAuth()
  @Get('leadership')
  async getLeadership(@Param('region') region: string): Promise<{members: AboutusMember[], seo: Sitemap|null}> {
    return await this.aboutusService.getMembers(region, 'leadership');
  }

  @ApiBearerAuth()
  @Get('board-of-directors')
  async getDirectors(@Param('region') region: string): Promise<{members: AboutusMember[], seo: Sitemap|null}> {
    return await this.aboutusService.getMembers(region, 'board-of-directors');
  }

  @ApiBearerAuth()
  @Get('history')
  async getHistory(@Param('region') region: string): Promise<{history: History[], seo:Sitemap|null}> {
    return await this.aboutusService.getHistories(region);
  }

  @ApiBearerAuth()
  @Get('marico-recognition')
  @ApiQuery({
    name: 'category',
    required: true,
  })
  @ApiQuery({
    name: 'year',
    required: false,
    description: 'An optional parameter',
  })
  async getRecognition(
    @Param('region') region: string,
    @Query('category') category: string,
    @Query('year') year?: string,
  ): Promise<{recognition: Recognition[], seo:Sitemap|null}> {
    return await this.aboutusService.getRecognition(region, category, year);
  }
}
