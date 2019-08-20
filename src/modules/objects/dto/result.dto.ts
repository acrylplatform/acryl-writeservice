import { IsEmail, IsNotEmpty, MinLength, MaxLength, IsJSON } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class DataResultDto {
  @ApiModelProperty()
  readonly idFromUser: string;

  @ApiModelProperty()
  readonly writeData: string;

  @ApiModelProperty()
  readonly txHash: string;

  @ApiModelProperty({nullable: true})
  readonly txDate?: Date;

  @ApiModelProperty()
  readonly createdAt: string;
}
