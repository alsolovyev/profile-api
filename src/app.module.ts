import { Module } from '@nestjs/common'
import { AppConfigModule } from './config/config.module.js'
import { LoggerModule } from './logger/logger.module.js'

@Module({
  imports: [AppConfigModule, LoggerModule]
})
export class AppModule { }
