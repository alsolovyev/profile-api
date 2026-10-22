import { ConsoleLogger, Injectable, type LogLevel } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class LoggerService extends ConsoleLogger {
  constructor(config: ConfigService<App.Config>) {
    const nodeEnv = config.get<string>('NODE_ENV')
    const logLevel = config.get<LogLevel>('LOG_LEVEL')

    const isDebug = nodeEnv === 'production' || nodeEnv === 'test' ? 'log' : 'debug'
    const logLevels: LogLevel[] = [logLevel ?? isDebug]

    super({ logLevels })
  }
}
