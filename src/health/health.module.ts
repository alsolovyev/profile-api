import { Module } from '@nestjs/common'
import { PrismaModule } from '#src/prisma/prisma.module.js'
import { GraphQLHealthResolver } from './resolvers/graphql-health.resolver.js'

@Module({
  imports: [PrismaModule],
  providers: [GraphQLHealthResolver]
})
export class HealthModule { }
