import { Module } from '@nestjs/common'

import { PrismaModule } from '#src/prisma/prisma.module.js'

import { ProfileService } from './profile.service.js'
import { ProfileRepository } from './profile.repository.js'
import { PrismaProfileRepository } from './repositories/prisma-profile.repository.js'
import { GraphQLProfileResolver } from './resolvers/graphql-profile.resolver.js'

@Module({
  imports: [PrismaModule],
  providers: [
    GraphQLProfileResolver,
    ProfileService,
    { provide: ProfileRepository, useClass: PrismaProfileRepository }
  ]
})
export class ProfileModule { }
