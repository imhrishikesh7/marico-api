import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOperator, Like, Repository } from 'typeorm';
import { PressRelease } from './entities/press-release.entity';
import { Spotlight } from './entities/spotlight.entity';
import { Region } from 'src/regions/entities/region.entity';
import { Sitemap } from 'src/seo/entities/seo.entity';

@Injectable()
export class MediaNewService {
  constructor(
    @InjectRepository(PressRelease)
    private readonly pressReleaseRepository: Repository<PressRelease>,
    @InjectRepository(Spotlight)
    private readonly spotlightRepository: Repository<Spotlight>,
    @InjectRepository(Region)
    private readonly regionRepository: Repository<Region>,
    @InjectRepository(Sitemap)
    private readonly seoRepository: Repository<Sitemap>,
  ) {}

  async getPressReleases(search?: string): Promise<PressRelease[]> {
    if (search) {
      return await this.pressReleaseRepository.find({
        where: {
          media_title: Like(`%${search}%`),
        },
        order: {
          release_date: 'DESC',
          sort_order: 'ASC',
        },
      });
    }
    return await this.pressReleaseRepository.find({
      order: {
        release_date: 'DESC',
        sort_order: 'ASC',
      },
    });
  }

  async getSpotlights(search?: string): Promise<Spotlight[]> {
    if (search) {
      return await this.spotlightRepository.find({
        where: {
          media_title: Like(`%${search}%`),
        },
        order: {
          release_date: 'DESC',
          sort_order: 'ASC',
        },
      });
    }
    return await this.spotlightRepository.find({
      order: {
        release_date: 'DESC',
        sort_order: 'ASC',
      },
    });
  }

  async getPressReleaseById(id: number): Promise<PressRelease | null> {
    return await this.pressReleaseRepository.findOne({
      where: { id },
    });
  }

  async getSpotlightById(id: number): Promise<Spotlight | null> {
    return await this.spotlightRepository.findOne({
      where: { id },
    });
  }

  async addUpdatePressRelease(
    id: number | null,
    media_title: string,
    author: string,
    publisher_logo: string,
    publisher_name: string,
    subtitle: string,
    media_regions: string[],
    release_date: Date,
    external_link: string,
    kv_image: {
      url: string;
      width: number;
      height: number;
      alt: string;
    } | null,
    pressReleaseFile: {
      url: string;
    } | null,
    annexureFile: {
      url: string;
    } | null,
    sort_order: number,
    is_latest: boolean,
  ): Promise<PressRelease> {
    if (id) {
      const pressRelease = await this.getPressReleaseById(id);
      if (!pressRelease) {
        throw new Error('Press release not found');
      }

      pressRelease.media_title = media_title;
      // pressRelease.author = author;
      // pressRelease.publisher_logo = publisher_logo;
      // pressRelease.publisher_name = publisher_name;
      pressRelease.subtitle = subtitle;
      pressRelease.media_regions = media_regions;
      pressRelease.release_date = release_date;
      pressRelease.external_link = external_link;
      pressRelease.kv_image = kv_image;
      pressRelease.pressReleaseFile = pressReleaseFile;
      pressRelease.annexureFile = annexureFile;
      pressRelease.sort_order = sort_order;
      pressRelease.is_latest = is_latest;

      return await this.pressReleaseRepository.save(pressRelease);
    }

    const pressRelease = this.pressReleaseRepository.create({
      media_title,
      // author,
      // publisher_logo,
      // publisher_name,
      subtitle,
      media_regions,
      release_date,
      external_link,
      kv_image,
      pressReleaseFile,
      annexureFile,
      sort_order,
      is_latest,
    });

    return await this.pressReleaseRepository.save(pressRelease);
  }

  async addUpdateSpotlight(
    id: number | null,
    media_title: string,
    author: string,
    publisher_logo: string,
    publisher_name: string,
    subtitle: string,
    media_regions: string[],
    release_date: Date,
    external_link: string,
    kv_image: {
      url: string;
      width: number;
      height: number;
      alt: string;
    } | null,
    video: {
      url: string;
    } | null,
    sort_order: number,
    is_latest: boolean,
  ): Promise<Spotlight> {
    if (id) {
      const spotlight = await this.getSpotlightById(id);
      if (!spotlight) {
        throw new Error('Spotlight not found');
      }

      spotlight.media_title = media_title;
      spotlight.author = author;
      spotlight.publisher_logo = publisher_logo;
      spotlight.publisher_name = publisher_name;
      spotlight.subtitle = subtitle;
      spotlight.media_regions = media_regions;
      spotlight.release_date = release_date;
      spotlight.external_link = external_link;
      spotlight.kv_image = kv_image;
      spotlight.video = video;
      spotlight.sort_order = sort_order;
      spotlight.is_latest = is_latest;

      return await this.spotlightRepository.save(spotlight);
    }

    const spotlight = this.spotlightRepository.create({
      media_title,
      author,
      publisher_logo,
      publisher_name,
      subtitle,
      media_regions,
      release_date,
      external_link,
      kv_image,
      video,
      sort_order,
      is_latest,
    });

    return await this.spotlightRepository.save(spotlight);
  }

  async getMediaByRegion(
    region: string,
    type: 'press-release' | 'spotlight',
  ): Promise<{
    result: (PressRelease | Spotlight)[];
    seo: Sitemap | null;
  }> {
    const where: {
      media_regions?: FindOperator<string>;
    } = {};

    if (region) {
      const regionName = await this.regionRepository.findOne({
        where: {
          alias: region,
        },
      });

      if (regionName) {
        where.media_regions = Like(`%${regionName.id}%`);
      }
    }

    const repository = type === 'press-release' ? this.pressReleaseRepository : this.spotlightRepository;
    const result = await repository.find({
      where,
      order: {
        release_date: 'DESC',
        sort_order: 'ASC',
      },
    });

    const seoRecord = await this.seoRepository.findOne({
      where: { ref_id: 0, ref: Like(`%${type}%`), indexed: true },
    });

    return {
      result,
      seo: seoRecord,
    };
  }
} 