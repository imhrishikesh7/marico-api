import { Injectable } from '@nestjs/common';
import { InvestorShareHolder } from './entities/investor_shareholder.entity';
import { InvestorAGM } from './entities/investor_agm.entity';
import { InvestorDividends } from './entities/investor_dividend.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

@Injectable()
export class InvestorsService {
    constructor(
        @InjectRepository(InvestorShareHolder)
        private readonly shareHolderRepository: Repository<InvestorShareHolder>,
        @InjectRepository(InvestorAGM)
        private readonly agmRepository: Repository<InvestorAGM>,
        @InjectRepository(InvestorDividends)
        private readonly dividendRepository: Repository<InvestorDividends>,
      ) {}

    async getSHI(search?: string): Promise<InvestorShareHolder[]> {
        if (search != null && search != '') {
          return await this.shareHolderRepository.find({
            where: {
                investors_shi_title: Like('%' + search + '%'),
            },
          });
        } else {
          return await this.shareHolderRepository.find({});
        }
      }
    
      async getSHIById(id: number): Promise<InvestorShareHolder | null> {
        return await this.shareHolderRepository.findOne({
          where: {
            id: id,
          },
        });
      }

      async addUpdateSHI(
        id: number,
        title: string,
        url_title: string,
        investors_shi_title: string,
        investors_shi_pdf: {
          url: string;
          width: number;
          height: number;
          alt: string;
        } | null,
        shiRegions: string[],
        investors_shi_year: string,
        investors_shi_category: string,
        sort_order: number,
      ): Promise<InvestorShareHolder> {
        if (id) {
          const shi = await this.getSHIById(id);
          if (shi) {
            shi.id = id;
            shi.title = title;
            shi.url_title = url_title;
            shi.investors_shi_title = investors_shi_title;
            shi.investors_shi_pdf = investors_shi_pdf;
            shi.regions = shiRegions;
            shi.investors_shi_year = investors_shi_year;
            shi.investors_shi_category = investors_shi_category;
            shi.sort_order = sort_order;
    
            return this.shareHolderRepository.save(shi);
          }
          throw new Error('shi not found');
        } else {
          const shi = new InvestorShareHolder();
    
          shi.title = title;
          shi.url_title = url_title;
          shi.investors_shi_title = investors_shi_title;
          shi.investors_shi_pdf = investors_shi_pdf;
          shi.regions = shiRegions;
          shi.investors_shi_year = investors_shi_year;
          shi.investors_shi_category = investors_shi_category;
          shi.sort_order = sort_order;
          return this.shareHolderRepository.save(shi);
        }
      }

      async getAGM(search?: string): Promise<InvestorAGM[]> {
        if (search != null && search != '') {
          return await this.agmRepository.find({
            where: {
                agm_documentation_title: Like('%' + search + '%'),
            },
          });
        } else {
          return await this.agmRepository.find({});
        }
      }
    
      async getAGMById(id: number): Promise<InvestorAGM | null> {
        return await this.agmRepository.findOne({
          where: {
            id: id,
          },
        });
      }

      async addUpdateAGM(
        id: number,
        title: string,
        url_title: string,
        agm_documentation_title: string,
        agm_documentation_pdf: {
          url: string;
          width: number;
          height: number;
          alt: string;
        } | null,
        agmRegions: string[],
        investors_agm_category: string,
        sort_order: number,
      ): Promise<InvestorAGM> {
        if (id) {
          const agm = await this.getAGMById(id);
          if (agm) {
            agm.id = id;
            agm.title = title;
            agm.url_title = url_title;
            agm.agm_documentation_title = agm_documentation_title;
            agm.agm_documentation_pdf = agm_documentation_pdf;
            agm.agm_regions = agmRegions;
            agm.investors_agm_category = investors_agm_category;
            agm.sort_order = sort_order;
    
            return this.agmRepository.save(agm);
          }
          throw new Error('agm not found');
        } else {
          const agm = new InvestorAGM();
    
          agm.title = title;
          agm.url_title = url_title;
          agm.agm_documentation_title = agm_documentation_title;
          agm.agm_documentation_pdf = agm_documentation_pdf;
          agm.agm_regions = agmRegions;
          agm.investors_agm_category = investors_agm_category;
          agm.sort_order = sort_order;
          return this.agmRepository.save(agm);
        }
      }
}
