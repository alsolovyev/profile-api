import { Logger } from '@nestjs/common'
import { Query, ResolveField, Resolver } from '@nestjs/graphql'

import { PrismaService } from '#src/prisma/prisma.service.js'

import { Health, HealthState } from './models/health.model.js'

@Resolver(() => Health)
export class HealthResolver {
  private readonly logger = new Logger(HealthResolver.name)

  constructor(private readonly prismaService: PrismaService) { }

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
      const reason = error instanceof Error ? (error.stack ?? error.message) : String(error)

      this.logger.error('Database health check failed', reason)

      return HealthState.DOWN
    }
  }
}
