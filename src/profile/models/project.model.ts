import { Field, ObjectType } from '@nestjs/graphql'
import { Project } from '../domain/project.interface.js'

@ObjectType({ description: 'A project presented on a profile' })
export class ProjectModel implements Omit<Project, 'id'> {
  @Field({ description: 'The project name' })
  name: string

  @Field(() => String, { description: 'A short summary of the project', nullable: true })
  description: string | null

  @Field(() => String, { description: 'A link to the project, when available', nullable: true })
  url: string | null
}
