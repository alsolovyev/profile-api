import { Module } from '@nestjs/common'
import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'

import { PrismaModule } from '#src/prisma/prisma.module.js'

@Module({
  imports: [
    PrismaModule,
    NestGraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      graphiql: true,
      autoSchemaFile: true
    })
  ]
})
export class GraphQLModule { }
