import { ParseUUIDPipe } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'

import { ProfileModel } from '../models/profile.model.js'
import { GetProfileUseCase } from '../usecases/get-profile.usecase.js'

@Resolver(() => ProfileModel)
export class GraphQLProfileResolver {
  constructor(private readonly getProfile: GetProfileUseCase) { }

  @Query(() => ProfileModel, { nullable: true })
  async profile(@Args('uuid', { type: () => String }, ParseUUIDPipe) uuid: string): Promise<ProfileModel | null> {
    return await this.getProfile.execute(uuid)
  }
}
