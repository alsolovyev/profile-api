import { Field, Float, ObjectType, registerEnumType } from '@nestjs/graphql'

export enum HealthState {
  UP = 'UP',
  DOWN = 'DOWN'
}

registerEnumType(HealthState, {
  name: 'HealthState',
  description: 'Whether a component is working'
})

@ObjectType({ description: 'Health status of the API and its dependencies' })
export class Health {
  @Field(() => HealthState, { description: 'Status of the API' })
  status: HealthState

  @Field({ description: 'Server time when the check ran (ISO 8601)' })
  timestamp: Date

  @Field(() => Float, { description: 'Seconds since the API process started' })
  uptime: number

  @Field({ description: 'Deployed application version' })
  version: string
}
