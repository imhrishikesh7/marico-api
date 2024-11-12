import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeoService } from './seo.service';

@Controller('seo')
export class SeoController {
  constructor(private readonly seoService: SeoService) {}

  
}
