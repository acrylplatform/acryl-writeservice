import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ObjectsModule } from './modules/objects/objects.module';
import { ConfigModule } from './modules/config/config.module';

@Module({
  imports: [TypeOrmModule.forRoot(), ObjectsModule, ConfigModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    AppService,
  ],
})
export class AppModule {}
