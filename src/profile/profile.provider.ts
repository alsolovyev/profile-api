import { Injectable } from '@nestjs/common'

import { Profile } from './models/profile.model.js'
import { ProfileRepository } from './profile.repository.js'

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) { }

  async get(): Promise<Profile> {
    return this.profileRepository.get()
  }
}
