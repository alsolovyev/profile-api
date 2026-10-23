import { Injectable } from '@nestjs/common'
import { HealthState } from '../domain/health-status.enum.js'

export interface LivenessResult {
  readonly status: HealthState
  readonly timestamp: Date
  readonly uptime: number
  readonly version: string
}

@Injectable()
export class GetLivenessUseCase implements App.UseCase<void, {}> {
  execute() {
    return {
      status: HealthState.UP,
      timestamp: new Date(),
      uptime: process.uptime(),
      version: process.env.npm_package_version ?? 'unknown'
    }
  }
}
