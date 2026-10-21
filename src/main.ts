import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module.js'
import { ConfigService } from '@nestjs/config'
import { LoggerService } from './logger/logger.service.js'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true
  })
  const logger = app.get(LoggerService)
  const config = app.get(ConfigService)
  const port = config.getOrThrow<number>('PORT')

  app.useLogger(logger)

  await app.listen(port)
}

await bootstrap()
