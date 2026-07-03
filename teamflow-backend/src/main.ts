import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(
    new HttpExceptionFilter(),
  );

  app.useGlobalInterceptors(
    new ResponseInterceptor(),
  );

  const config = new DocumentBuilder()
    .setTitle('TeamFlow API')
    .setDescription('TeamFlow SaaS Backend APIs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(
    app,
    config,
  );

  SwaggerModule.setup(
    'api',
    app,
    document,
  );

  const port = process.env.PORT || 3000;

  await app.listen(port);

  console.log(`🚀 TeamFlow Backend running on port ${port}`);

  console.log(
    '🚀 Server running at http://localhost:3000',
  );

  console.log(
    '📘 Swagger Docs: http://localhost:3000/api',
  );
}

bootstrap();