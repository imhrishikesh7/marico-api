import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppLogger } from './app.logger';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import config from '../datasource.config';
import { APP_GUARD } from '@nestjs/core';
import { AdminModule } from './admin/admin.module';
import { AdminGuard } from './admin/admin.guard';
import { RolesGuard } from './admin/roles.guard';
import { ProductsModule } from './products/products.module';
import { ProductsAdminController } from './products/products.admin.controller';
import { RegionModule } from './region/region.module';
import { RegionAdminController } from './region/region.admin.controller';
import { BlogAdminController } from './blogs/entities/blog.admin.controller';
import { BlogModule } from './blogs/entities/blog.module';

@Module({
  imports: [TypeOrmModule.forRoot(config as TypeOrmModuleOptions), AdminModule, ProductsModule, RegionModule, BlogModule],
  controllers: [AppController, ProductsAdminController, RegionAdminController, BlogAdminController],
  providers: [
    { provide: APP_GUARD, useClass: AdminGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    AppService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(AppLogger)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
