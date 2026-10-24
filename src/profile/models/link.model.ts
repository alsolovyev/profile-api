import { Field, ObjectType } from '@nestjs/graphql'
import { Link } from '../domain/link.interface.js'

@ObjectType({ description: 'An external link listed on a profile' })
export class LinkModel implements Omit<Link, 'id'> {
  @Field({ description: 'A display label for the link, such as GitHub or LinkedIn' })
  label: string

  @Field({ description: 'The URL the link points to' })
  url: string
}
