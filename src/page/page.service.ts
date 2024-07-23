import { Injectable } from '@nestjs/common';
import { Page } from './entities/page.entity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PageService {
  constructor(
    @InjectRepository(Page)
    private readonly pageRepository: Repository<Page>,
  ) {}

  async getPageList(search?: string): Promise<Page[]> {
    if (search != null && search != '') {
      return await this.pageRepository.find({
        where: {
          name: Like('%' + search + '%'),
        },
      });
    } else {
      return await this.pageRepository.find({});
    }
  }

  async getPageById(id: number): Promise<Page | null> {
    return await this.pageRepository.findOne({
      where: {
        id: id,
      },
    });
  }
}
