import { Injectable } from '@nestjs/common';
import { Brand } from './entities/brand.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { Region } from 'src/regions/entities/region.entity';
import { Tvc } from './entities/tvc.entity';
import { PrintAd } from './entities/print_ad.entity';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
    @InjectRepository(Tvc)
    private readonly tvcRepository: Repository<Tvc>,
    @InjectRepository(PrintAd)
    private readonly printAdRepository: Repository<PrintAd>,
    @InjectRepository(Region)
    private readonly regionRepository: Repository<Region>,
  ) {}

  async getTVCList(search?: string | null): Promise<Tvc[]> {
    const where: any = {};
    // if (region != null && region != '') {
    //   const regionName = await this.regionRepository.findOne({
    //     where: {
    //       alias: region,
    //     },
    //   });

    //   if (regionName != null) {
    //     where.region = Like('%' + regionName.name + '%');
    //   }
    // }
    if (search != null && search != '') {
      where.title = search;
    }
    return await this.tvcRepository.find({
      where,
    });
  }

  async getTvcDropdown(): Promise<Tvc[]> {
    return await this.tvcRepository.find({
      order: {
        sort_order: 'ASC',
      },
    });
  }

  async getTVCById(id: number): Promise<Tvc | null> {
    return await this.tvcRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async addUpdateTVC(
    id: number,
    title: string,
    url_title: string,
    tvc_title: string,
    tvc_description: string,
    tvc_type: string,
    tvc_code: string,
    regions: string[],
    sort_order: number,
    thumbnail: {
      url: string;
      width: number;
      height: number;
      alt: string;
    } | null,
  ): Promise<Tvc> {
    if (id) {
      const tvc = await this.tvcRepository.findOne({
        where: {
          id: id,
        },
      });
      if (tvc) {
        tvc.id = id;
        tvc.title = title;
        tvc.url_title = url_title;
        tvc.tvc_title = tvc_title;
        tvc.tvc_description = tvc_description;
        tvc.tvc_type = tvc_type;
        tvc.tvc_code = tvc_code;
        tvc.regions = regions;
        tvc.sort_order = sort_order;
        tvc.thumbnail = thumbnail;
        return this.tvcRepository.save(tvc);
      }
      throw new Error('tvc not found');
    } else {
      const tvc = new Tvc();

      // make alias using name
      tvc.title = title;
      tvc.url_title = url_title;
      tvc.tvc_title = tvc_title;
      tvc.tvc_description = tvc_description;
      tvc.tvc_type = tvc_type;
      tvc.tvc_code = tvc_code;
      tvc.regions = regions;
      tvc.sort_order = sort_order;
      tvc.thumbnail = thumbnail;
      return this.tvcRepository.save(tvc);
    }
  }

  async getBrandList(search?: string | null): Promise<Brand[]> {
    const where: any = {};
    if (search != null && search != '') {
      where.title = search;
    }
    return await this.brandRepository.find({
      where,
    });
  }

  // async getBrandDetail(search?: string | null): Promise<Brand[]> {
  //   const where: any = {};
  //   if (search != null && search != '') {
  //     where.regions = Like('%' + search + '%');
  //   }
  //   where.brand_type = Like('main-brand or standalone');
  //   return await this.brandRepository.find({
  //     where,
  //   });
  // }

  async getBrandDetail(alias: string): Promise<Brand[]> {
    const query = this.brandRepository.createQueryBuilder('brand');

    // Add condition for 'brand_type' being either 'main-brand' or 'standalone'
    query.where(
      '(brand.brand_type = :mainBrand OR brand.brand_type = :standalone)',
      {
        mainBrand: 'main-brand',
        standalone: 'standalone',
      },
    );

    // Add condition for 'regions' using LIKE for the provided alias
    if (alias && alias.trim() !== '') {
      query.andWhere('brand.regions LIKE :alias', { alias: `%${alias}%` });
    }

    // Execute the query and return the results
    return await query.getMany();
  }

  async getFrontBrandDetail(region: string): Promise<Brand[]> {
    const where: any = {};

    if (region != null && region != '') {
      where.regions = Like('%' + region + '%');
    }
    where.show_in_front = 1;
    where.is_active = 1;
    return await this.brandRepository.find({
      where,
    });
  }

  async getBrandsDropdown(): Promise<Brand[]> {
    return await this.brandRepository.find({
      select: ['id', 'title'],
      order: {
        sort_order: 'ASC',
      },
    });
  }

  async getSubBrandList(search?: string | null): Promise<Brand[]> {
    const where: any = {};
    // if (region != null && region != '') {
    //   const regionName = await this.regionRepository.findOne({
    //     where: {
    //       alias: region,
    //     },
    //   });

    //   if (regionName != null) {
    //     where.region = Like('%' + regionName.name + '%');
    //   }
    // }
    if (search != null && search != '') {
      where.title = search;
    }
    where.brand_type = Like('sub-brand');
    return await this.brandRepository.find({
      where,
      relations: ['tvc'],
    });
  }
  async getBrandById(id: number): Promise<Brand | null> {
    return await this.brandRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async getBrandByAlias(
    region?: string,
    alias?: string,
  ): Promise<{ brand: Brand | null; subBrands?: Brand[] }> {
    const where: { regions?: any; url_title?: any } = {};

    if (region) {
      where.regions = Like(`%${region}%`);
    }

    if (alias) {
      where.url_title = Like(`%${alias}%`);
    }

    const toReturn: { brand: Brand | null; subBrands?: Brand[]; tvc?: Tvc[] } =
      {
        brand: null,
      };

    // Fetch the main brand
    const brand = await this.brandRepository.findOne({
      where,
      relations: ['tvc'],
    });

    // Declare subBrands outside the if-block
    let subBrands: Brand[] = [];

    if (brand) {
      // Fetch the sub-brands related to the main brand
      subBrands = await this.brandRepository.find({
        where: {
          brand_type: Like('sub-brand'),
          brand_url_title: In(brand.sub_brand_relation),
        },
        relations: ['tvc'],
      });
    }

    // Set the main brand in the return object
    toReturn.brand = brand;

    // Set subBrands if there are any
    if (subBrands.length > 0) {
      toReturn.subBrands = subBrands;
    }
    return toReturn;
  }

  async addUpdateBrand(
    id: number,
    title: string,
    url_title: string,
    brand_title: string,
    brand_url_title: string,
    brand_type: string,
    short_text: string,
    overview: string,
    tvc_relation: string[],
    print_ad_relation: string[],
    award_relation: string[],
    sub_brand_relation: string[],
    is_featured: boolean,
    thumbnail1: {
      url: string;
      width: number;
      height: number;
      alt: string;
    } | null,
    thumbnail2: {
      url: string;
      width: number;
      height: number;
      alt: string;
    } | null,
    thumbnail3: {
      url: string;
      width: number;
      height: number;
      alt: string;
    } | null,
    thumbnail4: {
      url: string;
      width: number;
      height: number;
      alt: string;
    } | null,
    brandRegions: string[],
    sort_order: number,
    shop_now_url: string,
    show_in_front: boolean,
    is_active: boolean,
  ): Promise<Brand> {
    if (id) {
      const brand = await this.brandRepository.findOne({
        where: {
          id: id,
        },
      });
      if (brand) {
        brand.id = id;
        brand.title = title;
        brand.url_title = url_title;
        brand.brand_title = brand_title;
        brand.brand_url_title = brand_url_title;
        brand.brand_type = brand_type;
        brand.short_text = short_text;
        brand.overview = overview;
        brand.tvc_relation = tvc_relation;
        brand.print_ad_relation = print_ad_relation;
        brand.award_relation = award_relation;
        brand.sub_brand_relation = sub_brand_relation;
        brand.is_featured = is_featured;
        brand.thumbnail1 = thumbnail1;
        brand.thumbnail2 = thumbnail2;
        brand.thumbnail3 = thumbnail3;
        brand.thumbnail4 = thumbnail4;
        brand.regions = brandRegions;
        brand.sort_order = sort_order;
        brand.shop_now_url = shop_now_url;
        brand.show_in_front = show_in_front;
        brand.is_active = is_active;
        return this.brandRepository.save(brand);
      }
      throw new Error('Brand not found');
    } else {
      const brand = new Brand();

      // make alias using name
      brand.title = title;
      brand.url_title = url_title;
      brand.brand_title = brand_title;
      brand.brand_url_title = brand_url_title;
      brand.brand_type = brand_type;
      brand.short_text = short_text;
      brand.overview = overview;
      brand.tvc_relation = tvc_relation;
      brand.print_ad_relation = print_ad_relation;
      brand.award_relation = award_relation;
      brand.sub_brand_relation = sub_brand_relation;
      brand.is_featured = is_featured;
      brand.thumbnail1 = thumbnail1;
      brand.thumbnail2 = thumbnail2;
      brand.thumbnail3 = thumbnail3;
      brand.thumbnail4 = thumbnail4;
      brand.regions = brandRegions;
      brand.sort_order = sort_order;
      brand.shop_now_url = shop_now_url;
      brand.show_in_front = show_in_front;
      brand.is_active = is_active;
      return this.brandRepository.save(brand);
    }
  }

  async getPrintAdList(search?: string | null): Promise<PrintAd[]> {
    const where: any = {};
    // if (region != null && region != '') {
    //   const regionName = await this.regionRepository.findOne({
    //     where: {
    //       alias: region,
    //     },
    //   });

    //   if (regionName != null) {
    //     where.region = Like('%' + regionName.name + '%');
    //   }
    // }
    if (search != null && search != '') {
      where.title = search;
    }
    return await this.printAdRepository.find({
      where,
    });
  }

  async getPrintAdDropDown(): Promise<PrintAd[]> {
    return await this.printAdRepository.find({
      order: {
        sort_order: 'ASC',
      },
    });
  }

  async getPrintAdById(id: number): Promise<PrintAd | null> {
    return await this.printAdRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async addUpdatePrintAd(
    id: number,
    title: string,
    url_title: string,
    print_ad_title: string,
    regions: string[],
    sort_order: number,
    small_thumbnail: {
      url: string;
      width: number;
      height: number;
      alt: string;
    } | null,
    large_thumbnail: {
      url: string;
      width: number;
      height: number;
      alt: string;
    } | null,
  ): Promise<PrintAd> {
    if (id) {
      const printAd = await this.printAdRepository.findOne({
        where: {
          id: id,
        },
      });
      if (printAd) {
        printAd.id = id;
        printAd.title = title;
        printAd.url_title = url_title;
        printAd.print_ad_title = print_ad_title;
        printAd.regions = regions;
        printAd.sort_order = sort_order;
        printAd.small_thumbnail = small_thumbnail;
        printAd.large_thumbnail = large_thumbnail;
        return this.printAdRepository.save(printAd);
      }
      throw new Error('printAd not found');
    } else {
      const printAd = new PrintAd();

      printAd.title = title;
      printAd.url_title = url_title;
      printAd.print_ad_title = print_ad_title;
      printAd.regions = regions;
      printAd.sort_order = sort_order;
      printAd.small_thumbnail = small_thumbnail;
      printAd.large_thumbnail = large_thumbnail;
      return this.printAdRepository.save(printAd);
    }
  }
}
