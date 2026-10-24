import { Injectable } from '@nestjs/common'
import { ProfileRepository } from '../repositories/profile.repository.js'
import type { Project } from '../domain/project.interface.js'

@Injectable()
export class GetProfileProjectsUseCase implements App.UseCase<string, Project[]> {
  constructor(private readonly repository: ProfileRepository) { }

  async execute(uuid: string): Promise<Project[]> {
    return await this.repository.findProfileProjects(uuid)
  }
}
