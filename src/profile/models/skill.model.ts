import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType({ description: 'A skill listed on a profile' })
export class SkillModel {
  @Field({ description: 'The name of the skill, technology, or tool' })
  name: string
}
