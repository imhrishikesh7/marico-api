import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOperator, Like, Repository } from 'typeorm';
import { Sitemap } from './entities/seo.entity';
import { Contact } from './entities/contact.entity';
import * as FuzzySearch from 'fuzzy-search';

@Injectable()
export class SeoService {
  constructor(
    @InjectRepository(Sitemap)
    private seoRepository: Repository<Sitemap>,
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
  ) {}

  async findOne(page_id: number, ref: string): Promise<Sitemap | null> {
    return await this.seoRepository.findOne({
      where: { ref_id: page_id, ref: Like(ref), indexed: true },
    });
  }

  async getSEODetail(ref: string): Promise<Sitemap | null> {
    return await this.seoRepository.findOne({
      where: { ref: ref },
    });
  }

  async getSitemapById(id: number): Promise<Sitemap | null> {
    return await this.seoRepository.findOne({
      where: { id: id },
    });
  }

  async getSEO(search: string): Promise<Sitemap[]> {
    const where: {
      meta_title?: FindOperator<string>;
    } = {};
    if (search) {
      where.meta_title = Like('%' + search + '%');
    }
    return await this.seoRepository.find({
      where,
    });
  }

  async addUpdateSitemap(
    id: number,
    ref: string,
    ref_id: number,
    meta_title: string,
    meta_description: string,
    canonical_url: string,
    meta_image: {
      url: string;
      width: number;
      height: number;
      alt: string;
    } | null,
    indexed: boolean,
  ): Promise<Sitemap> {
    if (id) {
      const sitemap = await this.seoRepository.findOne({
        where: {
          id: id,
        },
      });
      if (sitemap) {
        sitemap.ref = ref;
        sitemap.ref_id = ref_id;
        sitemap.meta_title = meta_title;
        sitemap.meta_description = meta_description;
        sitemap.canonical_url = canonical_url;
        sitemap.meta_image = meta_image;
        sitemap.indexed = indexed;
        return this.seoRepository.save(sitemap);
      }
      throw new Error('seo not found');
    } else {
      const sitemap = new Sitemap();

      sitemap.ref = ref;
      sitemap.ref_id = ref_id;
      sitemap.meta_title = meta_title;
      sitemap.meta_description = meta_description;
      sitemap.canonical_url = canonical_url;
      sitemap.meta_image = meta_image;
      sitemap.indexed = indexed;
      return this.seoRepository.save(sitemap);
    }
  }

  async addContactUS(
    name: string,
    email: string,
    phone: string,
    address: string,
    query_type: string,
    query: string,
  ): Promise<Contact> {
    const contact = new Contact();
    contact.name = name;
    contact.email = email;
    contact.phone = phone;
    contact.address = address;
    contact.query_type = query_type;
    contact.query = query;
    return await this.contactRepository.save(contact);
  }

  async getSearchDetail(query: string): Promise<Sitemap[]> {
    const sitemap = await this.seoRepository.find({
      where: { indexed: true },
    });
    const searcher = new FuzzySearch(sitemap, ['meta_title', 'meta_description'], {
      caseSensitive: false,
    });
    return searcher.search(query);
  }

  async getSitemapDetail(): Promise<Sitemap[]> {
    const sitemap = await this.seoRepository.find();

    const updatedSitemap = sitemap.map(item => {
      // Extract the canonical URL from the item
      let { canonical_url } = item;

      if (canonical_url.includes('.pdf')) {
        // Find the index of '/investorspdf' in the URL
        const pdfIndex = canonical_url.indexOf('/investorspdf');
        if (pdfIndex !== -1) {
          // Trim everything before '/investorspdf' and append base URL
          canonical_url = `${canonical_url.substring(pdfIndex)}`;
        }
      }

      return { ...item, canonical_url };
    });

    // Remove duplicates by using a Set
    const uniqueSitemap = updatedSitemap.filter(
      (item, index, self) => index === self.findIndex(t => t.canonical_url === item.canonical_url),
    );
    return uniqueSitemap;
  }
}
