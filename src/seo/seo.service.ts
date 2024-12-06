import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
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

  async getSEODetail(page_id: number): Promise<Sitemap | null> {  
    return await this.seoRepository.findOne({
      where: { ref_id: page_id },
    });
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

  async getSearchDetail(query:string): Promise<any> {
    const sitemap = await this.seoRepository.find({
      where: { indexed:true },
    });
    const searcher = new FuzzySearch(sitemap, ['meta_title','meta_description'], { caseSensitive: false });
    return searcher.search(query);
  }
}
