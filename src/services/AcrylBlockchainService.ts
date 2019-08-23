import { WatcherService } from './Watcher';
import { getRepository, createConnection } from 'typeorm';
import { DataObject } from '../modules/objects/entity/dataobject.entity';
import {
  transfer,
  data,
  broadcast,
  IDataParams,
} from '@waves/waves-transactions';
import * as moment from 'moment';

export class AcrylBlockchainService extends WatcherService {
  nodeUrl: string;
  service: any;

  constructor() {
    super();

    this.init();
  }

  async init() {
    try {
      await createConnection();
    } catch (error) {
      this.logger.error('Error while connecting to the database', error);
      return error;
    }
  }

  getName() {
    return `AcrylBlockchain Service`;
  }

  async run() {
    const objects = await getRepository(DataObject).findAndCount({
      where: {
        txStatus: false,
      },
    });

    if (objects[1] > 0) {
      this.logger.info(`Found ${objects[1]} objects`);
      for (const object of objects[0]) {
        await this.sendObject(object);
      }
    }
  }

  async sendObject(object: DataObject) {
    const nodeUrl = process.env.NODE_URL;
    const seed = process.env.SEED;
    const writeData = {
      data: object.rawData,
      id: object.idFromUser,
    };
    const dataParams: IDataParams = {
      data: [
        {
          key: 'data',
          value: JSON.stringify(writeData),
        },
        {
          key: 'previousHash',
          value: object.prevHash,
        },
      ],
    };

    const signedDataTx = data(dataParams, seed);
    const tx = await broadcast(signedDataTx, nodeUrl);

    this.logger.info(`Send data #${object.id} to blockchain txHash=${tx.id}`);

    object.txHash = tx.id;
    object.txDate = moment(tx.timestamp).toString();
    object.txStatus = true;
    object.writeData = writeData;

    await getRepository(DataObject).save(object);
  }
}
