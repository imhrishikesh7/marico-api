import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Role } from './entities/role.entity';
import { JwtModule } from '@nestjs/jwt';
import { AdminActivity } from './entities/admin_activity.entity';
import { DashboardController } from './dashboard/dashboard.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, Role, AdminActivity]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || '',
      signOptions: { expiresIn: '1y' },
    }),
  ],
  controllers: [AdminController, DashboardController],
  exports: [AdminService],
  providers: [AdminService],
})
export class AdminModule {}
