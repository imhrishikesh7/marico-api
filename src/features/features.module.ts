import { Module } from '@nestjs/common';
import { FeaturesService } from './features.service';
import { FeaturesController } from './features.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TitleCategory } from './entities/feature.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TitleCategory])],
  controllers: [FeaturesController],
  providers: [FeaturesService],
  exports: [FeaturesService],
})
export class FeaturesModule {}
