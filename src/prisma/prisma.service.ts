import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaPg } from '@prisma/adapter-pg'

import { Env } from '#config'
import { PrismaClient } from './generated/client.js'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(configService: ConfigService<Env>) {
    const user = configService.getOrThrow<string>('POSTGRES_USER')
    const password = configService.getOrThrow<string>('POSTGRES_PASSWORD')
    const host = configService.getOrThrow<string>('POSTGRES_HOST')
    const port = configService.getOrThrow<string>('POSTGRES_PORT')
    const db = configService.getOrThrow<string>('POSTGRES_DB')

    const adapter = new PrismaPg({
      connectionString: `postgresql://${user}:${password}@${host}:${port}/${db}?schema=public`
    })

    super({ adapter })
  }

  async onModuleInit() {
    await this.$connect()
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }
}
