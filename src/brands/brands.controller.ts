import { Controller, Get, Param } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Brand } from './entities/brand.entity';
import { Tvc } from './entities/tvc.entity';
import { PrintAd } from './entities/print_ad.entity';

@Controller(':region/brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @ApiBearerAuth()
  @Get('')
  async getBrandDetail(@Param('region') region: string): Promise<Brand[]> {
    return await this.brandsService.getBrandDetail(region);
  }

  @ApiBearerAuth()
  @Get('/menu')
  async getBrandMenuDetail(
    @Param('region') region: string,
  ): Promise<{ name: string; link: string }[]> {
    return await this.brandsService.getBrandMenuDetail(region);
  }

  @ApiBearerAuth()
  @Get('/:alias')
  async getBrandByAlias(
    @Param('region') region: string,
    @Param('alias') alias: string,
  ): Promise<{
    brand: Brand | null;
    subBrands?: {
      subBrand: Brand;
      tvcs: Tvc[];
      printAds: PrintAd[];
    }[];
    tvcs: Tvc[];
    printAds: PrintAd[];
  }> {
    return await this.brandsService.getBrandByAlias(region, alias);
  }
}
