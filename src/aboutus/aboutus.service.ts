import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AboutusMember } from './entities/aboutus_member.entity';
import { FindOperator, Like, Repository } from 'typeorm';
import { Recognition } from './entities/aboutus_recognition.entity';
import { History } from './entities/aboutus_history.entity';
import { Region } from 'src/regions/entities/region.entity';
import { Sitemap } from 'src/seo/entities/seo.entity';

@Injectable()
export class AboutusService {
  constructor(
    @InjectRepository(AboutusMember)
    private readonly aboutUsRepository: Repository<AboutusMember>,
    @InjectRepository(Recognition)
    private readonly recognitionRepository: Repository<Recognition>,
    @InjectRepository(History)
    private readonly historyRepository: Repository<History>,
    @InjectRepository(Region)
    private readonly regionRepository: Repository<Region>,
    @InjectRepository(Sitemap)
    private readonly seoRepository: Repository<Sitemap>,
  ) {}

  async getMemberList(search?: string): Promise<AboutusMember[]> {
    if (search != null && search != '') {
      return await this.aboutUsRepository.find({
        where: {
          name: Like('%' + search + '%'),
        },
      });
    } else {
      return await this.aboutUsRepository.find({});
    }
  }

  async getMembers(
    region?: string,
    role?: string,
  ): Promise<{ members: AboutusMember[]; seo: Sitemap | null }> {
    const where: Record<string, FindOperator<string> | boolean> = {};
    if (region != null && region != '') {
      const regionName = await this.regionRepository.findOne({
        where: {
          alias: region,
        },
      });

      if (regionName != null) {
        where.regions = Like('%' + regionName.id + '%');
      }
    }
    where.is_active = true;
    if (role != null && role != '') {
      where.type = Like('%' + role + '%'); // Using In operator for multiple roles
    }
    let members = await this.aboutUsRepository.find({
      where,
    });
    const seoRecord = await this.seoRepository.findOne({
      where: { ref_id: 0, ref: Like('%' + role + '%') },
    });

    return {
      members,
      seo: seoRecord,
    };
  }

