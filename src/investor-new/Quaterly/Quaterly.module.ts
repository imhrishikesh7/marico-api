import { Module } from '@nestjs/common';
import { QuarterlyController } from './Quaterly.controller';
import { QuarterlyService } from './Quaterly.service';

@Module({
  controllers: [QuarterlyController],
  providers: [QuarterlyService],
})
export class QuarterlyModule {}
