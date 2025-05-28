import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PressRelease } from '../media/entities/press-release.entity';
import { CreatePressReleaseDto } from '../media/dto/create-press-release.dto';
import { UpdatePressReleaseDto } from '../media/dto/update-press-release.dto';

@Injectable()
export class PressReleaseService {
  constructor(
    @InjectRepository(PressRelease)
    private readonly pressReleaseRepo: Repository<PressRelease>,
  ) {}

  async create(dto: CreatePressReleaseDto) {
    const pressRelease = this.pressReleaseRepo.create(dto);
    const saved = await this.pressReleaseRepo.save(pressRelease);
    return {
      success: true,
      message: 'Press release created successfully',
      data: saved,
    };
  }

  async findAll() {
    const result = await this.pressReleaseRepo.find({
      order: { release_date: 'DESC' },
    });
    return {
      success: true,
      message: 'All press releases fetched',
      data: result,
    };
  }

  async findOne(id: number) {
    const item = await this.pressReleaseRepo.findOneBy({ id });
    return {
      success: !!item,
      message: item ? 'Press release found' : 'Not found',
      data: item,
    };
  }

  async update(id: number, dto: UpdatePressReleaseDto) {
    await this.pressReleaseRepo.update(id, dto);
    const updated = await this.pressReleaseRepo.findOneBy({ id });
    return {
      success: true,
      message: 'Press release updated',
      data: updated,
    };
  }

  async remove(id: number) {
    await this.pressReleaseRepo.delete(id);
    return {
      success: true,
      message: 'Press release deleted',
    };
  }

  async findFiltered(year?: string, month?: string, search?: string) {
    const query = this.pressReleaseRepo.createQueryBuilder('press');

    if (year) {
      query.andWhere('YEAR(press.release_date) = :year', { year: parseInt(year) });
    }

    if (month) {
      query.andWhere('MONTH(press.release_date) = :month', { month: parseInt(month) });
    }

    if (search) {
      query.andWhere('LOWER(press.media_title) LIKE :search', {
        search: `%${search.toLowerCase()}%`,
      });
    }

    query.orderBy('press.release_date', 'DESC');

    const result = await query.getMany();

    return {
      success: true,
      message: 'Filtered press releases fetched successfully',
      data: result,
    };
  }
}



// import { Injectable } from '@nestjs/common';
// import { pressReleases } from 'src/dummy-data/press-releases-new/press-releases-new';
// interface NewsContentBlock {
//   type: 'paragraph' | 'subhead';
//   value: string;
// }

// interface VideoData {
//   src: string;
//   alt: string;
//   link: string;
// }

// interface NewsItem {
//   id: string;
//   title: string;
//   subtitle: string;
//   date: string;
//   year: string;
//   month: string;
//   image: string;
//   slider: string[];
//   video: VideoData;
//   content: NewsContentBlock[];
//   press_link: string;
//   annexure_link: string;
// }

// @Injectable()
// export class PressReleaseService {
//     private pressReleases = pressReleases;

//     getPressReleases(year?: string, month?: string, search?: string) {
//       if (month === '0') month = ''; 
//       if (year === '0') year = ''; 
    
//       console.log("Filtering with:", { year, month, search });
    
//       const result = (!year && !month && !search)
//         ? this.pressReleases
//         : this.pressReleases.filter((press) =>
//             (!year || press.year === year) &&
//             (!month || press.month === month) &&
//             (!search || press.title.toLowerCase().includes(search.toLowerCase()))
//         );
    
//       return {
//         success: true,
//         message: "Request successful",
//         data: result,
//       };
//     }
    
    
  
//   getPressDetails(id: string) {
//     return this.pressReleases.find((press:NewsItem) => press.id === id);
//   }
// }