  async getMemberById(id: number): Promise<AboutusMember | null> {
    return await this.aboutUsRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  //update member
  async addUpdateMember(
    id: number,
    name: string,
    position: string,
    memberType: string[],
    description: string,
    thumbnail: {
      url: string;
      width: number;
      height: number;
      alt: string;
    } | null,
    memberRegions: string[],
    is_active: boolean,
  ): Promise<AboutusMember> {
    if (id) {
      const member = await this.getMemberById(id);
      if (member) {
        member.id = id;
        member.name = name;
        member.position = position;
        member.type = memberType;
        member.description = description;
        member.thumbnail = thumbnail;
        member.regions = memberRegions;
        member.is_active = is_active;
        return this.aboutUsRepository.save(member);
      }
      throw new Error('Member not found');
    } else {
      const member = new AboutusMember();

      member.name = name;
      member.position = position;
      member.type = memberType;
      member.description = description;
      member.thumbnail = thumbnail;
      member.regions = memberRegions;
      member.is_active = is_active;
      return await this.aboutUsRepository.save(member);
    }
  }

  async getAwardList(search?: string): Promise<Recognition[]> {
    const where: {
      award_title?: FindOperator<string>;
    } = {};
    if (search != null && search != '') {
      where.award_title = Like('%' + search + '%');
    }
    return await this.recognitionRepository.find({
      where,
    });
  }

  async getRecognition(
    region?: string,
    category?: string,
    yearfliter?: string,
  ): Promise<{ recognition: Recognition[]; seo: Sitemap | null }> {
    const where: Record<string, FindOperator<string> | boolean> = {};
    if (region != null && region != '') {
      const regionName = await this.regionRepository.findOne({
        where: {
          alias: region,
        },
      });

      if (regionName != null) {
        where.regions = Like('%' + regionName.id + '%');
      }
    }
    if (category != null && category != '') {
      where.category = Like('%' + category + '%');
    }
    if (yearfliter != null && yearfliter != '') {
      where.year = Like('%' + yearfliter + '%');
    }
    where.is_active = true;
    let recognition = await this.recognitionRepository.find({
      where,
    });
    const seoRecord = await this.seoRepository.findOne({
      where: { ref_id: 0, ref: Like('recognition') },
    });

    return {
      recognition,
      seo: seoRecord,
    };
  }
  async getAwardById(id: number): Promise<Recognition | null> {
    return await this.recognitionRepository.findOne({
      where: {
        id: id,
      },
      order: {
        year: 'DESC',
      },
    });
  }

  async addUpdateAward(
    id: number,
    url_title: string,
    thumbnail: {
      url: string;
      width: number;
      height: number;
      alt: string;
    } | null,
    award_title: string,
    year: string,
    description: string,
    category: string,
    is_featured: boolean,
    awardRegions: string[],
    is_active: boolean,
  ): Promise<Recognition> {
    if (id) {
      const recognition = await this.getAwardById(id);
      if (recognition) {
        recognition.id = id;
        recognition.url_title = url_title;
        recognition.thumbnail = thumbnail;
        recognition.award_title = award_title;
        recognition.year = year;
        recognition.description = description;
        recognition.category = category;
        recognition.is_featured = is_featured;
        recognition.regions = awardRegions;
        recognition.is_active = is_active;
        return this.recognitionRepository.save(recognition);
      }
      throw new Error('Recognition not found');
    } else {
      const recognition = new Recognition();

      recognition.url_title = url_title;
      recognition.thumbnail = thumbnail;
      recognition.award_title = award_title;
      recognition.year = year;
      recognition.description = description;
      recognition.category = category;
      recognition.is_featured = is_featured;
      recognition.regions = awardRegions;
      recognition.is_active = is_active;
      return this.recognitionRepository.save(recognition);
    }
  }

  async getHistory(search?: string): Promise<History[]> {
    if (search != null && search != '') {
      return await this.historyRepository.find({
        where: {
          history_title: Like('%' + search + '%'),
        },
      });
    } else {
      return await this.historyRepository.find({});
    }
  }

  async getHistories(region?: string): Promise<{history: History[], seo:Sitemap|null}> {
    const where: Record<string, FindOperator<string> | boolean> = {};
    if (region != null && region != '') {
      const regionName = await this.regionRepository.findOne({
        where: {
          alias: region,
        },
      });

      if (regionName != null) {
        where.regions = Like('%' + regionName.id + '%');
      }
    }
    where.is_active = true;
    let history = await this.historyRepository.find({
      where,
    });
    const seoRecord = await this.seoRepository.findOne({
      where: { ref_id: 0, ref: Like('history') },
    });

    return {
      history,
      seo: seoRecord,
    };
  }

  async getHistoryById(id: number): Promise<History | null> {
    return await this.historyRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async addUpdateHistory(
    id: number,
    title: string,
    url_title: string,
    thumbnail: {
      url: string;
      width: number;
      height: number;
      alt: string;
    } | null,
    history_title: string,
    year: string,
    // description: string,
    historyRegions: string[],
    sort_order: number,
    is_active: boolean,
  ): Promise<History> {
    if (id) {
      const history = await this.getHistoryById(id);
      if (history) {
        history.id = id;
        history.title = title;
        history.url_title = url_title;
        history.thumbnail = thumbnail;
        history.history_title = history_title;
        history.year = year;
        // history.description = description;
        history.regions = historyRegions;
        history.sort_order = sort_order;
        history.is_active = is_active;

        return this.historyRepository.save(history);
      }
      throw new Error('History not found');
    } else {
      const history = new History();

      history.title = title;
      history.url_title = url_title;
      history.thumbnail = thumbnail;
      history.history_title = history_title;
      history.year = year;
      // history.description = description;
      history.regions = historyRegions;
      history.sort_order = sort_order;
      history.is_active = is_active;
      return this.historyRepository.save(history);
    }
  }
}
