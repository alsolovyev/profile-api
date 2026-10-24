import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType({ description: 'An external link listed on a profile' })
export class LinkModel {
  @Field({ description: 'A display label for the link, such as GitHub or LinkedIn' })
  label: string

  @Field({ description: 'The URL the link points to' })
  url: string
}
