import { Body, Controller, Post } from '@nestjs/common';
import { AppInfos, AppInfosResponse } from './updater.appinfo.dto';
import { UpdaterService } from './updater.service';

@Controller('update')
export class UpdaterController {
  constructor(private updaterService: UpdaterService) { }
  @Post('/')
  async updater(@Body() appInfos: AppInfos): Promise<AppInfosResponse> {
    if (await this.updaterService.hasNewVersion(appInfos)) {
      return this.updaterService.getNewVersion(appInfos);
    }
    return {
      version: '',
      url: '',
      message: 'No new version available',
    };
  }
}
