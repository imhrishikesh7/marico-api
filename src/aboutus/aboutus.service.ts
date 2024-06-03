import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AboutusMember } from './entities/aboutus_member.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class AboutusService {
  constructor(
    @InjectRepository(AboutusMember)
    private readonly aboutUsRepository: Repository<AboutusMember>,
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
      member.is_active = is_active;
      return await this.aboutUsRepository.save(member);
    }
  }
}
