import { Injectable, NotFoundException } from '@nestjs/common'

import { PrismaProfileRepository } from './profile.repository.js'

import type { Profile } from './models/profile.model.js'

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: PrismaProfileRepository) { }

  async getProfile(): Promise<Profile> {
    const profile = await this.profileRepository.findProfile()

    if (!profile) {
      throw new NotFoundException('Profile not found')
    }

    return profile
  }
}
