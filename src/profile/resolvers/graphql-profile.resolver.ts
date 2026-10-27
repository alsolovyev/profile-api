import { ParseUUIDPipe } from '@nestjs/common'
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'

import { Cache, MS } from '#src/common/decorators/cache.decorator.js'

import { ExperienceModel } from '../models/experience.model.js'
import { LinkModel } from '../models/link.model.js'
import { ProfileModel } from '../models/profile.model.js'
import { ProjectModel } from '../models/project.model.js'
import { SkillModel } from '../models/skill.model.js'
import { GetProfileUseCase } from '../usecases/get-profile.usecase.js'
import { GetProfileExperiencesUseCase } from '../usecases/get-profile-experience.usecase.js'
import { GetProfileLinksUseCase } from '../usecases/get-profile-links.usecase.js'
import { GetProfileProjectsUseCase } from '../usecases/get-profile-projects.usecase.js'
import { GetProfileSkillsUseCase } from '../usecases/get-profile-skills.usecase.js'

@Resolver(() => ProfileModel)
export class GraphQLProfileResolver {
  // NOTE: Consider using DataLoader to fetch related data in batches when loading
  //       multiple profiles, instead of making a separate database query for each one
  constructor(
    private readonly getProfile: GetProfileUseCase,
    private readonly getProfileExperiences: GetProfileExperiencesUseCase,
    private readonly getProfileLinks: GetProfileLinksUseCase,
    private readonly getProfileProjects: GetProfileProjectsUseCase,
    private readonly getProfileSkills: GetProfileSkillsUseCase
  ) { }

  @Query(() => ProfileModel, { nullable: true })
  @Cache(MS.SECOND * 10)
  // async profile(@Args('uuid', { type: () => String }, ParseUUIDPipe) uuid: string): Promise<ProfileModel | null> {
  async profile(): Promise<ProfileModel | null> {
    return await this.getProfile.execute('11111111-1111-4111-8111-111111111111')
  }

  @ResolveField(() => [ExperienceModel])
  @Cache(MS.SECOND * 10, parent => `experiences:${parent.id}`)
  async experiences(@Parent() profile: ProfileModel): Promise<ExperienceModel[]> {
    return await this.getProfileExperiences.execute(profile.id)
  }

  @ResolveField(() => [LinkModel])
  @Cache(MS.SECOND * 10, parent => `links:${parent.id}`)
  async links(@Parent() profile: ProfileModel): Promise<LinkModel[]> {
    return this.getProfileLinks.execute(profile.id)
  }

  @ResolveField(() => [ProjectModel])
  @Cache(MS.SECOND * 10, parent => `projects:${parent.id}`)
  async projects(@Parent() profile: ProfileModel): Promise<ProjectModel[]> {
    return await this.getProfileProjects.execute(profile.id)
  }

  @ResolveField(() => [SkillModel])
  @Cache(MS.SECOND * 10, parent => `skills:${parent.id}`)
  async skills(@Parent() profile: ProfileModel): Promise<SkillModel[]> {
    return await this.getProfileSkills.execute(profile.id)
  }
}
