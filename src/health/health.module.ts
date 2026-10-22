import { Module } from '@nestjs/common'
import { PrismaModule } from '#src/prisma/prisma.module.js'
import { HealthResolver } from './health.resolver.js'

@Module({
  imports: [PrismaModule],
  providers: [HealthResolver]
})
export class HealthModule { }
