import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType({ description: '' })
export class Project {
  @Field({ description: '' })
  name: string

  @Field({ description: '' })
  description: string

  @Field({ description: '' })
  url: string
}
