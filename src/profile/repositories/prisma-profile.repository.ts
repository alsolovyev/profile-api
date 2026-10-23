import { Injectable } from '@nestjs/common'
import { PrismaService } from '#src/prisma/prisma.service.js'
import { ProfileRepository } from './profile.repository.js'
import type { Profile } from '../domain/profile.interface.js'

@Injectable()
export class PrismaProfileRepository extends ProfileRepository {
  constructor(private readonly prisma: PrismaService) {
    super()
  }

  async findPublicProfile(): Promise<Profile | null> {
    return this.prisma.profile.findFirst({
      include: {
        skills: true,
        experiences: true,
        projects: true
      }
    })
  }
}
