import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataResultDto } from './dto/result.dto';
import { DataObject } from './entity/dataobject.entity';
import {
  transfer,
  data,
  broadcast,
  IDataParams,
} from '@waves/waves-transactions';
import { ConfigService } from '../config/config.service';
import * as moment from 'moment';

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

    return {
      writeData: object.writeData,
      idFromUser,
      txHash: tx.id,
      // txDate: txDate.toDate(),
      createdAt: object.createdAt,
      // ...tx,
    };
  }

  async sendTx(rawData: string) {
    const nodeUrl = this.configService.get('NODE_URL');
    const seed = this.configService.get('SEED');
    const dataParams: IDataParams = {
      data: [
        {
          key: 'userData',
          value: JSON.stringify(rawData),
        },
      ],
    };

    const signedDataTx = data(dataParams, seed);

    return await broadcast(signedDataTx, nodeUrl);
  }

  async update(obj: any, tx: any) {
    const txDate = moment(tx.timestamp);

    obj.txDate = txDate.toDate();
    obj.txStatus = true;
    obj.txHash = tx.id;
    const object = await this.objectRepository.save(obj);
  }
}
