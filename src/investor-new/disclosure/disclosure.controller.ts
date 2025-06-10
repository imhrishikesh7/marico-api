import { Controller, Get, Param, VERSION_NEUTRAL } from '@nestjs/common';
import { DisclosureService } from './disclosure.service';
import { Disclosure } from 'data/investor-new/disclosute';

@Controller({
  version: VERSION_NEUTRAL,
  path: 'disclosure',
})
export class DisclosureController {
  constructor(private readonly data: DisclosureService) {}

  @Get()
  getAll(): Disclosure[] {
    return this.data.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: Number): Disclosure[] {
    return this.data.findById(Number(id));
  }
}
