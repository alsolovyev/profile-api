import { Query, ResolveField, Resolver } from '@nestjs/graphql'

import { HealthModel } from '../models/health.model.js'
import { HealthState } from '../domain/health-status.enum.js'
import { GetLivenessUseCase } from '../usecases/get-liveness.usecase.js'
import { CheckDatabaseHealthUseCase } from '../usecases/check-db-health.usecase.js'

@Resolver(() => HealthModel)
export class GraphQLHealthResolver {
  constructor(
    private readonly getLiveness: GetLivenessUseCase,
    private readonly checkDatabaseHealth: CheckDatabaseHealthUseCase
  ) { }

  @Query(() => HealthModel, { description: 'Returns API health' })
  health(): Omit<HealthModel, 'database'> {
    return this.getLiveness.execute()
  }

  @ResolveField(() => HealthState)
  async database(): Promise<HealthState> {
    return this.checkDatabaseHealth.execute()
  }
}
