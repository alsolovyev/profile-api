import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType({ description: 'A project presented on a profile' })
export class ProjectModel {
  @Field({ description: 'The project name' })
  name: string

  @Field(() => String, { description: 'A short summary of the project', nullable: true })
  description: string | null

  @Field(() => String, { description: 'A link to the project, when available', nullable: true })
  url: string | null
}
