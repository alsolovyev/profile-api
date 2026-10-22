import type { GraphQLFormattedError } from 'graphql'

export function formatGraphQLError(error: GraphQLFormattedError) {
  const code = error.extensions?.code || 'INTERNAL_SERVER_ERROR'
  const message = error.message || 'Unexpected error occurred'

  return {
    code,
    message,
    details: error.extensions?.details
  }
}
