import { Inject, Injectable } from '@nestjs/common'

import { HealthState } from '../domain/health-status.enum.js'
import { DATABASE_HEALTH_PORT } from '../ports/health.port.js'

import type { HealthPort } from '../ports/health.port.js'

@Injectable()
export class CheckDatabaseHealthUseCase implements App.UseCase<void, HealthState> {
  constructor(@Inject(DATABASE_HEALTH_PORT) private readonly database: HealthPort) { }

  async execute(): Promise<HealthState> {
    const ok = await this.database.check()

    return ok ? HealthState.UP : HealthState.DOWN
  }
}
