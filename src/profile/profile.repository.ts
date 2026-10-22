import type { ProfileSnapshot } from './profile.types.js'

export abstract class ProfileRepository {
  abstract findProfile(): Promise<ProfileSnapshot | null>
}
