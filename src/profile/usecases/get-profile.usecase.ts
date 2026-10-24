import { Injectable } from '@nestjs/common'

import { ProfileRepository } from '../repositories/profile.repository.js'

import type { Profile } from '../domain/profile.interface.js'

@Injectable()
export class GetProfileUseCase implements App.UseCase<string, Profile | null> {
  constructor(private readonly profileRepository: ProfileRepository) { }

  execute(uuid: string): Promise<Profile | null> {
    return this.profileRepository.findProfile(uuid)
  }
}
