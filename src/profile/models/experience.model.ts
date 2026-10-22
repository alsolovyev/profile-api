import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType({ description: 'A professional role or work experience on a profile' })
export class Experience {
  @Field({ description: 'The company or organization where the role was held' })
  company: string

  @Field({ description: 'The position or role held at the company' })
  position: string
}
