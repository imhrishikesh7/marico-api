import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';
import { Brand } from './entities/brand.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from 'src/regions/entities/region.entity';
import { Tvc } from './entities/tvc.entity';
import { PrintAd } from './entities/print_ad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Brand, Tvc, PrintAd , Region])],
  controllers: [BrandsController],
  providers: [BrandsService],
  exports: [BrandsService],
})
export class BrandsModule {}
