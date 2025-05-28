import { Test, TestingModule } from '@nestjs/testing';
import { RedirectUrlsService } from './redirect_urls.service';

describe('RedirectUrlsService', () => {
  let service: RedirectUrlsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RedirectUrlsService],
    }).compile();

    service = module.get<RedirectUrlsService>(RedirectUrlsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
