import { Field, ObjectType } from '@nestjs/graphql'

import { ExperienceModel } from './experience.model.js'
import { LinkModel } from './link.model.js'
import { ProjectModel } from './project.model.js'
import { SkillModel } from './skill.model.js'

@ObjectType({ description: 'A public profile' })
export class ProfileModel {
  @Field({ description: 'The profile owner’s display name' })
  name: string

  @Field(() => String, { description: 'An optional biography of the profile owner', nullable: true })
  description: string | null

  @Field(() => [LinkModel], { description: 'External links associated with this profile' })
  links: LinkModel[]

  @Field(() => [SkillModel], { description: 'Skills associated with this profile' })
  skills: SkillModel[]

  @Field(() => [ExperienceModel], { description: 'Professional experience associated with this profile' })
  experiences: ExperienceModel[]

  @Field(() => [ProjectModel], { description: 'Projects associated with this profile' })
  projects: ProjectModel[]
}
