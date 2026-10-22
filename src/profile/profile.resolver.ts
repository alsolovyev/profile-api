import { Query, Resolver } from '@nestjs/graphql'
import { Profile } from './models/profile.model.js'

@Resolver(() => Profile)
export class ProfileResolver {
  @Query(() => Profile)
  profile(): Profile {
    return {
      name: 'Aleksey Solovyev',
      description: 'Some description',
      skills: [{ name: 'JS' }],
      experiences: [{ company: 'SkyEnd', position: 'Senior Frontend Developer' }]
    }
  }
}
