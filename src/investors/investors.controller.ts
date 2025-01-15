import { Controller, Get, Param } from '@nestjs/common';
import { InvestorsService } from './investors.service';
import { InvestorQUMaster } from './entities/investor_qu_master.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Sustainability } from './entities/investor_sustainability.entity';
import { CorporateGovernance } from './entities/investor_cogevernance.entity';
import { InformationUpdate } from './entities/investor_iu.entity';
import { InvestorSchedule } from './entities/investor_schedule.entity';
import { InvestorPlacement } from './entities/investor_placement.entity';
import { InvestorContact } from './entities/investor_contact.entity';
import { InvestorPSI } from './entities/investor_psi.entity';
import { SeoService } from 'src/seo/seo.service';
import { InvestorFAQ } from './entities/investor_faq.entity';
import { Sitemap } from 'src/seo/entities/seo.entity';
import { FeaturesService } from 'src/features/features.service';
import { Like } from 'typeorm';
import { TitleCategory } from 'src/features/entities/feature.entity';
interface PdfItem {
  pdf_title: string;
  pdf: string;
  id: number;
  title: string;
  url_title: string;
  regions: string[];
  sort_order: number;
  created_at: Date;
  updated_at: Date;
}
interface GroupedCategory {
  category: string;
  pdfs: PdfItem[];
}

interface SchedulePdf {
  pdf_title: string;
  pdf: string;
  id: number;
  url_title: string;
  created_at: Date;
  updated_at: Date;
}

interface GroupedScheduleCategory {
  category: string;
  pdfs: SchedulePdf[];
}

interface PSIPdf {
  pdf_title: string;
  pdf: string;
  id: number;
  title: string;
  url_title: string;
  sort_order: number;
  created_at: Date;
  updated_at: Date;
}

interface GroupedPSICategory {
  category: string;
  pdfs: PSIPdf[];
}
interface ProcessedMI {
  pdf: string;
  pdf_title: string;
  sort_order: number;
  url_title: string;
  writeup: string;
  dividends_year: string;
  dividend_regions: string[];
  id: number;
  created_at: Date;
  updated_at: Date;
}
interface SHIPdf {
  pdf_title: string;
  pdf: string;
  id: number;
  title: string;
  url_title: string;
  regions: string[];
  sort_order: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

interface SHISubcategory {
  subcategory: string;
  pdfs: SHIPdf[];
}

interface SHICategory {
  category: string;
  subcategories?: SHISubcategory[];
  pdfs?: SHIPdf[];
}

interface SHIResult {
  result: SHICategory[];
  seo: Sitemap | null;
}

type PDF = {
  investor_qu_id: number;
  investor_qu: string;
  investor_qu_pdf: string;
  pdf_title: string;
  pdf: string;
  qu_region: string[];
  sort_order: number;
  is_active: boolean;
};
interface AGMCategory {
  category: string;
  qr_title: string;
  qr_code: string | null; // Adjusted type
  qr_link: string;
  pdfs: {
    pdf_title: string;
    pdf: string;
    id: number;
    title: string;
    url_title: string;
    region: string[];
    sort_order: number;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
  }[];
}

interface AGMResult {
  result: AGMCategory[];
  seo: Sitemap | null;
}

type Subcategory = {
  subcategory: string;
  pdfs: PDF[];
};

type Category = {
  category: string;
  subcategories: Subcategory[];
};
@Controller(':region/investors')
export class InvestorsController {
  constructor(
    private readonly investorsService: InvestorsService,
    private readonly featuresService: FeaturesService,
    private readonly seoService: SeoService,
  ) {}

  @ApiBearerAuth()
  @Get('qu')
  async getQU(): Promise<InvestorQUMaster[]> {
    return await this.investorsService.getQU();
  }

  @ApiBearerAuth()
  @Get('documentation/shareholder-info')
  async getSHIDetail(@Param('region') region: string): Promise<SHIResult> {
    return await this.investorsService.getSHIDetail(region);
  }

