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
    const isSending = this.configService.get('IS_SENDING');
    const prevHash = await this.lastHash();
    const obj = await this.objectRepository.create({
      idFromUser,
      rawData: JSON.parse(rawData),
      prevHash,
    });
    let object = await this.objectRepository.save(obj);
    let tx = null;

    if (isSending) {
      tx = await this.sendTx(object);
      object = await this.update(object, tx);
    }

    return isSending
      ? {
          writeData: object.writeData,
          idFromUser,
          prevHash,
          txHash: tx.id,
          txDate: object.txDate,
          createdAt: object.createdAt,
        }
      : {
          idFromUser,
          prevHash,
          createdAt: object.createdAt,
        };
  }

  async sendTx(object: any) {
    const nodeUrl = this.configService.get('NODE_URL');
    const seed = this.configService.get('SEED');
    const dataParams: IDataParams = {
      data: [
        {
          key: 'data',
          value: JSON.stringify(object.rawData),
        },
        {
          key: 'previousId',
          value: object.prevHash,
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

    return await this.objectRepository.save(obj);
  }

  async lastHash() {
    const object = await this.objectRepository.findOne({
      order: {
        createdAt: 'DESC',
      },
    });

    return object.txHash || null;
  }
}
