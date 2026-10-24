import { ParseUUIDPipe } from '@nestjs/common'
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'

import { ExperienceModel } from '../models/experience.model.js'
import { LinkModel } from '../models/link.model.js'
import { ProfileModel } from '../models/profile.model.js'
import { GetProfileUseCase } from '../usecases/get-profile.usecase.js'
import { GetProfileExperiencesUseCase } from '../usecases/get-profile-experience.usecase.js'
import { GetProfileLinksUseCase } from '../usecases/get-profile-links.usecase.js'

@Resolver(() => ProfileModel)
export class GraphQLProfileResolver {
  constructor(
    private readonly getProfile: GetProfileUseCase,
    private readonly getProfileExperiences: GetProfileExperiencesUseCase,
    private readonly getProfileLinks: GetProfileLinksUseCase
  ) { }

  @Query(() => ProfileModel, { nullable: true })
  async profile(@Args('uuid', { type: () => String }, ParseUUIDPipe) uuid: string): Promise<ProfileModel | null> {
    return await this.getProfile.execute(uuid)
  }

  @ResolveField(() => [ExperienceModel])
  async experiences(@Parent() profile: ProfileModel): Promise<ExperienceModel[]> {
    return await this.getProfileExperiences.execute(profile.id)
  }

  @ResolveField(() => [LinkModel])
  async links(@Parent() profile: ProfileModel): Promise<LinkModel[]> {
    return this.getProfileLinks.execute(profile.id)
  }
}
