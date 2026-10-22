import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType({ description: '' })
export class Profile {
  @Field({ description: '' })
  name: string

  @Field(() => String, { description: '', nullable: true })
  description?: string | null
}
