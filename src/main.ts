import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'

import { Env } from '#config'
import { LoggerService } from '#logger'
import { AppModule } from '#src/app.module.js'
import { createLoggerMiddleware } from '#src/logger/logger.middleware.js'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true })
  const config = app.get<ConfigService, ConfigService<Env>>(ConfigService)
  const port = config.getOrThrow<number>('PORT')
  const logger = app.get(LoggerService)

  app.useLogger(logger)
  app.use(createLoggerMiddleware(logger))

  await app.listen(port)
}

await bootstrap()
