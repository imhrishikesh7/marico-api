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

  async getRedirectUrl(
    url: string,
  ): Promise<RedirectUrl | null> {
    console.log(url,'====url');
    const where: any = {};
    where.from_url = Like('%' + url + '%');
    where.is_active = true;
    console.log(where, '=======where');

    const redirection = await this.redirectUrlRepository.findOne({
      where,
    });
    console.log(redirection, '=======');
    return redirection;
  }
}
