import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType({ description: '' })
export class Experience {
  @Field({ description: '' })
  company: string

  @Field({ description: '' })
  position: string
}
