import { Controller, Post, HttpCode, HttpStatus, Body, Res } from '@nestjs/common';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { ObjectsService } from './objects.service';
import { DataDto } from './dto/data.dto';
import { DataResultDto } from './dto/result.dto';

@ApiUseTags('Objects')
@Controller('objects')
export class ObjectsController {
    constructor(private readonly objectService: ObjectsService) { }

  @Post('/')
  @ApiResponse({ status: HttpStatus.OK, type: DataResultDto })
  async addData(@Body() data: DataDto): Promise<DataResultDto> {
      const {idFromUser, rawData} = data;
      return await this.objectService.create(idFromUser, rawData);
  }
}
