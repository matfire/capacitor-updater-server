import { Injectable } from '@nestjs/common';
import { AppInfos, AppInfosResponse } from '../updater.appinfo.dto';
import { StorageBase } from './updater.storage.base';
import { createReadStream } from 'fs';
import { parse } from 'csv-parse';
import { createHash } from 'crypto';

@Injectable()
export class UpdaterStorageLocal implements StorageBase {
  filePath: string;
  checksum?: string;
  records: any[]

  constructor() {
    if (!process.env.STORAGE_FILE_PATH) {
      throw new Error('STORAGE_FILE_PATH not defined');
    }
    this.filePath = process.env.STORAGE_FILE_PATH;
  }

  async parseCSV() {
    const newCheckSum = createHash('md5').update(this.filePath).digest('hex');
    this.records = [];
    const parser = createReadStream(this.filePath)
      .pipe(parse({
        // CSV options if any
      }));
    for await (const record of parser) {
      // Work with each record
      this.records.push(record);
    }
  }

  async findRecord(appInfo: AppInfos): Promise<any> {
    await this.parseCSV();
    return this.records.find((record) => record[3] === appInfo.version_name && record[1] === appInfo.version_build);
  }

  async getNewVersion(appInfo: AppInfos): Promise<AppInfosResponse> {
    const record = await this.findRecord(appInfo);
    return {
      version: record[0],
      url: record[2],
    }
  }
  async hasNewVersion(appInfo: AppInfos): Promise<boolean> {
    await this.parseCSV();
    const record = await this.findRecord(appInfo);
    return Promise.resolve(record !== undefined);
  }
}
