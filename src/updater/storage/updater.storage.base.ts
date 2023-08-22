import { AppInfos, AppInfosResponse } from '../updater.appinfo.dto';

export interface StorageBase {
  hasNewVersion(appInfo: AppInfos): Promise<boolean>;
  getNewVersion(appInfo: AppInfos): Promise<AppInfosResponse>;
}
