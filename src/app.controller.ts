import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { AppService } from './app.service';

@Controller({
  version: VERSION_NEUTRAL,
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'ok';
  }

  @Get('/info')
  getInfo(): object {
    return this.appService.getInfo();
  }
}
