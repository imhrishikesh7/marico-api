import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { BrandsService } from './brands.service';
import { REQUEST } from '@nestjs/core';
import { AdminService } from 'src/admin/admin.service';
import { AdminRequest } from 'src/interfaces/adminrequest.interface';
import { AdminOnly } from 'src/admin/admin.decorator';
import { ApiBearerAuth, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Roles } from 'src/admin/roles.decorator';
import { Brand } from './entities/brand.entity';
import { Region } from 'src/regions/entities/region.entity';
import { RegionsService } from 'src/regions/regions.service';
import { Tvc } from './entities/tvc.entity';
import { PrintAd } from './entities/print_ad.entity';
import { Recognition } from 'src/aboutus/entities/aboutus_recognition.entity';
import { AboutusService } from 'src/aboutus/aboutus.service';
import { EmptystringPipe } from 'src/validations/emptystring/emptystring.pipe';
import { ImagefileOrNullPipe } from 'src/validations/imagefile/imagefile.pipe';
import { SwitchPipe } from 'src/validations/switch/switch.pipe';
import { StringArrayOrNullPipe } from 'src/validations/stringarrayornull/stringarrayornull.pipe';
import { SeoService } from 'src/seo/seo.service';
import { Sitemap } from 'src/seo/entities/seo.entity';

@Controller('admin/brands')
export class BrandsAdminController {
  constructor(
    private readonly brandService: BrandsService,
    private readonly aboutusService: AboutusService,
    private readonly seoService: SeoService,
    private readonly regionService: RegionsService,
    private readonly adminService: AdminService,
    @Inject(REQUEST) private readonly request: AdminRequest,
  ) {}

  @AdminOnly()
  @ApiBearerAuth()
  @ApiQuery({
    name: 'search',
    type: 'string',
    required: false,
  })
  @Roles(['BRANDS'])
  @Get('master')
  async getBrandList(
    @Query('search', new DefaultValuePipe('')) search: string,
  ): Promise<Brand[]> {
    return await this.brandService.getBrandList(search || undefined);
  }

  @Get('master/:id')
  async getBrandById(@Param('id', ParseIntPipe) id: number): Promise<{
    brand: Brand | null;
    brands: Brand[] | null;
    subbrands: Brand[] | null;
    regions: Region[] | null;
    tvc_relations: Tvc[] | null;
    print_ad_relations: PrintAd[] | null;
    award_relations: Recognition[] | null;
    seo: Sitemap | null;
  }> {
    const toReturn = {
      brand: await this.brandService.getBrandById(id),
      brands: await this.brandService.getBrandsDropdown(),
      subbrands: await this.brandService.getSubBrandList(),
      regions: await this.regionService.getRegionList(),
      tvc_relations: await this.brandService.getTVCList(),
      print_ad_relations: await this.brandService.getPrintAdList(),
      award_relations: await this.aboutusService.getAwardList(),
      seo: await this.seoService.findOne(id, 'brand'),
    } as {
      brand: Brand | null;
      brands: Brand[] | null;
      subbrands: Brand[] | null;
      regions: Region[] | null;
      tvc_relations: Tvc[] | null;
      print_ad_relations: PrintAd[] | null;
      award_relations: Recognition[] | null;
      seo: Sitemap | null;
    };
    return toReturn;
  }

