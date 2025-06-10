import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TransformInterceptor } from './transform/transform.interceptor';
import { TimeoutInterceptor } from './timeout/timeout.interceptor';
import { ErrorsInterceptor } from './errors/errors.interceptor';
import * as compression from 'compression';
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });
  app.use(compression());
  const API_VERSION = '1';
  const ACCEPTED_API_VERSIONS = ['1'];
  app.enableVersioning({
    defaultVersion: ACCEPTED_API_VERSIONS,
    type: VersioningType.URI,
  });
  mainSwaggerDocument(API_VERSION, app);
  app.useGlobalInterceptors(
    new TransformInterceptor(),
    new TimeoutInterceptor(),
    new ErrorsInterceptor(),
  );
  app.enableCors();
  await app.listen(3000);
}
function mainSwaggerDocument(apiVersion: string, app: INestApplication): void {
  const swaggerConfig = new DocumentBuilder()
    .setTitle(process.env.APP_NAME || 'API')
    .setDescription('API Documentation')
    .setVersion(apiVersion)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
}
bootstrap();