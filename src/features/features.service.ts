import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TitleCategory } from './entities/feature.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class FeaturesService {
  constructor(
    @InjectRepository(TitleCategory)
    private readonly titleCategoryRepository: Repository<TitleCategory>,
  ) {}

  async getTitleCategory(search?: string): Promise<TitleCategory[]> {
    if (search != null && search != '') {
      return await this.titleCategoryRepository.find({
        where: {
          category_title: Like('%' + search + '%'),
        },
      });
    } else {
      return await this.titleCategoryRepository.find({});
    }
  }
  async getTitleCategoryById(id: number): Promise<TitleCategory | null> {
    return await this.titleCategoryRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async getTitleCategoryDropdownBySubmenu(
    sub_menu: string,
  ): Promise<TitleCategory[] | null> {
    return await this.titleCategoryRepository.find({
      where: {
        sub_menu: Like('%' + sub_menu + '%'),
      },
    });
  }

  async addUpdateTitleCategory(
    id: number,
    menu: string,
    sub_menu: string,
    category_title: string,
    is_active: boolean,
    qr_title?: string,
    qr_link?: string,
  ): Promise<TitleCategory> {
    if (id) {
      const head = await this.getTitleCategoryById(id);
      if (head) {
        head.id = id;
        head.menu = menu;
        head.sub_menu = sub_menu;
        head.category_title = category_title;
        head.is_active = is_active;
        head.qr_title = qr_title ? qr_title : '';
        head.qr_link = qr_link ? qr_link : '';

        return this.titleCategoryRepository.save(head);
      }
      throw new Error('head not found');
    } else {
      const head = new TitleCategory();

      head.menu = menu;
      head.sub_menu = sub_menu;
      head.category_title = category_title;
      head.is_active = is_active;
      head.qr_title = qr_title ? qr_title : '';
      head.qr_link = qr_link ? qr_link : '';

      return this.titleCategoryRepository.save(head);
    }
  }
}
