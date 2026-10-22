import { Module } from '@nestjs/common'

import { AppConfigModule } from '#src/config/config.module.js'
import { LoggerModule } from '#src/logger/logger.module.js'
import { PrismaModule } from '#src/prisma/prisma.module.js'
import { GraphQLModule } from '#src/graphql/graphql.module.js'
import { HealthModule } from '#src/health/health.module.js'

@Module({
  imports: [AppConfigModule, LoggerModule, PrismaModule, GraphQLModule, HealthModule]
})
export class AppModule { }
