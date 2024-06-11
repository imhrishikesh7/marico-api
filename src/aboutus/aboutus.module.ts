import { Module } from '@nestjs/common';
import { AboutusService } from './aboutus.service';
import { AboutusController } from './aboutus.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutusMember } from './entities/aboutus_member.entity';
import { Region } from 'src/regions/entities/region.entity';
import { Recognition } from './entities/aboutus_recognition.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AboutusMember, Recognition, Region])],
  controllers: [AboutusController],
  providers: [AboutusService],
  exports: [AboutusService],
})
export class AboutusModule {}
