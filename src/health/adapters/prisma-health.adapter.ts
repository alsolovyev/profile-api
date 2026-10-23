import { Injectable, Logger } from '@nestjs/common'
import { PrismaService } from '#src/prisma/prisma.service.js'
import { HealthPort } from '../ports/health.port.js'

@Injectable()
export class PrismaHealthAdapter implements HealthPort {
  private readonly logger = new Logger(PrismaHealthAdapter.name)

  constructor(private readonly prisma: PrismaService) { }

  async check(): Promise<boolean> {
    try {
      await this.prisma.$queryRaw`SELECT 1`
      return true
    } catch (error: unknown) {
      const reason = error instanceof Error ? (error.stack ?? error.message) : String(error)

      this.logger.error('Database health check failed', reason)

      return false
    }
  }
}
