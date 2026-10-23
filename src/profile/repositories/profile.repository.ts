import type { Profile } from '../domain/profile.interface.ts'

export abstract class ProfileRepository {
  abstract findPublicProfile(): Promise<Profile | null>
}
