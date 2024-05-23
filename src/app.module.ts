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
import { RegionsModule } from './regions/regions.module';

@Module({
  imports: [TypeOrmModule.forRoot(config as TypeOrmModuleOptions), AdminModule, RegionsModule],
  controllers: [AppController],
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
