import type { Profile } from '../domain/profile.interface.ts'
import type { Link } from '../domain/link.interface.ts'
import type { Experience } from '../domain/experience.interface.js'

export abstract class ProfileRepository {
  abstract findProfile(uuid: string): Promise<Profile | null>
  abstract findProfileLinks(profileUuid: string): Promise<Link[]>
  abstract findProfileExperiences(profileUuid: string): Promise<Experience[]>
}
