import { Query, Resolver } from '@nestjs/graphql'
import { Health, HealthState } from './models/health.model.js'

@Resolver(() => Health)
export class HealthResolver {
  constructor() { }

  @Query(() => Health, { description: 'Returns API health' })
  health(): Health {
    return {
      status: HealthState.UP,
      timestamp: new Date(),
      uptime: process.uptime(),
      version: process.env.npm_package_version ?? 'unknown'
    }
  }
}
