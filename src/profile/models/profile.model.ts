import { Field, ObjectType } from '@nestjs/graphql'

import { Skill } from './skill.model.js'

@ObjectType({ description: '' })
export class Profile {
  @Field({ description: '' })
  name: string

  @Field(() => String, { description: '', nullable: true })
  description?: string | null

  @Field(() => [Skill], { description: '' })
  skills: Skill[]
}
