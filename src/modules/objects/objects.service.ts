import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataResultDto } from './dto/result.dto';
import { DataObject } from './entity/dataobject.entity';
import { transfer, data, broadcast, IDataParams } from '@waves/waves-transactions';
import { ConfigService } from '../config/config.service';

@Injectable()
export class ObjectsService {
  constructor(
    @InjectRepository(DataObject)
    private objectRepository: Repository<DataObject>,
    private configService: ConfigService,
  ) {}

  async create(idFromUser: string, rawData: string): Promise<DataResultDto> {
    const obj = await this.objectRepository.create({
      idFromUser,
      rawData,
    });
    const object = await this.objectRepository.save(obj);

    const tx = await this.sendTx(rawData);

    console.log('tx', tx);

    return {
      writeData: object.writeData,
      idFromUser,
      txHash: 'tx.id',
      createdAt: object.createdAt,
      ...tx,
    };
  }

  async sendTx(rawData: string) {
    try {
    const nodeUrl = this.configService.get('NODE_URL');
    const seed = this.configService.get('SEED');
    const dataParams: IDataParams = {
      data: [
        {
          key: 'rawData',
          // type: 'string',
          value: JSON.stringify(rawData),
        },
      ],
    };

    const signedDataTx = data(
      dataParams,
      seed,
    );

    console.log('tx', signedDataTx);

    return await broadcast(signedDataTx, seed);

    } catch (error) {
      // console.log('eerr', error);
      // return error;
    }
  }
}
