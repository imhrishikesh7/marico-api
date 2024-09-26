import { Injectable } from '@nestjs/common';
import { InvestorShareHolder } from './entities/investor_shareholder.entity';
import { InvestorAGM } from './entities/investor_agm.entity';
import { InvestorDividends } from './entities/investor_dividend.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { InvestorQUMaster } from './entities/investor_qu_master.entity';
import { QuartelyUpdate } from './entities/investor_qu_update.entity';
import { Sustainability } from './entities/investor_sustainability.entity';
import { InvestorSchedule } from './entities/investor_schedule.entity';
import { CorporateGovernance } from './entities/investor_cogevernance.entity';
import { InformationUpdate } from './entities/investor_iu.entity';
import { InvestorPlacement } from './entities/investor_placement.entity';
import { InvestorContact } from './entities/investor_contact.entity';
import { InvestorPSI } from './entities/investor_psi.entity';

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
    @InjectRepository(Sustainability)
    private readonly sustainabilityRepository: Repository<Sustainability>,
    @InjectRepository(InvestorSchedule)
    private readonly scheduleRepository: Repository<InvestorSchedule>,
    @InjectRepository(CorporateGovernance)
    private readonly cgRepository: Repository<CorporateGovernance>,
    @InjectRepository(InformationUpdate)
    private readonly iuRepository: Repository<InformationUpdate>,
    @InjectRepository(InvestorPlacement)
    private readonly pdRepository: Repository<InvestorPlacement>,
    @InjectRepository(InvestorContact)
    private readonly icRepository: Repository<InvestorContact>,
    @InjectRepository(InvestorPSI)
    private readonly psiRepository: Repository<InvestorPSI>,
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

  async getSHIDetail(region?: string): Promise<InvestorShareHolder[]> {
    const where: any = {};

    if (region != null && region != '') {
      where.regions = Like('%' + region + '%');
    }

    return await this.shareHolderRepository.find({
      where,
    });
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
    investors_shi_pdf: string,
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
      console.log(shi);
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

  async getAGMDetail(region?: string): Promise<InvestorAGM[]> {
    const where: any = {};

    if (region != null && region != '') {
      where.agm_regions = Like('%' + region + '%');
    }

    return await this.agmRepository.find({
      where,
    });
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
    agm_documentation_pdf: string,
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

  async getSustainability(search?: string): Promise<Sustainability[]> {
    if (search != null && search != '') {
      return await this.sustainabilityRepository.find({
        where: {
          title: Like('%' + search + '%'),
        },
      });
    } else {
      return await this.sustainabilityRepository.find({});
    }
  }

  async getSustainabilityDetail(region?: string): Promise<Sustainability[]> {
    const where: any = {};

    if (region != null && region != '') {
      where.sustain_regions = Like('%' + region + '%');
    }

    return await this.sustainabilityRepository.find({
      where,
    });
  }

  async getSustainabilityById(id: number): Promise<Sustainability | null> {
    return await this.sustainabilityRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async addUpdateSustainability(
    id: number,
    title: string,
    url_title: string,
    sustainability_title: string,
    sustain_documentation_pdf: {
      url: string;
      width: number;
      height: number;
      alt: string;
    } | null,
    sustainRegions: string[],
    sort_order: number,
  ): Promise<Sustainability> {
    if (id) {
      const sustainability = await this.getSustainabilityById(id);
      if (sustainability) {
        sustainability.id = id;
        sustainability.title = title;
        sustainability.url_title = url_title;
        sustainability.sustainability_title = sustainability_title;
        sustainability.sustain_documentation_pdf = sustain_documentation_pdf;
        sustainability.sustain_regions = sustainRegions;
        sustainability.sort_order = sort_order;

        return this.sustainabilityRepository.save(sustainability);
      }
      throw new Error('sustainability not found');
    } else {
      const sustainability = new Sustainability();

      sustainability.title = title;
      sustainability.url_title = url_title;
      sustainability.sustainability_title = sustainability_title;
      sustainability.sustain_documentation_pdf = sustain_documentation_pdf;
      sustainability.sustain_regions = sustainRegions;
      sustainability.sort_order = sort_order;
      return this.sustainabilityRepository.save(sustainability);
    }
  }

  async getSchedule(search?: string): Promise<InvestorSchedule[]> {
    if (search != null && search != '') {
      return await this.scheduleRepository.find({
        where: {
          title: Like('%' + search + '%'),
        },
      });
    } else {
      return await this.scheduleRepository.find({});
    }
  }

  async getScheduleById(id: number): Promise<InvestorSchedule | null> {
    return await this.scheduleRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async addUpdateSchedule(
    id: number,
    title: string,
    url_title: string,
    schedule_analyst_meet_pdf: {
      url: string;
      width: number;
      height: number;
      alt: string;
    } | null,
    schedule_analyst_meet_year: string,
  ): Promise<InvestorSchedule> {
    if (id) {
      const schedule = await this.getScheduleById(id);
      if (schedule) {
        schedule.id = id;
        schedule.title = title;
        schedule.url_title = url_title;
        schedule.schedule_analyst_meet_pdf = schedule_analyst_meet_pdf;
        schedule.schedule_analyst_meet_year = schedule_analyst_meet_year;

        return this.scheduleRepository.save(schedule);
      }
      throw new Error('schedule not found');
    } else {
      const schedule = new InvestorSchedule();

      schedule.title = title;
      schedule.url_title = url_title;
      schedule.schedule_analyst_meet_pdf = schedule_analyst_meet_pdf;
      schedule.schedule_analyst_meet_year = schedule_analyst_meet_year;
      return this.scheduleRepository.save(schedule);
    }
  }

  async getCG(search?: string): Promise<CorporateGovernance[]> {
    if (search != null && search != '') {
      return await this.cgRepository.find({
        where: {
          title: Like('%' + search + '%'),
        },
      });
    } else {
      return await this.cgRepository.find({});
    }
  }

  async getCGDetail(region?: string): Promise<CorporateGovernance[]> {
    const where: any = {};

    if (region != null && region != '') {
      where.cg_regions = Like('%' + region + '%');
    }

    return await this.cgRepository.find({
      where,
    });
  }

  async getCGById(id: number): Promise<CorporateGovernance | null> {
    return await this.cgRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async addUpdateCG(
    id: number,
    title: string,
    url_title: string,
    documentation_cg_title: string,
    documentation_cg_pdf: string,
    documentation_cg_category: string,
    cgRegions: string[],
    sort_order: number,
  ): Promise<CorporateGovernance> {
    if (id) {
      const cg = await this.getCGById(id);
      if (cg) {
        cg.id = id;
        cg.title = title;
        cg.url_title = url_title;
        cg.documentation_cg_title = documentation_cg_title;
        cg.documentation_cg_pdf = documentation_cg_pdf;
        cg.documentation_cg_category = documentation_cg_category;
        cg.cg_regions = cgRegions;
        cg.sort_order = sort_order;

        return this.cgRepository.save(cg);
      }
      throw new Error('Corporate Governance not found');
    } else {
      const cg = new CorporateGovernance();

      cg.title = title;
      cg.url_title = url_title;
      cg.documentation_cg_title = documentation_cg_title;
      cg.documentation_cg_pdf = documentation_cg_pdf;
      cg.documentation_cg_category = documentation_cg_category;
      cg.cg_regions = cgRegions;
      cg.sort_order = sort_order;
      return this.cgRepository.save(cg);
    }
  }

  async getIU(search?: string): Promise<InformationUpdate[]> {
    if (search != null && search != '') {
      return await this.iuRepository.find({
        where: {
          title: Like('%' + search + '%'),
        },
      });
    } else {
      return await this.iuRepository.find({});
    }
  }

  async getIUDetail(region?: string): Promise<InformationUpdate[]> {
    const where: any = {};

    if (region != null && region != '') {
      where.iu_regions = Like('%' + region + '%');
    }

    return await this.iuRepository.find({
      where,
    });
  }

  async getIUById(id: number): Promise<InformationUpdate | null> {
    return await this.iuRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async addUpdateIU(
    id: number,
    title: string,
    url_title: string,
    documentation_iu_title: string,
    iu_documentation_pdf: {
      url: string;
      width: number;
      height: number;
      alt: string;
    } | null,
    iuRegions: string[],
    sort_order: number,
  ): Promise<InformationUpdate> {
    if (id) {
      const iu = await this.getIUById(id);
      if (iu) {
        iu.id = id;
        iu.title = title;
        iu.url_title = url_title;
        iu.documentation_iu_title = documentation_iu_title;
        iu.iu_documentation_pdf = iu_documentation_pdf;
        iu.iu_regions = iuRegions;
        iu.sort_order = sort_order;

        return this.iuRepository.save(iu);
      }
      throw new Error('information not found');
    } else {
      const iu = new InformationUpdate();

      iu.title = title;
      iu.url_title = url_title;
      iu.documentation_iu_title = documentation_iu_title;
      iu.iu_documentation_pdf = iu_documentation_pdf;
      iu.iu_regions = iuRegions;
      iu.sort_order = sort_order;
      return this.iuRepository.save(iu);
    }
  }

  async getPD(search?: string): Promise<InvestorPlacement[]> {
    if (search != null && search != '') {
      return await this.pdRepository.find({
        where: {
          title: Like('%' + search + '%'),
        },
      });
    } else {
      return await this.pdRepository.find({});
    }
  }

  async getPDById(id: number): Promise<InvestorPlacement | null> {
    return await this.pdRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async addUpdatePD(
    id: number,
    title: string,
    url_title: string,
    documentation_pd_title: string,
    pd_documentation_pdf: {
      url: string;
      width: number;
      height: number;
      alt: string;
    } | null,
    pdRegions: string[],
    sort_order: number,
  ): Promise<InvestorPlacement> {
    if (id) {
      const pd = await this.getPDById(id);
      if (pd) {
        pd.id = id;
        pd.title = title;
        pd.url_title = url_title;
        pd.documentation_pd_title = documentation_pd_title;
        pd.pd_documentation_pdf = pd_documentation_pdf;
        pd.pd_regions = pdRegions;
        pd.sort_order = sort_order;

        return this.pdRepository.save(pd);
      }
      throw new Error('pd not found');
    } else {
      const pd = new InvestorPlacement();

      pd.title = title;
      pd.url_title = url_title;
      pd.documentation_pd_title = documentation_pd_title;
      pd.pd_documentation_pdf = pd_documentation_pdf;
      pd.pd_regions = pdRegions;
      pd.sort_order = sort_order;
      return this.pdRepository.save(pd);
    }
  }

  async getIC(search?: string): Promise<InvestorContact[]> {
    if (search != null && search != '') {
      return await this.icRepository.find({
        where: {
          title: Like('%' + search + '%'),
        },
      });
    } else {
      return await this.icRepository.find({});
    }
  }

  async getICById(id: number): Promise<InvestorContact | null> {
    return await this.icRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async addUpdateIC(
    id: number,
    title: string,
    url_title: string,
    ic_contact_info: string,
    icRegions: string[],
    sort_order: number,
  ): Promise<InvestorContact> {
    if (id) {
      const ic = await this.getICById(id);
      if (ic) {
        ic.id = id;
        ic.title = title;
        ic.url_title = url_title;
        ic.ic_contact_info = ic_contact_info;
        ic.ic_regions = icRegions;
        ic.sort_order = sort_order;

        return this.icRepository.save(ic);
      }
      throw new Error('Contact not found');
    } else {
      const ic = new InvestorContact();

      ic.title = title;
      ic.url_title = url_title;
      ic.ic_contact_info = ic_contact_info;
      ic.ic_regions = icRegions;
      ic.sort_order = sort_order;
      return this.icRepository.save(ic);
    }
  }

  async getPSI(search?: string): Promise<InvestorPSI[]> {
    if (search != null && search != '') {
      return await this.psiRepository.find({
        where: {
          documentation_psi_title: Like('%' + search + '%'),
        },
      });
    } else {
      return await this.psiRepository.find({});
    }
  }

  async getPSIById(id: number): Promise<InvestorPSI | null> {
    return await this.psiRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async addUpdatePSI(
    id: number,
    title: string,
    url_title: string,
    documentation_psi_title: string,
    psi_documentation_pdf: {
      url: string;
      width: number;
      height: number;
      alt: string;
    } | null,
    psiregions: string[],
    psi_category: string,
    sort_order: number,
  ): Promise<InvestorPSI> {
    if (id) {
      const psi = await this.getPSIById(id);
      if (psi) {
        psi.id = id;
        psi.title = title;
        psi.url_title = url_title;
        psi.documentation_psi_title = documentation_psi_title;
        psi.psi_documentation_pdf = psi_documentation_pdf;
        psi.psi_regions = psiregions;
        psi.psi_category = psi_category;
        psi.sort_order = sort_order;

        return this.psiRepository.save(psi);
      }
      throw new Error('psi not found');
    } else {
      const psi = new InvestorPSI();

      psi.title = title;
      psi.url_title = url_title;
      psi.documentation_psi_title = documentation_psi_title;
      psi.psi_documentation_pdf = psi_documentation_pdf;
      psi.psi_regions = psiregions;
      psi.psi_category = psi_category;
      psi.sort_order = sort_order;
      return this.psiRepository.save(psi);
    }
  }
}
