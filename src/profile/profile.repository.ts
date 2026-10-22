import { Injectable } from '@nestjs/common'

import { PrismaService } from '#src/prisma/prisma.service.js'

import type { Profile } from './models/profile.model.js'

@Injectable()
export class PrismaProfileRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findProfile(): Promise<Profile | null> {
    return this.prisma.profile.findFirst({
      include: {
        skills: true,
        experiences: true,
        projects: true
      }
    })
  }
}
