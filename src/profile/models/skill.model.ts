import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType({ description: '' })
export class Skill {
  @Field({ description: '' })
  name: string
}
