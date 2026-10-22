import { Query, Resolver } from '@nestjs/graphql'

import { Profile } from './models/profile.model.js'
import { ProfileService } from './profile.provider.js'

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) { }

  @Query(() => Profile)
  profile(): Profile {
    const profile = this.profileService.get()

    return profile
  }
}
