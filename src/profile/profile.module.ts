import { Module } from '@nestjs/common'

import { PrismaModule } from '#src/prisma/prisma.module.js'

import { ProfileRepository } from './repositories/profile.repository.js'
import { PrismaProfileRepository } from './repositories/prisma-profile.repository.js'
import { GraphQLProfileResolver } from './resolvers/graphql-profile.resolver.js'
import { GetProfileUseCase } from './usecases/get-profile.usecase.js'

@Module({
  imports: [PrismaModule],
  providers: [
    GraphQLProfileResolver,
    { provide: ProfileRepository, useClass: PrismaProfileRepository },
    GetProfileUseCase
  ]
})
export class ProfileModule { }
