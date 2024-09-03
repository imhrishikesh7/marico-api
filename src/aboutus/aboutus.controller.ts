import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { AboutusService } from './aboutus.service';
import { AboutusMember } from './entities/aboutus_member.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { History } from './entities/aboutus_history.entity';
import { Recognition } from './entities/aboutus_recognition.entity';

@Controller(':region/about_us')
export class AboutusController {
  constructor(private readonly aboutusService: AboutusService) {}

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
  ): Promise<AboutusMember[]> {
    return await this.aboutusService.getMembers(region, 'board-of-directors');
  }

  @ApiBearerAuth()
  @Get('history')
  async getHistory(
    @Param('region') region: string,
  ): Promise<History[]> {
    return await this.aboutusService.getHistories(region);
  }

  @ApiBearerAuth()
  @Get('marico-recognition?category=:category')
  async getRecognition(
    @Param('region') region: string,
    @Param('category') category: string,
  ): Promise<Recognition[]> {
    return await this.aboutusService.getRecognition(region, category);
  }
}
