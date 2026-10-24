import { Field, ID, ObjectType } from '@nestjs/graphql'
import type { Profile } from '../domain/profile.interface.ts'

@ObjectType({ description: 'A profile' })
export class ProfileModel implements Profile {
  @Field(() => ID, { description: 'Unique profile identifier' })
  id: string

  @Field({ description: 'The profile owner’s display name' })
  name: string

  @Field(() => String, { description: 'An optional biography of the profile owner', nullable: true })
  description: string | null
}
