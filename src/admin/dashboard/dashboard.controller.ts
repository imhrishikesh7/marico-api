import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../roles.decorator';
import { AdminOnly } from '../admin.decorator';

@AdminOnly()
@Controller('admin/dashboard')
export class DashboardController {
  @ApiBearerAuth()
  @Roles(['DASHBOARD'])
  @Get()
  async getDashboardData(): Promise<{ data: string }> {
    return { data: 'Dashboard coming soon' };
  }
}
