import { Module } from '@nestjs/common'

import { PrismaModule } from '#src/prisma/prisma.module.js'

import { ProfileRepository } from './repositories/profile.repository.js'
import { PrismaProfileRepository } from './repositories/prisma-profile.repository.js'
import { GraphQLProfileResolver } from './resolvers/graphql-profile.resolver.js'
import { GetPublicProfileUseCase } from './usecases/get-public-profile.usecase.js'

@Module({
  imports: [PrismaModule],
  providers: [
    GraphQLProfileResolver,
    { provide: ProfileRepository, useClass: PrismaProfileRepository },
    GetPublicProfileUseCase
  ]
})
export class ProfileModule { }
