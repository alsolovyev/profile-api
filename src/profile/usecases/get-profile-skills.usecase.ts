import { Injectable } from '@nestjs/common'

import { ProfileRepository } from '../repositories/profile.repository.js'

import type { Skill } from '../domain/skill.interface.js'

@Injectable()
export class GetProfileSkillsUseCase implements App.UseCase<string, Skill[]> {
  constructor(private readonly profileRepository: ProfileRepository) { }

  async execute(uuid: string): Promise<Skill[]> {
    return await this.profileRepository.findProfileSkills(uuid)
  }
}
