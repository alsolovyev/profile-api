import { Query, ResolveField, Resolver } from '@nestjs/graphql'

import { PrismaService } from '#src/prisma/prisma.service.js'
import { LoggerService } from '#src/logger/logger.service.js'

import { Health, HealthState } from './models/health.model.js'

@Resolver(() => Health)
export class HealthResolver {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: LoggerService
  ) { }

  @Query(() => Health, { description: 'Returns API health' })
  health(): Omit<Health, 'database'> {
    return {
      status: HealthState.UP,
      timestamp: new Date(),
      uptime: process.uptime(),
      version: process.env.npm_package_version ?? 'unknown'
    }
  }

  @ResolveField(() => HealthState)
  async database(): Promise<HealthState> {
    try {
      await this.prismaService.$queryRaw`SELECT 1`
      return HealthState.UP
    } catch (error: unknown) {
      const err = error instanceof Error ? error.message : 'Database health check failed'
      this.logger.error(err, 'DatabaseHealthCheck')

      return HealthState.DOWN
    }
  }
}
