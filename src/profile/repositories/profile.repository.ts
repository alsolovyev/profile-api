import type { Profile } from '../domain/profile.interface.ts'
import type { Link } from '../domain/link.interface.ts'

export abstract class ProfileRepository {
  abstract findProfile(uuid: string): Promise<Profile | null>
  abstract findProfileLinks(profileUuid: string): Promise<Link[]>
}
