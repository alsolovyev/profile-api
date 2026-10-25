import { Field, Float, ObjectType, registerEnumType } from '@nestjs/graphql'

import { HealthState } from '../domain/health-status.enum.js'
import { Health } from '../domain/health.interface.js'

registerEnumType(HealthState, {
  name: 'HealthState',
  description: 'Whether a component is working'
})

@ObjectType({ description: 'Health status of the API and its dependencies' })
export class HealthModel implements Health {
  @Field(() => HealthState, { description: 'Status of the API' })
  status: HealthState

  @Field({ description: 'Server time when the check ran (ISO 8601)' })
  timestamp: Date

  @Field(() => Float, { description: 'Seconds since the API process started' })
  uptime: number

  @Field({ description: 'Deployed application version' })
  version: string

  @Field(() => HealthState, { description: 'Database connectivity' })
  database: HealthState
}
