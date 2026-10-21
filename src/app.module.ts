import { Module } from '@nestjs/common'

import { AppConfigModule } from '#src/config/config.module.js'
import { LoggerModule } from '#src/logger/logger.module.js'

@Module({
  imports: [AppConfigModule, LoggerModule]
})
export class AppModule { }
