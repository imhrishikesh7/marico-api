import { Module } from '@nestjs/common';
import { RedirectUrlsService } from './redirect_urls.service';
import { RedirectUrlsController } from './redirect_urls.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedirectUrl } from './entities/redirect_url.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RedirectUrl])],
  controllers: [RedirectUrlsController],
  providers: [RedirectUrlsService],
  exports: [RedirectUrlsService],
})
export class RedirectUrlsModule {}
