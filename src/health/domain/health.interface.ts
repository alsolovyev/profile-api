import { HealthState } from './health-status.enum.js'

export interface Health {
  status: HealthState
  timestamp: Date
  uptime: number
  version: string
  database: HealthState
}
