import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { RedirectUrl } from './entities/redirect_url.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class RedirectUrlsService {
  constructor(
    @InjectRepository(RedirectUrl)
    private redirectUrlRepository: Repository<RedirectUrl>,
  ) {}

  async getRedirectUrl(url: string): Promise<RedirectUrl | null> {
    return await this.redirectUrlRepository.findOne({
      where: { from_url: Like(url), is_active: true },
    });
  }
}
