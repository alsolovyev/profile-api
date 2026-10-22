import { Field, ObjectType } from '@nestjs/graphql'

import { Skill } from './skill.model.js'
import { Experience } from './experience.model.js'
import { Project } from './project.model.js'

@ObjectType({ description: 'A public profile' })
export class Profile {
  @Field({ description: 'The profile owner’s display name' })
  name: string

  @Field(() => String, { description: 'An optional biography of the profile owner', nullable: true })
  description: string | null

  @Field(() => [Skill], { description: 'Skills associated with this profile' })
  skills: Skill[]

  @Field(() => [Experience], {description: 'Professional experience associated with this profile' })
  experiences: Experience[]

  @Field(() => [Project], { description: 'Projects associated with this profile' })
  projects: Project[]
}
