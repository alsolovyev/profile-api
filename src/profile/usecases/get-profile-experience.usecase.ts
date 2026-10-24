import { Injectable } from '@nestjs/common'
import { ProfileRepository } from '../repositories/profile.repository.js'
import type { Experience } from '../domain/experience.interface.js'

@Injectable()
export class GetProfileExperiencesUseCase implements App.UseCase<string, Experience[]> {
  constructor(private readonly repository: ProfileRepository) { }

  async execute(uuid: string): Promise<Experience[]> {
    return await this.repository.findProfileExperiences(uuid)
  }
}
