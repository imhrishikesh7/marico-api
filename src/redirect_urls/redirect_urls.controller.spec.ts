import { Test, TestingModule } from '@nestjs/testing';
import { RedirectUrlsController } from './redirect_urls.controller';
import { RedirectUrlsService } from './redirect_urls.service';

describe('RedirectUrlsController', () => {
  let controller: RedirectUrlsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RedirectUrlsController],
      providers: [RedirectUrlsService],
    }).compile();

    controller = module.get<RedirectUrlsController>(RedirectUrlsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
