import { Injectable } from '@nestjs/common';
import { Media } from './entities/media.entity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
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
  ): Promise<Media[]> {
    const where: any = {};

    if (region != null && region != '') {
      where.cg_regions = Like('%' + region + '%');
    }
    where.category = Like('%' + category + '%');
    return await this.mediaRepository.find({
      where,
    });
  }

  async addUpdateMedia(
    id: number,
    category: string,
    media_title: string,
    url_title: string,
    description: string,
    media_pdf: string,
    year: string,
    mediaRegions: string[],
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
        media.media_regions = mediaRegions;
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
      media.release_date = release_date;
      media.media_regions = mediaRegions;
      media.sort_order = sort_order;
      media.is_latest = is_latest;
      return this.mediaRepository.save(media);
    }
  }
}
