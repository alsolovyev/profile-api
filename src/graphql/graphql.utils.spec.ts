import { formatGraphQLError } from './graphql.utils.js'
import type { GraphQLFormattedError } from 'graphql'

describe('formatGraphQLError', () => {
  it('should successfully format a standard error with custom extensions and details', () => {
    const mockError: GraphQLFormattedError = {
      message: 'Database connection failed',
      extensions: {
        code: 'DATABASE_ERROR',
        details: { field: 'host', reason: 'timeout' }
      }
    }

    const result = formatGraphQLError(mockError)

    expect(result).toEqual({
      code: 'DATABASE_ERROR',
      message: 'Database connection failed',
      details: { field: 'host', reason: 'timeout' }
    })
  })

  it('should fallback to default values when code and message are missing', () => {
    const mockEmptyError: GraphQLFormattedError = {
      message: '',
      extensions: {}
    }

    const result = formatGraphQLError(mockEmptyError)

    expect(result).toEqual({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Unexpected error occurred',
      details: undefined
    })
  })

  it('should fallback to defaults when extensions object is completely missing', () => {
    const mockErrorWithoutExtensions: GraphQLFormattedError = {
      message: 'Validation failed'
    }

    const result = formatGraphQLError(mockErrorWithoutExtensions)

    expect(result).toEqual({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Validation failed',
      details: undefined
    })
  })

  it('should fallback to default code if extensions exist but code is omitted', () => {
    const mockErrorNoCode: GraphQLFormattedError = {
      message: 'Custom execution exception',
      extensions: {
        details: 'Some arbitrary error details context'
      }
    }

    const result = formatGraphQLError(mockErrorNoCode)

    expect(result).toEqual({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Custom execution exception',
      details: 'Some arbitrary error details context'
    })
  })
})
