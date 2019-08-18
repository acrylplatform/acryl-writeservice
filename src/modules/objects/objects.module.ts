import { Module } from '@nestjs/common';
import { ObjectsController } from './objects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObjectsService } from './objects.service';
import { DataObject } from './entity/dataobject.entity';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DataObject]),
    ConfigModule,
  ],
  controllers: [ObjectsController],
  providers: [ObjectsService],
  exports: [ObjectsService],
})
export class ObjectsModule {}
