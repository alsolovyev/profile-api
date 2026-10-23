import { Query, Resolver } from '@nestjs/graphql'

import { ProfileModel } from '../models/profile.model.js'
import { GetPublicProfileUseCase } from '../usecases/get-public-profile.usecase.js'

@Resolver(() => ProfileModel)
export class GraphQLProfileResolver {
  constructor(private readonly getPublicProfile: GetPublicProfileUseCase) { }

  @Query(() => ProfileModel, { nullable: true })
  async profile(): Promise<ProfileModel | null> {
    const profile = await this.getPublicProfile.execute()

    return profile
  }
}
