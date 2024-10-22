import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Brand } from './entities/brand.entity';

@Controller(':region/brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @ApiBearerAuth()
  @Get('')
  async getBrandDetail(
    @Param('region') region: string,
  ): Promise<Brand[]> {
    return await this.brandsService.getBrandDetail(region);
  }

  @ApiBearerAuth()
  @Get('/:alias')
  async getBrandByAlias(
    @Param('region') region: string,
    @Param('alias') alias: string,
  ): Promise<{ brand: Brand | null; subBrands?: Brand[] }> {
    return await this.brandsService.getBrandByAlias(region,alias);
  }

  
}
