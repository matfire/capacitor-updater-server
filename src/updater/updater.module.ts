import { Module, Type } from '@nestjs/common';
import { UpdaterController } from './updater.controller';
import { UpdaterService } from './updater.service';
import { StorageBase } from './storage/updater.storage.base';
import { UpdaterStorageLocal } from './storage/updater.storage.local';

function getStorageClass(): Type<StorageBase> {
  switch (process.env.STORAGE) {
    case 'local':
      return UpdaterStorageLocal;
    default:
      throw new Error(`Invalid Storage: ${process.env.STORAGE}`);
  }
}

@Module({
  controllers: [UpdaterController],
  providers: [
    UpdaterService,
    {
      provide: 'STORAGE',
      useClass: getStorageClass(),
    },
  ],
})
export class UpdaterModule {}
