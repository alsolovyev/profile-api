import { Injectable } from '@nestjs/common'
import { Profile } from './models/profile.model.js'
import { PrismaService } from '#src/prisma/prisma.service.js'

@Injectable()
export class ProfileRepository {
  constructor(private readonly db: PrismaService) { }
  async get(): Promise<Profile> {
    const [profile] = await this.db.profile.findMany({
      include: {
        skills: true,
        experiences: true,
        projects: true
      }
    })

    return profile
  }
}
