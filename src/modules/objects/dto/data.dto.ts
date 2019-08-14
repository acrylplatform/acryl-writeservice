import { IsEmail, IsNotEmpty, MinLength, MaxLength, IsJSON } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class DataDto {
  @ApiModelProperty({ required: true })
  @IsJSON()
  readonly rawData: string;
}
