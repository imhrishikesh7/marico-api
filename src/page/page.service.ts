import { Injectable } from '@nestjs/common';
import { Pages } from './entities/page.entity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PageContent } from './entities/page_content.entity';

@Injectable()
export class PageService {
  constructor(
    @InjectRepository(Pages)
    private readonly pageRepository: Repository<Pages>,
    @InjectRepository(PageContent )
    private readonly pageContentRepository: Repository<PageContent>,
  ) {}

  async getPageList(search?: string): Promise<Pages[]> {
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
  
  async getPageById(id: number): Promise<Pages | null> {
    return await this.pageRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async addUpdatePage(
    id: number,
    name: string,
    url: string,
    page_title: string,
    page_description: string,
    canonical_url: string,
    shareimage_json: {
      url: string;
      width: number;
      height: number;
      alt: string;
    } | null,
    indexable: boolean,
  ): Promise<Pages> {
    if (id) {
      const page = await this.getPageById(id);
      // const sitemap = await this.getPageSitemapById(id);
      if (page) {
        page.id = id;
        page.name = name;
        page.url = url;
        // page.page_title = page_title;
        // page.page_description = page_description;
        // page.canonical_url = canonical_url;
        // page.shareimage_json = shareimage_json;
        // page.indexable = indexable;

        return this.pageRepository.save(page);
      }
      throw new Error('page not found');
    } else {
      const page = new Pages();

      page.name = name;
      page.url = url;
      // page.page_title = page_title;
      // page.page_description = page_description;
      // page.canonical_url = canonical_url;
      // page.shareimage_json = shareimage_json;
      // page.indexable = indexable;
      return this.pageRepository.save(page);
    }
  }
  
  async getPageContent(search?: string): Promise<PageContent[]> {
    if (search != null && search != '') {
      return await this.pageContentRepository.find({
        where: {
          page_ref: Like('%' + search + '%'),
        },
      });
    } else {
      return await this.pageContentRepository.find({});
    }
  }

  async getContentByPageId(page_ref_id: number): Promise<PageContent | null> {
    return await this.pageContentRepository.findOne({
      where: {
        page_ref_id: page_ref_id,
      },
    });
  }
   
}
