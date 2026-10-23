import { Injectable } from '@nestjs/common'

import { ProfileRepository } from '../repositories/profile.repository.js'

import type { Profile } from '../domain/profile.interface.js'

@Injectable()
export class GetPublicProfileUseCase implements App.UseCase<void, Profile | null> {
  constructor(private readonly profileRepository: ProfileRepository) { }

  execute(): Promise<Profile | null> {
    return this.profileRepository.findPublicProfile()
  }
}
