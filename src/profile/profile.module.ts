import { Module } from '@nestjs/common'

import { ProfileResolver } from './profile.resolver.js'
import { ProfileService } from './profile.provider.js'

@Module({
  providers: [ProfileResolver, ProfileService]
})
export class ProfileModule { }
