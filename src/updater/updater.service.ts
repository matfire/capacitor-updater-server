import { Inject, Injectable } from '@nestjs/common';
import { AppInfos, AppInfosResponse } from './updater.appinfo.dto';
import { StorageBase } from './storage/updater.storage.base';

@Injectable()
export class UpdaterService {
  constructor(@Inject("STORAGE") private storageService: StorageBase) {}

  async hasNewVersion(appInfo: AppInfos): Promise<boolean> {
    return this.storageService.hasNewVersion(appInfo);
  }

  async getNewVersion(appInfo: AppInfos): Promise<AppInfosResponse> {
    return this.storageService.getNewVersion(appInfo);
  }
}
