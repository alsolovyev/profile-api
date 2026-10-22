import { Injectable } from '@nestjs/common'

import { ProfileRepository } from './profile.repository.js'
import { ProfileNotFoundError } from './profile.errors.js'

import type { ProfileSnapshot } from './profile.types.js'

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) { }

  async getProfile(): Promise<ProfileSnapshot> {
    const profile = await this.profileRepository.findProfile()

    if (!profile) {
      throw new ProfileNotFoundError()
    }

    return profile
  }
}
