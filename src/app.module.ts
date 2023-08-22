import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import { UpdaterModule } from './updater/updater.module';
@Module({
  imports: [ConfigModule.forRoot(), UpdaterModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
