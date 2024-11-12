import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Page } from './entities/page.entity';
import { LessThanOrEqual, Like, Repository } from 'typeorm';
import { PageContent } from './entities/page_content.entity';
import { Sitemap } from 'src/seo/entities/seo.entity';

@Injectable()
export class PageService {
  constructor(
    @InjectRepository(Page) private pageRepository: Repository<Page>,
    @InjectRepository(PageContent)
    private pageContentRepository: Repository<PageContent>,
    @InjectRepository(Sitemap)
    private seoRepository: Repository<Sitemap>,
  ) {}

  //get all pages
  async findAll(
    is_active: number,
    page?: number,
    limit?: number,
    search?: string,
  ): Promise<{
    pages: Page[];
    count: number;
  }> {
    if (search == undefined) {
      search = '';
    }
    if (page == undefined) {
      page = 1;
    }
    if (limit == undefined) {
      limit = 1000;
    }
    const queryBuilder = this.pageRepository.createQueryBuilder('page');

    if (is_active == 1) {
      queryBuilder.andWhere('page.is_active = :is_active', { is_active: true });
    } else if (is_active == 0) {
      queryBuilder.andWhere('page.is_active = :is_active', {
        is_active: false,
      });
    }

    if (search.trim() != '') {
      //break search into words and search for each word in name and meta_title and url
      const searchWords = search.trim().split(' ');
      for (let i = 0; i < searchWords.length; i++) {
        queryBuilder.andWhere(
          `page.name LIKE :search${i} OR page.meta_title LIKE :search${i} OR page.url LIKE :search${i}`,
          {
            [`search${i}`]: `%${searchWords[i]}%`,
          },
        );
      }
    }

    // Sorting by name in ascending order
    queryBuilder.orderBy('page.name', 'ASC');

    // Pagination with skip and take
    const skip = (page - 1) * limit;
    queryBuilder.skip(skip);
    queryBuilder.take(limit);

    const [pages, count] = await queryBuilder.getManyAndCount();
    return {
      pages: pages,
      count: count,
    };
  }

  //get page by id
  async findOne(id: number): Promise<Page | null> {
    return await this.pageRepository.findOne({
      where: { id: id },
      relations: ['page_contents'],
      order: { page_contents: { order: 'ASC' } },
    });
  }

  //get page by url
  async findOneByUrl(
    url: string,
    published?: boolean,
    is_active?: boolean,
    region?: string,
  ): Promise<Page | null> {
    if (published == undefined) {
      published = true;
    }
    if (is_active == undefined) {
      is_active = true;
    }
    let publishedWhere = {};
    if (published) {
      publishedWhere = {
        published_at: LessThanOrEqual(new Date()),
      };
    }
    return await this.pageRepository.findOne({
      where: {
        url: url,
        is_active: is_active,
        ...publishedWhere,
        page_contents: { is_active: true, region: Like('%' + region + '%') },
      },
      relations: ['page_contents'],
      order: { page_contents: { order: 'ASC' } },
    });
  }

  //create or update page
  async createOrUpdatePage(
    id: number,
    name: string,
    url: string,
    published_at: Date,
    is_active: boolean,
    page_contents: {
      id: number;
      reference_name: string;
      component_type: string;
      content: [];
      page_id: number;
      title: string;
      link: string;
      short_description: string;
      description: string;
      region: string[];
      order: number;
      is_active: boolean;
    }[],
    seo: {
      meta_title: string;
      meta_description: string;
      canonical_url: string;
      meta_image: { url: string; width: number; height: number } | null;
      indexed: boolean;
    },
  ): Promise<Page> {
    //check if page with same url already exists
    const pageWithSameUrl = await this.pageRepository.findOne({
      select: ['id'],
      where: { url: url },
    });
    if (pageWithSameUrl && pageWithSameUrl.id != id) {
      throw new BadRequestException('Page with same url already exists');
    }

    //check if page_contents are valid, component_type cannot be empty
    for (let i = 0; i < page_contents.length; i++) {
      if (page_contents[i].component_type == '') {
        throw new BadRequestException('Component type cannot be empty');
      }
    }

    let page: Page;
    let site: Sitemap | null = null;
    if (id > 0) {
      const record = await this.pageRepository.findOne({
        where: { id: id },
      });
      if (!record) {
        throw new BadRequestException('Page not found');
      }
      page = record;
      const seoRecord = await this.seoRepository.findOne({
        where: {ref_id: id},
      });
      if (seoRecord) {
        site= seoRecord;
      }
    } else {
      page = new Page();
      site = new Sitemap();
    }
    page.name = name;
    page.url = url;
    page.published_at = published_at;
    page.is_active = is_active;
    page = await this.pageRepository.save(page);
    if (site) {
      site.indexed = seo.indexed;
      site.meta_title = seo.meta_title;
      site.meta_description = seo.meta_description;
      site.meta_image = seo.meta_image;
      site.canonical_url = seo.canonical_url;
      site.ref = 'page';
      site.ref_id = id;
      await this.seoRepository.save(site);
    }

    for (let i = 0; i < page_contents.length; i++) {
      if (page_contents[i].id > 0) {
        const record = await this.pageContentRepository.findOne({
          where: { id: page_contents[i].id, page_id: page.id },
        });
        if (!record) {
          throw new BadRequestException('Page content not found');
        }
        record.reference_name = page_contents[i].reference_name;
        record.component_type = page_contents[i].component_type;
        record.content = page_contents[i].content;
        record.title = page_contents[i].title;
        record.link = page_contents[i].link;
        record.short_description = page_contents[i].short_description;
        record.description = page_contents[i].description;
        record.region = page_contents[i].region;
        record.order = page_contents[i].order;
        record.is_active = page_contents[i].is_active;
        await this.pageContentRepository.save(record);
      } else {
        const record = new PageContent();
        record.page_id = page.id;
        record.component_type = page_contents[i].component_type;
        record.content = page_contents[i].content;

        record.order = page_contents[i].order;
        record.reference_name = page_contents[i].reference_name;
        record.title = page_contents[i].title;
        record.link = page_contents[i].link;
        record.short_description = page_contents[i].short_description;
        record.description = page_contents[i].description;
        record.region = page_contents[i].region;
        record.is_active = page_contents[i].is_active;
        const u = await this.pageContentRepository.save(record);
        page_contents[i].id = u.id;
      }
    }
    if (page_contents.length == 0) {
      await this.pageContentRepository
        .createQueryBuilder()
        .delete()
        .from(PageContent)
        .where('page_id = :page_id', {
          page_id: page.id,
        })
        .execute();
    } else {
      await this.pageContentRepository
        .createQueryBuilder()
        .delete()
        .from(PageContent)
        .where('page_id = :page_id AND id NOT IN (:...ids)', {
          page_id: page.id,
          ids: page_contents.map((page_content) => page_content.id),
        })
        .execute();
    }

    return page;
  }
}
