import { Module } from '@nestjs/common'

import { PrismaModule } from '#src/prisma/prisma.module.js'

import { ProfileResolver } from './profile.resolver.js'
import { ProfileService } from './profile.service.js'
import { PrismaProfileRepository } from './profile.repository.js'

@Module({
  imports: [PrismaModule],
  providers: [ProfileResolver, ProfileService, PrismaProfileRepository]
})
export class ProfileModule { }
