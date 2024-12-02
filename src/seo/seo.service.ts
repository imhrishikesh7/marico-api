import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Sitemap } from './entities/seo.entity';
import { Contact } from './entities/contact.entity';

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
      where: { ref_id: page_id, ref: Like(ref) },
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
}
