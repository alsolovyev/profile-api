import { Injectable } from '@nestjs/common'
import { PrismaService } from '#src/prisma/prisma.service.js'

import { ProfileRepository } from '../profile.repository.js'
import type { ProfileSnapshot } from '../profile.types.js'

@Injectable()
export class PrismaProfileRepository extends ProfileRepository {
  constructor(private readonly prisma: PrismaService) {
    super()
  }

  async findProfile(): Promise<ProfileSnapshot | null> {
    return this.prisma.profile.findFirst({
      include: {
        skills: true,
        experiences: true,
        projects: true
      }
    })
  }
}
