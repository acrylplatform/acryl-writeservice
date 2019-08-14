import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { ObjectsService } from './objects.service';
import { DataDto } from './dto/data.dto';

@ApiUseTags('Objects')
@Controller('objects')
export class ObjectsController {
    constructor(private readonly objectService: ObjectsService) { }

  @Post('/')
  @HttpCode(HttpStatus.OK)
  addData(@Body() data: DataDto): string {
      return '';
  }
}