  @ApiBearerAuth()
  @Get('documentation/agm')
  async getAGMDetail(@Param('region') region: string): Promise<AGMResult> {
    return await this.investorsService.getAGMDetail(region);
  }

  @ApiBearerAuth()
  @Get('documentation/dividend')
  async getDevidendsDetail(@Param('region') region: string): Promise<{
    result: {
      category: string;
      subcategories: {
        subcategory: string;
        supersubcategories: {
          supersubcategory: string;
          pdfs: ProcessedMI[];
        }[];
        pdfs: ProcessedMI[];
      }[];
      pdfs: ProcessedMI[];
    }[];
    seo: Sitemap | null;
  }> {
    return await this.investorsService.getDividendsDetail(region);
  }

  @ApiBearerAuth()
  @Get('documentation/sustainability')
  async getSustainabilityDetail(@Param('region') region: string): Promise<Sustainability[]> {
    return await this.investorsService.getSustainabilityDetail(region);
  }

  @ApiBearerAuth()
  @Get('documentation/cg')
  async getCGDetail(
    @Param('region') region: string,
  ): Promise<{ result: GroupedCategory[]; seo: Sitemap | null }> {
    const cg = await this.investorsService.getCGDetail(region);

    const titleCategories = await this.featuresService.findCategory('cg');
    const categoryOrder = titleCategories?.reduce(
      (acc: { [key: string]: number }, category: TitleCategory) => {
        acc[category.category_title] = category.sort_order;
        return acc;
      },
      {},
    );

    const groupedByCategory = cg.reduce(
      (acc: Record<string, GroupedCategory>, item: CorporateGovernance) => {
        const category = item.documentation_cg_category;

        if (!acc[category]) {
          acc[category] = {
            category: category,
            pdfs: [],
          };
        }

        acc[category].pdfs.push({
          pdf_title: item.documentation_cg_title,
          pdf: item.documentation_cg_pdf,
          id: item.id,
          title: item.title,
          url_title: item.url_title,
          regions: item.cg_regions,
          sort_order: item.sort_order,
          created_at: item.created_at,
          updated_at: item.updated_at,
        });

        return acc;
      },
      {},
    );
    const result: GroupedCategory[] = Object.values(groupedByCategory).sort((a, b) => {
      const orderA = categoryOrder[a.category] ?? Number.MAX_SAFE_INTEGER;
      const orderB = categoryOrder[b.category] ?? Number.MAX_SAFE_INTEGER;
      return orderA - orderB;
    });
    const seoRecord = await this.seoService.findOne(0, 'cg');

    return {
      result,
      seo: seoRecord,
    };
  }

  @ApiBearerAuth()
  @Get('documentation/latest-update')
  async getIUDetail(
    @Param('region') region: string,
  ): Promise<{ result: InformationUpdate[]; seo: Sitemap | null }> {
    return await this.investorsService.getIUDetail(region);
  }

  @ApiBearerAuth()
  @Get('documentation/schedule-of-investors')
  async getScheduleDetail(
    @Param('region') region: string,
  ): Promise<{ result: GroupedScheduleCategory[]; seo: Sitemap | null }> {
    const schedule = await this.investorsService.getScheduleDetail(region);
    const groupedByCategory = schedule.reduce(
      (acc: Record<string, GroupedScheduleCategory>, item: InvestorSchedule) => {
        const category = item.schedule_analyst_meet_year;

        if (!acc[category]) {
          acc[category] = {
            category: category,
            pdfs: [],
          };
        }

        acc[category].pdfs.push({
          pdf_title: item.title,
          pdf: item.schedule_analyst_meet_pdf,
          id: item.id,
          url_title: item.url_title,
          created_at: item.created_at,
          updated_at: item.updated_at,
        });

        return acc;
      },
      {},
    );

    const result: GroupedScheduleCategory[] = Object.values(groupedByCategory);

    const seoRecord = await this.seoService.findOne(0, 'schedule-of-investors');

    return {
      result,
      seo: seoRecord,
    };
  }

