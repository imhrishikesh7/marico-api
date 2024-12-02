import { Injectable } from '@nestjs/common';
import { Media } from './entities/media.entity';
import { LessThanOrEqual, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Region } from 'src/regions/entities/region.entity';
import { Sitemap } from 'src/seo/entities/seo.entity';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
    @InjectRepository(Region)
    private readonly regionRepository: Repository<Region>,
    @InjectRepository(Sitemap)
    private seoRepository: Repository<Sitemap>,
  ) {}

  async getMedia(search?: string): Promise<Media[]> {
    if (search != null && search != '') {
      return await this.mediaRepository.find({
        where: {
          media_title: Like('%' + search + '%'),
        },
      });
    } else {
      return await this.mediaRepository.find({});
    }
  }

  async getFrontNewsDetail(region?: string): Promise<Media | null> {
    const where: any = {};

    if (region != null && region != '') {
      const regionName = await this.regionRepository.findOne({
        where: {
          alias: region,
        },
      });

      if (regionName != null) {
        where.media_regions = Like('%' + regionName.id + '%');
      }
    }
    where.is_latest = true;
    where.category = Like('marico-in-the-news');
    return await this.mediaRepository.findOne({
      where,
    });
  }

  async getMediaById(id: number): Promise<Media | null> {
    return await this.mediaRepository.findOne({
      where: {
        id: id,
      },
    });
  }
  async getMediaByCategory(
    region?: string,
    category?: string,
    yearfliter?: string,
  ): Promise<{ result: Media[]; seo: any }> {
    const where: any = {};

    if (region != null && region != '') {
      const regionName = await this.regionRepository.findOne({
        where: {
          alias: region,
        },
      });

      if (regionName != null) {
        where.media_regions = Like('%' + regionName.id + '%');
      }
    }
    if (yearfliter != null && yearfliter != '') {
      where.year = Like('%' + yearfliter + '%');
    }
    where.category = Like('%' + category + '%');
    const result = await this.mediaRepository.find({
      where,
    });

    const seoRecord = await this.seoRepository.findOne({
      where: { ref_id: 0, ref: Like('shareholder-info'), indexed: true },
    });

    // Return the result and SEO data
    return {
      result,
      seo: seoRecord,
    };
  }

  async addUpdateMedia(
    id: number,
    category: string,
    media_title: string,
    url_title: string,
    description: string,
    media_pdf: string,
    year: string,
    media_regions: string[],
    release_date: Date,
    external_link: string,
    small_image: {
      url: string;
      width: number;
      height: number;
      alt: string;
    } | null,
    thumbnail: {
      url: string;
      width: number;
      height: number;
      alt: string;
    } | null,
    marico_img: {
      url: string;
      width: number;
      height: number;
      alt: string;
    } | null,
    sort_order: number,
    is_latest: boolean,
  ): Promise<Media> {
    if (id) {
      const media = await this.getMediaById(id);
      if (media) {
        media.id = id;
        media.category = category;
        media.media_title = media_title;
        media.url_title = url_title;
        media.description = description;
        media.media_pdf = media_pdf;
        media.year = year;
        media.media_regions = media_regions;
        media.release_date = release_date;
        media.external_link = external_link;
        media.small_image = small_image;
        media.thumbnail = thumbnail;
        media.marico_img = marico_img;
        media.sort_order = sort_order;
        media.is_latest = is_latest;

        return this.mediaRepository.save(media);
      }
      throw new Error('media not found');
    } else {
      const media = new Media();

      media.category = category;
      media.media_title = media_title;
      media.url_title = url_title;
      media.description = description;
      media.media_pdf = media_pdf;
      media.year = year;
      media.media_regions = media_regions;
      media.release_date = release_date;
      media.external_link = external_link;
      media.small_image = small_image;
      media.thumbnail = thumbnail;
      media.marico_img = marico_img;
      media.sort_order = sort_order;
      media.is_latest = is_latest;
      return this.mediaRepository.save(media);
    }
  }
}
