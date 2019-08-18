import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3000;
  const HOSTNAME = process.env.HOSTNAME || '127.0.0.1';
  const PREFIX_URL = process.env.PREFIX_URL || 'api/v1';

  app.use(helmet());
  app.enableCors();
  app.setGlobalPrefix(PREFIX_URL);
  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle('Write Service API')
    .setDescription('API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(PORT, HOSTNAME);
}
bootstrap();
