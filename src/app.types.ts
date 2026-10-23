import type { AppConfig } from './config/env.schema.js'
import type { LoggerService } from './logger/logger.service.js'

declare global {
  namespace App {
    type Config = AppConfig
    type Logger = LoggerService

    export interface UseCase<I, O> {
      execute(input: I): O | Promise<O>
    }
  }
}
