import { Module } from '@nestjs/common'

import { AppConfigModule } from '#src/config/config.module.js'
import { LoggerModule } from '#src/logger/logger.module.js'
import { PrismaModule } from '#src/prisma/prisma.module.js'

@Module({
  imports: [AppConfigModule, LoggerModule, PrismaModule]
})
export class AppModule { }
