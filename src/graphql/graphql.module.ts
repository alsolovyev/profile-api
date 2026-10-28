import { Module } from '@nestjs/common'
import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'

import { formatGraphQLError } from './graphql.utils.js'

const DEFAULT_QUERY = `query {
  profile(uuid: "11111111-1111-4111-8111-111111111111") {
    id
    name
    description
    links {
      label
      url
    }
    skills {
      name
    }
    experiences {
      company
      position
      startDate
      endDate
      achievements
    }
    projects {
      name
      description
      url
    }
  }
  
  health {
    status
    timestamp
    uptime
    version
    database
  }
}`

@Module({
  imports: [
    NestGraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      graphiql: false,
      plugins: [
        ApolloServerPluginLandingPageLocalDefault({
          document: DEFAULT_QUERY
        })
      ],
      autoSchemaFile: true,
      introspection: true,
      formatError: formatGraphQLError
    })
  ]
})
export class GraphQLModule { }
