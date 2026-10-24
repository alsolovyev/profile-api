import { Field, ObjectType } from '@nestjs/graphql'
import { Skill } from '../domain/skill.interface.js'

@ObjectType({ description: 'A skill listed on a profile' })
export class SkillModel implements Omit<Skill, 'id'> {
  @Field({ description: 'The name of the skill, technology, or tool' })
  name: string
}
