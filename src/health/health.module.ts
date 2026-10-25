import { Module } from '@nestjs/common'

import { PrismaModule } from '#src/prisma/prisma.module.js'

import { PrismaHealthAdapter } from './adapters/prisma-health.adapter.js'
import { DATABASE_HEALTH_PORT } from './ports/health.port.js'
import { GraphQLHealthResolver } from './resolvers/graphql-health.resolver.js'
import { CheckDatabaseHealthUseCase } from './usecases/check-db-health.usecase.js'
import { GetLivenessUseCase } from './usecases/get-liveness.usecase.js'
import { HttpHealthController } from './controllers/http-health.controller.js'

@Module({
  imports: [PrismaModule],
  controllers: [HttpHealthController],
  providers: [
    GraphQLHealthResolver,
    GetLivenessUseCase,
    {
      provide: DATABASE_HEALTH_PORT,
      useClass: PrismaHealthAdapter
    },
    CheckDatabaseHealthUseCase
  ]
})
export class HealthModule { }
