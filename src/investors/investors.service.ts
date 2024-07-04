import { Injectable } from '@nestjs/common';
import { InvestorShareHolder } from './entities/investor_shareholder.entity';
import { InvestorAGM } from './entities/investor_agm.entity';
import { InvestorDividends } from './entities/investor_dividend.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { InvestorQUMaster } from './entities/investor_qu_master.entity';
import { QuartelyUpdate } from './entities/investor_qu_update.entity';

@Injectable()
export class InvestorsService {
  constructor(
    @InjectRepository(InvestorShareHolder)
    private readonly shareHolderRepository: Repository<InvestorShareHolder>,
    @InjectRepository(InvestorAGM)
    private readonly agmRepository: Repository<InvestorAGM>,
    @InjectRepository(InvestorDividends)
    private readonly dividendsRepository: Repository<InvestorDividends>,
    @InjectRepository(InvestorQUMaster)
    private readonly quRepository: Repository<InvestorQUMaster>,
    @InjectRepository(QuartelyUpdate)
    private readonly quPdfRepository: Repository<QuartelyUpdate>,
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

  async getDividends(search?: string): Promise<InvestorDividends[]> {
    if (search != null && search != '') {
      return await this.dividendsRepository.find({
        where: {
          url_title: Like('%' + search + '%'),
        },
      });
    } else {
      return await this.dividendsRepository.find({});
    }
  }

  async getDividendsById(id: number): Promise<InvestorDividends | null> {
    return await this.dividendsRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async addUpdateDividends(
    id: number,
    title: string,
    url_title: string,
    dividend_history: {
      url: string;
      width: number;
      height: number;
      alt: string;
    } | null,
    history_writeup: string,
    unclaimed_interim_dividends: {
      url: string;
      width: number;
      height: number;
      alt: string;
    } | null,
    unclaimed_interim_dividends_writeup: string,
    unclaimed_interim_dividends_year: string,
    unclaimed_dividends: {
      url: string;
      width: number;
      height: number;
      alt: string;
    } | null,
    unclaimed_dividends_writeup: string,
    unclaimed_dividends_year: string,
    transfer_shares_to_IEPF: {
      url: string;
      width: number;
      height: number;
      alt: string;
    } | null,
    transfer_shares_to_IEPF_writeup: string,
    transfer_shares_to_IEPF_year: string,
    forms_pdf: {
      url: string;
      width: number;
      height: number;
      alt: string;
    } | null,
  ): Promise<InvestorDividends> {
    if (id) {
      const dividend = await this.getDividendsById(id);
      if (dividend) {
        dividend.id = id;
        dividend.title = title;
        dividend.url_title = url_title;
        dividend.dividend_history = dividend_history;
        dividend.history_writeup = history_writeup;
        dividend.unclaimed_interim_dividends = unclaimed_interim_dividends;
        dividend.unclaimed_interim_dividends_writeup =
          unclaimed_interim_dividends_writeup;
        dividend.unclaimed_interim_dividends_year =
          unclaimed_interim_dividends_year;
        dividend.unclaimed_dividends = unclaimed_dividends;
        dividend.unclaimed_dividends_writeup = unclaimed_dividends_writeup;
        dividend.unclaimed_dividends_year = unclaimed_dividends_year;
        dividend.transfer_shares_to_IEPF = transfer_shares_to_IEPF;
        dividend.transfer_shares_to_IEPF_writeup =
          transfer_shares_to_IEPF_writeup;
        dividend.transfer_shares_to_IEPF_year = transfer_shares_to_IEPF_year;
        dividend.forms_pdf = forms_pdf;

        return this.dividendsRepository.save(dividend);
      }
      throw new Error('dividend not found');
    } else {
      const dividend = new InvestorDividends();

      dividend.id = id;
      dividend.title = title;
      dividend.url_title = url_title;
      dividend.dividend_history = dividend_history;
      dividend.history_writeup = history_writeup;
      dividend.unclaimed_interim_dividends = unclaimed_interim_dividends;
      dividend.unclaimed_interim_dividends_writeup =
        unclaimed_interim_dividends_writeup;
      dividend.unclaimed_interim_dividends_year =
        unclaimed_interim_dividends_year;
      dividend.unclaimed_dividends = unclaimed_dividends;
      dividend.unclaimed_dividends_writeup = unclaimed_dividends_writeup;
      dividend.unclaimed_dividends_year = unclaimed_dividends_year;
      dividend.transfer_shares_to_IEPF = transfer_shares_to_IEPF;
      dividend.transfer_shares_to_IEPF_writeup =
        transfer_shares_to_IEPF_writeup;
      dividend.transfer_shares_to_IEPF_year = transfer_shares_to_IEPF_year;
      dividend.forms_pdf = forms_pdf;
      return this.dividendsRepository.save(dividend);
    }
  }

  async getQU(search?: string): Promise<InvestorQUMaster[]> {
    if (search != null && search != '') {
      return await this.quRepository.find({
        where: {
          title: Like('%' + search + '%'),
        },
      });
    } else {
      return await this.quRepository.find({});
    }
  }

  async getQUById(id: number): Promise<InvestorQUMaster | null> {
    return await this.quRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async addUpdateQU(
    id: number,
    title: string,
    url_title: string,
    investor_qu_year: string,
    qu_year_sort: number,
  ): Promise<InvestorQUMaster> {
    if (id) {
      const qu = await this.getQUById(id);
      if (qu) {
        qu.id = id;
        qu.title = title;
        qu.url_title = url_title;
        qu.investor_qu_year = investor_qu_year;
        qu.qu_year_sort = qu_year_sort;

        return this.quRepository.save(qu);
      }
      throw new Error('qu not found');
    } else {
      const qu = new InvestorQUMaster();

      qu.title = title;
      qu.url_title = url_title;
      qu.investor_qu_year = investor_qu_year;
      qu.qu_year_sort = qu_year_sort;
      return this.quRepository.save(qu);
    }
  }

  async getQUPDFById(investor_qu_id: number): Promise<QuartelyUpdate[]> {
    return await this.quPdfRepository.find({
      where: {
        investor_qu_id: investor_qu_id,
      },
    });
  }

  async addUpdateQUPDFs(
    investor_qu_id: number,
    contexText: {
      investor_qu: string;
      investor_qu_pdf: string;
      qu_pdf: {
        url: string;
        width: number;
        height: number;
        alt: string;
      };
      sort_order: number;
    }[],
  ): Promise<QuartelyUpdate[]> {
    const qu_pdfs = await this.quPdfRepository.find({
      where: {
        investor_qu_id: investor_qu_id,
      },
    });
    if (qu_pdfs.length > 0) {
      await this.quPdfRepository.remove(qu_pdfs);
    }
    // add new image individually in table and return all images for product_id
    const newPDFs = contexText.map((pdf) => {
      const qu_pdfs = new QuartelyUpdate();
      qu_pdfs.investor_qu_id = investor_qu_id;
      qu_pdfs.investor_qu = pdf.investor_qu;
      qu_pdfs.investor_qu_pdf = pdf.investor_qu_pdf;
      qu_pdfs.qu_pdf = pdf.qu_pdf;
      qu_pdfs.sort_order = pdf.sort_order;
      return qu_pdfs;
    });
    return await this.quPdfRepository.save(newPDFs);
  }
}
