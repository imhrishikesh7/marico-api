import {
  BadRequestException,
  Controller,
  DefaultValuePipe,
  Get,
  Inject,
  Query,
} from "@nestjs/common";

import { ApiQuery } from "@nestjs/swagger";
import { Page } from "./entities/page.entity";
import { EmptystringPipe } from "../validations/emptystring/emptystring.pipe";
import { Public } from "../public/public.decorator";
import { PageService } from "./page.service";

@Controller("page")
export class PageController {
  constructor(
    private readonly pageService: PageService,
  ) {}

  //public get page by url
  @ApiQuery({
    name: "url",
    type: "string",
    required: true,
  })
  @Public()
  @Get("details")
  async findOneByUrl(@Query("url", EmptystringPipe) url: string): Promise<{
    page: Page;
  }> {
    const page = await this.pageService.findOneByUrl(url);
    if (!page) {
      throw new BadRequestException("Page not found");
    }
    return {
      page: page,
    };
  }

}
