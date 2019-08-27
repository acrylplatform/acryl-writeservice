import { IsEmail, IsNotEmpty, MinLength, MaxLength, IsJSON } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class ObjectGetDto {
  @ApiModelProperty()
  readonly id: string;
}