  //add new member
  @AdminOnly()
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
        },
        title: {
          type: 'string',
        },
        url_title: {
          type: 'string',
        },
        brand_title: {
          type: 'string',
        },
        brand_url_title: {
          type: 'string',
        },
        brand_type: {
          type: 'string',
        },
        short_text: {
          type: 'string',
        },
        overview: {
          type: 'string',
        },
        tvc_relation: {
          type: 'array',
          items: {
            type: 'string',
            example: '',
          },
        },
        print_ad_relation: {
          type: 'array',
          items: {
            type: 'string',
            example: '',
          },
        },
        award_relation: {
          type: 'array',
          items: {
            type: 'string',
            example: '',
          },
        },
        sub_brand_relation: {
          type: 'array',
          items: {
            type: 'string',
            example: '',
          },
        },
        is_featured: {
          type: 'boolean',
        },
        thumbnail1: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
            },
            width: {
              type: 'number',
            },
            height: {
              type: 'number',
            },
            alt: {
              type: 'string',
            },
          },
        },
        thumbnail2: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
            },
            width: {
              type: 'number',
            },
            height: {
              type: 'number',
            },
            alt: {
              type: 'string',
            },
          },
        },
        thumbnail3: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
            },
            width: {
              type: 'number',
            },
            height: {
              type: 'number',
            },
            alt: {
              type: 'string',
            },
          },
        },
        thumbnail4: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
            },
            width: {
              type: 'number',
            },
            height: {
              type: 'number',
            },
            alt: {
              type: 'string',
            },
          },
        },
        regions: {
          type: 'array',
          items: {
            type: 'string',
            example: 'UK',
          },
        },
        sort_order: {
          type: 'number',
        },
        shop_now_url: {
          type: 'string',
        },
        facebook_url: {
          type: 'string',
        },
        twitter_url: {
          type: 'string',
        },
        youtube_url: {
          type: 'string',
        },
        web_url: {
          type: 'string',
        },
        insta_url: {
          type: 'string',
        },
        show_in_front: {
          type: 'boolean',
        },
        is_active: {
          type: 'boolean',
        },
        meta_title: {
          type: 'string',
        },
        meta_description: {
          type: 'string',
        },
        canonical_url: {
          type: 'string',
        },
        meta_image: {
          type: 'object',
          properties: {
            url: { type: 'string' },
            alt: { type: 'string' },
            width: { type: 'number' },
            height: { type: 'number' },
          },
        },
        indexed: {
          type: 'boolean',
        },
      },
    },
  })
  @Roles(['BRANDS'])
  @Post('master/add-update')
  async addUpdateBrand(
    @Body('id', ParseIntPipe) id: number,
    @Body('title', EmptystringPipe) title: string,
    @Body('url_title', EmptystringPipe) url_title: string,
    @Body('brand_title', EmptystringPipe) brand_title: string,
    @Body('brand_url_title', EmptystringPipe) brand_url_title: string,
    @Body('brand_type', EmptystringPipe) brand_type: string,
    @Body('short_text', EmptystringPipe) short_text: string,
    @Body('overview', EmptystringPipe) overview: string,
    @Body('tvc_relation') tvc_relation: string[],
    @Body('print_ad_relation') print_ad_relation: string[],
    @Body('award_relation', StringArrayOrNullPipe) award_relation: string[],
    @Body('sub_brand_relation') sub_brand_relation: string[],
    @Body('is_featured', SwitchPipe) is_featured: boolean,
    @Body('thumbnail1', ImagefileOrNullPipe)
    thumbnail1: {
      url: string;
      alt: string;
      width: number;
      height: number;
    } | null,
    @Body('thumbnail2', ImagefileOrNullPipe)
    thumbnail2: {
      url: string;
      alt: string;
      width: number;
      height: number;
    } | null,
    @Body('thumbnail3', ImagefileOrNullPipe)
    thumbnail3: {
      url: string;
      alt: string;
      width: number;
      height: number;
    } | null,
    @Body('thumbnail4', ImagefileOrNullPipe)
    thumbnail4: {
      url: string;
      alt: string;
      width: number;
      height: number;
    } | null,
    @Body('regions') regions: string[],
    @Body('sort_order', ParseIntPipe) sort_order: number,
    @Body('shop_now_url') shop_now_url: string,
    @Body('facebook_url') facebook_url: string,
    @Body('twitter_url') twitter_url: string,
    @Body('youtube_url') youtube_url: string,
    @Body('web_url') web_url: string,
    @Body('insta_url') insta_url: string,
    @Body('show_in_front') show_in_front: boolean,
    @Body('is_active') is_active: boolean,
    @Body('meta_title') meta_title: string,
    @Body('meta_description') meta_description: string,
    @Body('canonical_url') canonical_url: string,
    @Body('meta_image')
    meta_image: {
      url: string;
      width: number;
      height: number;
    } | null,
    @Body('indexed') indexed: boolean,
  ): Promise<{ brand: Brand }> {
    const brand = await this.brandService.addUpdateBrand(
      id,
      title,
      url_title,
      brand_title,
      brand_url_title,
      brand_type,
      short_text,
      overview,
      tvc_relation,
      print_ad_relation,
      award_relation,
      sub_brand_relation,
      is_featured,
      thumbnail1,
      thumbnail2,
      thumbnail3,
      thumbnail4,
      regions,
      sort_order,
      shop_now_url,
      facebook_url,
      twitter_url,
      youtube_url,
      web_url,
      insta_url,
      show_in_front,
      is_active,
      meta_title,
      meta_description,
      canonical_url,
      meta_image,
      indexed,
    );

    await this.adminService.addAdminActivity(
      this.request.admin,
      `Created member ${brand.brand_title}`,
      'created_member',
      `${brand.id}`,
      {
        id,
        title,
        url_title,
        brand_title,
        brand_url_title,
        brand_type,
        short_text,
        overview,
        tvc_relation,
        print_ad_relation,
        award_relation,
        sub_brand_relation,
        is_featured,
        thumbnail1,
        thumbnail2,
        thumbnail3,
        thumbnail4,
        regions,
        sort_order,
        shop_now_url,
        facebook_url,
        twitter_url,
        youtube_url,
        web_url,
        insta_url,
        show_in_front,
        is_active,
        meta_title,
        meta_description,
        canonical_url,
        meta_image,
        indexed,
      },
    );

    return {
      brand,
    };
  }

  @AdminOnly()
  @ApiBearerAuth()
  @ApiQuery({
    name: 'search',
    type: 'string',
    required: false,
  })
  @Roles(['BRANDS'])
  @Get('tvc')
  async getTVCList(
    @Query('search', new DefaultValuePipe('')) search: string,
  ): Promise<Tvc[]> {
    return await this.brandService.getTVCList(search || undefined);
  }

  @Get('tvc/:id')
  async getTVCById(@Param('id', ParseIntPipe) id: number): Promise<{
    tvc: Tvc | null;
    tvcs: Tvc[] | null;
    regions: Region[] | null;
  }> {
    const toReturn = {
      tvc: await this.brandService.getTVCById(id),
      tvcs: await this.brandService.getTVCList(),
      regions: await this.regionService.getRegionList(),
    } as {
      tvc: Tvc | null;
      tvcs: Tvc[] | null;
      regions: Region[] | null;
    };
    return toReturn;
  }
  //add new member
  @AdminOnly()
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
        },
        title: {
          type: 'string',
        },
        url_title: {
          type: 'string',
        },
        tvc_title: {
          type: 'string',
        },
        tvc_description: {
          type: 'string',
        },
        tvc_type: {
          type: 'string',
        },
        tvc_code: {
          type: 'string',
        },
        regions: {
          type: 'array',
          items: {
            type: 'string',
            example: 'UK',
          },
        },
        sort_order: {
          type: 'number',
        },
        thumbnail: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
            },
            width: {
              type: 'number',
            },
            height: {
              type: 'number',
            },
            alt: {
              type: 'string',
            },
          },
        },
      },
    },
  })
  @Roles(['BRANDS'])
  @Post('tvc/add-update')
  async addUpdateTVC(
    @Body('id', ParseIntPipe) id: number,
    @Body('title', EmptystringPipe) title: string,
    @Body('url_title', EmptystringPipe) url_title: string,
    @Body('tvc_title', EmptystringPipe) tvc_title: string,
    @Body('tvc_description', EmptystringPipe) tvc_description: string,
    @Body('tvc_type', EmptystringPipe) tvc_type: string,
    @Body('tvc_code', EmptystringPipe) tvc_code: string,
    @Body('regions') regions: string[],
    @Body('sort_order', ParseIntPipe) sort_order: number,
    @Body('thumbnail', ImagefileOrNullPipe)
    thumbnail: {
      url: string;
      alt: string;
      width: number;
      height: number;
    } | null,
  ): Promise<{ tvc: Tvc }> {
    const tvc = await this.brandService.addUpdateTVC(
      id,
      title,
      url_title,
      tvc_title,
      tvc_description,
      tvc_type,
      tvc_code,
      regions,
      sort_order,
      thumbnail,
    );
    await this.adminService.addAdminActivity(
      this.request.admin,
      `Created brand ${tvc.tvc_title}`,
      'created_brand',
      `${tvc.id}`,
      {
        id,
        title,
        url_title,
        tvc_title,
        tvc_description,
        tvc_type,
        tvc_code,
        regions,
        sort_order,
        thumbnail,
      },
    );
    return {
      tvc,
    };
  }

  @AdminOnly()
  @ApiBearerAuth()
  @ApiQuery({
    name: 'search',
    type: 'string',
    required: false,
  })
  @Roles(['BRANDS'])
  @Get('print_ad')
  async getPrintAdList(
    @Query('search', new DefaultValuePipe('')) search: string,
  ): Promise<PrintAd[]> {
    return await this.brandService.getPrintAdList(search || undefined);
  }

  @Get('print_ad/:id')
  async getPrintAdById(@Param('id', ParseIntPipe) id: number): Promise<{
    printAd: PrintAd | null;
    printAds: PrintAd[] | null;
    regions: Region[] | null;
  }> {
    const printAds = await this.brandService.getPrintAdDropDown();
    const toReturn = {
      printAd: await this.brandService.getPrintAdById(id),
      printAds: printAds,
      regions: await this.regionService.getRegionList(),
    } as {
      printAd: PrintAd | null;
      printAds: PrintAd[] | null;
      regions: Region[] | null;
    };
    return toReturn;
  }
  //add new member
  @AdminOnly()
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
        },
        title: {
          type: 'string',
        },
        url_title: {
          type: 'string',
        },
        print_ad_title: {
          type: 'string',
        },
        regions: {
          type: 'array',
          items: {
            type: 'string',
            example: 'UK',
          },
        },
        sort_order: {
          type: 'number',
        },
        small_thumbnail: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
            },
            width: {
              type: 'number',
            },
            height: {
              type: 'number',
            },
            alt: {
              type: 'string',
            },
          },
        },
        large_thumbnail: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
            },
            width: {
              type: 'number',
            },
            height: {
              type: 'number',
            },
            alt: {
              type: 'string',
            },
          },
        },
      },
    },
  })
  @Roles(['BRANDS'])
  @Post('print_ad/add-update')
  async addUpdatePrintAd(
    @Body('id', ParseIntPipe) id: number,
    @Body('title', EmptystringPipe) title: string,
    @Body('url_title', EmptystringPipe) url_title: string,
    @Body('print_ad_title', EmptystringPipe) print_ad_title: string,
    @Body('regions') regions: string[],
    @Body('sort_order', ParseIntPipe) sort_order: number,
    @Body('small_thumbnail', ImagefileOrNullPipe)
    small_thumbnail: {
      url: string;
      alt: string;
      width: number;
      height: number;
    } | null,
    @Body('large_thumbnail', ImagefileOrNullPipe)
    large_thumbnail: {
      url: string;
      alt: string;
      width: number;
      height: number;
    } | null,
  ): Promise<{ printAd: PrintAd }> {
    const printAd = await this.brandService.addUpdatePrintAd(
      id,
      title,
      url_title,
      print_ad_title,
      regions,
      sort_order,
      small_thumbnail,
      large_thumbnail,
    );

    await this.adminService.addAdminActivity(
      this.request.admin,
      `Created member ${printAd.print_ad_title}`,
      'created_member',
      `${printAd.id}`,
      {
        id,
        title,
        url_title,
        print_ad_title,
        regions,
        sort_order,
        small_thumbnail,
        large_thumbnail,
      },
    );

    return {
      printAd,
    };
  }
}
