import type { AppConfig } from './config/env.schema.js'
import type { LoggerService } from './logger/logger.service.js'

declare global {
  namespace App {
    type Config = AppConfig
    type Logger = LoggerService
  }
}
