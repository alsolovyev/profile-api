import { Module } from '@nestjs/common'

import { PrismaModule } from '#src/prisma/prisma.module.js'

import { ProfileResolver } from './profile.resolver.js'
import { ProfileService } from './profile.service.js'
import { ProfileRepository } from './profile.repository.js'
import { PrismaProfileRepository } from './repositories/prisma-profile.repository.js'

@Module({
  imports: [PrismaModule],
  providers: [
    ProfileResolver,
    ProfileService,
    { provide: ProfileRepository, useClass: PrismaProfileRepository }
  ]
})
export class ProfileModule { }
