import { randomUUID } from 'node:crypto'
import { performance } from 'node:perf_hooks'

import type { RequestHandler } from 'express'

export function createLoggerMiddleware(logger: App.Logger): RequestHandler {
  return (req, res, next) => {
    const startedAt = performance.now()
    const requestId = randomUUID()

    res.setHeader('X-Request-Id', requestId)

    res.once('close', () => {
      const route = req.route?.path ?? 'unmatched'
      const duration = Number((performance.now() - startedAt).toFixed(2))

      logger.log(
        `${req.method} ${route} ${res.statusCode} in ${duration}ms [${requestId}]`,
        'LoggerMiddleware'
      )
    })

    next()
  }
}
