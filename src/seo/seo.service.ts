import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sitemap } from './entities/seo.entity';

@Injectable()
export class SeoService {
    constructor(
        @InjectRepository(Sitemap)
        private seoRepository: Repository<Sitemap>,
      ) {}

      async findOne(page_id: number): Promise<Sitemap | null> {
        return await this.seoRepository.findOne({
          where: { ref_id: page_id },
        });
      }
}
