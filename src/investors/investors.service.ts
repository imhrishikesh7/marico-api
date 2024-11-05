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
import { InvestorAR } from './entities/investor_ar.entity';
import { InvestorDR } from './entities/investor_dr.entity';

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
    @InjectRepository(InvestorAR)
    private readonly arRepository: Repository<InvestorAR>,
    @InjectRepository(InvestorDR)
    private readonly drRepository: Repository<InvestorDR>,
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

    const shi = await this.shareHolderRepository.find({
      where,
      order: {
        investors_shi_year: 'DESC',
      },
    });

    const groupedByCategory = shi.reduce(
      (acc: any, item: InvestorShareHolder) => {
        const category = item.investors_shi_category;
        const subcategory = item.investors_shi_year;

        // If the category doesn't exist, initialize it
        if (!acc[category]) {
          acc[category] = {
            category: category,
            subcategories: subcategory ? [] : undefined,
            pdfs: subcategory ? undefined : [],
          };
        }

        if (subcategory) {
          const subcategoryIndex = acc[category].subcategories.findIndex(
            (sub: any) => sub.subcategory === subcategory,
          );

          if (subcategoryIndex === -1) {
            acc[category].subcategories.push({
              subcategory: subcategory,
              pdfs: [],
            });
          }

          const sub = acc[category].subcategories.find(
            (sub: any) => sub.subcategory === subcategory,
          );

          sub.pdfs.push({
            pdf_title: item.investors_shi_title,
            pdf: item.investors_shi_pdf,
            id: item.id,
            title: item.title,
            url_title: item.url_title,
            regions: item.regions,
            sort_order: item.sort_order,
            created_at: item.created_at,
            updated_at: item.updated_at,
          });
        } else {
          acc[category].pdfs.push({
            pdf_title: item.investors_shi_title,
            pdf: item.investors_shi_pdf,
            id: item.id,
            title: item.title,
            url_title: item.url_title,
            regions: item.regions,
            sort_order: item.sort_order,
            created_at: item.created_at,
            updated_at: item.updated_at,
          });
        }

        return acc;
      },
      {},
    );

    const result = Object.values(groupedByCategory).map((item: any) => {
      if (!item.subcategories) {
        delete item.subcategories;
      }
      return item;
    });

    return result;
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
          pdf_title: Like('%' + search + '%'),
        },
      });
    } else {
      return await this.dividendsRepository.find({});
    }
  }

  async getDividendsDetail(region?: string): Promise<any[]> {
    const where: any = {};

    // Filter by region if provided
    if (region) {
      where.dividend_regions = Like(`%${region}%`);
    }

    // Fetch dividends from repository
    const dividends = await this.dividendsRepository.find({
      where,
      order: {
        dividends_year: 'DESC',
      },
    });

    // Group the data
    const groupedData = dividends.reduce(
      (acc: any, item: InvestorDividends) => {
        const category = item.investors_dividend_category;
        const subcategory =
          item.investors_dividend_subcategory !== ''
            ? item.investors_dividend_subcategory
            : item.dividends_year;
        const supersubcategory =
          item.investors_dividend_subcategory !== ''
            ? item.dividends_year
            : undefined;

        // Find or create category
        let categoryObj = acc.find((c: any) => c.category === category);
        if (!categoryObj) {
          categoryObj = {
            category,
            subcategories: [],
            pdfs: [],
          };
          acc.push(categoryObj);
        }

        // If subcategory exists
        if (subcategory) {
          let subcategoryObj = categoryObj.subcategories.find(
            (sub: any) => sub.subcategory === subcategory,
          );
          if (!subcategoryObj) {
            subcategoryObj = {
              subcategory,
              supersubcategories: [],
              pdfs: [],
            };
            categoryObj.subcategories.push(subcategoryObj);
          }

          // If supersubcategory exists
          if (supersubcategory) {
            let supersubcategoryObj = subcategoryObj.supersubcategories.find(
              (superSub: any) => superSub.supersubcategory === supersubcategory,
            );
            if (!supersubcategoryObj) {
              supersubcategoryObj = {
                supersubcategory,
                pdfs: [],
              };
              subcategoryObj.supersubcategories.push(supersubcategoryObj);
            }

            // Push PDFs into supersubcategory
            supersubcategoryObj.pdfs.push({
              id: item.id,
              pdf_title: item.pdf_title,
              url_title: item.url_title,
              pdf: item.pdf,
              writeup: item.writeup,
              dividends_year: item.dividends_year,
              dividend_regions: item.dividend_regions,
              sort_order: item.sort_order,
              created_at: item.created_at,
              updated_at: item.updated_at,
            });
          } else {
            // Push PDFs into subcategory directly if no supersubcategory
            subcategoryObj.pdfs.push({
              id: item.id,
              pdf_title: item.pdf_title,
              url_title: item.url_title,
              pdf: item.pdf,
              writeup: item.writeup,
              dividends_year: item.dividends_year,
              dividend_regions: item.dividend_regions,
              sort_order: item.sort_order,
              created_at: item.created_at,
              updated_at: item.updated_at,
            });
          }
        } else {
          // If no subcategory, push PDFs directly into the category
          categoryObj.pdfs.push({
            id: item.id,
            pdf_title: item.pdf_title,
            url_title: item.url_title,
            pdf: item.pdf,
            writeup: item.writeup,
            dividends_year: item.dividends_year,
            dividend_regions: item.dividend_regions,
            sort_order: item.sort_order,
            created_at: item.created_at,
            updated_at: item.updated_at,
          });
        }

        return acc;
      },
      [],
    );

    return groupedData.map((category: any) => {
      if (category.subcategories.length === 0) {
        delete category.subcategories;
      } else {
        category.subcategories = category.subcategories.map((subcat: any) => {
          if (subcat.supersubcategories.length === 0) {
            delete subcat.supersubcategories;
            delete category.pdfs;
          } else {
            delete category.pdfs;
            delete subcat.pdfs;
          }

          return subcat;
        });
      }
      return category;
    });
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
    investors_dividend_category: string,
    investors_dividend_subcategory: string,
    pdf_title: string,
    url_title: string,
    pdf: string,
    writeup: string,
    dividends_year: string,
    dividendRegions: string[],
    sort_order: number,
  ): Promise<InvestorDividends> {
    if (id) {
      const dividend = await this.getDividendsById(id);
      if (dividend) {
        dividend.id = id;
        dividend.investors_dividend_category = investors_dividend_category;
        dividend.investors_dividend_subcategory =
          investors_dividend_subcategory;
        dividend.pdf_title = pdf_title;
        dividend.url_title = url_title;
        dividend.pdf = pdf;
        dividend.writeup = writeup;
        dividend.dividends_year = dividends_year;
        dividend.dividend_regions = dividendRegions;
        dividend.sort_order = sort_order;

        return this.dividendsRepository.save(dividend);
      }
      throw new Error('dividend not found');
    } else {
      const dividend = new InvestorDividends();

      dividend.investors_dividend_category = investors_dividend_category;
      dividend.investors_dividend_subcategory = investors_dividend_subcategory;
      dividend.pdf_title = pdf_title;
      dividend.url_title = url_title;
      dividend.pdf = pdf;
      dividend.writeup = writeup;
      dividend.dividends_year = dividends_year;
      dividend.dividend_regions = dividendRegions;
      dividend.sort_order = sort_order;
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

  async getQUALL(qu_region?: string): Promise<any> {
    const qu = await this.quRepository.find({
      order: { investor_qu_year: 'DESC' },
    });

    const qupdfs = await this.quPdfRepository.find({
      where: {
        ...(qu_region && { qu_region: Like(`%${qu_region}%`) }),
      },
    });

    type PDF = {
      investor_qu_id: number;
      investor_qu: string;
      investor_qu_pdf: string;
      pdf_title: string;
      pdf: string;
      qu_region: string[];
      sort_order: number;
    };

    type Subcategory = {
      subcategory: string;
      pdfs: PDF[];
    };

    type Category = {
      category: string;
      subcategories: Subcategory[];
    };

    const pdfs: PDF[] = qupdfs.map((pdf) => ({
      investor_qu_id: pdf.investor_qu_id,
      investor_qu: pdf.investor_qu,
      investor_qu_pdf: pdf.investor_qu_pdf,
      pdf_title: pdf.title,
      pdf: pdf.qu_pdf,
      qu_region: pdf.qu_region,
      sort_order: pdf.sort_order,
    }));

    const structuredData = qu.reduce<Category[]>((acc, currQu) => {
      const { investor_qu_year, id } = currQu;

      let category = acc.find((c) => c.category === investor_qu_year);
      if (!category) {
        category = {
          category: investor_qu_year,
          subcategories: [
            { subcategory: 'q1', pdfs: [] },
            { subcategory: 'q2', pdfs: [] },
            { subcategory: 'q3', pdfs: [] },
            { subcategory: 'q4', pdfs: [] },
          ],
        };
        acc.push(category);
      }

      const pdfsForQu = pdfs.filter((pdf) => pdf.investor_qu_id === id);

      pdfsForQu.forEach((pdf) => {
        const quarterIndex = `${pdf.investor_qu}`;
        const subcategory = category!.subcategories.find(
          (subcat) => subcat.subcategory === quarterIndex,
        );

        if (subcategory) {
          subcategory.pdfs.push(pdf);
        }
      });

      return acc;
    }, []);

    return structuredData;
  }

  async addUpdateQUPDFs(
    investor_qu_id: number,
    contexText: {
      investor_qu: string;
      investor_qu_pdf: string;
      title: string;
      qu_pdf: string;
      qu_region: string[];
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
      qu_pdfs.title = pdf.title;
      qu_pdfs.qu_pdf = pdf.qu_pdf;
      qu_pdfs.qu_region = pdf.qu_region;
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

  async getScheduleDetail(region?: string): Promise<InvestorSchedule[]> {
    const where: any = {};
    if (region != null && region != '') {
      where.region = Like('%' + region + '%');
    }

    return await this.scheduleRepository.find({
      where,
      order: {
        schedule_analyst_meet_year: 'DESC',
      },
    });
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
    schedule_analyst_meet_pdf: string,
    schedule_analyst_meet_year: string,
    scheduleRegion: string[],
  ): Promise<InvestorSchedule> {
    if (id) {
      const schedule = await this.getScheduleById(id);
      if (schedule) {
        schedule.id = id;
        schedule.title = title;
        schedule.url_title = url_title;
        schedule.schedule_analyst_meet_pdf = schedule_analyst_meet_pdf;
        schedule.schedule_analyst_meet_year = schedule_analyst_meet_year;
        schedule.region = scheduleRegion;

        return this.scheduleRepository.save(schedule);
      }
      throw new Error('schedule not found');
    } else {
      const schedule = new InvestorSchedule();

      schedule.title = title;
      schedule.url_title = url_title;
      schedule.schedule_analyst_meet_pdf = schedule_analyst_meet_pdf;
      schedule.schedule_analyst_meet_year = schedule_analyst_meet_year;
      schedule.region = scheduleRegion;

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
    iu_documentation_pdf: string,
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

  async getPDDetail(region?: string): Promise<InvestorPlacement[]> {
    const where: any = {};

    if (region != null && region != '') {
      where.pd_regions = Like('%' + region + '%');
    }

    return await this.pdRepository.find({
      where,
    });
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
    pd_documentation_pdf: string,
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

  async getICDetail(region?: string): Promise<InvestorContact[]> {
    const where: any = {};

    if (region != null && region != '') {
      where.ic_regions = Like('%' + region + '%');
    }

    return await this.icRepository.find({
      where,
    });
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

  async getPSIDetail(region?: string): Promise<InvestorPSI[]> {
    const where: any = {};

    if (region != null && region != '') {
      where.psi_regions = Like('%' + region + '%');
    }

    return await this.psiRepository.find({
      where,
    });
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
    psi_documentation_pdf: string,
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

  async getAR(search?: string): Promise<InvestorAR[]> {
    if (search != null && search != '') {
      return await this.arRepository.find({
        where: {
          ar_documentation_title: Like('%' + search + '%'),
        },
      });
    } else {
      return await this.arRepository.find({});
    }
  }

  async getARDetail(region?: string): Promise<InvestorAR[]> {
    const where: any = {};

    if (region != null && region != '') {
      where.ar_regions = Like('%' + region + '%');
    }

    const AR = await this.arRepository.find({
      where,
      order: {
        ar_documentation_year: 'DESC',
      },
    });
    const groupedByCategory = AR.reduce((acc: any, item: InvestorAR) => {
      const category =
        item.ar_documentation_year !== ''
          ? item.ar_documentation_year
          : item.investors_ar_category;
      const subcategory =
        item.ar_documentation_year !== ''
          ? item.investors_ar_category
          : undefined;

      // If the category doesn't exist, initialize it
      if (!acc[category]) {
        acc[category] = {
          category: category,
          subcategories: subcategory ? [] : undefined,
          pdfs: subcategory ? undefined : [],
        };
      }

      if (subcategory) {
        const subcategoryIndex = acc[category].subcategories.findIndex(
          (sub: any) => sub.subcategory === subcategory,
        );

        if (subcategoryIndex === -1) {
          acc[category].subcategories.push({
            subcategory: subcategory,
            pdfs: [],
          });
        }

        const sub = acc[category].subcategories.find(
          (sub: any) => sub.subcategory === subcategory,
        );

        sub.pdfs.push({
          pdf_title: item.ar_documentation_title,
          pdf: item.ar_documentation_pdf,
          id: item.id,
          url_title: item.url_title,
          regions: item.ar_regions,
          sort_order: item.sort_order,
          created_at: item.created_at,
          updated_at: item.updated_at,
        });
      } else {
        acc[category].pdfs.push({
          pdf_title: item.ar_documentation_title,
          pdf: item.ar_documentation_pdf,
          id: item.id,
          url_title: item.url_title,
          regions: item.ar_regions,
          sort_order: item.sort_order,
          created_at: item.created_at,
          updated_at: item.updated_at,
        });
      }

      return acc;
    }, {});

    const result = Object.values(groupedByCategory).map((item: any) => {
      if (!item.subcategories) {
        delete item.subcategories;
      }
      return item;
    });

    return result;
  }

  async getARById(id: number): Promise<InvestorAR | null> {
    return await this.arRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async addUpdateAR(
    id: number,
    ar_documentation_year: string,
    ar_documentation_title: string,
    url_title: string,
    ar_documentation_pdf: string,
    arRegions: string[],
    investors_ar_category: string,
    sort_order: number,
  ): Promise<InvestorAR> {
    if (id) {
      const ar = await this.getARById(id);
      if (ar) {
        ar.id = id;
        ar.ar_documentation_year = ar_documentation_year;
        ar.ar_documentation_title = ar_documentation_title;
        ar.url_title = url_title;
        ar.ar_documentation_pdf = ar_documentation_pdf;
        ar.ar_regions = arRegions;
        ar.investors_ar_category = investors_ar_category;
        ar.sort_order = sort_order;

        return this.arRepository.save(ar);
      }
      throw new Error('ar not found');
    } else {
      const ar = new InvestorAR();

      ar.ar_documentation_year = ar_documentation_year;
      ar.ar_documentation_title = ar_documentation_title;
      ar.url_title = url_title;
      ar.ar_documentation_pdf = ar_documentation_pdf;
      ar.ar_regions = arRegions;
      ar.investors_ar_category = investors_ar_category;
      ar.sort_order = sort_order;
      return this.arRepository.save(ar);
    }
  }

  async getDR(search?: string): Promise<InvestorDR[]> {
    if (search != null && search != '') {
      return await this.drRepository.find({
        where: {
          dr_documentation_title: Like('%' + search + '%'),
        },
      });
    } else {
      return await this.drRepository.find({});
    }
  }

  async getDRDetail(region?: string): Promise<InvestorDR[]> {
    const where: any = {};

    if (region != null && region != '') {
      where.dr_regions = Like('%' + region + '%');
    }

    const DR = await this.drRepository.find({
      where,
      order: {
        dr_documentation_year: 'DESC',
      },
    });
    const groupedByCategory = DR.reduce((acc: any, item: InvestorDR) => {
      const category =
        item.dr_documentation_year;

      // If the category doesn't exist, initialize it
      if (!acc[category]) {
        acc[category] = {
          category: category,
          pdfs: [],
        };
      }

        acc[category].pdfs.push({
          pdf_title: item.dr_documentation_title,
          pdf: item.dr_documentation_pdf,
          id: item.id,
          url_title: item.url_title,
          regions: item.dr_regions,
          sort_order: item.sort_order,
          created_at: item.created_at,
          updated_at: item.updated_at,
        });

      return acc;
    }, {});

    const result = Object.values(groupedByCategory).map((item: any) => {
      return item;
    });

    return result;
  }

  async getDRById(id: number): Promise<InvestorDR | null> {
    return await this.drRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async addUpdateDR(
    id: number,
    dr_documentation_year: string,
    dr_documentation_title: string,
    url_title: string,
    dr_documentation_pdf: string,
    drRegions: string[],
    sort_order: number,
  ): Promise<InvestorDR> {
    if (id) {
      const ar = await this.getDRById(id);
      if (ar) {
        ar.id = id;
        ar.dr_documentation_year = dr_documentation_year;
        ar.dr_documentation_title = dr_documentation_title;
        ar.url_title = url_title;
        ar.dr_documentation_pdf = dr_documentation_pdf;
        ar.dr_regions = drRegions;
        ar.sort_order = sort_order;

        return this.drRepository.save(ar);
      }
      throw new Error('ar not found');
    } else {
      const ar = new InvestorDR();

      ar.dr_documentation_year = dr_documentation_year;
      ar.dr_documentation_title = dr_documentation_title;
      ar.url_title = url_title;
      ar.dr_documentation_pdf = dr_documentation_pdf;
      ar.dr_regions = drRegions;
      ar.sort_order = sort_order;
      return this.drRepository.save(ar);
    }
  }
}
