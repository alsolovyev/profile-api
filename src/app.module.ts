import { Module } from '@nestjs/common'

import { AppConfigModule } from '#src/config/config.module.js'
import { LoggerModule } from '#src/logger/logger.module.js'
import { PrismaModule } from '#src/prisma/prisma.module.js'
import { GraphQLModule } from '#src/graphql/graphql.module.js'

@Module({
  imports: [AppConfigModule, LoggerModule, PrismaModule, GraphQLModule]
})
export class AppModule { }
