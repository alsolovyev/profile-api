import { Injectable } from '@nestjs/common'

import { PrismaService } from '#src/prisma/prisma.service.js'

import { ProfileRepository } from './profile.repository.js'
import { Link } from '../domain/link.interface.js'

import type { Profile } from '../domain/profile.interface.js'
import type { Experience } from '../domain/experience.interface.js'
import type { Project } from '../domain/project.interface.js'
import type { Skill } from '../domain/skill.interface.js'

@Injectable()
export class PrismaProfileRepository extends ProfileRepository {
  constructor(private readonly prisma: PrismaService) {
    super()
  }

  async findProfile(uuid: string): Promise<Profile | null> {
    return this.prisma.profile.findUnique({
      where: { id: uuid }
    })
  }

  async findProfileExperiences(profileUuid: string): Promise<Experience[]> {
    return await this.prisma.experience.findMany({
      where: { profileId: profileUuid }
    })
  }

  async findProfileProjects(profileUuid: string): Promise<Project[]> {
    return await this.prisma.project.findMany({
      where: { profileId: profileUuid }
    })
  }

  async findProfileLinks(profileUuid: string): Promise<Link[]> {
    return this.prisma.link.findMany({
      where: { profileId: profileUuid }
    })
  }

  async findProfileSkills(profileUuid: string): Promise<Skill[]> {
    return await this.prisma.skill.findMany({
      where: { profileId: profileUuid }
    })
  }
}
