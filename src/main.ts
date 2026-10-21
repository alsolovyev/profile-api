import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'

import { Env } from '#config'
import { LoggerService } from '#logger'
import { AppModule } from '#src/app.module.js'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true
  })
  const logger = app.get(LoggerService)
  const config = app.get<ConfigService, ConfigService<Env>>(ConfigService)
  const port = config.getOrThrow<number>('PORT')

  app.useLogger(logger)

  await app.listen(port)
}

await bootstrap()
