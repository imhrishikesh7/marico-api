import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Like, Repository } from 'typeorm';
import { Region } from './entities/region.entity';
import { Utility } from 'src/lib/utility';

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Region)
    private readonly regionRepository: Repository<Region>,
  ) {}

  async getRegionList(search?: string): Promise<Region[]> {
    const where: any = {};
    if (search) {
      where.name = search;
    }
    const regions = await this.regionRepository.find({
      where,
    });

    return regions;
  }

  async getRegions(): Promise<Region[]> {
    const regions = await this.regionRepository.find({
      where: {
        is_active: true,
      },
      order: {
        sort_order: 'ASC',
      },
    });

    return regions;
  }

  async getRegionById(id: number): Promise<Region | null> {
    return await this.regionRepository.findOne({
      where: {
        id: id,
      },
    });
  }
  // add-update product
  async addUpdateRegion(
    id: number,
    name: string,
    alias: string,
    thumbnail: {
      url: string;
      width: number;
      height: number;
      alt: string;
    } | null,
    is_active: boolean,
    sort_order: number,
  ): Promise<Region> {
    const generatedAlias = Utility.slugify(name);
    if (id) {
      const region = await this.regionRepository.findOne({
        where: {
          id: id,
        },
      });
      if (region) {
        region.name = name;
        region.alias = alias;
        region.thumbnail = thumbnail;
        region.is_active = is_active;
        region.sort_order = sort_order;
        return this.regionRepository.save(region);
      }
      throw new Error('Region not found');
    } else {
      const region = new Region();

      region.name = name;
      region.alias = alias;
      region.thumbnail = thumbnail;
      region.is_active = is_active;
      region.sort_order = sort_order;
      return this.regionRepository.save(region);
    }
  }
}
