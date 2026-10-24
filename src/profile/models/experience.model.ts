import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql'
import { Experience } from '../domain/experience.interface.js'

@ObjectType({ description: 'A professional role or work experience on a profile' })
export class ExperienceModel implements Omit<Experience, 'id'>{
  @Field({ description: 'The company or organization where the role was held' })
  company: string

  @Field({ description: 'The position or role held at the company' })
  position: string

  @Field(() => GraphQLISODateTime, { description: 'The date the role started' })
  startDate: Date

  @Field(() => GraphQLISODateTime, { description: 'The date the role ended; null when it is the current role', nullable: true })
  endDate: Date | null

  @Field(() => [String], { description: 'Key achievements in this role' })
  achievements: string[]
}
