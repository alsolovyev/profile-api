import type { AppConfig } from './config/env.schema.js'
import type { LoggerService } from './logger/logger.service.js'

type Args<A> = A extends readonly [unknown, ...unknown[]] ? A : [A]

declare global {
  namespace App {
    type Config = AppConfig
    type Logger = LoggerService

    export interface UseCase<I, O> {
      execute(...args: Args<I>): O | Promise<O>
    }
  }
}
