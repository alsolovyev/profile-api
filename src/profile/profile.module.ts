import { Module } from '@nestjs/common'

import { PrismaModule } from '#src/prisma/prisma.module.js'

import { ProfileRepository } from './repositories/profile.repository.js'
import { PrismaProfileRepository } from './repositories/prisma-profile.repository.js'
import { GraphQLProfileResolver } from './resolvers/graphql-profile.resolver.js'
import { GetProfileUseCase } from './usecases/get-profile.usecase.js'
import { GetProfileLinksUseCase } from './usecases/get-profile-links.usecase.js'
import { GetProfileExperiencesUseCase } from './usecases/get-profile-experience.usecase.js'
import { GetProfileProjectsUseCase } from './usecases/get-profile-projects.usecase.js'

@Module({
  imports: [PrismaModule],
  providers: [
    GraphQLProfileResolver,
    { provide: ProfileRepository, useClass: PrismaProfileRepository },
    GetProfileUseCase,
    GetProfileLinksUseCase,
    GetProfileExperiencesUseCase,
    GetProfileProjectsUseCase
  ]
})
export class ProfileModule { }
