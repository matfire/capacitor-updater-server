import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AppInfos, AppInfosResponse } from './updater.appinfo.dto';
import { UpdaterService } from './updater.service';

@Controller('update')
export class UpdaterController {
  private logger: Logger = new Logger('UpdaterController');

  constructor(private updaterService: UpdaterService) { }
  @Post('/')
  async updater(@Body() appInfos: AppInfos): Promise<AppInfosResponse> {
    Logger.log(`Update for ${appInfos.version_build} - ${appInfos.version_name}`)
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
