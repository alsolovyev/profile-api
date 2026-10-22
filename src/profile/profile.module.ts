import { Module } from '@nestjs/common'

import { PrismaModule } from '#src/prisma/prisma.module.js'

import { ProfileResolver } from './profile.resolver.js'
import { ProfileService } from './profile.provider.js'
import { ProfileRepository } from './profile.repository.js'

@Module({
  imports: [PrismaModule],
  providers: [ProfileResolver, ProfileService, ProfileRepository]
})
export class ProfileModule { }
