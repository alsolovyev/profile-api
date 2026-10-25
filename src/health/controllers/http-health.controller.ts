import { Controller, Get } from '@nestjs/common'

import { GetLivenessUseCase } from '../usecases/get-liveness.usecase.js'
import { CheckDatabaseHealthUseCase } from '../usecases/check-db-health.usecase.js'
import type { Health } from '../domain/health.interface.js'

@Controller()
export class HttpHealthController {
  constructor(
    private readonly getLiveness: GetLivenessUseCase,
    private readonly checkDatabaseHealth: CheckDatabaseHealthUseCase
  ) { }

  @Get('/health')
  async health(): Promise<Health> {
    const appLiveness = this.getLiveness.execute()
    const dbLiveness = await this.checkDatabaseHealth.execute()

    return {
      ...appLiveness,
      database: dbLiveness
    }
  }
}
