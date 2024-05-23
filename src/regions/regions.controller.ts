import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RegionsService } from './regions.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Region } from './entities/region.entity';

@Controller('regions')
export class RegionsController {
  constructor(private readonly regionService: RegionsService) {}

 
  @ApiBearerAuth()
  @Get('')
  async getRegionList(): Promise<Region[]> {
    return await this.regionService.getRegionList();
  }

}
