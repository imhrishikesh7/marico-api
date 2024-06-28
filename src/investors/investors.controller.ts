import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvestorsService } from './investors.service';

@Controller('investors')
export class InvestorsController {
  constructor(private readonly investorsService: InvestorsService) {}

 
}