  @ApiBearerAuth()
  @Get('documentation/placement-document')
  async getPDDetail(
    @Param('region') region: string,
  ): Promise<{ result: InvestorPlacement[]; seo: Sitemap | null }> {
    return await this.investorsService.getPDDetail(region);
  }

  @ApiBearerAuth()
  @Get('documentation/quarterly-updates')
  async getQUDetail(
    @Param('region') region: string,
  ): Promise<{ result: Category[]; seo: Sitemap | null }> {
    return await this.investorsService.getQUALL(region);
  }

  @ApiBearerAuth()
  @Get('documentation/investor-contact')
  async getICDetail(
    @Param('region') region: string,
  ): Promise<{ result: InvestorContact[]; seo: Sitemap | null }> {
    return await this.investorsService.getICDetail(region);
  }

  @ApiBearerAuth()
  @Get('documentation/price-sensitive-information')
  async getPSIDetail(
    @Param('region') region: string,
  ): Promise<{ result: GroupedPSICategory[]; seo: Sitemap | null }> {
    const psi = await this.investorsService.getPSIDetail(region);
    const groupedByCategory = psi.reduce(
      (acc: Record<string, GroupedPSICategory>, item: InvestorPSI) => {
        const category = item.psi_category;

        if (!acc[category]) {
          acc[category] = {
            category: category,
            pdfs: [],
          };
        }

        acc[category].pdfs.push({
          pdf_title: item.documentation_psi_title,
          pdf: item.psi_documentation_pdf,
          id: item.id,
          title: item.title,
          url_title: item.url_title,
          sort_order: item.sort_order,
          created_at: item.created_at,
          updated_at: item.updated_at,
        });

        return acc;
      },
      {},
    );

    const result: GroupedPSICategory[] = Object.values(groupedByCategory);

    const seoRecord = await this.seoService.findOne(0, 'price-sensitive-information');

    return {
      result,
      seo: seoRecord,
    };
  }

  @ApiBearerAuth()
  @Get('documentation/annual-reports')
  async getARDetail(@Param('region') region: string): Promise<{
    result: {
      category: string;
      is_year: boolean;
      subcategories: {
        subcategory: string;
        pdfs: {
          pdf_title: string;
          pdf: string;
          id: number;
          url_title: string;
          regions: string[];
          sort_order: number;
          created_at: Date;
          updated_at: Date;
        }[];
      }[];
      pdfs: {
        pdf_title: string;
        pdf: string;
        id: number;
        url_title: string;
        regions: string[];
        sort_order: number;
        created_at: Date;
        updated_at: Date;
      }[];
    }[];
    seo: Sitemap | null;
  }> {
    return await this.investorsService.getARDetail(region);
  }

  @ApiBearerAuth()
  @Get('documentation/latest-director-report')
  async getDRDetail(@Param('region') region: string): Promise<{
    result: {
      category: string;
      pdfs: {
        pdf_title: string;
        pdf: string;
        id: number;
        url_title: string;
        regions: string[];
        sort_order: number;
        created_at: Date;
        updated_at: Date;
      }[];
    }[];
    seo: Sitemap | null;
  }> {
    return await this.investorsService.getDRDetail(region);
  }

  @ApiBearerAuth()
  @Get('documentation/investor-principles-disclosure')
  async getMIDetail(@Param('region') region: string): Promise<{
    result: {
      pdf: string;
      pdf_title: string;
      region: string[];
      sort_order: number;
      is_active: boolean;
      url_title: string;
      id: number;
    }[];
    seo: Sitemap | null;
  }> {
    return await this.investorsService.getMIDetail(region);
  }

  @ApiBearerAuth()
  @Get('faq')
  async getFAQDetail(
    @Param('region') region: string,
  ): Promise<{ result: InvestorFAQ[]; seo: Sitemap | null }> {
    return await this.investorsService.getFAQDetail(region);
  }
}
